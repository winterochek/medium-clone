import { Spinner } from '../ui/spinner'

type Props = {
   title: string
   height?: number
   width?: number
}

export default function LoadingComponent({ title, height = 20, width = 20 }: Props) {
   return (
      <div className='flex flex-row gap-5 items-center justify-center'>
         <span className='text-green-500'>{title}</span>
         <Spinner height={height} width={width} />
      </div>
   )
}
