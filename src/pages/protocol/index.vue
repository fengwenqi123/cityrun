<template>
  <div class="container">
    <i-collapse :name="name">
      <i-collapse-item
        i-class-title="collapse-item-title"
        i-class-content="collapse-item-content"
        :title="item.title" v-for="(item,index) in List" :key="index">
        <view slot="content">
          {{item.content}}
        </view>
      </i-collapse-item>
    </i-collapse>
  </div>
</template>

<script>
  import {getSysProtocolList} from '@/api/protocol.js'
export default {
  data() {
    return {
      List:null,
      name: 'name1'
    }
  },
  methods:{
    getSysProtocolLists(){
      getSysProtocolList().then(response=>{
        if(response.data.returnObject){
          this.List=response.data.returnObject.list
        }
      })
    }
  },
  mounted(){
    this.getSysProtocolLists()
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 20rpx;
  padding-bottom: 20rpx;
  background: #fff;
  collapse-item-title{
  font-size:36rpx;
}
  collapse-item-content{
    text-indent:56rpx;
    font-size:28rpx;
  }
}
</style>
