<template>
  <div class="container">
    <div class="name">
      <span>联系人：</span>
      <input placeholder="请填写收货人的姓名" placeholder-style="font-size: 24rpx" auto-focus/>
    </div>
    <div class="sex">
      <div class="l"></div>
      <radio-group class="radio-group" @bindchange="radioChange">
        <label class="radio" v-for="(item,index) in items" :key="index">
          <radio :value="item.name" :checked="item.checked"/>{{item.value}}
        </label>
      </radio-group>
    </div>
    <div class="phone">
      <span>手机号：</span>
      <input placeholder="请填写收货人手机号码" placeholder-style="font-size: 24rpx" auto-focus/>
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
      <span>门牌号：</span>
      <input placeholder="详细地址，例：16号楼5楼301室" placeholder-style="font-size: 24rpx" auto-focus/>
    </div>
    <div class="submit">
      <span>保存地址</span>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      information:{
        address:'点击选择',
        latitude:'',
        longitude:''
      },
      items: [
        {name: 'USA', value: '美国'},
        {name: 'CHN', value: '中国', checked: 'true'},
        {name: 'BRA', value: '巴西'},
        {name: 'JPN', value: '日本'},
        {name: 'ENG', value: '英国'},
        {name: 'TUR', value: '法国'},
      ]

    }
  },
  methods:{
    Repositioning(){
      var _this=this
      wx.chooseLocation({
        success: function (res) {
          _this.information.address=res.name
          _this.information.latitude=res.latitude
          _this.information.longitude=res.longitude
        }
      })
    },
    radioChange: function(e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value)
    }
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
    padding-right: 30rpx;
    height: 88rpx;
    border-bottom: 2rpx solid $spLine-color;
    .l {
      width: 160rpx;
    }
    .m {
      display: flex;
      i {
        font-size: 32rpx;
        color: $theme-color;
      }
      span {
        font-size: 28rpx;
        color: $textBlack-color;
        margin-left: 20rpx;
      }
    }
    .r {
      display: flex;
      margin-left: 60rpx;
      i {
        font-size: 38rpx;
        color: $textGray-color;
      }
      span {
        font-size: 28rpx;
        color: $textBlack-color;
        margin-left: 20rpx;
      }
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
    background-color: $theme-color;
    border-radius: 8rpx;
    span {
      font-size: 28rpx;
      color: $textBlack-color;
    }
  }
}
</style>
