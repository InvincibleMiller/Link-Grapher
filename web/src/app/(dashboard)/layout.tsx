"use client";

import { ReactFlowProvider } from "reactflow";
import Logo from "@/components/Logo";

import Button from "@/components/Button";

import useLocalCache from "@/lib/localCache";
import { MouseEventHandler } from "react";

import { Suspense } from "react";

const GraphLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const clearCacheAndRefresh: MouseEventHandler = (e) => {
    e.preventDefault();
    useLocalCache.getState().clearCache();

    window.location.reload();
  };

  return (
    <ReactFlowProvider>
      <Suspense>
        <body className="m-0 bg-gray-50 min-h-[100vh] flex flex-row flex-nowrap">
          <header className="z-[100] bg-blue-100/75 p-4 flex flex-col w-[300px] border-r-2 border-blue-600/25">
            <Logo />
            <Button
              icon={reloadIcon}
              title="Refresh Page"
              className="mt-4"
              onPress={() => window.location.reload()}
              fullWidth
            />
            <Button
              icon={clearIcon}
              style="outlined"
              title="Clear Cache"
              className="mt-4"
              onPress={clearCacheAndRefresh}
              fullWidth
            />
          </header>
          <>{children}</>
        </body>
      </Suspense>
    </ReactFlowProvider>
  );
};

const reloadIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
    />
  </svg>
);

const clearIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

export default GraphLayout;
