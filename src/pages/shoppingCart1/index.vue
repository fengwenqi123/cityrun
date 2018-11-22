<template>
  <div class="container">
    <scroll-view class="list-all" :scroll-y="true" @scroll="scroll">
    <div class="header-c">
      <div class="backimg">
      </div>
      <div class="shopImg">
        <img :src="shopLogo" alt="">
      </div>
      <div class="title">
        <p>{{shopTitle}}</p>
        <p><span>评分:{{avgStar}}</span><span>月售:{{orderCount}}</span></p>
        <p v-for="(item,index) in Discount" :key="index">{{item}}</p>
        <p>公告：{{shopNotice}}</p>
      </div>
        <i-tabs :current="current" @change="handleChange">
          <i-tab key="tab1" title="菜单"></i-tab>
          <i-tab key="tab2" title="评价"></i-tab>
          <i-tab key="tab3" title="商家"></i-tab>
        </i-tabs>
    </div>
    <div class="list-c" v-if="pageIndex === 0">
      <scroll-view class="list-l" :scroll-y="true" :scrolltop="scrollTop">
        <div class="l-item" :class="{active: index === tagIndex}" v-for="(item, index) in TypeList" :key="index" @click="categoryClick(item, index)">
          <span>{{item.title}}</span>
        </div>
      </scroll-view>
      <scroll-view class="list-r" :scroll-y="true">
        <div class="item-list" v-if="shopList&&item.goodsTypeId===cpId" v-for="(item, index) in shopList" :key="index">
          <div class="item" @click="itemClick(item, index)">
            <span class="self" v-if="item.goodsPriceDis">折扣单品</span>
            <div class="item-l">
              <img :src="item.goodsPic">
            </div>
            <div class="item-r">
              <span class="title">{{item.goodsTitle}}</span>
              <span class="sub-title">{{item.goodsTitleSimple}}</span>
              <span class="sale-num">月售：{{item.biz30Day}}</span>
              <div class="r-t">
                <span class="price" v-if="!item.goodsPriceDis">￥{{item.priceOut}}</span>
                <span class="price" v-if="item.goodsPriceDis">￥{{item.goodsPriceDis}}</span>
                <div class="add-item">
                  <div class="add-l" @click.stop="reduceClick(index)" v-if="item.sequence">
                    <i class="icon mt-reduce-o"></i>
                    <span>{{item.sequence}}</span>
                  </div>
                <div class="add-r" @click.stop="addClick(index)">
                  <i class="icon mt-add-o"></i>
                </div>
                </div>
              </div>
              <!--<div class="tags-c">-->
                <!--<img class="tags" :src="itm.picture_url" v-for="(itm, idx) in item.product_label_picture_list" :key="idx">-->
              <!--</div>-->
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
      <div class="shop-info"  v-if="pageIndex === 2">
        <div class="top">
          <h4>活动与公告</h4>
          <div>
            <p v-for="(item,index) in tags" :key="index">
              <i-tag
                class="i-tags"
                :name="item.type"
                :color="item.type==='满'?'green':item.type==='新'?'red':'yellow'">
                {{item.type}}
              </i-tag>
              {{item.name}}
            </p>
            <div class="Notice">
              公告：中国餐饮OTO连锁品牌-重庆麻辣烫。配中国餐饮OTO连锁品牌-重庆麻辣烫。配中国餐饮OTO连锁品牌-重庆麻辣烫。配中国餐饮OTO连锁品牌-重庆麻辣烫。配中国餐饮OTO连锁品牌-重庆麻辣烫。配
            </div>
          </div>
        </div>
        <div class="info">
          <h4>商家信息</h4>
          <ul class="clearfix">
            <li>
              <span>商家名称</span>
              <span>重庆麻辣烫</span>
            </li>
            <li>
              <span>商家品类</span>
              <span>美食</span>
            </li>
            <li>
              <span>商家地址</span>
              <span>浙江省杭州市余杭区五常街道瑞谷中心6装206室</span>
            </li>
            <li>
              <span>商家电话</span>
              <span>18758859435</span>
            </li>
          </ul>
        </div>
        <div class="pic">
          <h4>商家图片</h4>
          <div class="shipPic">
            <img v-for="(item,index) in shipPic" :key="index" :src="item" alt="">
          </div>
        </div>
      </div>
    </scroll-view>
    <i-tabs :current="current" @change="handleChange" v-if="flag" class="tabs">
      <i-tab key="tab1" title="菜单"></i-tab>
      <i-tab key="tab2" title="评价"></i-tab>
      <i-tab key="tab3" title="商家"></i-tab>
    </i-tabs>
      <scroll-view class="list-l list-l-flxed" v-if="flag&&pageIndex === 0" :scroll-y="true">
        <div class="l-item" :class="{active: index === tagIndex}" v-for="(item, index) in TypeList" :key="index" @click="categoryClick(item, index)">
          <span>{{item.title}}</span>
        </div>
      </scroll-view>
    <div class="footer-c" v-if="pageIndex === 0">
      <div class="c-t">
        <span>{{tit}}</span>
      </div>
      <div class="c-m">
        <div class="l">
          <div class="m-l">
            <div class="prices pricesAll" v-if="prices">￥{{prices}}</div>
            <span class="l-l" v-if="shopInfo">另需配送费￥{{shopInfo.shopSendPrice/100}}</span>
          </div>
        </div>
        <div class="m-r" style="background: #2F2F2F;" >
          <span v-if='shopInfo&&prices<shopInfo.shopSendMinprice/100'>{{shopInfo.shopSendMinprice/100}}起送</span>
          <span @click="jiesuan" v-if='shopInfo&&prices>=shopInfo.shopSendMinprice/100' class="jiesuan">去结算</span>
        </div>
      </div>
      <div class="cart-c">
        <img mode='widthFix' :src="prices > 0 ?yellow : block">
        <span v-if="Price_len > 0">{{Price_len}}</span>
      </div>
      <div class="zhezhao" v-if="flag1&&selectObj">
        <div class="top">
          <div class="img">
            <img :src="selectObj.goodsPic" alt="">
          </div>
          <div class="font">
            <p>{{selectObj.goodsTitle}}</p>
            <p>已选：{{selectObj.specList[spanselect].title}}</p>
            <p>￥{{selectObj.specList[spanselect].priceOut/100}}</p>
          </div>
        </div>
        <div class="guige">
          <p>规格</p>
          <div>
            <i-row>
              <i-col span="8" i-class="col-class" v-for="(item,index) in selectObj.specList" :key="index">
                <span :class="{spanselect:spanselect===index}" @click="seleced(item,index)" class="spanset">{{item.title}}</span>
              </i-col>
            </i-row>
          </div>
          <div class="buttons">
            <i-button @click="sure(selectObj)" type="info">确定</i-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {jointStyle} from "@/utils/style";
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import {formatYMD} from '@/utils/formatTime'
import {_array} from '@/utils/arrayExtension'
import {Lists,commentList,GoodsTypeList,getShop,createOrder} from '@/api/shoppingCart.js'

