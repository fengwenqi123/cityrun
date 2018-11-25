<template>
  <div class="container">
    <div class="name">
      <span>联系人：</span>
      <input v-model="forms.userName" placeholder="请填写收货人的姓名" placeholder-style="font-size: 24rpx" auto-focus/>
    </div>
    <div class="sex">
      <div class="man" @click="forms.gender=1" :class="{active:forms.gender===1}">先生</div>
      <div class="wman" @click="forms.gender=2" :class="{active:forms.gender===2}">女士</div>
    </div>
    <div class="phone">
      <span>手机号：</span>
      <input v-model="forms.mobilePhone" placeholder="请填写收货人手机号码" placeholder-style="font-size: 24rpx" auto-focus/>
    </div>
    <div class="address">
      <span class="l">收货地址：</span>
      <div class="m" @click="Repositioning">
        <i class="icon mt-location-o"></i>
        <span>{{information.address}}</span>
      </div>
      <div class="r">
        <i class="icon mt-arrow-right-o"></i>
      </div>
    </div>
    <div class="house-num">
      <span>详细地址：</span>
      <input v-model="forms.addressInfo" placeholder="详细地址，例：16号楼5楼301室" placeholder-style="font-size: 24rpx" auto-focus/>
    </div>
    <div class="submit" v-if="!flag"  @click="submits()">
      <span>保存地址</span>
    </div>
    <div class="submit" v-if="flag"  @click="submits1()">
      <span>修改地址</span>
    </div>
  </div>
</template>

<script>
  import {submitAddress,updateAddress} from '@/api/addAddress.js'
export default {
  data(){
    return{
      information:{
        address:'点击选择',
      },
      forms:{
        userId:null,
        userName:null,
        mobilePhone:null,
        province:null,
        city:null,
        area:null,
        addressInfo:null,
        longitude:null,
        latitude:null,
        gender:null
      },
      flag:false,
      index:null
    }
  },
  methods:{
    Repositioning(){
      var _this=this
      wx.chooseLocation({
        success: function (res) {
          _this.information.address=res.name
          _this.forms.latitude=res.latitude
          _this.forms.longitude=res.longitude
          _this.forms.address_info=res.address
         _this.getAddress(_this.forms.latitude,_this.forms.longitude)
        }
      })
    },
    getQuery(){
      var userInfo=this.$store.state.me.userInfo
      this.forms.userId=userInfo.id
      let active=this.$root.$mp.query.active
      if(active){
        this.forms.userId=this.$store.state.address.addressInfo.userId
        this.forms.id=this.$store.state.address.addressInfo.id
        this.forms.userName=this.$store.state.address.addressInfo.userName
        this.forms.mobilePhone=this.$store.state.address.addressInfo.mobilePhone
        this.forms.province=this.$store.state.address.addressInfo.province
        this.forms.city=this.$store.state.address.addressInfo.city
        this.forms.area=this.$store.state.address.addressInfo.area
        this.forms.addressInfo=this.$store.state.address.addressInfo.addressInfo
        this.forms.longitude=this.$store.state.address.addressInfo.longitude
        this.forms.latitude=this.$store.state.address.addressInfo.latitude
        this.forms.gender=this.$store.state.address.addressInfo.gender
        this.information.address=`${this.forms.province}${this.forms.city}${this.forms.area}`
        this.flag=true
        console.log(this.forms)
      }
    },
    getAddress(latitude,longitude){
      var _this=this
      wx.request({
        header:{
          "Content-Type": "application/text"
        },
        url:'https://apis.map.qq.com/ws/geocoder/v1/?location='+latitude+','+longitude+'&key=MVGBZ-R2U3U-W5CVY-2PQID-AT4VZ-PDF35',
        success: function(res) {
          console.log(res.data.result.address_component)
          var address=res.data.result.address_component
          if(address){
            _this.forms.province=address.province
            _this.forms.city=address.city
            _this.forms.area=address.district
          }
        }
      })
    },
    submits(){
      submitAddress(this.forms).then(response=>{
      })
    },
    submits1(){
      updateAddress(this.forms).then(response=>{
      })
    }
  },
  mounted(){
    this.getQuery()
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .name {
    display: flex;
    align-items: center;
    margin-left: 30rpx;
    padding-right: 30rpx;
    height: 88rpx;
    border-bottom: 2rpx solid $spLine-color;
    span {
      font-size: 28rpx;
      color: $textBlack-color;
      width: 160rpx;
    }
    input {
      flex: 1;
    }
  }
  .sex {
    display: flex;
    align-items: center;
    margin-left: 30rpx;
    justify-content: center;
    padding-right: 30rpx;
    height: 88rpx;
    border-bottom: 2rpx solid $spLine-color;
    div{
      width: 120rpx;
      height: 52rpx;
      line-height: 52rpx;
      text-align: center;
      border: 1px solid #ccc;
    }
    .wman{
      margin-left: 50rpx;
    }
    .active{
      background: #2d8cf0;
      color: #fff;
    }
  }
  .phone {
    display: flex;
    align-items: center;
    margin-left: 30rpx;
    padding-right: 30rpx;
    height: 88rpx;
    border-bottom: 2rpx solid $spLine-color;
    span {
      font-size: 28rpx;
      color: $textBlack-color;
      width: 160rpx;
    }
    input {
      flex: 1;
    }
  }
  .address {
    display: flex;
    align-items: center;
    margin-left: 30rpx;
    padding-right: 30rpx;
    height: 88rpx;
    border-bottom: 2rpx solid $spLine-color;
    .l {
      font-size: 28rpx;
      color: $textBlack-color;
      width: 160rpx;
    }
    .m {
      display: flex;
      flex: 1;
      i {
        font-size: 38rpx;
        color: $textGray-color;
      }
      span {
        font-size: 24rpx;
        color: $textDarkGray-color;
        margin-left: 10rpx;
        margin-top: 10rpx;
      }
    }
    .r {
      i {
        font-size: 28rpx;
        color: $textGray-color;
      }
    }
  }
  .house-num {
    display: flex;
    align-items: center;
    margin-left: 30rpx;
    padding-right: 30rpx;
    height: 88rpx;
    border-bottom: 2rpx solid $spLine-color;
    span {
      font-size: 28rpx;
      color: $textBlack-color;
      width: 160rpx;
    }
    input {
      flex: 1;
    }
  }
  .submit {
    margin: 40rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 76rpx;
    color: #fff;
    background-color: #2d8cf0;
    border-radius: 8rpx;
    span {
      font-size: 28rpx;
      color: #fff;
    }
  }
}
</style>
