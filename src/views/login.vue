<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="_full_inner">
    <!--登录部分-->
    <div class="login-up">
      <img src="../assets/images/logo_circle.png">
    </div>

    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" v-model="tel" :placeholder="$t('login.tel')"/>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <input class="weui-input" type="password" v-model="psw" :placeholder="$t('login.pwd')"/>
        </div>
      </div>
    </div>

    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:" id="showTooltips" v-on:click="signIn">
        {{ $t("login.sign-in") }}</a>
    </div>

    <!--<div>-->
    <!--<a>{{ $t("login.forgot-pwd") }}</a>-->
    <!--</div>-->

    <!--<div>-->
    <!--<a>{{ $t("login.register") }}</a>-->
    <!--</div>-->

    <loading :showLoading="showLoading" :content="loadingContent"></loading>
  </div>
</template>

<script>
  import loading from '../components/loading.vue'
  import {MD5} from 'assets/js/MD5'
  import * as constants from 'assets/js/constants'
  import {mapActions} from 'vuex'

  export default {
    name: 'p_login', // 登录
    data () {
      return {
        showLoading: false,
        loadingContent: '登录中',
        tel: '18610935308',
        psw: '654123'
      }
    },
    methods: {
      ...mapActions(['setShowHeadAndFoot']),
      signIn: function () {
        // @加载语言配置文件
        let loginVue = this
        loginVue.showLoading = true
        console.log('login with : ' + this.tel + ' --- ' + this.psw)
        let bodyObj = {'username': this.tel, 'password': MD5(this.psw)}
        // start sign in
        let body = JSON.stringify(bodyObj)
        let url = constants.DEFAULT_SERVER + '/fauth/api/v2/auth/login'
        window.$.ajax({
          type: 'post',
          dataType: 'json',
          url: url,
          data: body,
          success: function (data) {
            console.log(data)
            loginVue.showLoading = false
            if (data && data.code === 200) {
              window.localStorage.setItem(constants.TOKEN, data.content.token)
              window.localStorage.setItem(constants.USER_ID, data.content.user_id)
              loginVue.$router.replace('/devices')
              loginVue.setShowHeadAndFoot(true)
              loginVue.$store.dispatch('getDevices')
            } else {

            }
          },
          error: function (xhr, type) {
            loginVue.showLoading = false
          }
        })
      }
    },
    components: {
      loading
    },
    mounted () {
    },
    created () {
    }
  }
</script>

<style scoped>
  .login-up {
    position: relative;
    height: 40%;
    width: 100%;
  }

  img {
    position: absolute;
    width: 142px;
    height: 142px;
    top: 50%;
    left: 50%;
    margin-left: -71px;
    margin-top: -71px;
  }

  input {
    display: block;
  }
</style>
