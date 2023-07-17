import type { Meta, StoryObj } from '@storybook/react'

import { Label } from '../label'
import { withRHF } from '../../../../config/storybook/react-hook-form.decorator'
import { Input } from '../..'

const meta = {
   title: 'ui/label',
   tags: ['autodocs'],
   component: Label,
   decorators: [withRHF()],
   args: {
      title: 'email',
      children: <Input field='email' placeholder='put your email in here' />,
   },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof Label>

export const LabelWithInput: Story = {}
