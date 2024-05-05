import { Handler, Request, Response } from "express";
import { InvalidRequest, ServerError } from "../../lib/errors";

import { findLinksRecursively, createWebsiteHierarchy } from "../../logic";

import type { Graph } from "../../logic";

import axios from "axios";

export const graphLinks: Handler = async (req: Request, res: Response) => {
  const { baseURL }: { baseURL?: string } = req.query;

  // check for proper input
  if (!baseURL) {
    InvalidRequest("Expected URL param: baseURL", res);
    return;
  }

  // Verify the url, and keep the baseOrigin
  let baseOrigin = "";

  try {
    const url = new URL(baseURL);
    if (!url) throw Error;

    baseOrigin = url.origin;
  } catch (error) {
    console.log(error);
    InvalidRequest("URL is invalid", res);
    return;
  }

  // get the final redirection URL to use
  let urlAfterRedirection = "";

  try {
    const result = await axios.get(baseURL);

    urlAfterRedirection = result.request.res.responseUrl;
  } catch (error) {
    console.log(error);
    InvalidRequest("URL is invalid", res);
    return;
  }

  // Finally, graph the links recursively

  try {
    let graph: Graph | undefined = {};
    const allPages: string[] = [urlAfterRedirection];

    graph = await findLinksRecursively(urlAfterRedirection, graph, allPages);

    if (!graph) {
      throw Error;
    }

    res.status(200).json({
      graph,
      pages: createWebsiteHierarchy(allPages),
    });
    console.log("\n\ndone");
  } catch (error) {
    console.log(error);
    ServerError("Crawling failed", res);
  }
};
