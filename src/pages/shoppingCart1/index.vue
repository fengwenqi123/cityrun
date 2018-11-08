<template>
  <div class="container">
    <scroll-view class="list-all" :scroll-y="true" @scroll="scroll">
    <div class="header-c">
      <div class="backimg">
      </div>
      <div class="shopImg">
        13123123
      </div>
      <div class="title">
        <p>重庆麻辣烫</p>
        <p><span>评价</span><span>月售</span></p>
        <p>满20减5，满35减10，满40减15</p>
        <p>公告：中国餐饮OTO连锁品牌-重庆麻辣烫。配…</p>
      </div>
        <i-tabs :current="current" @change="handleChange">
          <i-tab key="tab1" title="菜单"></i-tab>
          <i-tab key="tab2" title="评价"></i-tab>
          <i-tab key="tab3" title="商家"></i-tab>
        </i-tabs>
    </div>
    <div class="list-c" v-if="pageIndex === 0">
      <scroll-view class="list-l" :scroll-y="true">
        <div class="l-item" :class="{active: index === tagIndex}" v-for="(item, index) in foods" :key="index" @click="categoryClick(item, index)">
          <img :src="item.icon" v-if="item.icon.length > 0">
          <span>{{item.name}}</span>
          <text class="count" v-if="item.count > 0">{{item.count}}</text>
        </div>
      </scroll-view>
      <scroll-view class="list-r" :scroll-y="true">
        <div class="section">
          <span class="title">{{spus.title}}</span>
        </div>
        <div class="item-list" v-for="(item, index) in spus.list" :key="index">
          <div class="item" @click="itemClick(item, index)">
            <div class="item-l">
              <img :src="item.picture">
            </div>
            <div class="item-r">
              <span class="title">{{item.name}}</span>
              <span class="sub-title">{{item.description}}</span>
              <span class="sale-num">{{item.month_saled_content}} {{item.praise_content}}</span>
              <div class="r-t">
                <span class="price">￥{{item.min_price}}</span>
                <div class="sku" v-if="item.attrs.length" @click.stop="skuClick(item, index)">
                  <span>选规格</span>
                  <span class="count" v-if="item.sequence > 0">{{item.sequence}}</span>
                </div>
                <div class="add-item" v-else>
                  <div class="add-l" @click.stop="reduceClick(item, index)" v-if="item.sequence > 0">
                    <i class="icon mt-reduce-o"></i>
                    <span>{{item.sequence}}</span>
                  </div>
                  <div class="add-r" @click.stop="addClick(item, index)">
                    <i class="icon mt-add-o"></i>
                  </div>
                </div>
              </div>
              <div class="tags-c">
                <img class="tags" :src="itm.picture_url" v-for="(itm, idx) in item.product_label_picture_list" :key="idx">
              </div>
            </div>
          </div>
        </div>
      </scroll-view>
    </div>
      <div class="comment-c" v-if="pageIndex === 1">
      <div class="score">
        <div class="num">
          <p class="p1">4.1</p>
          <p class="p2">商家评分</p>
        </div>
        <div class="star">
          <i-rate
            :value="starIndex">
          </i-rate>
        </div>
      </div>
        <div class="comment-list" v-for="(item,index) in pingfenList">
          <div class="top">
            <div class="top_l">
              <p>{{item.name}}</p>
              <p><i-rate :value="item.stat"></i-rate></p>
            </div>
            <div class="top_r">
              <div class="time">{{item.time}}</div>
            </div>
          </div>
          <div class="main">
           {{item.content}}
          </div>
          <div class="pic" v-if="item.img.length>0">
            <img v-for="(item1,index1) in item.img" :src="item1" alt="">
          </div>
        </div>
      </div>
    </scroll-view>
    <i-tabs :current="current" @change="handleChange" v-if="flag&&pageIndex === 0" class="tabs">
      <i-tab key="tab1" title="菜单"></i-tab>
      <i-tab key="tab2" title="评价"></i-tab>
      <i-tab key="tab3" title="商家"></i-tab>
    </i-tabs>
      <scroll-view class="list-l list-l-flxed" v-if="flag&&pageIndex === 0" :scroll-y="true">
        <div class="l-item" :class="{active: index === tagIndex}" v-for="(item, index) in foods" :key="index" @click="categoryClick(item, index)">
          <img :src="item.icon" v-if="item.icon.length > 0">
          <span>{{item.name}}</span>
          <text class="count" v-if="item.count > 0">{{item.count}}</text>
        </div>
      </scroll-view>
    <div class="footer-c" v-if="pageIndex === 0">
      <div class="c-t">
        <span>{{reduceTip}}</span>
      </div>
      <div class="c-m">
        <div class="l">
          <span class="price" v-if="totalPrice > 0 || productCount > 0">￥<span>{{totalPrice}}</span></span>
          <div class="m-l">
            <span class="l-l">另需配送费￥{{shopInfo.support_pay}}</span>
            <div class="l-m"></div>
            <span class="l-r">支持自取</span>
          </div>
        </div>
        <div class="m-r" :style="{'background-color': btnTitle === '去结算' ? '#F0D179' : '#2F2F2F'}" @click="orderClick">
          <span :style="{color: btnTitle === '去结算' ? '#333' : '#666'}">{{btnTitle}}</span>
        </div>
      </div>
      <div class="cart-c">
        <img mode='widthFix' :src="productCount > 0 ? 'http://ovyjkveav.bkt.clouddn.com/18-9-28/55877074.jpg' : 'http://ovyjkveav.bkt.clouddn.com/18-9-25/77715001.jpg'">
        <span v-if="productCount > 0">{{productCount}}</span>
      </div>
    </div>
  </div>
