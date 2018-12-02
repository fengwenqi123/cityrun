<template>
  <div class="container" v-if="obj">
    <div class="title">
      您的资料已提交审核，请耐心等候！
    </div>
    <div class="main">
      <div class="p1">入驻资料</div>
      <ul>
        <li>
          <span>姓名：</span>
          <span>{{obj.userName}}</span>
        </li>
        <li>
          <span>联系方式：</span>
          <span>{{obj.userAccount}}</span>
        </li>
        <li>
          <span>身份证号：</span>
          <span>{{obj.userIdCard}}</span>
        </li>
        <li>
          <span>门店名称：</span>
          <span>{{obj.shopTitle}}</span>
        </li>
        <li>
          <span>门店区域：</span>
          <span>{{obj.addressArea}}</span>
        </li>
        <li>
          <span>详细地址：</span>
          <span>{{obj.addressInfo}}</span>
        </li>
        <li>
          <span>门店类型：</span>
          <span>{{obj.shopType===1?'美食':'超市'}}</span>
        </li>
        <li>
          <span>入驻时间：</span>
          <span>{{obj.createTime}}</span>
        </li>
        <li>
          <span>入驻费用：</span>
          <span v-if="obj.payCount">{{obj.payCount}}</span>
        </li>
      </ul>
      <p>身份证正面</p>
      <div class="img"><img :src="obj.userCardFront" alt=""></div>
      <p>身份证反面</p>
      <div class="img"><img :src="obj.userCardBack" alt=""></div>
      <p>营业执照正面</p>
      <div class="img"><img :src="obj.shopLicense" alt=""></div>
      <p>门店LOGO</p>
      <div class="img"><img :src="obj.shopLogo" alt=""></div>
    </div>
  </div>
</template>

<script>
  import {getShopByWxUserId} from '@/api/alert.js'
  export default {
    data() {
      return {
        obj:null,
        src:'http://pic18.nipic.com/20111213/9055197_194816355155_2.jpg'
      }
    },
    methods: {
      getQuery(){
        var _this=this
        var userInfo = wx.getStorageSync('userInfo')
        if(userInfo){
          getShopByWxUserId(userInfo.id).then(response=>{
            if(response.data.resultCode===1000){
              if(response.data.returnObject){
                _this.obj=response.data.returnObject
                console.log(_this.obj)
              }
            }
          })
        }
      }
    },
    mounted() {
      this.getQuery()
    }
  }
</script>

<style lang="scss" scoped>
  .container{
    .title{
      height: 128rpx;
      line-height: 128rpx;
      margin-left:40rpx;
      font-size:28rpx;
    }
    .main{
      padding-left:40rpx;
      padding-right: 40rpx;
      background: #fff;
      .p1{
        font-size: 32rpx;
        height: 120rpx;
        line-height: 120rpx;
        color: #ccc;
      }
      ul{
        li{
          height: 56rpx;
          display: flex;
          span{
            font-size: 28rpx;
            display: flex;
            align-items: center;
          }
          span:nth-child(1){
            width:140rpx;
            text-align:right;
            margin-right:4rpx;
          }
        }
      }
      p{
        font-size:28rpx;
        margin-top: 16rpx;
      }
      .img{
        width: 568rpx;
        height: 324rpx;
        margin: 0 auto;
        margin-top: 16rpx;
        img{

          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
