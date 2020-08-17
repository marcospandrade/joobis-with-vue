import services from '@/http'
import {getInfosEmpresaByLeadFinder} from '@/http'
import * as storage from '../storage'
import * as types from './mutation-types'

export const ActionGetEmpresaCadastro = ({ dispatch }, payload) => {
    return getInfosEmpresaByLeadFinder(payload).then(res => {
        console.log(res.data)
        dispatch('ActionSetEmpresaCadastro', res.data)
    }).catch((err) => {
        console.log(err)
    })

}

export const ActionDoLogin = ({ dispatch }, payload) => {
    return services.auth.login(payload).then(res => {
        dispatch('ActionSetUsuarioLogado', res.data.usuario_login)
        dispatch('ActionSetToken', res.data.accessToken)
        dispatch('ActionSetEmpresaVinculada', res.data.empresaVinculada)
        dispatch('ActionSetAutoridadeUsuario', res.data.autoridadeUsuario)
    })
}

export const ActionCheckToken = ({ dispatch, state }) => {
    if(state.accessToken) {
        return Promise.resolve(state.accessToken)
    }

    const accessToken = storage.getLocalToken()

    if(!accessToken) {
        return Promise.reject(new Error('Token inválido'))
    }

    dispatch('ActionSetToken', accessToken)
    return dispatch('ActionLoadSession')
}

export const ActionLoadSession = ({ dispatch }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data: { usuario_login, empresaVinculada, autoridadeUsuario } } = await services.auth.loadSession()
            dispatch('ActionSetUsuarioLogado', usuario_login)
            dispatch('ActionSetEmpresaVinculada', empresaVinculada)
            dispatch('ActionSetAutoridadeUsuario', autoridadeUsuario)

            resolve()
        } catch (error) {
            dispatch('ActionSignOut')
            reject(error)
        }
    })
}

export const ActionSetEmpresaCadastro = ({ commit }, payload) => {
    commit(types.SET_EMPRESA_CADASTRO, payload)
}

export const ActionSetUsuarioLogado = ({ commit }, payload) => {
    commit(types.SET_USUARIO_LOGADO, payload)
}

export const ActionSetToken = ({ commit }, payload) => {
    storage.setLocalToken(payload)
    storage.setHeaderToken(payload)
    commit(types.SET_TOKEN, payload)
}

export const ActionSetEmpresaVinculada = ({ commit }, payload) => {
    commit(types.SET_EMPRESA_VINCULADA, payload)
}

export const ActionSetAutoridadeUsuario = ({ commit }, payload) => {
    commit(types.SET_AUTORIDADE_USUARIO, payload)
}

export const ActionSignOut = ({ dispatch }) => {
    storage.setHeaderToken('')
    storage.deleteLocalToken()
    dispatch('ActionSetUsuarioLogado', {})
    dispatch('ActionSetToken', '')
    dispatch('ActionSetEmpresaVinculada', {})
    dispatch('ActionSetAutoridadeUsuario', {})
}