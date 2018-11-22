<template>
  <div class="container">
    <div class="header-c">
      <!--<img :src="userInfo.headPic" :onerror="errorImg01" alt="">-->
      <img v-if="userInfo"  :src="userInfo.headPic" alt="">
      <img v-if="!userInfo"  :src="errorImg01" alt="">
      <div class="info-c">
        <!--<span class="name">fengwenqi</span>-->
        <!--<span class="phone">15214313256</span>-->
        <p class="login"  v-if="!userInfo" @click="login">登录/注册</p>
        <p class="username" v-if="userInfo">{{userInfo.nickName}}</p>
      </div>
    </div>
    <div class="list-c">
      <div class="item" v-for="(item, index) in itemList" :key="index" :data-index="index" @click="itemClick(item)">
        <div class="item-l">
          <i class='icon' :class="item.icon"></i>
          <span class="title">{{item.title}}</span>
          <span class="amount" v-if="item.amount">{{item.amount}}<span>张</span></span>
        </div>
        <i class='icon mt-arrow-right-o' v-if="!item.phone"></i>
        <i  v-if="item.phone">{{item.phone}}</i>
      </div>
    </div>
    <div class="btn" @click="logoutClick">退出账号</div>
  </div>
</template>

<script>
  import {getUserInfos} from '@/api/me.js'

export default {
  data() {
    return {
      itemList: [
        {
          title: '我的地址',
          icon: 'mt-my-location-o',
          path: '/pages/addressList/main'
        },
        {
          title: '在线客服',
          icon: 'mt-customer-service-o'
        },
        {
          title: '客服热线',
          icon: 'mt-customer-service-o',
          phone:'0571-88118899'
        },
        {
          title: '意见反馈',
          icon: 'mt-help-o',
          path: '/pages/feedback/main'
        },
        {
          title: '协议和说明',
          icon: 'mt-protocol-o',
          path: '/pages/protocol/main'
        }],
      userInfo:null,
      errorImg01:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJvoc0l3Oe4lWTMtUvLd7UYm9IvSWNjM6S5ibZBu3OE5XbCEqgPw9llpibmkyqEX9GbLKOCfTIe6wWQ/132'
    }
  },
  computed: {

  },
  mounted(){
    // 一进来看看用户是否授权过
    // this.getSetting()
  },
  methods: {
    itemClick(e) {
      wx.navigateTo({url: e.path})
    },
    logoutClick() {
      wx.showModal({
          title: '确认退出？',
          content: '退出登录后将无法查看订单，重新登录即可查看',
          confirmColor: '#FFC24A',
          success: function(res) {
            if (res.confirm) {
              resolve('ok')
            } else if (res.cancel) {
              resolve('cancle')
            }
        }
      })
    },
    login(){
      var _this=this
      wx.login({
        success (res) {
          if (res.code) {
            console.log(res.code)
            _this.getSetting(res.code)
          }
        }
      })
    },
    getSetting(code){
      var _this=this
      wx.getSetting({
        success: function(res1){
          if (res1.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function(rest) {
                console.log(rest)
                    getUserInfos(code,rest.iv,rest.encryptedData).then(response=>{
                      _this.userInfo=response.data.returnObject
                      _this.$store.commit('submitUserInfo',_this.userInfo)
                    })
                //用户已经授权过
                console.log('用户已经授权过')
              }
            })
          }else{
            console.log('用户还未授权过')
          }
        }
      })
    }
    // getUserInfo1(){
    //   console.log('click事件首先触发')
    //   // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
    //   // console.log(wx.canIUse('button.open-type.getUserInfo'))
    //   if(wx.canIUse('button.open-type.getUserInfo')){
    //     // 用户版本可用
    //   }else{
    //     console.log('请升级微信版本')
    //   }
    // },
    // bindGetUserInfo(e) {
    //   // console.log(e.mp.detail.rawData)
    //   if (e.mp.detail.rawData){
    //     //用户按了允许授权按钮
    //     console.log('用户按了允许授权按钮')
    //   } else {
    //     //用户按了拒绝按钮
    //     console.log('用户按了拒绝按钮')
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .header-c {
    display: flex;
    align-items: center;
    height: 200rpx;
    background-color: #2d8cf0;
    .login{
      color: #fff;
      font-size: 28rpx;
    }
    .username{
      font-size: 28rpx;
      color: #fff;
    }
    img {
      width: 120rpx;
      height: 120rpx;
      border-radius: 60rpx;
      margin-left: 30rpx
    }
    .info-c {
      display: flex;
      flex-direction: column;
      margin-left: 30rpx;
      .name {
        font-size: 32rpx;
        color: $textBlack-color;
        font-weight: bold;
      }
      .phone {
        font-size: 28rpx;
        color: $textBlack-color;
      }
    }
  }
  .list-c {
    display: flex;
    flex-direction: column;
    margin-top: 20rpx;
    background-color: white;
    .item {
      display: flex;
      align-items: center;
      height: 88rpx;
      border-bottom: 2rpx solid $spLine-color;
      padding: 0 20rpx;
      .item-l {
        display: flex;
        flex: 1;
        i {
          font-size: 38rpx;
          color: $textDarkGray-color;
        }
        .title {
          font-size: 28rpx;
          color: $textBlack-color;
          margin-left: 30rpx;
          margin-top: 6rpx;
        }
        .amount {
          font-size: 38rpx;
          color: $mtRed-color;
          margin: 0 10rpx;
          display: flex;
          align-items: center;
           span {
             font-size: 24rpx;
             color: $textDarkGray-color;
             margin-left: 10rpx;
           }
        }
      }
      i {
        font-size: 24rpx;
        color: $textGray-color;
      }
    }
    .item:last-child {
      border-bottom: 0rpx solid $spLine-color;
    }
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 88rpx;
    background-color: white;
    margin-top: 20rpx;
    color: $textBlack-color;
    font-size: 28rpx;
  }
}
</style>
