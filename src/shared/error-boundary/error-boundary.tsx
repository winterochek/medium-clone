import { Component, ReactNode } from 'react'

type Props = { children: ReactNode; fallback: ReactNode }
type State = { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
   constructor(props: Props) {
      super(props)
      this.state = { hasError: false }
   }

   static getDerivedStateFromError() {
      return { hasError: true }
   }

   componentDidCatch(error: unknown, info: unknown) {
      console.log(error, info)
   }

   render() {
      return this.state.hasError ? this.props.fallback : this.props.children
   }
}
