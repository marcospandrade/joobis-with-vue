import 'bootstrap/dist/css/bootstrap.css';
import '@/styles/now-ui/now-ui-kit.scss';
import '@/styles/landing-page/_navbar.scss';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import VueLazyload from 'vue-lazyload';
import globalDirectives from './globalDirectives';
import globalMixins from './globalMixins';
import globalComponents from './globalComponents';

locale.use(lang);

export default {
    install(Vue){
        Vue.use(globalDirectives);
        Vue.use(globalMixins);
        Vue.use(globalComponents);
        Vue.use(VueLazyload, {
            observer: true,
            // optional
            observerOptions: {
            rootMargin: '0px',
            threshold: 0.1
            }
        });
    }
};