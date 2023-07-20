import type { Meta, StoryObj } from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'

import { Redirect } from '../redirect'

const meta = {
   title: 'shared/redirect',
   tags: ['autodocs'],
   component: Redirect,
   decorators: [withRouter()],
   args: { action: 'sign in', title: 'create articles' },
} satisfies Meta<typeof Redirect>

export default meta
type Story = StoryObj<typeof Redirect>

export const Base: Story = {}
