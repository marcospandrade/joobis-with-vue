<template>
  <div>
    <LandingNavbar></LandingNavbar>
    <div class="container register-container">
      <div class="title-container">
        <h3 class="title">Bem vindo ao Joobis Analytics</h3>
      </div>
      <form-wizard
        class="register-form"
        title
        subtitle
        color="#f96332"
        @on-complete="onCompleteForm"
        nextButtonText="Próximo"
        backButtonText="Voltar"
        finishButtonText="Finalizar cadastro"
      >
      <tab-content title="Registro da Empresa" icon="ti-briefcase">
        <div class="container form-cadastro-empresa">
          <label for="cnpj">CNPJ Empresa: </label>
          <input v-model="registroEmpresa.cnpj" style="margin-right: 20px; margin-left:8px" placeholder="Digite o CNPJ"/>
           <el-button 
              @click.native.prevent="searchEmpresa">
              Buscar CNPJ
           </el-button>
          <br><br>
          <label for="razaoSocial">Razão Social: </label>
          <input v-model="registroEmpresa.razaoSocial" style="margin-right: 20px; margin-left:8px" :disabled="!this.dadosCarregadosByApi" />
          
          <label for="nomeFantasia">Nome Fantasia: </label>
          <input v-model="registroEmpresa.nomeFantasia" style="margin-right: 20px; margin-left:8px" :disabled="!this.dadosCarregadosByApi" />
          
          <label for="siteEmpresa">Site Empresa </label>
          <input v-model="registroEmpresa.siteEmpresa" style="margin-right: 20px; margin-left:8px" :disabled="!this.dadosCarregadosByApi" />

          <label for="telefoneEmpresa">Telefone Empresa </label>
          <input v-model="registroEmpresa.telefoneEmpresa" style="margin-right: 20px; margin-left:8px" :disabled="!this.dadosCarregadosByApi" />
          
          <label name="emailEmpresa" for="emailEmpresa">Email Empresa </label>
          <input v-model="registroEmpresa.emailEmpresa" style="margin-right: 20px; margin-left:8px" :disabled="!this.dadosCarregadosByApi" />
          
        </div>
      </tab-content>

        <tab-content title="Cadastro de Usuário" icon="ti-id-badge">My second tab content</tab-content>
        <tab-content
          title="Informações Adicionais"
          icon="ti-info"
        >Yuhuuu! This seems pretty damn simple</tab-content>
        <tab-content
          title="Configurações Empresa"
          icon="ti-settings"
        >Yuhuuu! This seems pretty damn simple</tab-content>
        <tab-content
          title="Plano de Assinatura"
          icon="ti-shopping-cart"
        >Yuhuuu! This seems pretty damn simple</tab-content>
      </form-wizard>
    </div>
    <landing-footer backgroundColor="black" class="footer-register" />
  </div>
</template>

<script>
import LandingNavbar from "@/components/layout/LandingNavbar";
import LandingFooter from "@/components/layout/LandingFooter";
import { mapActions, mapState } from "vuex";

export default {
  name: "register",
  components: {
    LandingFooter,
    LandingNavbar,
  },
  data() {
    return {
      dadosCarregadosByApi: false,
      registroEmpresa: {
        cnpj: '',
        razaoSocial: '',
        nomeFantasia: '',
        siteEmpresa: '',
        emailEmpresa: '',
        telefoneEmpresa: ''
      },
    };
  },
  computed: {
    ...mapState('auth', ['dadosEmpresaParaCadastro'])
  },
  created(){
    console.log('this.dadosEmpresaParaCadastro')
    console.log(this.dadosEmpresaParaCadastro)
  },
  methods: {
    onCompleteForm: function () {
      alert("Deu boa isso aqui");
    },
    ...mapActions('auth', ['ActionGetEmpresaCadastro']),
    async searchEmpresa(){
      try{
        await this.ActionGetEmpresaCadastro(this.registroEmpresa.cnpj)
        
        console.log("dadosEmpresaParaCadastro")
        console.log(this.dadosEmpresaParaCadastro)

        this.registroEmpresa.razaoSocial = this.dadosEmpresaParaCadastro.razaoSocial
        this.registroEmpresa.nomeFantasia = this.dadosEmpresaParaCadastro.nomeFantasia
        this.registroEmpresa.siteEmpresa = this.dadosEmpresaParaCadastro.site
        this.registroEmpresa.telefoneEmpresa = this.dadosEmpresaParaCadastro.telefone
        this.dadosCarregadosByApi = true;
        
      }catch(err){
        console.log(err)
        // alert(err.data ? err.data : 'não foi possível fazer login')
      }
    },
  }
}
</script>

<style lang="scss">
$bg: #454545;
$dark_gray: #889aa4;
$light_gray: #eee;
$primary-color: #e25300;

.footer-register {
  height: 70px;
  bottom: 0;
  left: 0;
  margin-top: 44px;
}
.wizard-icon {
  color: gray;
}
.stepTitle {
  color: gray;
}
.register-container {
  margin-top: 6%;
  min-height: calc(100vh - 114px);
  width: 100%;
  //background-color: $bg;
  overflow: hidden;
  border: 3px solid $primary-color;

  .register-form {
    position: relative;
    width: 500vh;
    max-width: 100%;
    padding: 0;
    margin: 0 auto;
    overflow: hidden;
  }
}

.title-container {
  position: relative;

  .title {
    font-size: 26px;
    color: $primary-color;
    margin: 0px auto 20px auto;
    text-align: center;
    font-weight: bold;
  }
}
</style>