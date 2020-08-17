import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

//vue-form-wizard
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import '@/styles/themify/themify-icons.css'

//element ui imports
import Element from 'element-ui'
import './styles/element-variables.scss'
//import enLang from 'element-ui/lib/locale/lang/en'
import brLang from 'element-ui/lib/locale/lang/pt-br'
import kitLandingPage from './plugins/kit-landing-page';

import './icons'
import '@/styles/index.scss' //global css

Vue.use(VueFormWizard);
Vue.use(Element, {
  size: 'medium', //set element-ui default size
  locale: brLang
})
Vue.use(kitLandingPage);

Vue.config.productionTip = false

window._Vue = new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