</template>

<script>

import {jointStyle} from "@/utils/style";
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import {formatYMD} from '@/utils/formatTime'
import {_array} from '@/utils/arrayExtension'

export default {
  data() {
    return {
      tagIndex: 0,
      pageIndex: 0,
      current:'tab1',
      starIndex:4,
      left: '40rpx',
      isActive:false,
      flag:false,
      src:'http://img3.imgtn.bdimg.com/it/u=3360690558,3623061169&fm=11&gp=0.jpg',
      stars: [1, 2, 3, 4],
      pingfenList:[
        {
          name:'岁月清风',
          id:1,
          stat:4,
          time:'2018.09.30',
          content:'好吃好吃，麻辣烫很好吃，味道很棒，下次好来，还要推荐朋友来吃',
          img:['http://img3.imgtn.bdimg.com/it/u=3360690558,3623061169&fm=11&gp=0.jpg']
        },
        {
          name:'岁月清风',
          id:1,
          stat:4,
          time:'2018.09.30',
          content:'好吃好吃，麻辣烫很好吃，味道很棒，下次好来，还要推荐朋友来吃',
          img:['http://img3.imgtn.bdimg.com/it/u=3360690558,3623061169&fm=11&gp=0.jpg',
            'http://img3.imgtn.bdimg.com/it/u=3360690558,3623061169&fm=11&gp=0.jpg',
            'http://img3.imgtn.bdimg.com/it/u=3360690558,3623061169&fm=11&gp=0.jpg']
        },
        {
          name:'岁月清风',
          id:1,
          stat:4,
          time:'2018.09.30',
          content:'好吃好吃，麻辣烫很好吃，味道很棒，下次好来，还要推荐朋友来吃',
          img:[]
        }
      ]
    }
  },
  computed: {
    ...mapState("shoppingCart", ["shopInfo", "foods", "spus", "commentInfo", "visibleSkuModal", "visibleItemModal", "skuInfo", "previewInfo"]),
    lineStyle() {
      let left = this.left
      let style = {left};
      return jointStyle(style);
    },
    totalPrice() {
      var price = 0
      this.foods.map(item => price += item.totalPrice)
      return parseFloat(price).toFixed(1);
    },
    productCount() {
      var count = 0
      this.foods.map(item => count += item.count)
      return count
    },
    reduceTip() {
      var content = this.shopInfo.prompt_text
      var price = 0
      this.foods.map(item => price += item.totalPrice)
      if (price <= 0) return content
      if (price < this.shopInfo.min_price) {
        var value = parseFloat(this.shopInfo.min_price - price).toFixed(1)
        return `还差 ${value}元 就能起送`
      }
      var activity_info = this.shopInfo.activity_info
      for (let i = 0; i < activity_info.length; i++) {
        const item = activity_info[i];
        if (price < item.priceLower) {
          var str = parseFloat(item.priceLower - price).toFixed(1)
          if (i === 0) {
            this.changeReduceFeeDataMut(0.0)
            return `再买 ${str}元 可减 ${item.reduce}元 [去凑单]`
          } else {
            var perItem = activity_info[i - 1];
            this.changeReduceFeeDataMut(perItem.reduce)
            return `已减${perItem.reduce}元 再买 ${str}元 可减 ${item.reduce}元 [去凑单]`
          }
        } else {
          continue
        }
      }
      var lastItem = activity_info[activity_info.length - 1]
      this.changeReduceFeeDataMut(lastItem.priceLower)
      return `已满 ${lastItem.priceLower} 可减 ${lastItem.reduce}`
    },
    btnTitle() {
      var content = `${this.shopInfo.min_price}元起送`
      var price = 0
      this.foods.map(item => price += item.totalPrice)
      if (price <= 0) return content
      if (price < this.shopInfo.min_price) {
        var value = parseFloat(this.shopInfo.min_price - price).toFixed(1)
        return `还差${value}元`
      } else {
        return '去结算'
      }
    }
  },
  methods: {
    ...mapMutations("shoppingCart", ["changeReduceFeeDataMut", "changeSkuModalMut", "changeItemModalMut"]),
    ...mapActions("shoppingCart", ["getMenuDataAction", "getCommentDataAction", "getCategoryMenuDataAction", "addItemAction", "reduceItemAction", "closeShoppingCartAction", "selectSkuAction", "changeSkuDataMut", "attrSelectAction", "changeSkuModalDataAction", "previewItemAction"]),
    orderClick() {
      var price = 0
      this.foods.map(item => price += item.totalPrice)
      if (price < this.shopInfo.min_price) return;
      this.closeShoppingCartAction()
    },
    scroll(e){
      console.log(e.mp.detail.scrollTop)
      if(e.mp.detail.scrollTop>=214){
        this.flag=true
      }else{
        this.flag=false
      }
    },
    handleChange (detail) {
      if(detail.mp.detail.key==='tab1'){
        this.pageIndex = 0
      }
      if(detail.mp.detail.key==='tab2'){
        this.pageIndex = 1
        this.getCommentDataAction()
      }
      if(detail.mp.detail.key==='tab3'){
        this.pageIndex = 2
      }
      this.current=detail.mp.detail.key
    },
    categoryClick(item, index) {
      this.tagIndex = index;
      this.getCategoryMenuDataAction({index})
    },
    menuClick() {
      this.left = 40 + 'rpx'
      this.pageIndex = 0
    },
    commentClick() {
      this.left = 182 + 'rpx'
      this.pageIndex = 1
      this.getCommentDataAction()
    },
    shopClick() {
      this.left = 325 + 'rpx'
      this.pageIndex = 2
    },
    skuClick(item, index) {
      this.selectSkuAction({item, index})
    },
    addClick(item, index) {
      this.addItemAction({item, index})
    },
    reduceClick(item, index) {
      this.reduceItemAction({item, index})
    },
    closeSku() {
      this.changeSkuModalMut(false)
    },
    attrClick(itm, idx, setIdx) {
      this.attrSelectAction({itm, idx, setIdx})
    },
    modalAdd() {
      var skuInfo = this.skuInfo
      const {item, index} = skuInfo
      this.addItemAction({item, index})
      this.changeSkuModalDataAction({num: 1})
    },
    modalReduce() {
      var skuInfo = this.skuInfo
      const {item, index} = skuInfo
      this.reduceItemAction({item, index})
      this.changeSkuModalDataAction({num: -1})
    },
    closePreview() {
      this.changeItemModalMut(false)
    },
    itemClick(item ,index) {
      this.previewItemAction({item, index})
    },
    previewAdd() {
      var item = this.previewInfo
      this.addItemAction({item, index:item.preIndex})
    },
    previewReduce() {
      var item = this.previewInfo
      this.reduceItemAction({item, index:item.preIndex})
    },
    previewAttr() {
      this.changeItemModalMut(false)
      var item = this.previewInfo
      this.selectSkuAction({item, index: item.preIndex})
    }
  },
  mounted() {
    this.getMenuDataAction()
  }
}
</script>

