import { TOKEN_KEY, useLocalStorage } from '.'

export const UseToken = (): string | undefined => {
   const { get } = useLocalStorage()
   return (get(TOKEN_KEY) as string) || undefined
}
