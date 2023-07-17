import type { Meta, StoryObj } from '@storybook/react'

import { Textarea } from '../textarea'
import { withRHF } from '../../../../config/storybook/react-hook-form.decorator'

const meta = {
   title: 'ui/textarea',
   tags: ['autodocs'],
   component: Textarea,
   decorators: [withRHF()],
   args: {
      placeholder: 'placeholder',
      field: 'field',
   },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof Textarea>

export const TextareaField: Story = {}
