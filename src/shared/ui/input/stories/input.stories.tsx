import type { Meta, StoryObj } from '@storybook/react'

import { Input } from '../input'
import { withRHF } from '../../../../config/storybook/react-hook-form.decorator'

const meta = {
   title: 'ui/input',
   tags: ['autodocs'],
   component: Input,
   decorators: [withRHF()],
   args: {
      placeholder: 'placeholder',
      field: 'field',
   },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof Input>

export const InputField: Story = {}
