<template>
  <div class="container" v-if="orderList">
    <div class="title">
      <div v-if="status==1">
        <span>待支付</span>
        <span>14:59后该订单取消</span>
      </div>
      <div v-if="status==2">
        <span>待接单</span>
        <span>等待商家接单中</span>
      </div>
      <div v-if="status==3">
        <span>待送达</span>
        <span>商家正在配货和运送，请耐心等候</span>
      </div>
      <div v-if="status==4">
        <span>已完成</span>
        <span>感谢您的信任，期待再次光临</span>
      </div>
      <div v-if="status==5">
        <span>已取消</span>
        <span>支付超时，订单取消</span>
      </div>
    </div>
    <div class="shopInfo">
      <div class="title">
        <div class="shopName">
          {{orderList.shopTitle}}
        </div>
        <p class="bt">外卖订单</p>
      </div>
      <div class="item-list">
        <div class="item" v-if="orderList.list" v-for="(item,index) in orderList.list" :key="index">
          <div class="img">
            <img :src="item.goodsPic" alt="">
          </div>
          <div class="mid">
            <p>{{item.goodsTitle}}</p>
            <p>x{{item.goodsNum}}</p>
          </div>
          <div class="jiage">
            ￥{{(item.goodsPrice/100)*item.goodsNum}}
          </div>
        </div>
      </div>
      <div class="other">
        <div class="Packing">
          <span class="tit">包装费</span>
          <span class="num">￥{{orderList.packPrice/100}}</span>
        </div>
        <div class="Delivery">
          <span class="tit">配送费</span>
          <span class="num">￥{{orderList.sendPrice/100}}</span>
        </div>
        <div class="man clearfloat" v-if="jian">
          <span class="tabs">减</span>
          <span class="font">满减活动</span>
          <span class="jiage">￥-{{jian/100}}</span>
        </div>
        <div class="new"  v-if="new1" >
          <span class="tabs" style="background: green;">新</span>
          <span class="font">新客立减</span>
          <span class="jiage">￥-{{new1/100}}</span>
        </div>
        <div class="call clearfloat">
          <i class="icon mt-phones-o"></i>
          <span class="font">联系商家</span>
          <span class="xiaoji">小计：￥{{orderList.payPrice/100}}</span>
          <span class="youhui" v-if="jian">已优惠￥{{jian/100}}</span>
        </div>
      </div>
    </div>
    <div class="active">
      <div class="sp">
        <span>送达时间：</span>
        <span v-if="orderList.sendTime">{{orderList.sendTime}}</span>
      </div>
      <div class="sp">
        <span>收货地址：</span>
        <p>
          <span class="address">{{orderList.userAddress}}</span>
          <span class="name">{{orderList.userName}}    {{orderList.userPhone}}</span>
        </p>
      </div>
      <div class="sp">
        <span>配送方式：</span>
        <span>商家配送</span>
      </div>
      <div class="sp">
        <span>订单号：</span>
        <span v-if="orderList.orderNo">{{orderList.orderNo}}</span>
      </div>
      <div class="sp">
        <span>下单时间：</span>
        <span v-if="orderList.modifyTime">{{orderList.modifyTime}}</span>
      </div>
      <div class="sp">
        <span>支付方式：</span>
        <span v-if="orderList.payType">{{orderList.payType===1?'微信支付':'线下支付'}}</span>
      </div>
      <div class="sp">
        <span>订单备注：</span>
        <span v-if="orderList.mark">{{orderList.mark}}</span>
      </div>
    </div>
    <div class="btn">
      <p v-if="status==1"><span class="zhifu" @click="goPay(orderList.id)">去支付</span><span @click="quxiao(orderList.id)">取消订单</span></p>
      <p v-if="status==2"><span @click="quxiao(orderList.id)">取消订单</span></p>
      <p v-if="status==4"><span  @click="evaluate(orderList.id,orderList.shopTitle)">评价</span></p>
      <p v-if="status==5"><span @click="deleted(orderList.id)">删除订单</span></p>
    </div>
    <div class="zf" v-if="flag">
      <p>选择支付方式</p>
      <radio-group class="radio-group" @change="radioChange">
        <label class="radio" v-for="(item,index) in items" :key="index">
          {{item.value}}<radio v-model="item.name" :checked="item.checked"/>
        </label>
      </radio-group>
      <button @click="sure">确定</button>
    </div>
    <div class="fc" v-if="flag" @click="close">
    </div>
    <i-message id="message" />
  </div>
</template>

<script>
  import {getList,updateOrdersInfo,payOrdersInfo} from '@/api/orderDetail.js'

