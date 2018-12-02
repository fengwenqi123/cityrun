<template>
  <div class="container">
    <div class="header-c">
      <!--<img :src="userInfo.headPic" :onerror="errorImg01" alt="">-->
      <img v-if="userInfo"  :src="userInfo.headPic" alt="">
      <img v-if="!userInfo"  :src="errorImg01" alt="">
      <div class="info-c">
        <!--<p   @click="login">登录/注册</p>-->
        <button v-if="!userInfo" class="login" open-type="getUserInfo" @getuserinfo="login">授权登录</button>
        <p class="username" v-if="userInfo">{{userInfo.nickName}}</p>
      </div>
    </div>
    <div class="list-c">
      <div class="item" v-if="item.flag" v-for="(item, index) in itemList" :key="index" :data-index="index" @click="itemClick(item)">
        <div class="item-l">
          <i class='icon' :class="item.icon"></i>
          <span class="title">{{item.title}}</span>
          <span class="amount" v-if="item.amount">{{item.amount}}<span>张</span></span>
        </div>
        <i class='icon mt-arrow-right-o' v-if="!item.phone"></i>
        <i  v-if="item.phone" @click="call(item.phone)">{{item.phone}}</i>
      </div>
    </div>
    <div class="btn"  v-if="userInfo" @click="logoutClick">退出账号</div>
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
          path: '/pages/addressList/main',
          flag:false
        },
        {
          title: '在线客服',
          icon: 'mt-customer-service-o',
          flag:true
        },
        {
          title: '客服热线',
          icon: 'mt-customer-service-o',
          phone:'0571-88118899',
          flag:true
        },
        {
          title: '意见反馈',
          icon: 'mt-help-o',
          path: '/pages/feedback/main',
          flag:false
        },
        {
          title: '协议和说明',
          icon: 'mt-protocol-o',
          path: '/pages/protocol/main',
          flag:true
        },
        {
          title: '商家入驻',
          icon: 'mt-business1-o',
          path: '/pages/alert/main',
          flag:false
        }],
      userInfo:null,
      errorImg01:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJvoc0l3Oe4lWTMtUvLd7UYm9IvSWNjM6S5ibZBu3OE5XbCEqgPw9llpibmkyqEX9GbLKOCfTIe6wWQ/132'
    }
  },
  computed: {

  },
  mounted(){
    this.getUserId()
  },
  methods: {
    call(phone){
      wx.makePhoneCall({
        phoneNumber: phone
      })
    },
    bindGetUserInfo (e) {
      console.log(e.detail.userInfo)
    },
    getUserId(){
      var _this=this
      wx.getStorage({
        key: 'userInfo',
        success (res) {
          console.log(res.data)
          _this.userInfo=res.data
          if(res.data){
            _this.itemList[0].flag=true
            _this.itemList[5].flag=true
            _this.itemList[3].flag=true
            _this.$store.commit('submitUserInfo',_this.userInfo)
          }else{
            _this.itemList[0].flag=false
            _this.itemList[5].flag=false
            _this.itemList[3].flag=false
          }
        }
      })
    },
    itemClick(e) {
      wx.navigateTo({url: e.path})
    },
    logoutClick() {
      var _this=this
      wx.showModal({
          title: '确认退出？',
          content: '退出登录后将无法查看订单，重新登录即可查看',
          confirmColor: '#FFC24A',
          success: function(res) {
            if (res.confirm) {
              _this.userInfo=null
              wx.setStorage({
                key:"userInfo",
                data:null
              })
              _this.getUserId()
            } else if (res.cancel) {
            }
        }
      })
    },
    login(){
      var _this=this
      wx.login({
        success (res) {
          if (res.code) {
            _this.getSetting(res.code)
          }
        }
      })
    },
    getSetting(code){
      var _this=this
      wx.getSetting({
        success: function(res1){
          if (res1.authSetting["scope.userInfo"]) {
            wx.getUserInfo({
              success: function(rest) {
                    getUserInfos(code,rest.iv,rest.encryptedData).then(response=>{
                      wx.setStorage({
                        key:"wxToken",
                        data:response.headers.wxtoken[0]
                      })
                      _this.userInfo=response.data.returnObject
                      _this.$store.commit('submitUserInfo',_this.userInfo)
                      wx.setStorage({
                        key:"userInfo",
                        data:_this.userInfo
                      })
                      _this.getUserId()
                    })
                //用户已经授权过
                console.log('用户已经授权过')
              }
            })
          }else{
            console.log(222)
            console.log('用户还未授权过')
          }
        }
      })
    }
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
      background: none;
      outline:none;
      border: none;
    }
    button::after{ border: none; }
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
