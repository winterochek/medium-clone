import { PAGE_KEY, useLocalStorage } from '.'

export const usePage = () => {
   const { get, set } = useLocalStorage()
   return {
      page: get(PAGE_KEY),
      setPage: (page: number) => set(PAGE_KEY, page),
   }
}
