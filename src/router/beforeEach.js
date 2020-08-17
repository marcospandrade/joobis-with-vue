import store from '../store'

export default async (to, from, next) => {
    document.title = `${to.name} - Joobis`
    
    if ((to.name !== 'Login' && to.name !== 'Registrar' && to.name !== 'landing') && !store.getters['auth/hasToken']) {
        try {
            await store.dispatch('auth/ActionCheckToken')
            next({
                path: to.path
            })
        } catch (err) {
            console.log(err)
        }
    } else {
        if ((to.name === 'Login' || to.name === 'Registrar') && store.getters['auth/hasToken']) {
            next({
                name: 'dashboard'
            })
        } else {
            next()
        }
    }
}