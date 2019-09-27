<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <div class="icons-container">
        <p>点击完成复制</p>
        <div class="icons-wrapper">
        <div v-for="item of iconsMap" :key="item" @click="handleClipboard(generateIconCode(item),$event)">
            <!-- <span placement="top"> -->
            
            <div class="icon-item">
                <svg-icon :icon-class="item" class-name="disabled" /><br/>
                <span>{{ item }}</span>
            </div>
            <div slot="content" v-if=false>
                {{ generateIconCode(item) }}
            </div>
            <!-- </span> -->
        </div>
        </div>
    </div>
  </a-card>
</template>

<script>
import icons from './requireIcons'
import clipboard from '@/utils/clipboard'
export default {
  name: 'Icons',
  data() {
      return{
          iconsMap: icons
      }
  },
  mounted(){
    //   console.log("bbbb",this.iconsMap)
  },
  methods: {
    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}" />`
    },
    handleClipboard(text, event) {
      clipboard(text, event)
    }
  }
}
</script>
<style lang="less">
.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;
  .icons-wrapper {
    margin: 0 auto;
  }
  .icon-item {
    margin: 20px;
    height: 110px;
    text-align: center;
    width: 110px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }
  span {
    display: block;
    font-size: 24px;
    margin-top: 10px;
  }
  .disabled{
    pointer-events: none;
  }
}
</style>

