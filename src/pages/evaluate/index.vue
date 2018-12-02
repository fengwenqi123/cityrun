<template>
  <div class="container">
    <div class="title" v-if="shopTitle">
      <div class="name">
        {{shopTitle}}
      </div>
    </div>
    <div class="pf">
        <i-rate @change="onChange2" v-model="starIndex2" :size="32">
        </i-rate>
        <p>{{starValue}}</p>
    </div>
    <view class="section">
      <textarea v-model="text" placeholder="请填写内容" />
    </view>
    <div class="pics">
      <div class="pic" @click="upLoad">
        <img :src="src" alt="">
      </div>
      <div class="pic picList" v-if="commentPic.length>0" v-for="(item,index) in commentPic" :key="index">
        <img :src="item" alt="">
      </div>
    </div>
    <button type="primary" @click="ok"> 完成 </button>
    <i-message id="message" />
  </div>
</template>

<script>
  import {addOrderCommentInfo} from '@/api/orderDetail.js'
  const { $Message } = require('../../../static/iview/base/index');
export default {
  data(){
    return{
      text:null,
      id:null,
      shopTitle:null,
      starIndex2 : 0,
      starValue:'请打分',
      src:require('@/assets/img/push.png'),
      userId:null,
      userNickName:null,
      commentPic:[]
    }
  },
  methods:{
    upLoad(){
      var _this=this
      wx.chooseImage({
        count: 3, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths=res.tempFilePaths
          tempFilePaths.forEach((item,index)=>{
            _this.wxUpLoad(item)
          })
          //   _this.zm=res.tempFilePaths[0]
          // _this.wxUpLoad(tempFilePaths,type)
        }
      })
    },
    wxUpLoad(tempFilePaths){
      var _this=this
      wx.uploadFile({
        url: 'https://lemon-sea.com/cityRun/sys/upload/uploadPics',      //此处换上你的接口地址
        filePath: tempFilePaths,
        name: 'file',
        header: {
          "Content-Type": "multipart/form-data",
          'accept': 'application/json'
        },
        success: function(res){
          var data=JSON.parse(res.data).returnObject
          _this.commentPic.push(data)
          console.log(_this.commentPic);
        },
        fail: function(res){
          console.log(res);
        }
      })
    },
    onChange2(e){
      console.log(e)
      const index = e.mp.detail.index;
      this.starIndex2=parseFloat(index)
      this.starValue=this.starIndex2===1?'非常差':this.starIndex2===2?'差':this.starIndex2===3?'一般':this.starIndex2===4?'满意':'超赞'
    },
    ok(){
      var _this=this
      var commentPic=this.commentPic.join(',')
      addOrderCommentInfo(this.text,this.starIndex2,commentPic,this.id,this.userId,this.userNickName).then(response=>{
        if(response.data.resultCode===1000){
          $Message({
            content: '保存成功',
            type: 'success'
          })
          setTimeout(()=>{
            wx.reLaunch({url: '/pages/orderList/main'})
          },2000)
        }
      })
    },
    getQuery() {
      this.id = this.$root.$mp.query.id
      this.shopTitle = this.$root.$mp.query.shopTitle
      var userInfo = wx.getStorageSync('userInfo')
      if(userInfo){
        this.userId=userInfo.id
        this.userNickName=userInfo.nickName
      }
    }
  },
  mounted(){
    this.getQuery()
  },
  onLoad(){
    Object.assign(this.$data, this.$options.data())
  }
}
</script>

<style lang="scss" scoped>
.container {
.section{
  width: 100%;
  position: relative;
  textarea{
    margin: 30rpx 25rpx;
    width: 700rpx;
    font-size: 34rpx;
    height: 400rpx;
    background: #fff;
  }
}
  .pics{
    width: 700rpx;
    margin: 0 auto;
    background: #fff;
    display: flex;
  }
  .pic{
     width: 160rpx;
     height: 160rpx;
     background: #f8f8f8;
     display: flex;
     justify-content: center;
     align-items: center;
     img{
       width: 48rpx;
       height: 48rpx;
     }
   }
  .picList{
    margin-left: 20rpx;
    img{
      width: 160rpx;
      height: 160rpx;
    }
  }
  button{
    width:700rpx;
    margin: 0 auto;
    margin-top:40rpx;
    color:#fff;
    background: #2d8cf0;
  }
  .title{
    height: 120rpx;
    line-height: 120rpx;
    background: #fff;
    padding-left: 68rpx;
    .name{
      font-size:32rpx;
    }
  }
  .pf{
    height: 200rpx;
    background: #fff;
    text-align: center;
    p{
      margin-top: 40rpx;
      text-align: center;
      font-size: 28rpx;
    }
  }

}
</style>
