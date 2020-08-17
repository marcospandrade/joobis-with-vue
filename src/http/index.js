import Vue from 'vue'
import VueResource from 'vue-resource'
import services from './services'
import interceptors from './interceptors'

Vue.use(VueResource);

const http = Vue.http

http.options.root = 'http://localhost:3300/api/'

http.interceptors.push(interceptors)

Object.keys(services).map(service => {
    services[service] = Vue.resource('', {}, services[service])
})

const setXToken = accessToken => {
    http.headers.common['x-access-token'] = `${accessToken}`
    //console.log(http)
}

const getInfosEmpresaByLeadFinder = cnpjEmpresa => {
    return http.get(`https://api.leadfinder.com.br/externo/cnpj/${cnpjEmpresa}`);
}

export default services
export { http, setXToken, getInfosEmpresaByLeadFinder }