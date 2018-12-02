<template>
  <div class="container">
    <view class="section">
      <textarea v-model="text" placeholder="请留下您的宝贵意见或建议，我们将努力改进(不少于5个字)" auto-focus />
      <input v-model="phone" type="number" placeholder="请留下手机号码，以便我们回复您"/>
    </view>
    <button type="primary" @click="ok">完成</button>
    <i-toast id="toast" />
  </div>
</template>

<script>
import {addSysFeedBack} from '@/api/feedback.js'
const { $Toast } = require('../../../static/iview/base/index');
  export default {
    data(){
      return{
        text:'',
        phone:null
      }
    },
    methods:{
      ok(){
        if(this.text.length<5){
          $Toast({
            content: '意见数字不小于5个',
            type: 'warning'
          });
          return
        }
        if(!this.phone){
          $Toast({
            content: '请输入手机号',
            type: 'warning'
          });
          return
        }
        var userInfo = wx.getStorageSync('userInfo')
        var type=2
        addSysFeedBack(this.text,this.phone,userInfo.id,type).then(response=>{
          if(response.data.resultCode===1000){
            $Toast({
              content: '保存成功',
              type: 'success'
            });
            setTimeout(()=>{
              wx.reLaunch({
                url: '/pages/me/main'
              })
            },2000)
          }
        })
      }
    },
    mounted(){
    },
    onLoad(){
      Object.assign(this.$data, this.$options.data())
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    .section{
      width: 100%;
      textarea{
        margin: 30rpx 25rpx;
        width: 700rpx;
        font-size: 34rpx;
        height: 400rpx;
        background: #fff;
      }
      input{
        width:670rpx;
        margin:30rpx auto;
        background:#fff;
        height:90rpx;
        line-height:90rpx;
        padding-left: 30rpx;
      }
    }
    button{
      width:700rpx;
      margin: 0 auto;
      margin-top:40rpx;
      color:#fff;
      background: #2d8cf0;
    }
  }
</style>
