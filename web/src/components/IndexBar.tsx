"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const IndexBar = () => {
  const router = useRouter();

  const [URL, setURL] = useState("");

  const submitURL = (e: FormEvent) => {
    e.preventDefault();

    router.push(`/graph?url=${URL}`);
  };

  return (
    <form
      onSubmit={submitURL}
      defaultValue=""
      className="flex flex-row w-full border-4 border-black focus-within:border-blue-800/25 overflow-clip rounded-3xl items-center bg-gray-800 transition-colors duration-75"
    >
      <input
        type="text"
        onChange={(e) => setURL(e.target.value)}
        className="text-gray-300 text-xl flex-1 p-4 border-none"
      />
      <button
        type="submit"
        className="bg-blue-400 hover:bg-blue-500 active:bg-blue-600 transition-colors duration-75 h-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 m-5 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </form>
  );
};

export default IndexBar;
