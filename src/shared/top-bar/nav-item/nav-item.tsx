import { Link, LinkProps } from 'react-router-dom'

interface Props extends LinkProps {
   title: string
   icon?: JSX.Element
   isActive?: boolean
}

export default function NavItemComponent(props: Props) {
   const { to, title, icon: Icon, isActive } = props
   return (
      <Link className={'text-gray-500 hover:text-black hover:cursor-pointer flex flex-row items-center'} to={to}>
         {Icon ? Icon : null}
         &nbsp;
         <span className={`${isActive ? 'text-black' : ''}`}>{title}</span>
      </Link>
   )
}
