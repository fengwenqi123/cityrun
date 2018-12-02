<template>
  <div class="container">
    <div class="list-c">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="shop-info" @click="headerClick">
          <span class="shop-name">{{item.shopTitle}}</span>
          <i class="icon mt-arrow-right-o"></i>
          <span class="order-status">{{item.status===1?'待支付':item.status===2?'待接单':item.status===3?'待送达':item.status===4?'已完成':'已取消'}}</span>
        </div>
        <div class="googs-c" @click="orderDetail(item.id,item.status)">
          <div class="goods" v-for="(itx, idx) in item.list" :key="idx">
            <span class="s-l">{{itx.goodsTitle}}</span>
            <span class="s-r">x{{itx.goodsNum}}</span>
          </div>
        </div>
        <div class="price">
          <span class="count">共{{item.list.length}}件商品，实付</span>
          <span class="amount">￥{{item.payPrice/100}}</span>
        </div>
        <div class="bottom-c" @click="headerClick">
          <div class="btn">
            <p v-if="item.status===1"><span @click="quxiao(item.id)">取消订单</span><span class="goPay" @click="goPay(item.id)">去支付</span></p>
            <p v-if="item.status===2"><span @click="quxiao(item.id)">取消订单</span></p>
            <p v-if="item.status===4&&!item.commentStar"><span class="goPay" @click="evaluate(item.id,item.shopTitle)">评价</span></p>
            <p v-if="item.status===5"><span @click="deleted(item.id)">删除订单</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {orderList} from './data'
import {getOrdersList} from '@/api/orderList'
import {payOrdersInfo,updateOrdersInfo} from '@/api/orderDetail.js'

export default {
  data() {
    return {
      orderList: [],
      list:[]
    }
  },
  methods: {
    evaluate(id,shopTitle){
      wx.navigateTo({url: '/pages/evaluate/main?id='+id+'&shopTitle='+shopTitle})
    },
    quxiao(id){
      var status=5
      updateOrdersInfo(id,status).then(response=>{
        if(response.data.resultCode===1000){
          wx.reLaunch({
            url: '/pages/orderList/main'
          })
        }
      })
    },
    deleted(id){
      var status=6
      updateOrdersInfo(id,status).then(response=>{
        if(response.data.resultCode===1000){
          wx.reLaunch({
            url: '/pages/orderList/main'
          })
        }
      })
    },
    goPay(id){
      console.log(id)
      payOrdersInfo(id).then(response=>{
        console.log(response)
        wx.requestPayment(
          {
            'timeStamp': response.data.returnObject.timestamp + '',
            'nonceStr': response.data.returnObject.noncestr + '',
            'package': response.data.returnObject.wxpackage + '',
            'signType': 'MD5',
            'paySign': response.data.returnObject.paySign + '',
            'success': function (res) {
              console.log(res)
              wx.reLaunch({
                url: '/pages/orderList/main'
              })
            },
            'fail': function (res) {
              console.log(res);
              if (res === 'requestPayment:fail cancel') {
                console.log('用户取消支付,返回订单列表并刷新');
              }
              wx.reLaunch({
                url: '/pages/orderList/main'
              })
            },
            'complete': function (res) {
              console.log(res)
            }
          })
      })
    },
    headerClick() {
      // wx.navigateTo({url: '/pages/shoppingCart/main'})
    },
    orderDetail(id,status) {
      wx.navigateTo({url: '/pages/orderDetail/main?id='+id+'&status='+status})
    },
    getOrdersLists(){
      var _this=this
      var userInfo = wx.getStorageSync('userInfo')
      if(userInfo){
        var obj={}
            obj.userId=userInfo.id
            obj.pageNum=1
            obj.pageSize=5000
            getOrdersList(obj).then(response=>{
              _this.list=response.data.returnObject.list
            })
      }
    }
  },
  mounted() {
    this.getOrdersLists()
  }
}
</script>

<style lang="scss" scoped>
.container {
  .list-c {
    display: flex;
    flex-direction: column;
    .item {
      display: flex;
      flex-direction: column;
      background-color: white;
      margin-top: 20rpx;
      .shop-info {
        display: flex;
        height: 120rpx;
        background-color: white;
        align-items: center;
        border-bottom: 2rpx solid $spLine-color;
        margin-left: 30rpx;
        margin-bottom: 10rpx;
        img {
          width: 80rpx;
          height: 80rpx;
        }
        .shop-name {
          font-size: 32rpx;
          color: $textBlack-color;
          margin-left: 10rpx;
          font-weight: bold;
        }
        i {
          font-size: 28rpx;
          color: $textGray-color;
          margin-left: 10rpx;
          flex: 1;
        }
        .order-status {
          font-size: 28rpx;
          color: $textDarkGray-color;
          display: flex;
          margin-right: 20rpx;
        }
      }
      .googs-c {
        display: flex;
        background-color: white;
        flex-direction: column;
        .goods {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-left: 120rpx;
          margin-right: 20rpx;
          .s-l {
            font-size: 28rpx;
            color: $textDarkGray-color;
            padding: 10rpx 0;
          }
          .s-r {
            font-size: 24rpx;
            color: $textBlack-color;
          }
        }
      }
      .price {
        display: flex;
        margin: 20rpx;
        justify-content: flex-end;
        .count {
          font-size: 24rpx;
          color: $textDarkGray-color;
        }
        .amount {
          font-size: 24rpx;
          color: $textBlack-color;
          font-weight: bold;
        }
      }
      .bottom-c {
        display: flex;
        margin-left: 30rpx;
        border-top: 2rpx solid $spLine-color;
        align-items: center;
        background-color: white;
        justify-content: flex-end;
        .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 20rpx;
          border-radius: 4rpx;
          span {
            font-size: 28rpx;
            color: $textBlack-color;
            display: inline-block;
            margin-left: 20rpx;
            width: 160rpx;
            height: 60rpx;
            text-align: center;
            line-height: 60rpx;
            border: 1px solid #ccc;
            border-radius:2px;
          }
          .goPay{
            background: #2d8cf0;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