export default {
  data(){
    return{
      orderList:null,
      new1:null,
      jian:null,
      status:null,
      id:null
    }
  },
  methods:{
    evaluate(id,shopTitle){
      console.log(111)
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
    getQuery(){
      var id=this.$root.$mp.query.id
      this.id=id
      this.status=parseFloat(this.$root.$mp.query.status)
      this.getList(id)
    },
    getList(id){
      getList(id).then(response=>{
        if(response.data.returnObject.list){
          this.orderList=response.data.returnObject.list[0]
          if(this.orderList.activityIds){
            var num1=this.orderList.activityIds.split(',')
            num1.forEach((item,index)=>{
              var obj=item.split('-')
              if(obj[0]=='1'){
                this.new1=obj[1]
              }
              if(obj[0]=='2'){
                this.jian=obj[1]
              }
            })
          }
        }
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
    font-size: 28rpx;
    .top{
      font-size: 26rpx;
      background: #fff;
      padding: 40rpx;
      display: flex;
      align-items: center;
      /*justify-content: space-between;*/
      .dw{
        margin-right: 60rpx;
        img{
          width: 28rpx;
          height: 28rpx;
        }
      }
      .middle{
        flex: 2;
      }
    }
    .songchu{
      padding: 0rpx 40rpx;
      background: #fff;
      display: flex;
      height: 60rpx;
      align-items: center;
      img{
        width: 28rpx;
        height: 28rpx;
        margin-right: 60rpx;
      }
    }
    .shopInfo{
      margin-top: 20rpx;
      background: #fff;
      .title{
        padding: 10rpx 40rpx;
        display: flex;
        height: 80rpx;
        align-items: center;
        justify-content: space-between;
        .bt{
          padding: 8rpx 14rpx;
          background: #2d8cf0;
          color: #fff;
        }
      }
      .item-list{
        .item{
          display: flex;
          background: #F8F8F8;
          margin-top: 10rpx;
          padding: 0 16rpx;
          .img{
            img{
              width: 100rpx;
              height: 100rpx;
            }
          }
          .mid{
            margin-left: 24rpx;
            flex: 2;
            /*margin-top: 10rpx;*/
            display: flex;
            height: 120rpx;
            align-items: center;
            p:nth-child(2){
              margin-left: 132rpx;
            }
          }
          .jiage{
            margin-top: 44rpx;
          }
        }
      }
      .other{
        padding: 0 40rpx;
        .Packing, .Delivery{
          display: flex;
          justify-content: space-between;
          height: 60rpx;
          align-items: center;
        }
        .man, .new{
          height: 80rpx;
          line-height:80rpx;
          span{
            float: left;
          }
          .tabs{
            display: inline-block;
            width: 40rpx;
            margin-top: 20rpx;
            height: 40rpx;
            border-radius:4rpx;
            line-height: 40rpx;
            text-align: center;
            background: red;
            color: #fff;
          }
          .font{
            margin-left: 8rpx;
          }
          .jiage{
            float: right;
          }
        }
        .call{
          border-top: 1px solid #ccc;
          height: 80rpx;
          line-height: 80rpx;
          i{
            float: left;
            display: inline-block;
          }
          .font{
            float: left;
            margin-left: 14rpx;
          }
          .youhui{
            float: right;
            margin-right: 42rpx;
          }
          .xiaoji{
            float: right;

          }
        }
      }
    }
    .beizhu{
      padding:20rpx 40rpx;
      background: #fff;
      margin-top: 20rpx;
      margin-bottom: 100rpx;
      .bz{
        height: 60rpx;
        line-height: 60rpx;
        span:nth-child(1){
          float: left;
        }
        span:nth-child(2){
          float: right;
        }
      }
      .cyNum{
        height: 60rpx;
        line-height: 60rpx;
        span:nth-child(1){
          float: left;
        }
        span:nth-child(2){
          float: right;
        }
      }
    }
    .goPay{
      position: fixed;
      width: 100%;
      height: 100rpx;
      bottom: 0rpx;
      left: 0px;
    }
    .section{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 90rpx;
      picker{
        flex:2;
        text-align:right;
      }
    }
    .zf{
      position: fixed;
      width: 100%;
      height: 600rpx;
      bottom: 0px;
      z-index: 100;
      background: #fff;
      p{
        text-align: center;
        padding: 30rpx 0;
      }
      button{
        width: 700rpx;
        margin: 150rpx auto;
        background: #2d8cf0;
        color: #fff;
        height: 80rpx;
        line-height: 80rpx;
      }
      .radio-group{
        width: 700rpx;
        margin: 10rpx auto;
      }
      .radio{
        display: flex;
        justify-content: space-between;
        height: 100rpx;
        align-items: center;
      }
    }
    .fc{
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      z-index: 99;
    }
    .active{
      margin-top: 19rpx;
      background:#fff;
      .sp{
        width: 700rpx;
        height: 90rpx;
        display: flex;
        margin: 0 auto;
        justify-content: space-between;
        align-items: center;
        span:nth-child(1){
          width: 140rpx;
        }
        p{
          .address{
            font-size: 24rpx;
            width: 400rpx;
          }
          .name{
            font-size: 26rpx;
          }
          span{
            display: block;
            text-align:right;
          }
        }
      }
    }
    .title{
      height: 128rpx;
      display: flex;
      align-items: center;
      background: #fff;
      margin-bottom:20rpx;
      padding-left: 44rpx;
      padding-right: 20rpx;
      span:nth-child(1){
        font-size: 42rpx;
      }
      span:nth-child(2){
        font-size: 28rpx;
        margin-left: 30rpx;
      }
    }
    .btn {
      height:83rpx;
      margin-top:30rpx;
      p{
        display: flex;
        flex-direction:row-reverse;
        margin-right: 30rpx;
        span{
          margin-left: 30rpx;
          width: 160rpx;
          height: 60rpx;
          line-height: 60rpx;
          text-align: center;
          border-radius:10rpx;
          border: 1px solid #666;
        }
        .zhifu{
          background: #2d8cf0;
          color: #fff;
        }
      }
    }
  }
</style>
