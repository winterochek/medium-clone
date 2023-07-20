import type { Meta, StoryObj } from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'

import { TagList } from '../tag-list'

const meta = {
   title: 'shared/tag-list',
   tags: ['autodocs'],
   component: TagList,
   decorators: [withRouter()],
   args: { tags: ['tag1', 'tag2', 'tag3'] },
} satisfies Meta<typeof TagList>

export default meta
type Story = StoryObj<typeof TagList>

export const Base: Story = {}
