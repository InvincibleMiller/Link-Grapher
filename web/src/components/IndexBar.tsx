"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const IndexBar = ({
  customSubmit,
}: {
  customSubmit?: (url: string) => void;
}) => {
  const router = useRouter();

  const [URL, setURL] = useState("");

  const submitURL = (e: FormEvent) => {
    e.preventDefault();

    // the folowing before 'router.push()'
    // makes sure the url is in proper form
    const test1 = /^http([s]?):\/\//;
    const test2 = /\/$/;

    let href = URL;

    if (!test1.exec(URL)) {
      href = `https://${URL}`;
    }

    if (!test2.exec(href)) {
      href = `${href}/`;
    }

    if (customSubmit) {
      customSubmit(href);
    } else {
      router.push(`/graph?url=${href}`);
    }
  };

  return (
    <form
      onSubmit={submitURL}
      defaultValue=""
      className="flex flex-row w-full border-4 border-gray-200 focus-within:border-blue-200 overflow-clip rounded-2xl items-center bg-white transition-colors duration-75"
    >
      <input
        type="text"
        onChange={(e) => setURL(e.target.value)}
        className="text-gray-600 text-xl flex-1 p-4 border-none"
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
