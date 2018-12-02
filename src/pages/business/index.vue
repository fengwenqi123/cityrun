<template>
  <div class="container">
    <div class="gerenInfo">
      <i-panel title="个人信息">
        <view class="section">
          <span>姓名：</span>
          <input  v-model="name" placeholder="请输入您的姓名" />
        </view>
        <view class="section">
          <span>联系方式：</span>
          <input type="number" v-model="phone" placeholder="请输入您的联系方式" />
        </view>
        <view class="section">
          <span>身份证号：</span>
          <input type="idcard" v-model="icard" placeholder="请输入您的身份证" />
        </view>
        <div class="icard">
          <span>上传身份证</span>
          <div class="zm" @click="upLoad(0)">
          <div class="con" v-if="!zm">
            <img :src="push" alt="">
            <p>身份证正面</p>
          </div>
            <div class="con" v-if="zm">
              <img :src="zm" alt="" class="img1">
            </div>
          </div>
          <div class="fm">
            <div class="con" @click="upLoad(1)" v-if="!fm">
              <img :src="push" alt="">
              <p>身份证反面</p>
            </div>
            <div class="con" @click="upLoad(1)" v-if="fm">
              <img :src="fm" alt="" class="img1">
            </div>
          </div>
        </div>
      </i-panel>
      <i-panel title="商家信息">
        <view class="section">
          <span>门店名称：</span>
          <input  v-model="mdName" placeholder="请输入门店名称" />
        </view>
        <div class="m" @click="Repositioning">
        <span>门店区域</span>
          <span>{{information.address}}</span>
        </div>
        <view class="section">
          <span>详细地址：</span>
          <input  v-model="address" placeholder="请输入详细地址" />
        </view>
        <div class="icard">
          <span>门店照片</span>
          <div class="zm" @click="upLoad(2)">
            <div class="con" v-if="!zm1">
              <img :src="push" alt="">
              <p>营业执照正面</p>
            </div>
            <div class="con" v-if="zm1">
              <img :src="zm1" alt="" class="img1">
            </div>
          </div>
          <div class="fm" @click="upLoad(3)">
            <div class="con"  v-if="!fm1">
              <img :src="push" alt="">
              <p>门店LOGO</p>
            </div>
            <div class="con" v-if="fm1">
              <img :src="fm1" alt="" class="img1">
            </div>
          </div>
        </div>
      </i-panel>
      <i-panel title="入驻费用">
        <view class="section">
          <view class="section__title">门店类型</view>
          <picker @change="bindPickerChange" v-model="index" :range="array">
            <view class="picker">
              {{array[index]}}>
            </view>
          </picker>
        </view>
        <view class="section">
          <span>入驻时间：</span>
          <p>{{days}}</p>
        </view>
        <view class="section">
          <span>入驻费用：</span>
          <p>{{price}}</p>
        </view>
      </i-panel>
    </div>
    <button type="primary" class="pay" @click="zhifu"> 支付并入驻 </button>
    <i-toast id="toast" />
  </div>
</template>

<script>
  import {getTime,addShopInfo} from '@/api/business.js'
  const { $Toast } = require('../../../static/iview/base/index');
