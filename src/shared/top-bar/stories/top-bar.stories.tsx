import type { Meta, StoryObj } from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'

import { TopBarLayout } from '../top-bar-layout'
import { Link } from 'react-router-dom'
import { NavItem } from '../nav-item'

const meta = {
   title: 'shared/topbar',
   tags: ['autodocs'],
   component: TopBarLayout,
   decorators: [withRouter()],
   args: {
      logo: (
         <Link className='flex items-center justify-center' to={'/'}>
            <span className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight pb-2 text-green-500 font-semibold flex justify-center items-center'>
               medium
            </span>
         </Link>
      ),
   },
} satisfies Meta<typeof TopBarLayout>

export default meta
type Story = StoryObj<typeof TopBarLayout>

export const Idle: Story = {
   args: {
      home: <NavItem isActive to={'/'} title={'Home'} />,
      profile: <NavItem to={`/profile/123`} title={`${'Profile'}`} />,
      scenario: 'idle',
      activePath: '/',
   },
}

export const Loading: Story = {
   args: {
      home: <NavItem isActive to={'/'} title={'Home'} />,
      profile: <NavItem to={`/profile/123`} title={`${'Profile'}`} />,
      scenario: 'loading',
      activePath: '/',
   },
}

export const LoggedIn: Story = {
   args: {
      home: <NavItem to={'/'} title={'Home'} />,
      profile: <NavItem to={`/profile/123`} title={`${'Profile'}`} />,
      scenario: 'loggedIn',
      activePath: '/',
   },
}
