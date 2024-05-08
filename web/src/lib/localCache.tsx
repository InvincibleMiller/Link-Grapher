import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface LocalCache {
  cache: { [key: string]: string };
  searchCache: string[];
  cachePage: (path: string, data: any) => void;
  clearCache: () => void;
  getCachedPage: (path: string) => any;
  addSearchToCache: (search: string) => void;
}

const useLocalCache = create<LocalCache>()(
  persist(
    (set, get) => ({
      cache: {},
      searchCache: [],
      cachePage: (path, data) =>
        set((state) => {
          const newCache = {
            ...state.cache,
          };
          newCache[path] = data;

          return { cache: newCache };
        }),
      clearCache: () => set({ cache: {} }),
      getCachedPage: (path) => get().cache[path],
      addSearchToCache: (search) =>
        set(({ searchCache }) => ({
          searchCache: [search, ...searchCache].filter(
            (_, index) => index < 10
          ),
        })),
    }),
    {
      name: "_L_G_local_storage",
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export const getCachedPage = (path: string) =>
  useLocalCache.getState().getCachedPage(path);
export const cachePage = (path: string, data: any) =>
  useLocalCache.getState().cachePage(path, data);
export const addSearchToCache = (search: string) =>
  useLocalCache.getState().addSearchToCache(search);

export default useLocalCache;
