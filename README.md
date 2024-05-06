# Link Grapher

## The Problem

For an SEO Specialist, links are a huge deal, allegedly, and it's very important for an SEO to understand how links are structured in their client's website. The hard part is there's not really an easy way to visualize the link structure--- well, there wasn't, but there is now!

## The Solution

Link Grapher scans a website's entire domain to create a complex graph of its internal link structure.

#### How it does it

After you submit the initial URL to the tool, a request is made to the back-end server to crawl the submitted website and return a graph of the site's internal link structure; that graph is sent back to the front-end as JSON, where it is used to build a detailed graph that SEOs can use to understand the structure of a website.

## How it was made

The tech stack is pretty straight forward.

### Back-End
- Node.js
- Express

### Front-End
- Next.js
- React.js
- Tailwind CSS
- React Flow
- Zustand


The Dagre algorithm is used to arrange the graph, and there's quite a bit of recursion going on all around. Zustand is used to keep to keep a local cache of each website so as to avoid repeatedly pinging the back-end.