import { ReactNode } from 'react'
import clsx from 'clsx'
import { createPortal } from 'react-dom'

type Props = {
   position?: 'center'
   children: ReactNode
   onClose?: (event: any) => void
}

export default function RootModalComponent({ position, children, onClose }: Props) {
   return createPortal(
      <div
         onClick={onClose}
         className={clsx(
            'fixed inset-0 bg-slate-900/60 backdrop-blur pt-10 pb-10 overflow-y-auto z-50',
            position === 'center' && 'flex items-center justify-center'
         )}
      >
         {children}
      </div>,
      document.getElementById('root')!
   )
}
