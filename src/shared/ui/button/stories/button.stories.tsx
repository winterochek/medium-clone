import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../button'

const meta = {
   title: 'ui/button',
   tags: ['autodocs'],
   component: Button,
   args: {
      children: 'Stories',
   },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof Button>

export const Green: Story = {
   args: {
      variant: 'green',
   },
}

export const Outline: Story = {
   args: {
      variant: 'outline',
   },
}

export const Gray: Story = {
   args: {
      variant: 'gray',
   },
}

export const Danger: Story = {
   args: {
      variant: 'danger',
   },
}
