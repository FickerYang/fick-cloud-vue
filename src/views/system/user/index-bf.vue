<!--
 * @Description: 
 * @Author: Fick
 * @Date: 2019-09-19 09:13:29
 * @LastEditTime: 2019-09-24 14:35:54
 * @LastEditors: Fick
 -->
<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="4" :sm="12">
            <a-form-item label="规则编号">
              <a-input v-model="queryParam.id" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="12">
            <a-form-item label="使用状态">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="12">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
        <a-row :gutter="48">
          <template v-if="advanced">
            <a-col :md="4" :sm="12">
              <a-form-item label="调用次数">
                <a-input-number v-model="queryParam.callNo" style="width: 100%"/>
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="12">
              <a-form-item label="更新日期">
                <a-date-picker v-model="queryParam.date" style="width: 100%" placeholder="请输入更新日期"/>
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="12">
              <a-form-item label="使用状态">
                <a-select v-model="queryParam.useStatus" placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="12">
              <a-form-item label="使用状态">
                <a-select placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
        </a-row>
      </a-form>
    </div>
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="add()">新建</a-button>
      <a-button type="dashed" icon="form" @click="update()">修改</a-button>
      <a-button type="danger" icon="delete" @click="deleteFun()">删除</a-button>
    </div>

    <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        :alert="options.alert"
        :rowSelection="options.rowSelection"
        :customRow="rowClick"
    >
    </s-table>
    <!-- 模态框 -->
    <a-modal
      v-model="modelVisible"
      width="60%"
      title = "添加用户"
      destroyOnClose
      :footer="null"
    >
      <add v-bind:data="dataOne" @submitFunc = "performOperation"/>
    </a-modal>
  </a-card>
</template>

<script>
import { STable } from '@com'
import {getUserInfo} from '@/api'
import add from './add'
import { formatDate,csMessage } from '@/utils/util'
export default {
    name: 'UserTableList',
    components: {
        STable,add
    },
    data () {
        return {
            /**模态框 */
            modelVisible:false,
            destroyOnClose:true,
            // 高级搜索 展开/关闭
            advanced: false,
            key:'aafasd',
            // 查询参数
            queryParam: {},
            selectedRowKeys: [],
            selectedRows: [],
            dataOne:{},
            options: {
                alert: { show: false, clear: () => { this.selectedRowKeys = [] } },
                rowSelection: {
                    selectedRowKeys: this.selectedRowKeys,
                    onChange: this.onSelectChange
                }
            },
            loadData: parameter => {
                return this.$api.getUserList(Object.assign(parameter, this.queryParam)).then(res => {
                    return res.item;
                })
            },
            columns: [
                {
                    title: '用户名',
                    dataIndex: 'userName',
                    align:null, //'left' | 'right' | 'center'
                    customRender:null
                },
                {
                    title: '姓名',
                    dataIndex: 'nickName'
                },
                {
                    title: '账号是否启用',
                    dataIndex: 'enabled',
                    customRender:this.enabledFormat
                },
                {
                    title: '账号是否锁定',
                    dataIndex: 'accountNonLocked',
                    customRender:this.accountNonLockedFormat
                },
                {
                    title: '手机号码',
                    dataIndex: 'mobile'
                },
                {
                    title: '邮箱',
                    dataIndex: 'email'
                },
                {
                    title: '最后一次登录IP',
                    dataIndex: 'lastLoginIp'
                },
                {
                    title: '最后一次登录时间',
                    dataIndex: 'lastLoginDate',
                    customRender:this.lastLoginDateFormat
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    customRender:this.operationFormat
                },
            ],      
        }
    },
    created () {
    },
    methods: {
      /**进入 修改界面 */
      update(){
        debuger;
        let selectedRowKeys =  this.selectedRowKeys;
        if(selectedRowKeys.length != 1 ){
            csMessage.warningCustom(this);
          return;
        }
        this.$api.getUserById({
            id:selectedRowKeys[0]
        }).then(res => {
          if(res.status === 200){
            this.dataOne = {...res.item};
            this.modelVisible = true;
          }
        })
      },
      /** 进入新增页面 */
      add(){
        this.dataOne = {};
        this.modelVisible = true;
      },
      /** [执行新增] 或者 [修改操作] */
      performOperation(value){
        const user = {...value}
        const _this = this;
        if(user.id){
          //修改
          this.$api.updateSystemUser(user).then(res => {
            if(res.status === 200){
              csMessage.success(_this);
              this.modelVisible = false;
            }else{
              csMessage.error(_this);
            }
          })
        }else{
          //新增
          this.$api.addSystemUser(user).then(res => {
            if(res.status === 200){
              csMessage.success(_this);
              this.modelVisible = false;
            }else{
              csMessage.error(_this);
            }
          })
        }
      },
      /** 删除校验 */
      deleteFun(){
        let selectedRowKeys =  this.selectedRowKeys;
        if(selectedRowKeys.length != 1 ){
            csMessage.warningCustom(this);
          return;
        }
        const _this = this;
        _this.$confirm({
          title: '确定要删除以下数据吗?',
          content: function(){
            let text = "";
            _this.selectedRows.forEach(elemt => {
              text+=elemt.userName + ",";
            });
            text = text.substr(0, text.length - 1);  
            return text;
          },
          closable:true,
          maskClosable:true,
          okText: '删除',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
            //执行删除。
            _this.$api.deleteSystemUser({
                ids: _this.selectedRowKeys.join(",")
            }).then(res => {
              if(res.status === 200){
                csMessage.success(_this);
                _this.$refs.table.refresh(true);
              }else{
                csMessage.error(_this);
              }
            })
          },
        });
      },
      /** 左侧check */
      onSelectChange (selectedRowKeys,selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      },
      /** 为了处理 点击表格 check 选中效果 */
      rowClick(record){
        return {
          on: {
            click: () => {
              if(this.selectedRowKeys.indexOf(record.id) >= 0){
                this.selectedRowKeys.splice(this.selectedRowKeys.findIndex(item => item === record.id), 1)
                this.selectedRows.splice(this.selectedRows.findIndex(item => item === record.id), 1)
              }else{
                this.selectedRowKeys.push(record.id);
                this.selectedRows.push(record);
              }
              this.options = {
                rowSelection: {
                    selectedRowKeys: this.selectedRowKeys,
                    onChange: this.onSelectChange
                  }
              }
            }
          }
        }
      },
      toggleAdvanced () {
          this.advanced = !this.advanced
      },
      operationFormat(text, row, index){
        let id = row.id;
       return (
         <div class="table-operator">
          <a-button type="dashed" click="update()" icon="form">修改</a-button>
          <a-button type="danger" icon="delete">删除</a-button>
         </div>
         )
      },
      accountNonLockedFormat(text, row, index){
        if(text){
          return (<a-tag color="red">锁定</a-tag>)
        }else{
          return (<a-tag color="cyan">正常</a-tag>)
        }
      },
      enabledFormat(text, row, index){
        if(text){
          return (<a-tag color="cyan">正常</a-tag>)
        }else{
          return (<a-tag color="red">未启用</a-tag>)
        }
      },
      /** 时间格式化 */
      lastLoginDateFormat(text, row, index){
          return formatDate(new Date(text));
      }
    }
}
</script>
<style lang="scss">
    .table-operator {
        margin-bottom: 18px;
        button {
            margin-right: 8px;
        }
    }
</style>
