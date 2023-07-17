import type { Meta, StoryObj } from '@storybook/react'

import { PasswordInput } from '../password-input'
import { withRHF } from '../../../../config/storybook/react-hook-form.decorator'

const meta = {
   title: 'ui/input',
   tags: ['autodocs'],
   component: PasswordInput,
   decorators: [withRHF()],
   args: {
      placeholder: 'placeholder',
      field: 'field',
   },
} satisfies Meta<typeof PasswordInput>

export default meta
type Story = StoryObj<typeof PasswordInput>

export const PasswordInputField: Story = {}
