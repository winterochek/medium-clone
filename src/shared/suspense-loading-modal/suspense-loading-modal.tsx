import { RootModal } from '../ui/modal'
import { Spinner } from '../ui/spinner'

export default function SuspenseLoadingModalComponent() {
   return (
      <RootModal position='center'>
         <Spinner classname='h-10 w-10' />
      </RootModal>
   )
}
