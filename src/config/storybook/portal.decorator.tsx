import { ReactNode, FC } from 'react'

const StorybookPortalProvider: FC<{ children: ReactNode }> = ({ children }) => {
   return <div id='root'>{children}</div>
}

export const withPortal = () => (Story: FC) =>
   (
      <StorybookPortalProvider>
         <Story />
      </StorybookPortalProvider>
   )
