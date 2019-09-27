<!--
 * @Description: 数据视图
 * @Author: Fick
 * @Date: 2019-09-19 09:13:29
 * @LastEditTime: 2019-09-27 11:23:27
 * @LastEditors: Fick
 -->
<template>
    <div>
        <a-card :bordered="false">
            <div class="table-page-search-wrapper">
                <a-form layout="inline">
                    <a-row :gutter="48">
                        <a-col :md="8" :sm="12">
                            <a-form-item label="模糊查询字段">
                            <a-input v-model="queryParam.q" placeholder="模糊查询字段"/>
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
                :customRow="rowClick"
            >
            </s-table>
        </a-card>
        <!-- <a-row :gutter="24" >
            
        </a-row> -->
         <a-row :gutter="24" style="margin-top: 20px;" type="flex">
            <a-col :md="15" class="height-200">
                <a-card :bordered="false">
                    <div class="table-page-search-wrapper">
                                
                        <a-row :gutter="48">
                            <a-col :md="8" :sm="12">
                                <span class="table-page-search-submitButtons">
                                        <!--  -->
                                        <a-button type="primary" icon="plus" @click="addSourceRole()" style="margin-right: 20px;">添加行</a-button>
                                    <a-select
                                        :allowClear=true
                                        placeholder="请选择"
                                        @change="handleChange"
                                        style="width: 100%"
                                        v-model="selectVal"
                                    >
                                        <a-select-option v-for="item in filteredOptions" :key="item.k" :value="item.k" >
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
                </a-card>
            </a-col>
            <a-col :md="9">
                <a-card :bordered="false">
                    <a-form layout="vertical">
                        <a-form-item label="视图名称">
                            <a-input placeholder="视图名称" v-model="gridName"/>
                        </a-form-item>
                        <div class="table-operator">
                            <a-form-item label="视图编号">
                                <span>{{gridUnid}}</span>
                            </a-form-item>
                        </div>
                        <div class="table-operator">
                            <a-button type="primary" icon="plus" @click="add()" :disabled="!createDis" >新建</a-button>
                            <a-button type="dashed" icon="form" @click="add()" :disabled="!updateDis">修改</a-button>
                            <a-button type="danger" icon="delete" @click="deleteGrid()" :disabled="!updateDis">删除</a-button>
                        </div>
                    </a-form>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { STable } from '@com'
