<template>
  <div class="container">
    <div class="content">
      <div class="header-c">
        <div class="header-l" @click="addressClick">
          <i class="icon mt-location-o" :style="{color: '#434343', 'font-size': 38 + 'rpx'}"></i>
          <span>{{address}}</span>
          <i class="icon mt-arrow-right-o" :style="{color: '#434343', 'font-size': 28 + 'rpx'}"></i>
        </div>
        <div class="header-r" @click="searchClick">
          <i class="icon mt-search-o"></i>
          <span>搜索商家</span>
        </div>
      </div>
      <swiper class="ad-c" indicator-dots="true" indicator-color="#999" indicator-active-color="#FFC24A" autoplay="true">
        <block v-for="(item, index) in topBannerData" :key="index">
          <swiper-item>
            <img class="ad-img" :src="item.banner_pic_url">
          </swiper-item>
        </block>
      </swiper>
      <div class="bigList">
        <div class="food">
          <img src="http://img3.imgtn.bdimg.com/it/u=3360690558,3623061169&fm=11&gp=0.jpg" alt="">
        </div>
        <div class="Supermarket">
          <img src="http://img3.imgtn.bdimg.com/it/u=3360690558,3623061169&fm=11&gp=0.jpg" alt="">
        </div>
      </div>
      <div class="section">
        <div class="l"></div>
        <span class="m">推荐商家</span>
        <div class="r"></div>
      </div>
      <div class="category-list">
        <!--条件选择-->
        <div class="filter-bar">
          <div :class="{active1:active1===index}" class="item" v-for="(item, index) in filterList" :key="index" @click="btn(item,index)">
            <span>{{item.title}}</span>
            <i class="icon" :class="item.icon"></i>
          </div>
        </div>
        <div class="com" v-if="flag_com">
          <ul>
            <li @click="selected(item,index)" :class="{active:active===index}" v-for="(item,index) in com" :key="index">
              <span>{{item.name}}</span>
              <span v-if="active===index"><i class="icon" :class="item.icon"></i></span>
            </li>
          </ul>
        </div>
        <!--删选-->
        <div class="header" v-if="flag">
          <div class="item" v-for="(item, index) in tags" :key="index">
            <span>{{item}}</span>
          </div>
        </div>
        <div class="lists">
          <div class="item-list">
            <div class="left">
              <img :src="src" alt="">
            </div>
            <div class="mid">
              <p>重庆麻辣烫</p>
              <div class="rate">
                <i-rate :value="4.1"></i-rate>
                <span>{{4.1}}分</span>
                <span>月售{{441}}</span>
              </div>
              <div class="qisong">
                <span>起送:￥{{10}}</span>
                <span>配送:￥{{10}}</span>
              </div>
              <div class="new">
                <i-tag
                  class="i-tags"
                  name="标签一"
                  color="green">
                  新
                </i-tag>
                <i-tag
                  class="i-tags"
                  name="标签一"
                  color="red">
                  减
                </i-tag>
                <i-tag
                  class="i-tags"
                  name="标签一"
                  color="yellow">
                  折
                </i-tag>
              </div>
            </div>
            <div class="right">
              <div class="km">
                {{1.6}}KM
              </div>
              <div class="ps">
                <i-tag
                  class="i-tags"
                  name="标签一"
                  color="blue">
                  商家配送
                </i-tag>
              </div>
            </div>
          </div>
          <div class="item-list">
            <div class="left">
              <img :src="src" alt="">
            </div>
            <div class="mid">
              <p>重庆麻辣烫</p>
              <div class="rate">
                <i-rate :value="4.1"></i-rate>
                <span>{{4.1}}分</span>
                <span>月售{{441}}</span>
              </div>
              <div class="qisong">
                <span>起送:￥{{10}}</span>
                <span>配送:￥{{10}}</span>
              </div>
              <div class="new">
                <i-tag
                  class="i-tags"
                  name="标签一"
                  color="green">
                  新
                </i-tag>
                <i-tag
                  class="i-tags"
                  name="标签一"
                  color="red">
                  减
                </i-tag>
                <i-tag
                  class="i-tags"
                  name="标签一"
                  color="yellow">
                  折
                </i-tag>
              </div>
            </div>
            <div class="right">
              <div class="km">
                {{1.6}}KM
              </div>
              <div class="ps">
                <i-tag
                  class="i-tags"
                  name="标签一"
                  color="blue">
                  商家配送
                </i-tag>
              </div>
            </div>
          </div>
          <div class="item-list">
            <div class="left">
              <img :src="src" alt="">
            </div>
            <div class="mid">
              <p>重庆麻辣烫</p>
              <div class="rate">
                <i-rate :value="4.1"></i-rate>
                <span>{{4.1}}分</span>
                <span>月售{{441}}</span>
              </div>
              <div class="qisong">
                <span>起送:￥{{10}}</span>
                <span>配送:￥{{10}}</span>
              </div>
              <div class="new">
                <i-tag
                  class="i-tags"
                  name="标签一"
                  color="green">
                  新
                </i-tag>
                <i-tag
                  class="i-tags"
                  name="标签一"
                  color="red">
                  减
                </i-tag>
                <i-tag
                  class="i-tags"
                  name="标签一"
                  color="yellow">
                  折
                </i-tag>
              </div>
            </div>
            <div class="right">
              <div class="km">
                {{1.6}}KM
              </div>
              <div class="ps">
                <i-tag
                  class="i-tags"
                  name="标签一"
                  color="blue">
                  商家配送
                </i-tag>
              </div>
            </div>
          </div>
          <div class="item-list">
            <div class="left">
              <img :src="src" alt="">
            </div>
            <div class="mid">
              <p>重庆麻辣烫</p>
              <div class="rate">
                <i-rate :value="4.1"></i-rate>
                <span>{{4.1}}分</span>
                <span>月售{{441}}</span>
              </div>
              <div class="qisong">
                <span>起送:￥{{10}}</span>
                <span>配送:￥{{10}}</span>
              </div>
              <div class="new">
                <i-tag
                  class="i-tags"
                  name="标签一"
                  color="green">
                  新
                </i-tag>
                <i-tag
                  class="i-tags"
                  name="标签一"
                  color="red">
                  减
                </i-tag>
                <i-tag
                  class="i-tags"
                  name="标签一"
                  color="yellow">
                  折
                </i-tag>
              </div>
            </div>
            <div class="right">
              <div class="km">
                {{1.6}}KM
              </div>
              <div class="ps">
                <i-tag
                  class="i-tags"
                  name="标签一"
                  color="blue">
                  商家配送
                </i-tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {queryHomeHeadCategory} from '@/action/action'
