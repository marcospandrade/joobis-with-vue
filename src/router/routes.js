import { routes as auth } from '@/modules/auth'
import { routes as landing } from '@/pages/landing'
import { routes as dashboard } from '@/pages/dashboard'

export default [
    ...auth,
    ...landing,
    ...dashboard
]