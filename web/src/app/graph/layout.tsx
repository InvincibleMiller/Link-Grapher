"use client";

import { ReactFlowProvider } from "reactflow";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <ReactFlowProvider>{children}</ReactFlowProvider>;
};

export default layout;
