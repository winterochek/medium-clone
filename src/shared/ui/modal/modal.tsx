import { ReactNode } from 'react'
import { RootModal } from './root-modal'
import clsx from 'clsx'

type Props = {
   isOpen: boolean
   onClose: () => void
   position?: 'center'
   width?: 'md' | 'full'
   children: ReactNode
   classname?: string
}
export function Modal({
   isOpen = false,
   onClose,
   width = 'md',
   children,
   classname,
   position,
}: Props) {
   if (!isOpen) return null
   const handleClose = (event: any) => {
      const inModal = event.target?.closest('[data-id=modal]')
      if (inModal) return
      onClose()
   }
   return (
      <RootModal onClose={handleClose} position={position}>
         <div
            data-id='modal'
            className={clsx(
               'bg-white rounded-lg mx-auto min-h-[320px]',
               width === 'md' && 'max-w-[640px] w-full',
               width === 'full' && 'mx-5',
               classname
            )}
         >
            {children}
         </div>
      </RootModal>
   )
}
