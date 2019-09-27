<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-locale-provider>
</template>

<script>
import { mapState, mapActions,mapGetters } from 'vuex'
import {
  DEFAULT_LOCALE,
} from '@/store/mutation-types'
import util from '@/utils/util'

import zh  from 'ant-design-vue/lib/locale-provider/zh_CN';
import en from 'ant-design-vue/lib/locale-provider/en_GB';
import moment from 'moment'
import 'moment/locale/zh-cn';
export default {
  name: 'app',
  components: {},
  data () {
    return {
      locale:null,
    }
  },
  computed: {
    ...mapGetters({
          localeState:'locale'
    }),
  },
  watch: {
    localeState(localeval){
      this.$i18n.locale=localeval;
      if(localeval === "zh"){
        // moment.locale('zh-cn');
        this.locale = zh
      }else if(localeval === "en"){
        // moment.locale('zh-cn');
        this.locale = en
      }
      
    }
  },
  created(){
    let localeval = util.cookies.get(DEFAULT_LOCALE);
    if(localeval){
      if(localeval === "zh"){
        // moment.locale('zh-cn');
        this.locale = zh
      }else if(localeval === "en"){
        // moment.locale('zh-cn');
        this.locale = en
      }
    }
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
