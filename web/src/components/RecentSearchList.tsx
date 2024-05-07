"use client";

import useLocalCache from "@/lib/localCache";

const RecentSearchList = ({
  className,
  limit = 2,
}: {
  className?: string;
  limit?: number;
}) => {
  const { searchCache } = useLocalCache();
  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      {searchCache
        .filter((_, index) => index < limit)
        .map((search, index) => {
          return (
            <a
              className="flex-1 p-2 rounded-lg bg-gray-200/55 hover:bg-gray-200/75 hover:pl-3 transition-all duration-75 max-w-full truncate"
              href={`/graph?url=${search}`}
              key={index}
            >
              {search}
            </a>
          );
        })}
    </div>
  );
};

export default RecentSearchList;
