import type { Meta, StoryObj } from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'

import { ProfileCard } from '../profile-card'
import { withReactQuery } from '../../../config/storybook/react-query.decorator'
import { withAuthStore } from '../../../config/storybook/auth-store.decorator'

const profile = {
   username: 'Username',
   image: 'https://api.realworld.io/images/demo-avatar.png',
   bio: 'stories lover',
   following: false,
}

const meta = {
   title: 'shared/profile-card',
   tags: ['autodocs'],
   decorators: [withReactQuery(), withRouter()],
   component: ProfileCard,
} satisfies Meta<typeof ProfileCard>

export default meta
type Story = StoryObj<typeof ProfileCard>

export const BaseNotFollowed: Story = {
   args: { profile: { ...profile } },
   decorators: [withAuthStore(true)],
}
export const BaseFollowed: Story = {
   args: { profile: { ...profile, following: true } },
   decorators: [withAuthStore(true)],
}

export const BaseIsOwn: Story = {
   args: { profile: { ...profile }, isOwn: true },
   decorators: [withAuthStore(true)],
}

export const BaseNoUser: Story = {
   args: { profile: { ...profile } },
   decorators: [withAuthStore(false)],
}
