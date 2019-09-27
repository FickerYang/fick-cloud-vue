<!--
 * @Description: 数据视图
 * @Author: Fick
 * @Date: 2019-09-19 09:13:29
 * @LastEditTime: 2019-09-25 17:38:40
 * @LastEditors: Fick
 -->
<template>
    <div>
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
                            <span class="table-page-search-submitButtons">
                            <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                            </span>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
            <s-table
                ref="table"
                size="default"
                rowKey="id"
                :columns="columns"
                :data="loadData"
            >
            </s-table>
        </a-card>
        <div style="height:20px;"></div>
        <a-col :span="12">
<a-card :bordered="false">
                <div class="table-page-search-wrapper">
                    <a-row :gutter="48">
                        <a-col :md="4" :sm="12">
                            <span class="table-page-search-submitButtons">
                                    <!--  -->
                                <a-select
                                    :allowClear=true
                                    placeholder="请选择"
                                    @change="handleChange"
                                    style="width: 100%"
                                >
                                    <a-select-option v-for="item in filteredOptions" :key="item.k" :value="item.k">
                                        {{item.v}}
                                    </a-select-option>
                                </a-select>
                            </span>
                        </a-col>
                    </a-row>
                </div>
                <a-table field
                    :columns="columns2" 
                    :dataSource="loadData2" 
                    bordered
                    :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" 
                >
                </a-table>
              <!-- <a-col :span="12">
                    <a-form>
                        <a-form-item label="用户名" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                            <a-input placeholder="用户名" />
                        </a-form-item>
                    </a-form>
              </a-col> -->
        </a-card>
        </a-col>
        <a-col :span="1"></a-col>
        <a-col :span="12">
<a-card :bordered="false" :span="12">
                <div class="table-page-search-wrapper">
                    <a-row :gutter="48">
                        <a-col :md="4" :sm="12">
                            <span class="table-page-search-submitButtons">
                                    <!--  -->
                                <a-select
                                    :allowClear=true
                                    placeholder="请选择"
                                    @change="handleChange"
                                    style="width: 100%"
                                >
                                    <a-select-option v-for="item in filteredOptions" :key="item.k" :value="item.k">
                                        {{item.v}}
                                    </a-select-option>
                                </a-select>
                            </span>
                        </a-col>
                    </a-row>
                </div>
                <a-table field
                    :columns="columns2" 
                    :dataSource="loadData2" 
                    bordered
                    :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" 
                >
                </a-table>
              <!-- <a-col :span="12">
                    <a-form>
                        <a-form-item label="用户名" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                            <a-input placeholder="用户名" />
                        </a-form-item>
                    </a-form>
              </a-col> -->
        </a-card>
        </a-col>
        
    </div>
</template>

<script>
import { STable } from '@com'
import {getUserInfo} from '@/api'
import { formatDate,csMessage } from '@/utils/util'
export default {
    name: 'UserTableList',
    components: {
        STable
    },
    data () {
        return {
            inputValue:'',
            // 查询参数
            queryParam: {},
            loadData: parameter => {
                return this.$api.getGridList(Object.assign(parameter, this.queryParam)).then(res => {
                    return res.item;
                })
            },
            selectedRowKeys:[],
            loadData2:[],
            columns: [
                {
                    title: '编号',
                    dataIndex: 'id'
                },
                {
                    title: '名称',
                    dataIndex: 'name'
                }
            ],
            columns2:[
                {
                    title: '字段代码',
                    dataIndex: 'field',
                    customRender:this.fieldFormat
                },
                {
                    title: '字段名称',
                    dataIndex: 'title',
                    customRender:this.titleFormat
                },
                {
                    title: '显示顺序',
                    dataIndex: 'number',
                    customRender:this.numberFormat
                },
                {
                    title: '函数事件',
                    dataIndex: 'formatter',
                    customRender:this.formatterFormat
                },
            ],  
            filteredOptions:[
                {k:"/system/user/metadata",v:"用户管理"},
                {k:2,v:"bb"},
            ] ,
        }
    },
    methods: {
        onSelectChange (selectedRowKeys,row) {
            console.log('selectedRowKeys changed: ', row);
            this.selectedRowKeys = selectedRowKeys
        },  
        handleChange(selectedItems) {
            console.log("selectedItems",selectedItems)
            if(selectedItems){
                this.$api.getGridUrl({
                    url:selectedItems
                }).then(res => {
                    res.forEach(obj => {
                        obj["key"] = new Date().getTime()+"-"+obj.field;
                    });
                    this.loadData2 = res;
                })
            }
        },
        fieldFormat(text, row, index){
            var data = text;
            if(!data){
                data = "undefined";
            }
            return (
                <a-popconfirm okText="确认" cancelText="取消" onConfirm={(e) => {
                    row.field = this.inputValue;
                    this.inputValue = "";
                }}>
                    <template slot="title">
                        <a-input v-model={this.inputValue}/>
                    </template>
                    <a onClick={()=>{
                        this.inputValue = data;
                    }}>{data}</a>
                </a-popconfirm>
            )
        },
        titleFormat(text, row, index){
            var data = text;
            if(!data){
                data = "undefined";
            }
            return (
                <a-popconfirm okText="确认" cancelText="取消" onConfirm={(e) => {
                    row.title = this.inputValue;
                    this.inputValue = "";
                }}>
                    <template slot="title">
                        <a-input v-model={this.inputValue}/>
                    </template>
                    <a onClick={()=>{
                        this.inputValue = data;
                    }}>{data}</a>
                </a-popconfirm>
            )
        },
        numberFormat(text, row, index){
            var data = text;
            if(!data){
                data = "undefined";
            }
            return (
                <a-popconfirm okText="确认" cancelText="取消" onConfirm={(e) => {
                    row.number = this.inputValue;
                    this.inputValue = "";
                }}>
                    <template slot="title">
                        <a-input v-model={this.inputValue}/>
                    </template>
                    <a onClick={()=>{
                        this.inputValue = data;
                    }}>{data}</a>
                </a-popconfirm>
            )
        },
        formatterFormat(text, row, index){
            var data = text;
            if(!data){
                data = "undefined";
            }
            return (
                <a-popconfirm okText="确认" cancelText="取消" onConfirm={(e) => {
                    row.formatter = this.inputValue;
                    this.inputValue = "";
                }}>
                    <template slot="title">
                        <a-input v-model={this.inputValue}/>
                    </template>
                    <a onClick={()=>{
                        this.inputValue = data;
                    }}>{data}</a>
                </a-popconfirm>
            )
        },
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
