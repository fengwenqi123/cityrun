<template>
  <div class="container">
    <div class="top" v-if="address" @click="addAddress">
      <div class="dw">
        <img :src="dingwei" alt="">
      </div>
      <div class="middle">
        <p>{{address.province}}{{address.city}}{{address.area}}{{address.addressInfo}}</p>
        <p>{{address.userName}} {{address.gender===1?'先生':'女士'}}    {{address.mobilePhone}}</p>
      </div>
      <div class="right">
        >
      </div>
    </div>
    <div class="top" v-if="!address" @click="addAddress">
         <p style="flex: 2;" >新增收货地址</p>
      <div class="right">
        >
      </div>
    </div>
    <div class="songchu">
      <img :src="clock" alt="">
      立即送出
    </div>
    <div class="shopInfo">
     <div class="title">
       <div class="shopName">
         {{shopNames}}
       </div>
       <p class="bt">商家配送</p>
       </div>
      <div class="item-list">
        <div class="item" v-for="(item,index) in shopData" :key="index">
          <div class="img">
            <img :src="item.img" alt="">
          </div>
          <div class="mid">
            <p>{{item.goodsTitle}}</p>
            <p>x{{item.lengs.length+1}}</p>
          </div>
          <div class="jiage">
            ￥{{item.priceOut*(item.lengs.length+1)}}
          </div>
        </div>
      </div>
      <div class="other" v-if="shopOther">
        <div class="Packing">
          <span class="tit">包装费</span>
          <span class="num">￥{{shopOther.packPrice/100}}</span>
        </div>
        <div class="Delivery">
          <span class="tit">配送费</span>
          <span class="num">￥{{shopOther.sendPrice/100}}</span>
        </div>
        <div class="man clearfloat" v-if="shopOther.jian">
          <span class="tabs">减</span>
          <span class="font">满减活动</span>
          <span class="jiage">￥{{shopOther.jian*-1}}</span>
        </div>
        <div class="new"  v-if="shopOther.new">
          <span class="tabs" style="background: green;">新</span>
          <span class="font">新客立减</span>
          <span class="jiage">￥{{shopOther.new*-1}}</span>
        </div>
        <div class="call clearfloat">
          <i class="icon mt-phones-o"></i>
          <span class="font">联系商家</span>
          <span class="xiaoji">小计：￥{{shopOther.pay}}</span>
          <span class="youhui" v-if="shopOther.xj">已优惠￥{{shopOther.xj}}</span>
        </div>
      </div>
    </div>
    <div class="beizhu">
      <div class="bz clearfloat" @click="bzs">
        <span>备注</span>
        <span>口味，偏好等要求></span>
      </div>
      <div class="cyNum clearfloat">
        <view class="section">
          <view class="section__title">餐具数量</view>
          <picker @change="bindPickerChange" v-model="cj" :range="array">
            <view class="picker">
              {{array[cj]}}
            </view>
          </picker>
        </view>
        <!--<span>餐具数量</span>-->
        <!--<span>未选择></span>-->
      </div>
    </div>
    <div class="goPay">
      <i-button type="info" @click="pay">去支付</i-button>
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
  import {getAddress} from '@/api/addAddress.js'
  import {createOrder} from '@/api/shoppingCart.js'
  const { $Message } = require('../../../static/iview/base/index');
