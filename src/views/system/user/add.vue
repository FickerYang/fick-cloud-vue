<!--
 * @Description: 用户管理-新增 修改
 * @Author: Fick
 * @Date: 2019-09-19 09:13:29
 * @LastEditTime: 2019-09-25 10:03:42
 * @LastEditors: Fick
 -->
<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item>
      <a-input placeholder="ID" v-decorator="['id',user.id]" type="hidden"/>
    </a-form-item>
    <a-form-item label="用户名" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-input placeholder="用户名" v-decorator="['userName',user.userName]"  />
    </a-form-item>
    <a-form-item label="姓名" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-input placeholder="姓名"  v-decorator="['nickName',user.nickName]"/>
    </a-form-item>
    <a-form-item label="性别" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-radio-group name="radioGroup" v-decorator="['sex',user.sex]">
        <a-radio :value="0">男</a-radio>
        <a-radio :value="1">女</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="手机号码" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-input placeholder="手机号码" v-decorator="['mobile',user.mobile]"/>
    </a-form-item>
    <a-form-item label="邮箱" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-input placeholder="邮箱" v-decorator="['email',user.email]"/>
    </a-form-item>
    <a-form-item label="账号是否启用" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-switch v-decorator="['enabled',user.enabled]" :defaultChecked="user.enabled.initialValue" checkedChildren="启用" unCheckedChildren="未启用">
      </a-switch>
    </a-form-item>
    <a-form-item label="账号是否锁定" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-switch v-decorator="['accountNonLocked',user.accountNonLocked]"  checkedChildren="锁定" unCheckedChildren="未锁定">
      </a-switch>
    </a-form-item>
    <a-form-item label="备注信息" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-textarea placeholder="备注信息" v-decorator="['remarks',user.remarks]" :autosize="{ minRows: 3}" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit">保存</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  props:{
    data:{
      type:Object,
      default:{}
    }
  },
  data () {
    const _this = this;
    return {
      form: this.$form.createForm(this),
      user:{
        id:{
          initialValue:this.data.id,
        },
        userName:{
          validateTrigger: [ 'blur'],
          rules:[
            {
              required:true,
              message:'请输入用户名',
            },
            {
              validator(rule, value, callback){
                if(!value||value.includes("请输入")){
                  callback(false)
                }else{
                  _this.$api.getByUserName({
                    id:_this.user.id.initialValue,
                    userName:value.trim()
                  }).then(res => {
                    if(res.status === 200){
                      if(!res.item){
                        callback("用户名已经被使用！")
                      }
                      callback()
                    }else{
                      callback("用户名校验失败,联系管理员!")
                    }
                  })
                }
              }
            }
          ],
          initialValue:this.data.userName,
        },
        nickName:{
          rules:[
            {
              required:true,
              message:'请输入用户名',
            }
          ],
          initialValue:this.data.nickName,
        },
        sex:{
          rules:[
            {
              required:true,
              message:'请选择性别',
            }
          ],
          initialValue:this.data.sex,
        },
        mobile:{
          initialValue:this.data.mobile,
        },
        email:{
          rules: [
            {
              type: 'email', message: '请输入正确邮箱！',
            }, 
            // {
            //   required: true, message: 'Please input your E-mail!',
            // }
          ],
          initialValue:this.data.email,
        },
        enabled:{
          rules:[
            {required:true,}
          ],
          initialValue:this.data.enabled == null ? true : this.data.enabled,
        },
        accountNonLocked:{
          rules:[
            {required:true,}
          ],
          initialValue:this.data.accountNonLocked == null ? false : this.data.accountNonLocked,
        },
        remarks:{
          initialValue:this.data.remarks,
        }
      }
    };
  },
  created () {
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          // console.log("values",values)
           this.$emit('submitFunc',values);
        }else{
          console.err('user add err: ', values);
        }
      });
    },
    enabledOnChange(checked){
      console.log(`a-switch to ${checked}`);
    }
  },
  
};
</script>