"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Dagre from "@dagrejs/dagre";
import ReactFlow, {
  Background,
  Controls,
  useReactFlow,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";

import Lo from "lodash";

import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";

import { cachePage, getCachedPage } from "@/lib/localCache";

import { addSearchToCache } from "@/lib/localCache";

type Props = {
  // searchParams: { [key: string]: string | string[] | undefined };
};

type FlowNode = Node;

type FlowEdge = Edge;

type PageChildren = {
  children: { [key: string]: PageChildren };
  path: string;
} | null;

const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (
  nodes: FlowNode[],
  edges: FlowEdge[],
  options?: any
) => {
  g.setGraph({ rankdir: options?.direction || "TB" });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) => g.setNode(node.id, { width: 150, height: 80 }));

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

const nodeColor = (node: FlowNode) => {
  switch (node.type) {
    default:
      return "#ff0072";
  }
};

const Graph = ({}: Props) => {
  const { fitView } = useReactFlow();

  const router = useRouter();

  const searchParams = useSearchParams();
  const [url, setURL] = useState<string | undefined>(
    searchParams.get("url") || undefined
  );

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [data, setData] = useState<{ pages: PageChildren; graph: any } | null>(
    null
  );

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const reload = (url: string) => {
    window.location.assign(`/graph?url=${url}`);
  };

  const loadGraph = async (): Promise<any | null> => {
    try {
      setIsLoading(true);

      if (!url) throw Error();

      const { href } = new URL(url);
      setURL(href);

      const cachedPage = getCachedPage(href);

      console.log(cachedPage);

      if (cachedPage) {
        setData(cachedPage);
        return;
      }

      const endPoint = `${
        process.env.NEXT_PUBLIC_BACKEND_ENDPOINT || ""
      }/graph-links`;

      const result = await axios.get(`${endPoint}?baseURL=${href}`);

      setData(result?.data);

      console.log("reloaded");

      cachePage(href, result?.data);

      addSearchToCache(href);
    } catch (error) {
      console.log(error);
      setErrorMessage(error?.message || "Cannot load page");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadGraph();
  }, [url]);

  useEffect(() => {
    if (data === null) return;

    console.log("data exists! making nodes for graph");

    // Initialize a node for the home page
    const nodes: FlowNode[] = [
      {
        id: data.pages?.path || "",
        position: { x: 0, y: 0 },
        data: { label: "Home" },
      },
    ];
    const edges: FlowEdge[] = [];

    // add all the nodes and their structural-link edges
    function getPaths(
      pages: PageChildren,
      nodes: FlowNode[],
      edges: FlowEdge[],
      depth: number
    ) {
      if (!pages) return;

      if (pages.children === null) return;

      const keys = Lo.keys(pages.children);

      keys.forEach((key, index) => {
        const child = pages.children[key];

        if (!child) return;

        const newNode: FlowNode = {
          id: child?.path || "",
          position: { x: 0, y: 0 },
          data: { label: key },
        };

        nodes.push(newNode);
        edges.push({
          id: `${pages.path} - ${child?.path}`,
          source: pages.path,
          target: child.path,
          animated: true,
          type: "default",
        });

        getPaths(child, nodes, edges, depth + index);
      });
    }

    getPaths(data.pages, nodes, edges, 0);

    // add the content-link edges
    console.log(data.graph);
    Lo.keys(data.graph).forEach((key: string) => {
      const safeKey = key?.replace(/\/$/, "");

      const links = data.graph[key];
      Lo.keys(links).forEach((linkPath: string) => {
        const newEdgeId = `${safeKey} - ${linkPath}`;

        // make sure not to add the same edge twice
        if (edges.filter(({ id }) => id === newEdgeId).length > 0) return;
        if (
          edges.filter(
            ({ source, target }) => source === linkPath && target === safeKey
          ).length > 0
        )
          return;
        if (
          edges.filter(
            ({ source, target }) => source === safeKey && target === linkPath
          ).length > 0
        )
          return;

        edges.unshift({
          id: newEdgeId,
          source: safeKey,
          target: linkPath,
          animated: false,
          type: "straight",
        });
      });
    });

    const layouted = getLayoutedElements(nodes, edges);

    setNodes([...layouted.nodes]);
    setEdges(Lo.uniqBy([...layouted.edges], ({ id }) => id));

    window.requestAnimationFrame(() => {
      fitView();
    });
  }, [data]);

  return (
    // bg-gray-950
    <main className="flex justify-center items-center h-[100vh] p-0 relative flex-1">
      <div className="absolute flex inset-0 items-center justify-center">
        <LoadingSpinner
          isLoading={isLoading}
          message="This could take up to 2 minutes..."
        />
      </div>
      <div className="absolute flex inset-0 items-center justify-center">
        <ErrorMessage message={errorMessage} customSubmit={reload} />
      </div>
      <ReactFlow
        proOptions={{ hideAttribution: true }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        className="flex-grow"
      >
        <MiniMap {...{ nodeColor }} zoomable pannable />
        <Background />
        <Controls />
      </ReactFlow>
    </main>
  );
};

export default Graph;
