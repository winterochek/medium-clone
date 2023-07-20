import type { Meta, StoryObj } from '@storybook/react'

import { ErrorFallback } from '../error-fallback'

const meta = {
   title: 'shared/error-fallback',
   tags: ['autodocs'],
   component: ErrorFallback,
} satisfies Meta<typeof ErrorFallback>

export default meta
type Story = StoryObj<typeof ErrorFallback>

export const Base: Story = {}
