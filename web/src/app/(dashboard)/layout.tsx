"use client";

import { ReactFlowProvider } from "reactflow";
import Logo from "@/components/Logo";

import Button from "@/components/Button";

import useLocalCache from "@/lib/localCache";
import { MouseEventHandler } from "react";

import { useRouter } from "next/navigation";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();

  const clearCacheAndRefresh: MouseEventHandler = (e) => {
    e.preventDefault();
    useLocalCache.getState().clearCache();

    window.location.reload();
  };

  return (
    <ReactFlowProvider>
      <body className="m-0 bg-gray-50 min-h-[100vh] flex flex-row flex-nowrap">
        <header className="z-[100] bg-blue-100/75 p-4 flex flex-col w-[300px] border-r-2 border-blue-600/25">
          <Logo />
          <Button
            title="Refresh Page"
            className="mt-4"
            onPress={() => window.location.reload()}
          />
          <Button
            style="outlined"
            title="Clear Cache"
            className="mt-4"
            onPress={clearCacheAndRefresh}
          />
        </header>
        <>{children}</>
      </body>
    </ReactFlowProvider>
  );
};

export default layout;