import {getUserInfo} from '@/api'
import { csMessage } from '@/utils/util'
import { dataView } from '@/public/js/dataView.js'
export default {
    name: 'UserTableList',
    components: {
        STable
    },
    data () {
        return {
            createDis:false,  //新增按钮状态
            updateDis:false,  //修改按钮状态
            selectVal:"",
            inputValue:'',
            gridName:'',
            gridUnid:"-",
            // 查询参数
            queryParam: {
                q:''
            },
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
                    dataIndex: 'dataIndex',
                    customRender:this.dataIndexFormat
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
                    dataIndex: 'customRender',
                    customRender:this.customRenderFormat
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    customRender:this.operationFormat
                },
            ],  
            filteredOptions:dataView,
        }
    },
    methods: {
        /** 删除 */
        deleteGrid(){
            const _this = this;
            if(_this.gridUnid != "-"){
                    _this.$api.deleteGridById({
                    id:_this.gridUnid,
                }).then(res => {
                    if(res.status === 200){
                        csMessage.success(_this);
                        _this.$refs.table.refresh(true);
                        _this.gridUnid = "-";
                        _this.gridName = "";
                        _this.selectedRowKeys = [];
                        _this.loadData2 = [];
                        _this.updateDis = false;
                    }else{
                        csMessage.error(_this);
                    }
                })
            }
            
        },
        /** 新增视图 */
        add(){
            let [...tableData] = this.loadData2;
            tableData.forEach(obj =>{
                obj.visible = false;
                this.selectedRowKeys.forEach(even =>{
                    if(obj.key == even){
                        obj.visible = true;
                    }
                });
            });
            tableData = tableData.sort(this.compareVisible("visible"));
            tableData = tableData.sort(this.compare("number"));  //排序  得到新的数组

            var jsonData = JSON.stringify(tableData);   // var databb = JSON.parse(jsonData);
            const _this = this;
            if(_this.gridUnid == "-"){
                //新增
                this.$api.saveGrid({
                    name:this.gridName,
                    gridColumn:jsonData
                }).then(res => {
                    if(res.status === 200){
                        csMessage.success(_this);
                        _this.$refs.table.refresh(true);
                        _this.gridUnid = res.item;
                    }else{
                        csMessage.error(_this);
                    }
                })
            }else{
                //修改
                this.$api.updateGrid({
                    id:_this.gridUnid,
                    name:this.gridName,
                    gridColumn:jsonData
                }).then(res => {
                    if(res.status === 200){
                        csMessage.success(_this);
                        _this.$refs.table.refresh(true);
                    }else{
                        csMessage.error(_this);
                    }
                })
            }   
        },
        compareVisible(property) {
            return function (a, b) {
                var value1 = a[property] == true ? 0 : 1;
                var value2 = b[property] == true ? 0 : 1;
                return value1 - value2;
            }
        },
        /**自定义函数排序   */
        compare(property) {
            return function (a, b) {
                var value1 = a[property];
                var value2 = b[property];
                if(isNaN(value1)){
                    value1 = 100000000
                }
                if(isNaN(value2)){
                    value2 = 100000000
                }
                return value1 - value2;
            }
        },
        /** 表格行点击事件 */
        rowClick(record){
            return {
                on: {
                    click: () => {
                        this.createDis=false,  //新增按钮状态
                        this.updateDis=true,  //修改按钮状态
                        this.selectedRowKeys = [];
                        this.gridName = record.name;
                        this.gridUnid = record.id
                        let tableData = JSON.parse(record.gridColumn);
                        
                        tableData.forEach(obj =>{
                            if(obj.visible){
                                this.selectedRowKeys.push(obj.key);
                            }
                        });
                        this.selectVal = tableData[0].uri+"/metadata"
                        this.$api.getGridUrl({
                            url:this.selectVal
                        }).then(res => {
                            res.forEach((even) => {
                                let isExis = false;
                                tableData.forEach((obj) => {
                                    if(even.dataIndex == obj.dataIndex){
                                        isExis = true;
                                    }
                                });
                                if(!isExis){
                                    even["key"] = tableData[tableData.length-1].key+1;
                                    tableData.push(even);
                                }
                            });
                        })
                        this.loadData2 = tableData;
                    }
                }
            }
        },
        onSelectChange (selectedRowKeys,row) {
            this.selectedRowKeys = selectedRowKeys
        },  
        /** select 选择事件 */
        handleChange(selectedItems) {
            this.createDis=true,  //新增按钮状态
            this.updateDis=false,  //修改按钮状态

            this.selectedRowKeys = [];
            this.gridName = "";
            this.gridUnid = "-";

            if(selectedItems){
                this.$api.getGridUrl({
                    url:selectedItems
                }).then(res => {
                    res.forEach((obj,i) => {
                        obj["key"] = i+1;
                    });
                    res.push({
                        key:res[res.length-1].key+1,
                        dataIndex: "operation",
                        horizontalAlign: "left",
                        title: "操作",
                        verticalAlign: "center",
                        customRender:'operationFormat'
                    });
                    this.loadData2 = res;
                })
            }
        },
        /**数据视图添加行 */
        addSourceRole(){
            if(this.loadData2.length > 0){
                this.loadData2.push({
                    key:this.loadData2[this.loadData2.length-1].key+1,
                    dataIndex: "undefined",
                    horizontalAlign: "left",
                    title: "undefined",
                    verticalAlign: "center",
                    customRender:'undefined'
                })
            }
        },
        dataIndexFormat(text, row, index){
            var data = text;
            if(!data){
                data = "undefined";
            }
            return (
                <a-popconfirm okText="确认" cancelText="取消" onConfirm={(e) => {
                    row.dataIndex = this.inputValue;
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
                row.number = data = "undefined";
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
        customRenderFormat(text, row, index){
            var data = text;
            if(!data){
                row.customRender = data = "undefined";
            }
            return (
                <a-popconfirm okText="确认" cancelText="取消" onConfirm={(e) => {
                    row.customRender = this.inputValue;
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
        operationFormat(text, row, index){
            const _this = this;
            return (
                    <a-button type="danger" icon="delete" onClick={() => {
                        console.log(row)
                        console.log("this.loadData2",this.loadData2)
                        _this.loadData2.forEach((obj,i) =>{
                            if(row.key === obj.key){
                                _this.loadData2.splice(i,1);
                            }
                        })
                    }}>删除</a-button>
                )
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
