import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import beforeEach from './beforeEach'

Vue.use(Router)

const createRouter = () => new Router({
    linkExactActiveClass: 'active',
    mode: 'history', // require service support
    scrollBehavior: to => {
        if (to.hash) {
            return {
                selector: to.hash
            };
        } else {
            return {
                x: 0,
                y: 0
            };
        }
    },
    routes: routes
})

const router = createRouter()

router.beforeEach(beforeEach)

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}
export default router