<!--
 * @Description: 
 * @Author: Fick
 * @Date: 2019-09-19 09:13:29
 * @LastEditTime: 2019-09-19 09:13:29
 * @LastEditors: Fick
 -->
<template>
  <div class="logo">
    <router-link :to="{name:'dashboard'}">
      <!-- <LogoSvg alt="logo" /> -->
      <svg-icon icon-class="logo"/>
      <h1 v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
import LogoSvg from '@/assets/logo.svg?inline'

export default {
  name: 'Logo',
  components: {
    LogoSvg
  },
  props: {
    title: {
      type: String,
      default: 'Fick Vue Test',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
