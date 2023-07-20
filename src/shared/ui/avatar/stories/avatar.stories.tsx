import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from '../avatar'

const meta = {
   title: 'ui/avatar',
   tags: ['autodocs'],
   component: Avatar,
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof Avatar>

export const Base: Story = {
   args: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Cat_eyes_2007-1.jpg/320px-Cat_eyes_2007-1.jpg'
   },
}