import {homeData} from './data'
import {mapMutations, mapGetters } from "vuex"

export default {
  data() {
    return {
      categoryArr: [{items: []}, {items: []}],
      topBannerData: [],
      bottomBanner: {},
      active:0,
      src:'http://img3.imgtn.bdimg.com/it/u=3360690558,3623061169&fm=11&gp=0.jpg',
      active1:null,
      shopsList: [],
      flag:false,
      flag_com:false,
      address:null,
      filterList: [
        {
          title: '综合排序',
          icon: 'mt-arrow-down-o',
          type:'1'
        },
        {
          title: '销量最高',
          type:'2'
        },
        {
          title: '速度最快',
          type:'3'
        },
        {
          title: '筛选',
          icon: 'mt-filter-o',
          type:'4'
        },
      ],
      com:[
        {
          name:'综合排序',
          id:1,
          icon: 'mt-dagou-o'
        },
        {
          name:'销量最高',
          id:2,
          icon: 'mt-dagou-o'
        },
        {
          name:'起送价最低',
          id:3,
          icon: 'mt-dagou-o'
        },
        {
          name:'配送费最低',
          id:4,
          icon: 'mt-dagou-o'
        }
      ],
      tags: ['满减优惠', '新客立减', '单品折扣'],
      stars: [1, 2, 3, 4, 5]
    };
  },
  onShow(){
    this.flag=false
    this.flag_com=false
  },
  methods: {
    btn(item,index){
      if(index===3){
        this.flag_com=false
        if(!this.flag){
          this.flag=true
        }else{
          this.flag=false
        }
      }
      if(index===0){
        this.flag=false
        if(!this.flag_com){
          this.flag_com=true
        }else{
          this.flag_com=false
        }
      }
      this.active1=index
    },
    selected(item,index){
      this.active=index
      this.flag_com=false
      this.filterList[0].title=item.name
    },
    categoryClick() {
      wx.navigateTo({url: '/pages/categoryList/main'})
    },
    addressClick() {
      wx.navigateTo({url: '/pages/selectAddress/main'})
    },
    searchClick() {
      wx.navigateTo({url: '/pages/searchList/main'})
    },
    shoppingCartClick() {
      wx.navigateTo({url: '/pages/shoppingCart1/main'})
    },
    wxGetLocation(){
      let _this = this;
      wx.getLocation({
        // type: 'wgs84',
        success: function (res) {
          let latitude,longitude;
          latitude = res.latitude.toString();
          longitude = res.longitude.toString();
          wx.request({
            header:{
              "Content-Type": "application/text"
            },
            url:'https://apis.map.qq.com/ws/geocoder/v1/?location='+latitude+','+longitude+'&key=MVGBZ-R2U3U-W5CVY-2PQID-AT4VZ-PDF35',
            success: function(res) {
              // _this.country = res.data.result.address_component.nation
              // _this.province =res.data.result.address_component.province
              // _this.city = res.data.result.address_component.city
              // _this.district = res.data.result.address_component.district
              //_this.count();
              _this.address=res.data.result.address_component.street_number
              console.log(res.data)
              var obj={}
              obj.address= _this.address
              obj.city=res.data.result.address_component.city
              _this.$store.commit('submitAddress',obj)
            }
          });
        },
        fail: function(err) {
          console.log(err);
          console.log(112)
        }
      });
    }
  },
  mounted() {
    this.wxGetLocation()
    var categoryData = homeData.headData.data.primary_filter;
    categoryData.map((item, index) => {
      if (index < 10) {
        this.categoryArr[0].items.push(item)
      } else {
         this.categoryArr[1].items.push(item)
      }
    })
    this.topBannerData = homeData.topBannerData.data.top_banner_list
    this.bottomBanner = homeData.bannerData.data.rcmd_board_v9.mid_ad_banner.platinum_banner
    this.shopsList = homeData.homeList.data.poilist
  }
};
</script>

