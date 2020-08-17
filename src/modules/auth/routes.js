export default [
    {
        name: 'Login',
        path: '/login',
        component: () => import(/* webpackChunkName: "login" */ './pages/Login')
    },
    {
        name: 'Registrar',
        path: '/registrar',
        component: () => import(/* webpackChunkName: "register" */ './pages/Register')
    }
]