<!--
 * @Description: 
 * @Author: Fick
 * @Date: 2019-09-19 09:13:29
 * @LastEditTime: 2019-09-19 11:23:27
 * @LastEditors: Fick
 -->
<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <svg-icon icon-class="guide 2" />
      <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <a-tab-pane key="tab1" tab="账号密码登录">
          <a-form-item>
              <a-input size="large" type="text" placeholder="账户" v-decorator="['username',rule.username]">
                <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
              </a-input>
         
          </a-form-item>

          <a-form-item>
            <a-input size="large" type="password" placeholder="密码" v-decorator="['password',rule.password]">
                <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
              </a-input>
          </a-form-item>
        </a-tab-pane>
      </a-tabs>

      <a-form-item>
        <a-checkbox v-decorator="['rememberMe']">自动登录</a-checkbox>
        <a class="forge-password" style="float: right;" href="javascript:void(0);">忘记密码</a>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button size="large" type="primary" htmlType="submit" class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >确定</a-button>

      </a-form-item>

      <div class="user-login-other">
        <span>其他登录方式</span>
        <a>
          <a-icon class="item-icon" type="alipay-circle"></a-icon>
        </a>
        <a>
          <a-icon class="item-icon" type="taobao-circle"></a-icon>
        </a>
        <a>
          <a-icon class="item-icon" type="weibo-circle"></a-icon>
        </a>
        <a href="javascript:void(0);" class="register">注册账户</a>
        <!-- <router-link class="register" :to="{ name: 'register' }">注册账户</router-link> -->
      </div>
    </a-form>

    <two-step-captcha
      v-if="requiredTwoStepCaptcha"
      :visible="stepCaptchaVisible"
      @success="stepCaptchaSuccess"
      @cancel="stepCaptchaCancel"
    ></two-step-captcha>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
export default {
  data () {
    return {
        customActiveKey: 'tab1',
        form : this.$form.createForm(this),
        requiredTwoStepCaptcha: false,
        state: {
            time: 60,
            loginBtn: false,
            loginType: 0,
            smsSendBtn: false
        },
        rule: {
          username: {
            rules:[
              {required:true,message:'请输入用户名',validator(rule, value, callback){
                  if(!value||value.includes("请输入")){
                    callback(false)
                  }else{
                    callback()
                  }
                }
              }
            ],
            initialValue:'admin',
          },
          password: {
            rules:[
              {required:true,message:'请输入密码'}
            ],
            initialValue:'123456',
          }
        }
    }
  },
  beforeCreate () {
    
  },
  created () {

  },
  methods: {
    ...mapActions({
      Login:'admin/Login'
    }),
    handleUsernameOrEmail (rule, value, callback) {
      const { state } = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },
    /** 登录 */
    handleSubmit(e){
      e.preventDefault();
      const {
        state,
        Login
      } = this
      state.loginBtn = true;
      this.form.validateFields((err, values) => {
        if (!err) {
          //验证成功
          let loginParams = {};
          loginParams.username= values.username;
          loginParams.password = values.password;
          loginParams.grant_type = "password";
          loginParams.scope = "all";
          Login(loginParams)
            .then((res) => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
          })
        }else{
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      });
    },
    handleTabClick(key){
      this.customActiveKey = key
    },
    loginSuccess(res){
      // this.$router.push({ name: 'dashboard' })
      this.$router.push({ name: '/' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      }, 1000)

    },
    requestFailed (err) {
      this.$notification['error']({
        message: '错误',
        //description: err.msg || '请求出现错误，请稍后再试',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        description:'请求出现错误，请稍后再试',
        duration: 4
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
