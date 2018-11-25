<template>
  <div class="container">
    <div class="list-c">
      <div class="item" v-if="itemList" v-for="(item, index) in itemList" :key="index">
        <div class="i-l">
          <div class="user-info">
            <span class="s-l">{{item.userName}}</span>
            <span class="s-m">{{item.gender===1?'先生':'女士'}}</span>
            <span class="s-r">{{item.mobilePhone}}</span>
          </div>
          <span class="address">{{item.province+item.city+item.area+item.addressInfo}}</span>
        </div>
        <div class="cz">
          <div class="left">
            <div class="radio" @click="Default(item,index)" :class="{active:item.isDefault===1}">
            </div>
            <div class="font" >
              设为默认
            </div>
          </div>
          <div class="right">
            <div class="bianji" @click="bianji(item)">
              编辑
            </div>
            <div class="det" @click="handleOpen1">
              删除
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="add-btn" @click="addClick">
      <i class="icon mt-add-o"></i>
      <span>新增收货地址</span>
    </div>
    <i-modal title="提示" :visible="visible1" @ok="oks" @cancel="handleClose1">
      <view>确认删除吗？</view>
    </i-modal>
    </div>
</template>

<script>
  import {getAddress,DefaultAddress} from '@/api/addAddress.js'
  export default {
  data() {
    return {
      itemList: [],
      visible1: false,
      forms:{}
    }
  },
  methods: {
    addClick() {
      wx.navigateTo({url: '/pages/addAddress/main'})
    },
    bianji(item) {
      this.$store.commit('submitAddressInfo',item)
      wx.navigateTo({url: '/pages/addAddress/main?active=1'})
    },
    handleOpen1 () {
      this.visible1=true
    },
    handleClose1 () {
      this.visible1= false
    },
    oks(){

    },
    getQuery(){
      var userInfo=this.$store.state.me.userInfo
      this.forms.userId=userInfo.id
      this.forms.pageNum=1
      this.forms.pageSize=5000
      this.getAddress()
    },
    getAddress(){
      getAddress(this.forms).then(response=>{
        this.itemList=response.data.returnObject.list
      })
    },
    // 选中
    Default(item,inx){
      var obj={}
      obj.id=this.itemList[parseInt(inx)].id
      obj.userId=this.forms.userId
      DefaultAddress(obj).then(response=>{
        this.getAddress()
      })
    }
  },
  mounted() {
    this.getQuery()
  }
}
</script>

<style lang="scss" scoped>
.container {
  .list-c {
    display: flex;
    flex-direction: column;
    .item {
      background-color: white;
      padding: 30rpx;
      border-top: 2rpx solid $spLine-color;
      .i-l {
        display: flex;
        flex-direction: column;
        .address {
          font-size: 32rpx;
          color: $textBlack-color;
        }
        .user-info {
          display: flex;
          margin-top: 10rpx;
          .s-l {
            font-size: 32rpx;
            color: $textDarkGray-color;
          }
          .s-m {
            font-size: 32rpx;
            color: $textDarkGray-color;
            margin-left: 20rpx;
          }
          .s-r {
            font-size: 32rpx;
            color: $textDarkGray-color;
            margin-left: 60rpx;
          }
        }
      }
      .cz{
        display: flex;
        justify-content: space-between;
        .left{
          display: flex;
          height: 96rpx;
          align-items: center;
          .radio{
            width: 40rpx;
            height: 40rpx;
            border-radius:50%;
            border: 1px solid #000;
            background:#fff;
            /*background: #2d8cf0;*/
          }
          .active{
            background: #2d8cf0;
            border: none;
          }
          .font{
            margin-left: 20rpx;
          }
        }
        .right{
          height: 96rpx;
          align-items: center;
          display: flex;
          .bianji, .det{
            width: 190rpx;
            height: 60rpx;
            line-height: 60rpx;
            text-align: center;
            border-radius:30rpx;
            border: 1px solid #ccc;
          }
          .bianji{
            margin-right: 18rpx;
          }
        }
      }
    }
  }
  .add-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 88rpx;
    background-color: white;
    border-top: 2rpx solid  $spLine-color;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    i {
      font-size: 36rpx;
      color: $theme-color;
    }
    span {
      font-size: 28rpx;
      color: $textBlack-color;
      margin-left: 10rpx;
    }
  }
}
</style>
