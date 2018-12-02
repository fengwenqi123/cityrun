<template>

</template>

<script>
  export default {
    name: "q",
    methods: {
      zhifu: function (e) {
        var map = {};
        //shopId=26o07&type=1&userId=b8qp&packPrice=0&sendPrice=400&shopTitle=麻辣烫旗舰店&sendType=1&userName=吃货1&userPhone=15925609260&userAddress=你到不了的位置&payPrice=11900&activityIds=2-3000-5000-3000&goodsIds=7s-1-4500-大排骨-0,1vfh2-1-10000-酸菜鱼(大份)-26o0f&mark=西红柿炒鸡蛋不要番茄,蛋炒饭不要蛋,麻辣烫不要麻不要辣~~78人
        map['payPrice'] = 11900;
        map['shopId'] = '26o07';
        map['type'] = 1;
        map['userId'] = 'b8qp';
        map['packPrice'] = 0;
        map['sendPrice'] = 400;
        map['shopTitle'] = '麻辣烫旗舰店';
        map['sendType'] = 1;
        map['userName'] = '吃货1号';
        map['userPhone'] = '18888888888';
        map['userAddress'] = '你到不了的位置-月亮之上';
        map['activityIds'] = '2-3000-5000-3000';
        map['goodsIds'] = '7s-1-4500-大排骨-0,1vfh2-1-10000-酸菜鱼(大份)-26o0f';
        map['mark'] = '西红柿炒鸡蛋不要番茄,蛋炒饭不要蛋,麻辣烫不要麻不要辣~~88人';

        app.func.post('/xorder/createOrdersInfo', map, function (res) {
          console.log(res);
          wx.requestPayment(
            {
              'timeStamp': res.returnObject.timestamp + '',
              'nonceStr': res.returnObject.noncestr + '',
              'package': res.returnObject.wxpackage + '',
              'signType': 'MD5',
              'paySign': res.returnObject.paySign + '',
              'success': function (res) {
                console.log(res)
              },
              'fail': function (res) {
                console.log(res);
                if (res === 'requestPayment:fail cancel') {
                  console.log('用户取消支付,返回订单列表并刷新');
                }
              },
              'complete': function (res) {
                console.log(res)
              }
            })
        })
      }
    }
  }
</script>

<style scoped>

</style>