export default {
  data() {
    return {
      dingwei:require('@/assets/img/dingwei.png'),
      clock:require('@/assets/img/clock.png'),
      shopData:null,
      shopOther:null,
      address:null,
      flag:false,
      cj:0,
      items: [
        {name: '1', value: '微信支付', checked: 'true'},
        {name: '2', value: '线下支付'}
      ],
      array: ['1', '2', '3', '4','5','6', '7', '8', '9','10','10份以上'],
      pay_index:'1'
    }
  },
  computed: {
  },
  methods: {
    bindPickerChange: function(e) {
      console.log('picker发送选择改变，携带值为', e.mp.detail.value)
      this.cj=parseInt(e.mp.detail.value)

    },
    radioChange: function(e) {
      console.log('radio发生change事件，携带value值为：', e.mp.detail.value)
      this.pay_index= e.mp.detail.value
    },
    sure(){
      if(this.pay_index=='1'){
        this.zhifu()
        this.flag=false

      }
    },
   getQuery(){
     var _this=this
     wx.getStorage({
       key: 'shopData',
       success (res) {
         console.log(res.data)
         _this.shopData=res.data
       }
     })
     wx.getStorage({
       key: 'bz',
       success (res) {
         _this.bz=res.data
       }
     })
     wx.getStorage({
       key: 'shopOther',
       success (res) {
         console.log(res.data)
         _this.shopOther=res.data
           _this.shopOther.pay=(parseFloat(_this.shopOther.payPrice)/100)+(parseFloat(_this.shopOther.sendPrice)/100)
         // console.log(parseInt(_this.shopOther.payPrice)/100)
         // console.log(parseInt(_this.shopOther.packPrice)/100)
         // console.log(parseInt(_this.shopOther.sendPrice)/100)
         if(_this.shopOther.jian){
             _this.shopOther.pay-=(parseFloat(_this.shopOther.jian))
         }
         // console.log(parseInt(_this.shopOther.jian))
           if(_this.shopOther.new){
             _this.shopOther.pay-=(parseFloat(_this.shopOther.new))
           }
       }
     })
    },
    getAddress(){
     var _this=this
      wx.getStorage({
        key: 'userInfo',
        success (res) {
          var obj={}
          obj.userId=res.data.id
          obj.pageNum=1
          obj.pageSize=5000
          getAddress(obj).then(response=>{
            if(response.data.returnObject){
              _this.itemList=response.data.returnObject.list
              console.log(_this.itemList)
              _this.itemList.forEach((item,index)=>{
                if(item.isDefault===1){
                  _this.address=item
                }
              })
            }
          })
        }
      })
    },
    addAddress(){
      wx.navigateTo({url: '/pages/addressList/main'})
    },
    bzs(){
      wx.navigateTo({url: '/pages/bz/main'})
    },
    pay(){
      this.flag=true
    },
    close(){
      this.flag=false
    },
    zhifu() {
      var map = {};
      //shopId=26o07&type=1&userId=b8qp&packPrice=0&sendPrice=400&shopTitle=麻辣烫旗舰店&sendType=1&userName=吃货1&userPhone=15925609260&userAddress=你到不了的位置&payPrice=11900&activityIds=2-3000-5000-3000&goodsIds=7s-1-4500-大排骨-0,1vfh2-1-10000-酸菜鱼(大份)-26o0f&mark=西红柿炒鸡蛋不要番茄,蛋炒饭不要蛋,麻辣烫不要麻不要辣~~78人
      map['payPrice'] = (this.shopOther.pay*100).toFixed(0)
      map['shopId'] = this.shopOther.shopId
      map['type'] = this.shopOther.type
      map['userId'] = this.shopOther.userId
      map['packPrice'] = this.shopOther.packPrice
      map['sendPrice'] = this.shopOther.sendPrice
      map['shopTitle'] = this.shopOther.shopTitle
      map['sendType'] = this.shopOther.sendType
      map['userName'] = this.address.userName
      map['userPhone'] = this.address.mobilePhone
      map['userAddress'] =`${this.address.province}${this.address.city}${this.address.area}${this.address.addressInfo}`
      map['activityIds'] = this.shopOther.activityIds
      map['goodsIds'] = this.shopOther.goodsIds
      map['mark'] = this.bz+'~~'+(this.cj+1)
      map['payType'] = parseFloat(this.pay_index)
      createOrder(map).then(response=>{
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
      // app.func.post('/xorder/createOrdersInfo', map, function (res) {
      //   console.log(res);
      //   wx.requestPayment(
      //     {
      //       'timeStamp': res.returnObject.timestamp + '',
      //       'nonceStr': res.returnObject.noncestr + '',
      //       'package': res.returnObject.wxpackage + '',
      //       'signType': 'MD5',
      //       'paySign': res.returnObject.paySign + '',
      //       'success': function (res) {
      //         console.log(res)
      //       },
      //       'fail': function (res) {
      //         console.log(res);
      //         if (res === 'requestPayment:fail cancel') {
      //           console.log('用户取消支付,返回订单列表并刷新');
      //         }
      //       },
      //       'complete': function (res) {
      //         console.log(res)
      //       }
      //     })
      // })
    }
  },
  mounted() {
    this.getQuery()
    this.getAddress()
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
          margin-top: 10rpx;
        }
        .jiage{
          margin-top: 10rpx;
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
}
</style>
