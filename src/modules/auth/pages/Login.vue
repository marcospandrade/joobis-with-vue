<template>
  <div class="login-container">
    <LandingNavbar></LandingNavbar>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Bem vindo ao Joobis Analytics</h3>
      </div>

      <el-form-item prop="email_usuario">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="email_usuario"
          v-model="loginForm.email_usuario"
          placeholder="Digite seu email"
          name="email_usuario"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip
        v-model="capsTooltip"
        content="A tecla CapsLock está ativada"
        placement="right"
        manual
      >
        <el-form-item prop="senha_usuario">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="senha_usuario"
            v-model="loginForm.senha_usuario"
            :type="passwordType"
            placeholder="Digite sua senha"
            name="senha_usuario"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="submit"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="submit"
      >Login</el-button>

      <el-row :gutter="20" style="position:relative; margin-bottom: 30px">
        <el-col style="text-align:left" :span="12">
          <router-link to="/registrar">
            <el-button>Registre-se agora</el-button>
          </router-link>
        </el-col>
        <el-col style="text-align:right" :span="12">
          <el-button @click="showDialog=true">Ou conecte-se com</el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business simulation! ! !
      <br />
      <br />
      <br />
      <social-sign />
    </el-dialog>
    <landing-footer backgroundColor="black" class="footer-login" />
  </div>
</template>

<script>
import { validEmail } from "@/utils/validate";
import LandingNavbar from "@/components/layout/LandingNavbar";
import LandingFooter from "@/components/layout/LandingFooter";
import { mapActions } from "vuex";

export default {
  name: "login",
  components: {
    LandingNavbar,
    LandingFooter,
  },
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!validateEmail(value)) {
        callback(new Error("Please enter the correct email"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        email_usuario: "",
        senha_usuario: "",
      },
      loginRules: {
        email_usuario: [{ required: true, trigger: "blur", validator: validEmail }],
        senha_usuario: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.email_usuario === "") {
      this.$refs.email_usuario.focus();
    } else if (this.loginForm.senha_usuario === "") {
      this.$refs.senha_usuario.focus();
    }
  },
  methods: {
    ...mapActions('auth', ['ActionDoLogin']),
    async submit(){
      try{
        await this.ActionDoLogin(this.loginForm)

        this.$router.push({ name: 'dashboard' })
      }catch(err){
        console.log(err)
        // alert(err.data ? err.data : 'não foi possível fazer login')
      }
    },
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.senha_usuario.focus();
      });
    },
    /*handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery,
              });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },*/
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
  },
};
</script>

<style lang="scss">
$bg: #454545;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #454545;
$dark_gray: #889aa4;
$light_gray: #eee;
$primary-color: #e25300;

.footer-login {
  height: 70px;
  bottom: 0;
  left: 0;
  margin-top: 44px;
}

.login-container {
  min-height: calc(100vh - 70px);
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
  .el-button:hover {
    color: $primary-color !important;
    border-color: rgb(210, 83, 10) !important;
  }
}
</style>