export default {
  data() {
    return {
      tagIndex: 0,
      spanselect:0,
      prices:null,
      pageIndex: 0,
      current:'tab1',
      yellow:require('@/assets/img/yellow.jpg'),
      block:require('@/assets/img/black.jpg'),
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
          img:[]
        },
        {
          name:'岁月清风',
          id:1,
          stat:4,
          time:'2018.09.30',
          content:'好吃好吃，麻辣烫很好吃，味道很棒，下次好来，还要推荐朋友来吃',
          img:[]
        }
      ],
      tags:[
        {
          type:'满',
          name:'满20减5，满35减10，满40减15，满100减30',
          id:1
        },
        {
          type:'新',
          name:'本店新客立减2元',
          id:2
        },
        {
          type:'折',
          name:'单品折扣',
          id:3
        }
      ],
      shipPic:[
        // 'http://img3.imgtn.bdimg.com/it/u=3360690558,3623061169&fm=11&gp=0.jpg',
        // 'http://img3.imgtn.bdimg.com/it/u=3360690558,3623061169&fm=11&gp=0.jpg',
        // 'http://img3.imgtn.bdimg.com/it/u=3360690558,3623061169&fm=11&gp=0.jpg'
      ],
      obj:{},
      Comment:{},
      shopList:null,
      TypeList:null,
      cpId:null,
      shopInfo:null,
      Price_len:null,
      flag1:false,
      selectObj:null,
      PriceAll:0,
      priceOut:0,
      Packing:0,
      objAll:[],
      index:null,
      Discount:null,
      manjian:null,
      tit:'',
      arr:null,
      isNew:null,
      objCopy:null,
      goodsIds:[],
      goodsIdses:null
    }
  },
  computed: {
    // ...mapState("shoppingCart", ["shopInfo", "foods", "spus", "commentInfo", "visibleSkuModal", "visibleItemModal", "skuInfo", "previewInfo"]),
    shopLogo(){
        return this.$store.state.home.shopLogo
      },
    shopNotice(){
      return this.$store.state.home.shopNotice
    },
    avgStar(){
      return this.$store.state.home.avgStar
    },
    orderCount(){
      return this.$store.state.home.orderCount
    },
    shopTitle(){
      return this.$store.state.home.shopTitle
    },
  },
  onShow(options){
    this.flag=false
  },
  created(){
  },
  methods: {
    // ...mapMutations("shoppingCart", ["changeSpusDataMut", "changeSkuModalMut", "changeItemModalMut"]),
    // ...mapActions("shoppingCart", ["getMenuDataAction", "getCommentDataAction", "getCategoryMenuDataAction", "addItemAction", "reduceItemAction", "closeShoppingCartAction", "selectSkuAction", "changeSkuDataMut", "attrSelectAction", "changeSkuModalDataAction", "previewItemAction"]),
    scroll(e){
      console.log(e.mp.detail.scrollTop)
      if(e.mp.detail.scrollTop>=225){
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
        // this.getCommentDataAction()
      }
      if(detail.mp.detail.key==='tab3'){
        this.pageIndex = 2
      }
      this.current=detail.mp.detail.key
    },
    categoryClick(item, index) {
      this.tagIndex = index;
      this.cpId=item.id
    },
    addClick(index) {
      this.index=index
      var shopList=this.shopList
      shopList.forEach((item,indexs)=>{
        if(index===indexs){
          if(item.specList.length>0){
            this.flag1=true
            this.selectObj=item
          }else{
            var obj={}
            if(item.goodsPriceDis&&item.goodsPriceDisNum!==null&&item.goodsPriceDisNum>item.sequence){
              if(item.goodsPriceDisAdd===1){
                obj.priceOut=item.goodsPriceDis
                obj.priceRoom=item.goodsPriceDis
                obj.XjOut=item.priceOut-item.goodsPriceDis
                obj.XjRoom=item.priceRoom-item.goodsPriceDis
              }
            }else{
              obj.priceOut=item.priceOut
              obj.priceRoom=item.priceRoom
              obj.XjOut=0
              obj.XjRoom=0
            }
            obj.index=this.index
            obj.lengs=[]
            obj.goodsTitle=item.goodsTitle
            obj.goodsId=item.id
            obj.goodsPackAmount=item.goodsPackAmount
            obj.goodsStock=item.goodsStock
            item.sequence+=1
            obj.sequence=item.sequence
            this.objAll.push(obj)
            console.log(this.objAll)
          }
        }
      })
      this.shopList=JSON.parse(JSON.stringify(shopList))
      this.price()
    },
    reduceClick(index) {
      this.index=index
      var shopList=this.shopList
      shopList.forEach((item,indexs)=>{
        if(index===indexs){
          if(item.sequence>0){
            item.sequence-=1
            var num=[]
            this.objAll.forEach((item,index)=>{
              if(this.index===item.index){
                num.push(index)
              }
            })
            this.objAll.splice(num[num.length-1],1)
            // console.log(this.objAll)
          }
        }
      })
      this.shopList=JSON.parse(JSON.stringify(shopList))
      this.price()
    },
    // 获取包装费，商品费用和数量
    price(){
      this.Price_len=this.objAll.length
      this.priceOut=0
      this.Packing=0
      this.objAll.forEach((item,index)=>{
        this.priceOut+=parseInt(item.priceOut)
        this.Packing+=parseInt(item.goodsPackAmount)
      })
      this.PriceAll=this.priceOut+this.Packing
      this.prices=this.PriceAll
      this.manjianF()
    },
    manjianF(){
      this.tit=''
     var f= this.manjian.findIndex((item,index)=>{
          return parseInt(item.j1)>parseInt(this.prices)
      })
     if(f===-1){
       this.arr=this.manjian[this.manjian.length-1]
       this.tit=`已满${this.arr.j1},可减${this.arr.j2}`
     }else if(f===0){
       this.tit=''
       this.arr=''
     }else{
        f-=1
       this.arr=this.manjian[f]
       this.tit=`已满${this.arr.j1},可减${this.arr.j2}`
     }
    },
    seleced(item,index){
      this.spanselect=index
    },
    sure(obj){
      var obj=JSON.parse(JSON.stringify(obj))
      var index=this.spanselect
      if(obj.goodsPriceDis&&obj.goodsPriceDisNum!==null&&obj.goodsPriceDisNum>obj.sequence){
        if(obj.goodsPriceDisAdd===1){
          obj.specList[index].priceOut=obj.goodsPriceDis
          obj.specList[index].priceRoom=obj.goodsPriceDis
          obj.specList[index].XjOut=obj.specList[index].priceOut-obj.goodsPriceDis
          obj.specList[index].XjRoom=obj.specList[index].priceRoom-item.goodsPriceDis
        }
      }else{
        obj.specList[index].XjOut=0
        obj.specList[index].XjRoom=0
        obj.specList[index].priceOut=(obj.specList[index].priceOut/100).toFixed(2)
        obj.specList[index].priceRoom=(obj.specList[index].priceRoom/100).toFixed(2)
      }
      obj.specList[index].lengs=[]
      obj.specList[index].goodsPackAmount=(obj.specList[index].goodsPackAmount/100).toFixed(2)
      obj.specList[index].goodsTitle=obj.goodsTitle
      obj.specList[index].index=this.index
      this.shopList.forEach((item,index1)=>{
        if(obj.id===item.id){
          item.sequence+=1
          obj.specList[index].sequence=item.sequence
        }
      })
      this.objAll.push(obj.specList[index])
      console.log(this.objAll)
      this.price()
      this.flag1=false
      this.selectObj=null
      // this.spanselect=0
    },
    jiesuan(){
      var shopId=this.$root.$mp.query.id
      var type=1
      var userId=this.$store.state.me.userInfo.id
      var packPrice=parseInt(this.Packing)
      var sendPrice=(this.shopInfo.shopSendPrice/100).toFixed(2)
      var shopTitle=this.$store.state.home.shopTitle
      var sendType='1'
      var userName='fwq'
      var userPhone=12345677
      var userAddress='11234234234'
      var payPrice=this.prices
      var activityIds=''
      if(this.new!==''){
        activityIds+=`1-${this.new},`
      }else if(this.arr!==''){
        activityIds+=`2-${this.arr.j2}-${this.arr.j1}-${this.arr.j2},`
      }
      var xj=0
      this.objAll.forEach((item,index)=>{
        xj+=item.XjOut
      })
      if(xj>0){
        activityIds+=`3-${xj}`
      }
      this.objCopy=JSON.parse(JSON.stringify(this.objAll))
      this.goodsIds=[]
      this.eachInfo()
      var goodsIds=this.goodsIdses
      var mark=''
      createOrder(shopId, type, userId, packPrice, sendPrice, shopTitle, sendType, userName, userPhone, userAddress, payPrice, activityIds,goodsIds,mark).then(response=>{

      })
    },
    // 选择商品类型归类
    eachInfo(){
      if(this.objCopy.length>0){
        var num=this.objCopy.shift()
        this.objCopy.forEach((item,index)=>{
          if(num.goodsId===item.goodsId&&num.priceOut===item.priceOut){
            if(!num.hasOwnProperty('id')){
              num.lengs.push(index)
            }else{
              if(num.hasOwnProperty('id')==item.hasOwnProperty('id')){
                num.lengs.push(index)
              }else{
                console.log('不同')
              }
            }
          }
        })
        this.goodsIds.push(num)
        if(num.lengs.length>0){
          num.lengs.forEach((item,index)=>{
            this.objCopy.splice(item-index,1)
          })
        }
        this.eachInfo()
      }else{
        console.log(this.goodsIds)
        var num=[]
        this.goodsIds.forEach((item,index)=>{
          var str=''
          str+=`${item.goodsId}-${item.lengs.length+1}-${item.priceOut}-${item.goodsTitle}`
          if(item.hasOwnProperty('id')){
            str+=`-${item.id}`
          }
          num.push(str)
        })
        this.goodsIdses =JSON.stringify(num)
      }
    },
    itemClick(item ,index) {
    },
    getQuery(){
      let id=this.$root.$mp.query.id
      this.obj.shopId=id
      this.obj.goodsTypeId=null
      this.obj.pageNum=1
      this.obj.pageSize=5000
      this.getGoodsTypeList(id)
      this.getCommentList(id)
      this.getShops(id)
      this.getList(this.obj)
    },
    // 商品列表
    getList(obj){
      Lists(obj).then(response=>{
        if(response.data.returnObject){
          this.shopList=response.data.returnObject
          this.shopList.forEach((item,index)=>{
            item.sequence=0
            item.priceRoom=(item.priceRoom/100).toFixed(2)
            item.priceOut=(item.priceOut/100).toFixed(2)
            item.goodsPackAmount=(item.goodsPackAmount/100).toFixed(2)
            if(item.goodsPriceDis){
              item.goodsPriceDis=(item.goodsPriceDis/100).toFixed(2)
            }
          })
        }else{
          this.shopList=null
        }
      })
    },
    // 菜品分类列表
    getGoodsTypeList(shopId){
      GoodsTypeList(shopId).then(response=>{
        if(response.data.returnObject){
          this.TypeList=response.data.returnObject.list
          this.cpId=this.TypeList[0].id
        }
      })
    },
    // 评价
    getCommentList(id){
      this.Comment.shopId=id
      this.Comment.pageNum=1
      this.Comment.pageSize=10
      commentList(this.Comment).then(response=>{

      })
    },
    // 获取店铺详情
    getShops(id){
      var longitude= this.$store.state.home.longitude
      var latitude= this.$store.state.home.latitude
      getShop(id,latitude,longitude).then(response=>{
       if(response.data.returnObject){
         this.shopInfo=response.data.returnObject
         if(this.shopInfo.isNewUser==='y'){
           this.isNew=true
         }else{
           this.isNew=false
         }
         if(this.shopInfo.atList.length>0){
           var atList=this.shopInfo.atList
           var num=[]
           var num1=[]
           atList.forEach((item,index)=>{
             var str=''
             if(item.activityType==1){
               str='新用户立减'+(item.content/100)
               this.new=item.content/100
             }else{
               this.new=''
             }
             if(item.activityType==2){
               var con=item.content.split(',')
               con.forEach((item,index)=>{
                 var obj={}
                 obj.j1=item.split('-')[0]/100
                 obj.j2=item.split('-')[1]/100
                 num1.push(obj)
                 if(index===con.length-1){
                   str+=`满${(item.split('-')[0]/100)}减${(item.split('-')[1]/100)}`
                 }else{
                   str+=`满${(item.split('-')[0]/100)}减${(item.split('-')[1]/100)},`
                 }

               })
             }
             num.push(str)
           })
           this.Discount=num
           this.manjian=num1
           console.log(this.manjian)
           console.log(this.new)
         }
       }
      })
    }
  },
  mounted() {
    this.getQuery()
  },
  onLoad(){
    Object.assign(this.$data, this.$options.data())
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
      margin-left:294rpx;
      top:76rpx;
      img{
        width: 160rpx;
        height: 160rpx;
      }
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
          position: relative;
          margin-bottom: 30rpx;
          .self{
            position: absolute;
            top: 0rpx;
            right: 0rpx;
            color: red;
          }
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
            .icon{
              font-size: 40rpx;
              color: #2d8cf0;
            }
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
  .shop-info{
    .top{
      background: #fff;
      padding: 40rpx;
      h4{
        font-weight: bold;
        font-size: 32rpx;
      }
      div{
        p{
          margin-top: 26rpx;
        }
        .Notice{
          margin-top: 26rpx;
          font-size: 24rpx;
        }
      }
    }
    .info{
      margin-top: 30rpx;
      background: #fff;
      padding: 40rpx;
      h4{
        font-weight: bold;
        font-size: 32rpx;
      }
      ul{
        li{
          height: 80rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
    .pic{
      margin-top: 30rpx;
      background: #fff;
      padding: 40rpx;
      h4{
        font-weight: bold;
        font-size: 32rpx;
      }
      .shipPic{
        margin-top: 30rpx;
        display: flex;
        justify-content: flex-start;
        img{
          margin-left: 10rpx;
          width: 200rpx;
          height: 200rpx;
        }
      }
    }
  }
  .footer-c {
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 0;
    height: 182rpx;
    background-color: #333;
    z-index: 990;
    width: 100%;
    .zhezhao{
      display: block;
      position: fixed;
      bottom: 0px;
      left: 0px;
      height: 900rpx;
      width: 100%;
      background:#fff;
      z-index:9999;
      .top{
        padding: 30rpx;
        display: flex;
        .img{
          margin-right: 30rpx;
          img{
            width: 140rpx;
            height: 140rpx;
          }
        }
        .font{
          p:nth-child(2){
            margin-top: 16rpx;
          }
          p:nth-child(3){
            margin-top: 26rpx;
            color: #CD2626;
            font-size: 28rpx;
          }
        }
      }
      .guige{
        padding: 30rpx;
        .spanset{
          margin-top: 20rpx;
          display: inline-block;
          background: #ccc;
          width: 160rpx;
          height: 60rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
        }
        .spanselect{
          background: #2d8cf0;
          color: #0000EE;
        }
        .buttons{
          position:absolute;
          bottom:40rpx;
          width:700rpx;
        }
      }

    }
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
          display: block;
          align-items: center;
          .prices{
            color: #fff;
          }
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
        .jiesuan{
          display: block;
          width:200rpx;
          height:88rpx;
          color: #fff;
          text-align: center;
          line-height: 88rpx;
          background: #2d8cf0;
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
