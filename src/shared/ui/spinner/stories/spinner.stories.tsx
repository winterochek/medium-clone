import type { Meta, StoryObj } from '@storybook/react'

import { Spinner } from '../spinner'

const meta = {
   title: 'ui/spinner',
   tags: ['autodocs'],
   component: Spinner,
   args: {},
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof Spinner>

export const Small: Story = {
   args: {},
}

export const Medium: Story = {
   args: {
      classname: 'w-10 h-10',
   },
}

export const Large: Story = {
   args: {
      classname: 'w-16 h-16',
   },
}
