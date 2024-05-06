import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface LocalCache {
  cache: { [key: string]: string };
  cachePage: (path: string, data: any) => void;
  clearCache: () => void;
  getCachedPage: (path: string) => any;
}

const useLocalCache = create<LocalCache>()(
  persist(
    (set, get) => ({
      cache: {},
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
    }),
    {
      name: "_L_G_local_storage",
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export const getCachedPage = (path: string) =>
  useLocalCache.getState().getCachedPage(path);
export const cachePage = (path: string, data: any) =>
  useLocalCache.getState().cachePage(path, data);

export default useLocalCache;
