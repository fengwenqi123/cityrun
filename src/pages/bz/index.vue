<template>
  <div class="container">
    <view class="section">
      <textarea v-model="text" placeholder="请填写备注" auto-focus />
    </view>
    <button type="primary" @click="ok"> 完成 </button>
  </div>
</template>

<script>

export default {
  data(){
    return{
      text:null
    }
  },
  methods:{
    ok(){
      var _this=this
      wx.setStorage({
        key:"bz",
        data:_this.text
      })
      wx.navigateTo({url: '/pages/submitOrder1/main'})
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
