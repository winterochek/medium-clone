import type { Meta, StoryObj } from '@storybook/react'

import { SuspenseLoading } from '../suspense-loading-modal'

const meta = {
   title: 'shared/suspense',
   tags: ['autodocs'],
   component: SuspenseLoading,
} satisfies Meta<typeof SuspenseLoading>

export default meta
type Story = StoryObj<typeof SuspenseLoading>

export const Suspense: Story = {}
