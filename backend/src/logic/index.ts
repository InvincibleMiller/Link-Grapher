import { URL } from "url";

import axios, { AxiosError } from "axios";

import * as htmlparser2 from "htmlparser2";

type LinkOccurrenceList = {
  [link: string]: number;
};

export type Graph = { [page: string]: LinkOccurrenceList };

export async function findLinksRecursively(
  currentURL: string,
  graph: Graph,
  pages: string[]
) {
  let baseOrigin = "";

  try {
    const url = new URL(currentURL);
    if (!url) throw Error;

    baseOrigin = url.origin;
  } catch (error) {
    console.log(error);
    return;
  }

  let pageData: any = {};

  try {
    // fetch the page
    const page = await axios.get(currentURL);

    pageData = page.data;
  } catch (error) {
    console.log(error);
    return;
  }

  const linkOccurrences: LinkOccurrenceList = {};

  try {
    // parse the page...
    const parser = new htmlparser2.Parser({
      onopentag(name, attributes) {
        // search for all the links within the page
        const linkTagNames = ["a"];
        let { href } = attributes;

        if (linkTagNames.includes(name)) {
          try {
            if (!href) return;

            // if the url is relative to the root,
            // include the origin in the url
            href = href.replace(/^\//, `${baseOrigin}/`);
            // removed the trailing backslash to prevent
            // graphing a page more than once
            href = href.replace(/\/+$/, "");

            // verify the the url is valid
            const linkURL = new URL(href);

            // block files from the results
            if (href.match(/\.[a-zA-Z0-9]+$/)) return;

            if (baseOrigin === linkURL.origin) {
              // if this link is internal, add it to the list (graph later)
              if (!linkOccurrences[href]) {
                linkOccurrences[href] = 1;
              } else {
                linkOccurrences[href] += 1;
              }
            }
          } catch (error) {
            // Invalid URL
            // console.log(error);
          }
        }
      },
    });
    parser.write(pageData);
    parser.end();
  } catch (error) {
    console.log(error);
    return;
  }

  try {
    graph[currentURL] = linkOccurrences;
    const links = Object.keys(linkOccurrences);

    for (let i in links) {
      const link = links[i];
      if (!graph[link]) await findLinksRecursively(link, graph, pages);
      if (!pages.includes(link)) pages.push(link);
    }

    return graph;
  } catch (error) {
    console.log(error);
    return;
  }
}

type LinkGraphNode = {
  path: string;
  children: { [key: string]: LinkGraphNode } | null;
};

type IndexedPage = { path: string; parentPath: string; segments: string[] };

export function createWebsiteHierarchy(pages: string[]): LinkGraphNode {
  const sortedPages = pages
    .map((page: string): IndexedPage => {
      const basePath: string =
        page.length > 1 ? page.replace(/\/+$/, "") : page;

      const pattern = /\/([^/]+)/g;
      const segments = (page.match(pattern) || []).map((segment) =>
        segment.replace("/", "")
      );

      return {
        path: basePath,
        parentPath: basePath.replace(/\/[^/]+$/, ""),
        segments,
      };
    })
    .sort((a, b) =>
      a.parentPath.toLowerCase().localeCompare(b.parentPath.toLowerCase())
    );

  const firstPage = sortedPages.splice(0, 1)[0];
  const rootNode: LinkGraphNode = {
    children: {},
    path: firstPage.path,
  };

  function arrangeChildren(
    root: LinkGraphNode,
    segments: string[]
  ): LinkGraphNode {
    // if we have nothing else to do, stop this recursion.
    if (segments.length === 0) {
      root.children = null;
      return root;
    }

    if (!root.children) {
      root.children = {};
    }

    // separate the current segment from the rest of them.
    const seg: string = segments.splice(0, 1)[0];

    // check if the next segment/child exists already
    // to avoid creating it twice
    const hasChild = Object.keys(root.children).includes(seg);
    if (!hasChild) {
      root.children[seg] = {
        children: {},
        path: `${root.path}/${seg}`,
      };
    }

    // recursively add children
    return arrangeChildren(root.children[seg], segments);
  }

  sortedPages.forEach(({ segments }: IndexedPage) => {
    arrangeChildren(rootNode, segments.splice(1, segments.length - 1));
  });

  return rootNode;
}