export default {
  data(){
    return{
      information:{
        address:'点击选择>',
        latitude:null,
        longitude:null,
        address_info:null,
        province:null,
        city:null,
        area:null
      },
      name:'',
      phone:'',
      icard:'',
      push:require('@/assets/img/push.png'),
      zm:null,
      fm:null,
      zm1:null,
      fm1:null,
      zmLine:null,
      fmLine:null,
      zm1Line:null,
      fm1Line:null,
      ndName:null,
      address:null,
      index:0,
      array: ['美食', '超市'],
      times:null,
      days:null,
      price:null
    }
  },
  methods:{
    bindPickerChange: function(e) {
      console.log('picker发送选择改变，携带值为', e.mp.detail.value)
      this.index=parseInt(e.mp.detail.value)
      this.getTimes()
      // this.setData({
      //   index: e.detail.value
      // })
    },
    getTimes(){
      getTime(this.index).then(response=>{
        this.times=response.data.returnObject
        if(this.times.price==0){
          this.days=`${this.times.time}天`
        }else{
          this.days=`${this.times.time}年`
        }
        this.price=this.times.price/100
      })
    },
    Repositioning(){
      var _this=this
      wx.chooseLocation({
        success: function (res) {
          console.log(res)
          _this.information.address=res.name
          _this.information.latitude=res.latitude
          _this.information.longitude=res.longitude
          _this.information.address_info=res.address
          _this.getAddress(_this.information.latitude,_this.information.longitude)
        }
      })
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
            _this.information.province=address.province
            _this.information.city=address.city
            _this.information.area=address.district
          }
        }
      })
    },
    upLoad(type){
      var _this=this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths=res.tempFilePaths
          if(type===0){
            _this.zm=res.tempFilePaths[0]
          }else if(type===1){
            _this.fm=res.tempFilePaths[0]
          }else if(type===2){
            _this.zm1=res.tempFilePaths[0]
          }else{
            _this.fm1=res.tempFilePaths[0]
          }
          _this.wxUpLoad(tempFilePaths,type)
        }
      })
    },
    wxUpLoad(tempFilePaths,type){
      var _this=this
      wx.uploadFile({
        url: 'https://lemon-sea.com/cityRun/sys/upload/uploadPics',      //此处换上你的接口地址
        filePath: tempFilePaths[0],
        name: 'file',
        header: {
          "Content-Type": "multipart/form-data",
          'accept': 'application/json'
          // 'Authorization': 'Bearer ..'    //若有token，此处换上你的token，没有的话省略
        },
        success: function(res){
          var data=JSON.parse(res.data).returnObject
          console.log(data);
          if(type===0){
            _this.zmLine=data
          }else if(type===1){
            _this.fmLine=data
          }else if(type===2){
            _this.zm1Line=data
          }else{
            _this.fm1Line=data
          }
        },
        fail: function(res){
          console.log(res);
        }
      })
    },
    zhifu(){
      var obj={}
      obj.userName=this.name
      obj.userContact=this.phone
      obj.userIdCard=this.icard
      obj.userCardFront=this.zmLine
      obj.userCardBack=this.fmLine
      obj.shopTitle=this.mdName
      obj.addressProvince=this.information.province
      obj.addressCity=this.information.city
      obj.addressArea=this.information.area
      obj.addressInfo=`${this.information.address}${this.address}`
      obj.longitude=this.information.longitude
      obj.latitude=this.information.latitude
      // obj.serverEndTime=this.addAddress
      obj.shopInCharge=this.price
      obj.shopType=parseFloat(this.index)+1
      obj.shopLogo=this.fm1Line
      obj.shopLicense=this.zm1Line
      var userInfo = wx.getStorageSync('userInfo')
      if(userInfo){
        obj.userId=userInfo.id
      }
      obj.userAccount=this.phone
      addShopInfo(obj).then(response=>{
        if(response.data.resultCode=1000){
          if(response.data.returnObject!==1){
            this.wxPay(response)
          }else{
            $Toast({
              content: '操作成功',
              type: 'success'
            });
            setTimeout(()=>{
              wx.reLaunch({
                url: '/pages/me/main'
              })
            },2000)
          }
        }
      })
    },
    wxPay(response){
      wx.requestPayment(
        {
          'timeStamp': response.data.returnObject.timestamp + '',
          'nonceStr': response.data.returnObject.noncestr + '',
          'package': response.data.returnObject.wxpackage + '',
          'signType': 'MD5',
          'paySign': response.data.returnObject.paySign + '',
          'success': function (res) {
            console.log(res)
            $Toast({
              content: '操作成功',
              type: 'success'
            });
            setTimeout(()=>{
              wx.reLaunch({
                url: '/pages/me/main'
              })
            },2000)
          },
          'fail': function (res) {
            console.log(res);
            if (res === 'requestPayment:fail cancel') {
              console.log('用户取消支付,返回订单列表并刷新');
            }
            wx.reLaunch({
              url: '/pages/me/main'
            })
          },
          'complete': function (res) {
            console.log(res)
          }
        })
    }
  },
  mounted(){
    this.getTimes()
  },
  onLoad(){
    Object.assign(this.$data, this.$options.data())
  }
}
</script>

<style lang="scss" scoped>
.container {
 .icard{
   display: flex;
   .zm, .fm{
     width: 240rpx;
     height: 200rpx;
     border: 1px solid #ccc;
     display: flex;
     justify-content: center;
     align-items: center;
     margin-left: 44rpx;
     .con{
       text-align: center;
     }
     img{
       width: 48rpx;
       height: 48rpx;
     }
     .img1{
       width: 240rpx;
       height: 200rpx;
     }
   }
   .fm{
     margin-left: 44rpx;
   }
 }
  .m{
    display:flex;
    margin-left:30rpx;
    margin-right: 30rpx;
    justify-content: space-between;
    i{
      font-size: 30rpx;
    }
  }
  .section{
    display: flex;
    margin: 0 30rpx;
    justify-content: space-between;
    height: 100rpx;
    align-items: center;
  }
  .pay{
    width:100%;
    margin-top:40rpx;
    color:#fff;
    background: #2d8cf0;
  }
  .icard{
    padding-bottom: 20rpx;
  }
}
</style>
