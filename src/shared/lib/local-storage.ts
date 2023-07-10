export const useLocalStorage = () => {
   const ls = window.localStorage
   const get = (key: string) => {
      const data = ls.getItem(key)
      return data ? JSON.parse(data) : null
   }
   const set = (key: string, data: any): void => {
      const sequalizedData = JSON.stringify(data)
      ls.setItem(key, sequalizedData)
   }
   const clear = () => {
      ls.clear()
   }
   return {
      get,
      set,
      clear,
   }
}
