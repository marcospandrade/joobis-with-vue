export default [
    {
        name: 'dashboard',
        path: '/dashboard',
        component: () => import(/* webpackChunkName: "DashBoard" */ './pages/Dashboard')
    }
]