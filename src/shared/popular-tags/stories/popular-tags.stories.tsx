import type { Meta, StoryObj } from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'

import { PopularTagsLayout } from '../popular-tags-layout'
import { withReactQuery } from '../../../config/storybook/react-query.decorator'
import { TagList } from '../../tag-list'
import { Loading as LoadingUi } from '../../loading'

const meta = {
   title: 'shared/popular-tags',
   tags: ['autodocs'],
   component: PopularTagsLayout,
   decorators: [withRouter(), withReactQuery()],
   args: {
      tagList: <TagList tags={['A', 'B', 'C']} />,
      loadingUi: <LoadingUi title='data is loading' />,
   },
} satisfies Meta<typeof PopularTagsLayout>

export default meta
type Story = StoryObj<typeof PopularTagsLayout>

export const Base: Story = {
   args: {
      isSuccess: true,
      isError: false,
      isLoading: false,
      error: '',
   },
}

export const Loading: Story = {
   args: {
      isSuccess: false,
      isError: false,
      isLoading: true,
      error: '',
   },
}

export const Error: Story = {
    args: {
       isSuccess: false,
       isError: true,
       isLoading: false,
       error: 'Error happened',
    },
 }
