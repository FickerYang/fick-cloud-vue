<template>
  <div class="user-wrapper">
    <div class="content-box">
      <!-- <a href="http://www.baidu.com" target="_blank">
        <span class="action">
          <a-icon type="question-circle-o"></a-icon>
        </span>
      </a> -->
            
      <!-- Setting Drawer (show in development mode) -->
      <!-- <setting-drawer v-if="!production"></setting-drawer> -->
      

      <notice-icon class="action"/>

      <!-- 换肤设置 -->
      <span class="action" @click="settingClick" title="皮肤设置">
          <svg-icon icon-class="setup"></svg-icon>
          <setting-drawer ref="setting"></setting-drawer>
      </span>
      <!-- 国际化 -->
      <!-- <span class="action" @click="languageClick" title="语言">
        <svg-icon icon-class="language" />
      </span> -->
      <a-dropdown>
        <span class="action"  title="语言">
          <svg-icon icon-class="language" />
        </span>
        <a-menu slot="overlay" >
          <a-menu-item>
            <a href="javascript:;" @click="changeAppLocale('zh')">
              <span>简体中文</span>
            </a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;" @click="changeAppLocale('en')">
              <span>English</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>

      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-avatar class="avatar" size="small" :src="avatar()"/>
          <span>{{ nickname() }}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="0">
            <router-link :to="{ name: 'center' }">
              <a-icon type="user"/>
              <span>个人中心</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="1">
            <router-link :to="{ name: 'settings' }">
              <a-icon type="setting"/>
              <span>账户设置</span>
            </router-link>
          </a-menu-item>
          <!-- <a-menu-item key="2" disabled>
            <a-icon type="setting"/>
            <span>测试</span>
          </a-menu-item> -->
          <a-menu-divider/>
          <a-menu-item key="3">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout"/>
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import NoticeIcon from '@com/NoticeIcon'
import { mapActions, mapGetters } from 'vuex'
import config from '@/config/defaultSettings'
import SettingDrawer from '@com/SettingDrawer'

export default {
  name: 'UserMenu',
  components: {
    NoticeIcon,
    SettingDrawer
  },
  data () {
    return {
      production:false
      // production: config.production
    }
  },
  methods: {
    ...mapActions('admin',{
      Logout:'Logout',
      Locale:'ToggleLocale'
    }),
    ...mapGetters(['nickname', 'avatar']),
    handleLogout () {
      const that = this
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk () {
          return that.Logout({}).then(() => {
            window.location.reload()
          }).catch(err => {
            that.$message.error({
              title: '错误',
              description: err.message
            })
          })
        },
        onCancel () {
        }
      })
    },
    /**多语言 */
    changeAppLocale(even){   
      this.Locale(even);
    },
    settingClick(){
      this.$refs.setting.updateSwitch();
    }
  }
}
</script>