<style lang="scss" scoped>
  .tabs{
    background: #fff;
    width: 100%;
    position: fixed;
    top: 0px;
  }
  .list-l-flxed{
    position: fixed;
    top: 74rpx;
  }
  .list-l {
    display: flex;
    flex-direction: column;
    width: 160rpx;
    background-color: $page-bgcolor;
    .l-item {
      display: flex;
      width: 160rpx;
      align-items: center;
      justify-content: center;
      padding: 20rpx;
      box-sizing: border-box;
      position: relative;
      img {
        width: 30rpx;
        height: 30rpx;
        background-size: cover;
        border-radius: 15rpx;
      }
      span {
        font-size: 24rpx;
        color: $textDarkGray-color;
        margin-left: 10rpx;
      }
      .count {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $mtRed-color;
        width: 30rpx;
        height: 30rpx;
        border-radius: 15rpx;
        right: 0;
        top: 6rpx;
        position: absolute;
        font-size: 20rpx;
        color: white;
      }
    }
    .active {
      background-color: white;
      span {
        color: #000;
        font-weight: bold;
      }
    }
  }
.container {
  position: fixed;
  .list-all{
    position: absolute;
    height: 100%;
    padding-bottom: 60rpx;
  }
  display: flex;
  flex-direction: column;
  background-color: $page-bgcolor;
  .header-c {
    position: relative;
    width: 100%;
    .backimg{
      height: 200rpx;
    }
    .shopImg{
      width:160rpx;
      height:160rpx;
      position:absolute;
      background:red;
      margin-left:294rpx;
      top:76rpx;
    }
    .title{
      padding-top: 50rpx;
      height: 180rpx;
      background: #ccc;
      text-align: center;
      font-size: 24rpx;
      p:nth-child(1){
        font-size: 32rpx;
      }
      span{
        margin-left: 20rpx;
      }
    }
    .active{
      position: fixed;
      top: 0rpx;
    }
  }
  .list-c {
    display: flex;
    padding-bottom: 212rpx;
    top: 220rpx;
    bottom: 200rpx;
    .list-r {
      display: flex;
      flex-direction: column;
      flex: 1;
      background-color: white;
      .section {
        display: flex;
        height: 70rpx;
        align-items: center;
        margin-left: 20rpx;
        span {
          font-size: 28rpx;
          color: $textBlack-color;
        }
      }
      .item-list {
        display: flex;
        margin: 0 20rpx;
        flex-direction: column;
        .item {
          display: flex;
          margin-bottom: 30rpx;
          .item-l {
            img {
              width: 160rpx;
              height: 160rpx;
              background-size: cover;
            }
          }
          .item-r {
            display: flex;
            flex-direction: column;
            margin-left: 20rpx;
            justify-content: space-between;
            flex: 1;
            .title {
              font-size: 28rpx;
              color: $textBlack-color;
              font-weight: bold;
              overflow: hidden;
              line-height: 30rpx;
              height: 30rpx;
            }
            .sub-title {
              font-size: 20rpx;
              color: $textDarkGray-color;
              line-height: 30rpx;
              overflow: hidden;
              height: 30rpx;
              margin-top: 10rpx;
            }
            .sale-num {
              font-size: 20rpx;
              color: $textDarkGray-color;
              margin-top: 10rpx;
            }
            .r-t {
              display: flex;
              align-items: center;
              justify-content: space-between;
              .price {
                font-size: 32rpx;
                color: $mtRed-color;
                font-weight: bold;
              }
              .sku {
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: $theme-color;
                padding: 8rpx 12rpx;
                border-radius: 25rpx;
                position: relative;
                span {
                  font-size: 20rpx;
                  color: $textBlack-color
                }
                .count {
                  width: 30rpx;
                  height: 30rpx;
                  background-color: $mtRed-color;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  position: absolute;
                  color: white;
                  font-size: 20rpx;
                  right: 0;
                  top: -14rpx;
                  border-radius: 15rpx;
                }
              }
              .add-item {
                display: flex;
                align-items: center;
                .add-l {
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  i {
                    font-size: 36rpx;
                    color: $textGray-color;
                  }
                  span {
                    font-size: 24rpx;
                    color: $textBlack-color;
                    margin: 0 20rpx;
                  }
                }
                .add-r {
                  i {
                    color: $theme-color;
                  }
                }
              }
            }
            .tags-c {
              display: flex;
              align-items: center;
              margin-top: 10rpx;
              flex-wrap: wrap;
              img {
                width: 60rpx;
                height: 30rpx;
                background-size: cover;
              }
            }
          }
        }
      }
    }
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
      color: transparent;
    }
  }
  .comment-c {
    .score{
      height: 164rpx;
      display: flex;
      margin-left: 100rpx;
      align-items: center;
      .num{
        .p1{
          color: #8EE5EE;
          font-size: 56rpx;
        }
        .p2{
          font-size: 24rpx;
        }
      }
      .star{
        margin-top: 10rpx;
        margin-left: 150rpx;
      }
    }
    .comment-list{
      padding: 36rpx 60rpx 26rpx 60rpx;
      border-top: 1px solid #e6e6e6;
      .top{
        display: flex;
        justify-content:space-between;
      }
      .main{
        margin-top: 28rpx;
      }
      .pic{
        margin-top: 20rpx;
        display: flex;
        justify-content:flex-start;
        img{
          margin-left: 10rpx;
          width: 200rpx;
          height: 200rpx;
        }
        img:nth-child(1){
          margin: 0rpx;
        }
      }
    }
  }
  .shop-info {
    display: flex;
    position: fixed;
    top: 220rpx;
    flex-direction: column;
    width: 100%;
    height: 100%;
    .address {
      display: flex;
      align-items: center;
      height: 70rpx;
      margin-top: 20rpx;
      background-color: white;
      padding: 0 20rpx;
      i {
        font-size: 38rpx;
        color: $textGray-color;
      }
      i:last-child {
        color: $textBlack-color;
      }
      span {
        flex: 1;
        margin: 0 20rpx;
        font-size: 24rpx;
        color: $textBlack-color;
      }
    }
    .archive {
      @extend .address;
      i:last-child {
        font-size: 24rpx;
        color: $textGray-color;
      }
    }
    .delivery {
      display: flex;
      flex-direction: column;
      margin-top: 20rpx;
      background-color: white;
      padding: 0 16rpx;
      .top {
        display: flex;
        align-items: center;
        height: 80rpx;
        padding-left: 10rpx;
        border-bottom: 2rpx solid $spLine-color;
        i {
          font-size: 32rpx;
          color: $textGray-color;
        }
        span {
          font-size: 24rpx;
          color: $textBlack-color;
          margin: 0 20rpx;
        }
      }
      .btm {
        @extend .top;
        border-bottom: 0 solid $spLine-color;
      }
    }
    .service {
      display: flex;
      flex-direction: column;
      margin-top: 20rpx;
      background-color: white;
      padding: 0 16rpx;
      .top {
        display: flex;
        align-items: center;
        height: 80rpx;
        padding-left: 14rpx;
        border-bottom: 2rpx solid $spLine-color;
        i {
          font-size: 28rpx;
          color: $textGray-color;
        }
        .l {
          font-size: 24rpx;
          color: $textBlack-color;
          margin-left: 20rpx;
        }
        .k {
          width: 30rpx;
          height: 30rpx;
          align-items: center;
          justify-content: center;
          display: flex;
          text-align: center;
          border: 2rpx solid #0095D8;
          color: #0095D8;
          font-size: 20rpx;
          margin-left: 10rpx;
        }
        .v {
          font-size: 24rpx;
          color: $textBlack-color;
          margin-left: 10rpx;
        }
      }
      .discounts {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 0 16rpx;
        padding-bottom: 20rpx;
        .item {
          display: flex;
          align-items: center;
          height: 60rpx;
          margin-top: 10rpx;
          img {
            width: 30rpx;
            height: 30rpx;
          }
          span {
            font-size: 24rpx;
            color: $textBlack-color;
            margin-left: 20rpx;
          }
        }
      }
    }
  }
  .footer-c {
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 0;
    height: 200rpx;
    background-color: #333;
    z-index: 990;
    width: 100%;
    .c-t {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50rpx;
      background-color: #FFEFD2;
      span {
        font-size: 20rpx;
        color: $textBlack-color;
      }
    }
    .c-m {
      display: flex;
      justify-content: center;
      height: 88rpx;
      margin-left: 140rpx;
      .l {
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: space-around;
        .price {
          font-size: 24rpx;
          color: white;
          span {
            font-size: 40rpx;
            color: white;
          }
        }
        .m-l {
          display: flex;
          align-items: center;
          .l-l {
            font-size: 24rpx;
            color: $textDarkGray-color;
          }
          .l-m {
            width: 2rpx;
            height: 20rpx;
            background-color: $textDarkGray-color;
            margin: 0 20rpx;
          }
          .l-r {
            font-size: 24rpx;
            color: $textDarkGray-color;
          }
        }
      }
      .m-r {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 200rpx;
        height: 88rpx;
        background-color: #2F2F2F;
        span {
          font-size: 32rpx;
          color: $textDarkGray-color;
          font-weight: bold;
        }
      }
    }
    .cart-c {
      position: absolute;
      left: 20rpx;
      top: 20rpx;
      z-index: 991;
      img {
        width: 100rpx;
        height: 100rpx;
        background-size: cover;
      }
      span {
        position: absolute;
        right: 0;
        top: 20rpx;
        background-color: $mtRed-color;
        width: 30rpx;
        height: 30rpx;
        border-radius: 15rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 20rpx;
      }
    }
  }
  .sku-modal {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.3);
    z-index: 996;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    .modal-c {
      display: flex;
      flex-direction: column;
      background-color: white;
      width: 90%;
      margin-right: 40rpx;
      margin-left: 40rpx;
      border-radius: 10rpx;
      .header {
        display: flex;
        flex-direction: column;
        .title {
          font-size: 32rpx;
          color: $textDarkGray-color;
          align-self: center;
          margin-top: 20rpx;
        }
        .attrs {
          display: flex;
          flex-direction: column;
          margin: 0 20rpx;
          margin-top: 20rpx;
          .name {
            font-size: 28rpx;
            color: $textBlack-color;
          }
          .sku {
            display: flex;
            flex-direction: row;
            width: 100%;
            flex-wrap: wrap;
            margin-bottom: 20rpx;
            .item {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 140rpx;
              height: 50rpx;
              border: 2rpx solid $spLine-color;
              border-radius: 4rpx;
              margin-top: 20rpx;
              margin-right: 20rpx;
              span {
                font-size: 24rpx;
                color: $textBlack-color
              }
            }
            .selected {
              background-color: #FFF9F4;
              border: 2rpx solid $theme-color;
              span {
                color: $theme-color;
              }
            }
          }
        }
      }
      .footer {
        display: flex;
        align-items: center;
        background-color: $page-bgcolor;
        height: 100rpx;
        border-bottom-right-radius: 10rpx;
        border-bottom-left-radius: 10rpx;
        padding: 0 20rpx;
        .f-l {
          display: flex;
          align-items: center;
          flex: 1;
          .price {
            font-size: 36rpx;
            color: $mtRed-color;
            font-weight: bold;
          }
          .sku {
            font-size: 20rpx;
            color:  $textBlack-color;
            margin-left: 20rpx;
          }
        }
        .f-r {
          display: flex;
          align-items: center;
          .shopping-c {
            display: flex;
            align-items: center;
            height: 60rpx;
            border-radius: 30rpx;
            padding: 0 20rpx;
            background-color: $theme-color;
            i {
              font-size: 28rpx;
              color:  $textBlack-color;
            }
            span {
              font-size: 24rpx;
              color:  $textBlack-color;
              margin-left: 10rpx;
            }
          }
          .add {
            display: flex;
            flex-direction: row;
            align-items: center;
            span {
              font-size: 24rpx;
              color: $textDarkGray-color;
              margin: 0 20rpx;
            }
          }
        }
      }
    }
    .cancle {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 40rpx;
      width: 70rpx;
      height: 70rpx;
      border-radius: 35rpx;
      background: rgba($color: #000000, $alpha: 0.5);
      border: 2rpx solid $textGray-color;
      i {
        font-size: 32rpx;
        color: white;
      }
    }
  }
  .previewModal {
    @extend .sku-modal;
    .modal-c {
      .header-p {
        display: flex;
        flex-direction: column;
        .item-img {
          width: 100%;
          height: 400rpx;
          background-color: #E7AC40;
          border-top-left-radius: 10rpx;
          border-top-right-radius: 10rpx;
        }
        .title {
          font-size: 28rpx;
          color: $textBlack-color;
          font-weight: bold;
          margin-left: 16rpx;
          margin-top: 16rpx;
        }
        .saled {
          display: flex;
          align-items: center;
          flex-direction: row;
          margin: 0 16rpx;
          margin-top: 10rpx;
          .l {
            font-size: 20rpx;
            color: $textDarkGray-color;
          }
          .r {
            @extend .l;
            margin-left: 30rpx;
          }
        }
        .tags-c {
          display: flex;
          align-items: center;
          margin: 0 16rpx;
          margin-top: 10rpx;
          flex-wrap: wrap;
          img {
            width: 60rpx;
            height: 30rpx;
            background-size: cover;
          }
        }
        .desc {
          font-size: 20rpx;
          color: $textDarkGray-color;
          margin-left: 16rpx;
          margin-top: 30rpx;
          margin-bottom: 20rpx;
        }
      }
      .footer-p {
        display: flex;
        align-items: center;
        height: 80rpx;
        background-color: $page-bgcolor;
        padding: 0 20rpx;
        border-bottom-left-radius: 10rpx;
        border-bottom-right-radius: 10rpx;
        .l {
          font-size: 36rpx;
          color: $mtRed-color;
          flex: 1;
          font-weight: bold;
        }
        .r {
          display: flex;
          align-items: center;
          .add-c {
            display: flex;
            align-items: center;
            .c-l {
              display: flex;
              align-items: center;
            }
            span {
              font-size: 20rpx;
              color: $textBlack-color;
              margin: 0 20rpx;
            }
          }
          .attr {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: $theme-color;
            padding: 8rpx 12rpx;
            border-radius: 25rpx;
            position: relative;
            span {
              font-size: 20rpx;
              color: $textBlack-color
            }
            .count {
              width: 30rpx;
              height: 30rpx;
              background-color: $mtRed-color;
              display: flex;
              align-items: center;
              justify-content: center;
              position: absolute;
              color: white;
              font-size: 20rpx;
              right: 0;
              top: -14rpx;
              border-radius: 15rpx;
            }
          }
        }
      }
    }
  }
}
</style>
