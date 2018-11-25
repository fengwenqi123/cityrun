<template>
  <div class="container">
    <div class="top">
      <div class="dw">
        <img :src="dingwei" alt="">
      </div>
      <div class="middle">
        <p>浙江省杭州市余杭区 海智中心 4号楼1703</p>
        <p>李 先生    18747778907</p>
      </div>
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
         cdasdasd
       </div>
       <p class="bt">商家配送</p>
       </div>
      <div class="item-list">
        <div class="item">
          <div class="img">
            <img :src="dingwei" alt="">
          </div>
          <div class="mid">
            <p>米饭</p>
            <p>x3</p>
          </div>
          <div class="jiage">
            ￥5
          </div>
        </div>
        <div class="item">
          <div class="img">
            <img :src="dingwei" alt="">
          </div>
          <div class="mid">
            <p>米饭</p>
            <p>x3</p>
          </div>
          <div class="jiage">
            ￥5
          </div>
        </div>
        <div class="item">
          <div class="img">
            <img :src="dingwei" alt="">
          </div>
          <div class="mid">
            <p>米饭</p>
            <p>x3</p>
          </div>
          <div class="jiage">
            ￥5
          </div>
        </div>
      </div>
      <div class="other">
        <div class="Packing">
          <span class="tit">包装费</span>
          <span class="num">￥3</span>
        </div>
        <div class="Delivery">
          <span class="tit">配送费</span>
          <span class="num">￥3</span>
        </div>
        <div class="man clearfloat">
          <span class="tabs">减</span>
          <span class="font">满减活动</span>
          <span class="jiage">￥5</span>
        </div>
        <div class="new">
          <span class="tabs" style="background: green;">新</span>
          <span class="font">新客立减</span>
          <span class="jiage">￥5</span>
        </div>
        <div class="call clearfloat">
          <i class="icon mt-phones-o"></i>
          <span class="font">联系商家</span>
          <span class="xiaoji">小计：￥21</span>
          <span class="youhui">已优惠￥4</span>
        </div>
      </div>
    </div>
    <div class="beizhu">
      <div class="bz clearfloat">
        <span>备注</span>
        <span>口味，偏好等要求></span>
      </div>
      <div class="cyNum clearfloat">
        <span>餐具数量</span>
        <span>未选择></span>
      </div>
    </div>
    <div class="goPay">
      <i-button type="info">去支付</i-button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      dingwei:require('@/assets/img/dingwei.png'),
      clock:require('@/assets/img/clock.png'),
    }
  },
  computed: {
  },
  methods: {
  },
  mounted() {
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
      margin-right: 100rpx;
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
        background: cornflowerblue;
        color: #fff;
      }
    }
    .item-list{
      .item{
        display: flex;
        background: #F8F8F8;
        margin-top: 10rpx;
        .img{
          img{
            width: 100rpx;
            height: 100rpx;
          }
        }
        .mid{
          margin-left: 24rpx;
          margin-right: 420rpx;
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
}
</style>
