import React from "react";

type Props = {
  isLoading: boolean;
  message?: string;
};

const LoadingSpinner = ({ isLoading, message }: Props) => {
  if (isLoading)
    return (
      <div className="flex-column p-12 border border-gray-900/25 shadow-lg rounded-lg bg-white z-[100] text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="animate-spin w-12 h-12 m-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
        <p className="text-2xl font-semibold mt-4">Loading</p>
        <p className="text-xs font-semibold mt-4">{message}</p>
      </div>
    );
};

export default LoadingSpinner;
