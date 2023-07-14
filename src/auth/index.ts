import { lazy } from 'react'

const Login = lazy(() => import('./login'))
const Register = lazy(() => import('./register'))

export { Login, Register }
