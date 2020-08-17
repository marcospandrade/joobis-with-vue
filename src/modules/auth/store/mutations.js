import * as types from './mutation-types'

export default {
    [types.SET_USUARIO_LOGADO] (state, payload) {
        state.usuarioLogado = payload    
    },
    [types.SET_TOKEN] (state, payload) {
        state.accessToken = payload    
    },
    [types.SET_AUTORIDADE_USUARIO] (state, payload) {
        state.autoridadeUsuario = payload
    },
    [types.SET_EMPRESA_VINCULADA] (state, payload) {
        state.empresaVinculada = payload
    },
    [types.SET_EMPRESA_CADASTRO] (state, payload) {
        state.dadosEmpresaParaCadastro = payload
    }
}