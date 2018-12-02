<template>
  <div class="container">
  </div>
</template>

<script>
import {getShopByWxUserId} from '@/api/alert.js'
  export default {
    data(){
      return{
      }
    },
    methods:{
      getQuery(){
        var userInfo = wx.getStorageSync('userInfo')
        if(userInfo){
          getShopByWxUserId(userInfo.id).then(response=>{
            if(response.data.resultCode===1000){
              if(response.data.returnObject){
                var obj=response.data.returnObject
                if(obj.shopStatus===4){
                  wx.navigateTo({url: '/pages/examine/main'})
                }
              }
            }
          })
        }
      }
    },
    mounted(){
      this.getQuery()
    }
  }
</script>

<style lang="scss" scoped>
</style>
