<template>
    <a-layout id="components-layout-demo-fixed-sider">
        <a-layout-sider v-model="collapsed" @mouseover="scrollbarHover()" @mouseout="scrollbarOut()">
            <side-menu
                mode="inline"
                :menus="menus"
                :theme="theme"
                :collapsed="collapsed"
                :collapsible="true"
            ></side-menu>
        </a-layout-sider>
        <a-layout>
            <GeminiScrollbar :style="{height:scrollbarHeight}">
                <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
                    <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
                        <router-view/>
                    </div>
                </a-layout-content>
        </GeminiScrollbar>
        </a-layout>
    </a-layout>
    
</template>
<script>
import SideMenu from '@com/Menu/SideMenu'
import { mapState } from 'vuex'
export default {
    data () {
        return {
            scrollbarHeight:'80%',
            collapsed: true,
            menus: [],
            theme:"dark",
        }
    },
    components: {
        SideMenu
    },
    computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.admin.permission.addRouters
    }),
  },
    methods: {
        /**鼠标移入 */
        scrollbarHover(){
            this.collapsed = false;
        },
        /**鼠标移出 */
        scrollbarOut(){
           this.collapsed = true;
        },
    },
    created(){
        this.$router.push('/ccc');
        const _this = this;
        setTimeout(() => {
            _this.scrollbarHeight = '100%'
        }, 10);

        //菜单数据处理
        // this.menus = this.mainMenu.find(item => item.path === '/').children
        this.menus = this.mainMenu
        // this.menus = [];
        this.collapsed = !this.sidebarOpened
    }
}
</script>

<style lang="scss" scoped>
.my-scroll-bar{
    // height:200px;
}
</style>