<style lang="scss" scoped>
.container {
  .content {
    display: flex;
    flex-direction: column;
    position: relative;
    .header-c {
      display: flex;
      align-items: center;
      height: 80rpx;
      position: fixed;
      width: auto;
      padding: 0 30rpx;
      width: 100%;
      box-sizing: border-box;
      background-color: white;
      z-index: 999;
      .header-l {
        display: flex;
        align-items: center;
        span {
          font-size: 28rpx;
          color: $textBlack-color;
          margin: 0 10rpx;
        }
      }
      .header-r {
        display: flex;
        align-items: center;
        flex: 1;
        background-color: $page-bgcolor;
        height: 60rpx;;
        border-radius: 30rpx;
        margin-left: 30rpx;
        align-items: center;
        i {
          color: $textDarkGray-color;
          font-size: 32rpx;
          margin-left: 20rpx;
        }
        span {
          color: $textDarkGray-color;
          font-size: 24rpx;
          margin-left: 10rpx;
        }
      }
    }
    .bigList{
      padding: 10rpx;
      display: flex;
      justify-content: space-between;
      .food{
        width: 360rpx;
        height: 200rpx;
        background: #ccc;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .Supermarket{
        width: 360rpx;
        height: 200rpx;
        background: #ccc;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .category-c {
      height: 360rpx;
      background-color: white;
      padding-top: 100rpx;
      .grid-c {
        height: 340rpx;
        flex-wrap: wrap;
        display: flex;
        .item {
          width: 20%;
          background-color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-sizing: border-box;
          img {
            width: 80rpx;
            height: 80rpx;
            border-radius: 40rpx;
          }
          span {
            font-size: 20rpx;
            color: $textBlack-color;
            margin-top: 10rpx;
          }
        }
      }
    }
    .ad-c {
      display: flex;
      height: 400rpx;
      background-color: white;
      margin: 20rpx;
      .ad-img {
        height: 400rpx;
        width: 100%;
        background-size: cover;
      }
    }
    .b-banner {
      display: flex;
      flex-direction: column;
      .recommended {
        display: flex;
        align-items: center;
        height: 160rpx;
        margin: 20rpx;
        margin-top: 0;
        img {
          height: 160rpx;
          width: 100%;
          background-size: cover;
        }
      }
      .hot-sale {
        display: flex;
        background-color: white;
        height: 160rpx;
        justify-content: space-between;
        margin: 0 20rpx;
        .item {
          display: flex;
          flex-direction: column;
          width: 160rpx;
          padding: 0 20rpx;
          height: 160;
          .img-c {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            img {
              width: 160rpx;
              height: 120rpx;
              border-radius: 8rpx;
            }
            .name-c {
              display: flex;
              align-items: center;
              position: absolute;
              height: 30rpx;
              bottom: 0;
              background: rgba($color: #000000, $alpha: 0.3);
              width: 160rpx;
              .name {
                font-size: 20rpx;
                color: white;
                margin: 0 10rpx;
                height: 30rpx;
                overflow: hidden;
              }
            }
          }
          .price {
            font-size: 24rpx;
            color: $mtRed-color;
            margin: 10rpx 0;
          }
        }
      }
    }
    .section {
      display: flex;
      align-items: center;
      margin: 20rpx;
      justify-content: center;
      box-sizing: border-box;
      .l {
        height: 2rpx;
        width: 60rpx;
        background-color: $textDarkGray-color;
      }
      .m {
        font-size: 32rpx;
        color: $textBlack-color;
        margin: 0 20rpx;
        font-weight: bold;
      }
      .r {
        height: 2rpx;
        width: 60rpx;
        background-color: $textDarkGray-color;
      }
    }
    .category-list {
      position: relative;
      display: flex;
      flex-direction: column;
      .filter-bar {
        display: flex;
        align-items: center;
        padding: 0 20rpx;
        background-color: white;
        height: 70rpx;
        border-top: 2rpx solid $spLine-color;
        border-bottom: 2rpx solid $spLine-color;
        .item {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          span {
            font-size: 24rpx;
            color: $textDarkGray-color;
          }
          i {
            font-size: 24rpx;
            color: $textDarkGray-color;
            margin-left: 10rpx;
          }
        }
        .item:first-child {
          span {
            color: $textBlack-color;
          }
        }
      }
      .active1{
        color: #000;
        font-weight: bold;
        font-size: 30rpx;
      }
      .com{
        position: absolute;
        top: 73rpx;
        padding: 0 30rpx;
        z-index: 99;
        width: 690rpx;
        background: #fff;
        ul{
          li{
            display: flex;
            justify-content: space-between;
            height: 50rpx;
            align-items: center;
          }
          .active{
            color: #1C86EE;
          }
        }
      }
      .header {
        position: absolute;
        z-index: 99;
        top: 73rpx;
        width: 100%;
        padding-top: 10rpx;
        display: flex;
        align-items: center;
        background-color: white;
        justify-content: space-around;
        .item {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #F8F8F8;
          flex: 1;
          margin-left: 20rpx;
          padding: 10rpx 0;
          span {
            font-size: 20rpx;
            color: $textDarkGray-color;
          }
        }
        .item:last-child {
          margin-right: 20rpx;
        }
      }
    .lists{
      background: #fff;
      .item-list {
        border-bottom: 1px solid #f5f5f5;
        padding: 16rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left{
          width: 160rpx;
          height: 160rpx;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .mid{
          p{
            font-size: 32rpx;
          }
          .rate{
            display: flex;
            justify-content: space-between;
            align-items: center;
            span{
              margin-top: 12rpx;
            }
          }
          .qisong{
            span{
              margin-left: 10rpx;
            }
          }
          .new{
            .i-tags{
              margin-left: 10rpx;
            }
          }
        }
        .right{
          .km{
            text-align: center;
            margin-bottom: 14rpx;
          }
        }
      }
    }
    }
  }
}
</style>
