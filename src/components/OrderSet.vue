<template>
    <div id="order-set">
        <!-- 头部 -->
        <mt-header title="订单购买" fixed>
            <mt-button icon="back" slot="left" @click="$router.back()">返回</mt-button>
        </mt-header>

        <div class="add-add">
            <div class="add-box">
                <img src="static/img/add@2x.png" alt="">

                <div class="add" v-show="defaultAddress.addressId">
                    <span>
                        <em>收件人：</em>{{defaultAddress.name}}</span>
                    <span>{{defaultAddress.phone}}</span>
                    <p class="C3 S2">{{defaultAddress.area + ' ' +defaultAddress.detail }}</p>
                </div>

                <div class="add-1" v-show="!defaultAddress.addressId">
                    <span @click="$router.push('/address-edit')" class="C3 S7">
                        请填写收货地址
                    </span>
                </div>
                <img @click="defaultAddress.addressId ? $router.push('/address') : $router.push('/address-edit') " class="add-next" src="static/img/icon_next@2x.png" alt="">
            </div>
        </div>
        <div class="order-table" v-if="showBuyType=='brand'">
            <div class="order-box">
                <div class="header">
                    <div class="company-name">
                        <img src="static/img/icon_Supermarket@2x.png" alt="">
                        <span class="S4 C3">{{goodsDetails.brand && goodsDetails.brand.name}}</span>
                    </div>
                    <span class="C9 S4">待付款</span>
                </div>
                <div class="clearfix"></div>
                <div class="inftion">
                    <div class="img-box" v-if="goodsDetails.mainPic">
                        <img v-lazy="WWW + '/' + goodsDetails.mainPic" alt="" />
                    </div>
                    <div class="text-box">
                        <h2 class="C3 S5">
                            <span class="order-label1">品牌</span>{{goodsDetails.title}}</h2>
                        <div class="shux-box">
                            <div class="span-box">
                                <span class="C2 S10">560ML</span>
                            </div>
                            <div class="number-box">
                                <span class="C3 S6">x
                                    <em class="S10">{{order.num}}</em>
                                </span>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <span class="money S10 C3">¥
                        <em class="S4">{{goodsDetails.discountprice}}</em>
                    </span>
                </div>
            </div>
            <div class="cost">
                <span class="fl-l S4 C3">邮费</span>
                <span class="fl-r S4 C3">
                    <em class="S10">¥</em>0.00</span>
                <div class="clearfix"></div>
            </div>
            <div class="cost">
                <span class="fl-l S4 C3">共
                    <em>{{order.num}}</em>件商品</span>
                <span class="fl-r S4 C3">小记：
                    <em class="S10">¥</em>{{amount}}</span>
                <div class="clearfix"></div>
            </div>
            <div class="cost">
                <label class="C3 S4">买家留言：</label>
                <input class="C3 S4" v-model="feedback" type="text" placeholder="选填：填写内容已和卖家协商确认" name="">
            </div>
        </div>

        <!-- 购物车列表 -->
        <div v-if="showBuyType=='cart'">
            <div class="order-table" v-for="(item,index) in selectedCartData" :key="index">
                <div class="order-box">
                    <div class="header">
                        <div class="company-name">
                            <img src="static/img/icon_Supermarket@2x.png" alt="">
                            <span class="S4 C3">{{item.brand}}</span>
                        </div>
                        <span class="C9 S4">待付款</span>
                    </div>
                    <div class="clearfix"></div>
                    <div class="inftion">
                        <div class="img-box" v-if="item.img">
                            <img v-lazy="WWW + '/' + item.img" alt="" />
                        </div>
                        <div class="text-box">
                            <h2 class="C3 S5">
                                <span class="order-label1">品牌</span>{{item.title}}</h2>
                            <div class="shux-box">
                                <div class="span-box">
                                    <span class="C2 S10">560ML</span>
                                </div>
                                <div class="number-box">
                                    <span class="C3 S6">x
                                        <em class="S10">{{item.num}}</em>
                                    </span>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <span class="money S10 C3">¥
                            <em class="S4">{{item.price}}</em>
                        </span>
                    </div>
                </div>
            </div>

            <!-- 留言开始 -->
            <div class="order-table">
                <div class="cost">
                    <span class="fl-l S4 C3">邮费</span>
                    <span class="fl-r S4 C3">
                        <em class="S10">¥</em>10.00</span>
                    <div class="clearfix"></div>
                </div>
                <!-- <div class="cost">
                    <span class="fl-l S4 C3">共
                        <em>{{selectedCartId.length}}</em>件商品</span>
                    <span class="fl-r S4 C3">小记：
                        <em class="S10">¥</em>{{cartAmount|fmoney}}</span>
                    <div class="clearfix"></div>
                </div> -->
                <div class="cost">
                    <label class="C3 S4">买家留言：</label>
                    <input class="C3 S4" v-model="feedback" type="text" placeholder="选填：填写内容已和卖家协商确认" name="">
                </div>
            </div>
            <!-- 留言结束 -->

        </div>

        <div class="payment">
            <div class="payment-box">
                <span class="C3 S1">支付方式</span>
            </div>
            <div class="payment-box pos-re" @click="onPayTypeChange(1)">
                <img src="static/img/img-wallet@2x.png" alt="">
                <span class="C3 S2">钱包支付</span>
                <div class="choice">
                    <img v-show="payType !=1" src="static/img/choice-off@2x.png" alt="">
                    <img v-show="payType == 1" src="static/img/choice-on@2x.png" alt="">
                    <input type="radio" name="choice">
                </div>
            </div>
            <div class="payment-box pos-re" @click="onPayTypeChange(2)">
                <img src="static/img/img-WeChat@2x.png" alt="">
                <span class="C3 S2">微信支付</span>
                <div class="choice">
                    <img v-show="payType !=2" src="static/img/choice-off@2x.png" alt="">
                    <img v-show="payType ==2" src="static/img/choice-on@2x.png" alt="">
                    <input type="radio" name="choice">
                </div>
            </div>
        </div>

        <div class="black_bg" v-show="usePayPassword" @click="usePayPassword=false"></div>

        <div class="click-set text-center" v-if="usePayPassword">
            <div class="pick-up C4 S3">
                请输入支付密码
            </div>
            <span class=" C9 S5">¥
                <em class="S7">{{ (showBuyType=='brand'? amount : cartAmount) | fmoney}}</em>
            </span>
            <pay-check @usePasswordPayCallback="usePasswordPayCallback"></pay-check>
            <!-- <form class="input-box">
                <input readonly type="password" maxlength="1" >
                <input readonly type="password" maxlength="1">
                <input readonly type="password" maxlength="1">
                <input readonly type="password" maxlength="1">
                <input readonly type="password" maxlength="1">
                <input readonly type="password" maxlength="1">
            </form> -->
        </div>

        <div class="bottom-btn">
            <div class="money">
                <span class="S1 C2">合计：
                    <em class="C1">￥{{ (showBuyType=='brand'? amount : cartAmount) | fmoney}}</em>
                </span>
            </div>
            <div class="btn" @click="sumbit">
                结算
            </div>
        </div>
    </div>
</template>

<script>
import {
  Swipe,
  SwipeItem,
  Indicator,
  Toast,
  Lazyload,
  InfiniteScroll
} from "mint-ui";
import Vue from "vue";
import { URI, WWW, getToken } from "@/apiConfig";
import axios from "axios";
import TabBar from "./TabBar";
import PayCheck from "./PayCheck";

import qs from "qs";
Vue.use(Lazyload);
Vue.use(InfiniteScroll);
export default {
  name: "OrderSet",

  data() {
    return {
      goodsDetails: {},
      defaultAddress: {},
      order: {},
      WWW,
      loading: true,
      uid: getToken(),
      amount: 0,
      payType: 1,
      feedback: "",
      showBuyType: "brand",
      selectedCartData: [],
      selectedCartId: [],
      cartAmount: 0,
      usePayPassword: false
    };
  },

  computed: {},

  filters: {
    fmoney: num => {
      return (num || 0).toFixed(2);
    }
  },

  created() {},

  mounted() {
    window.scrollTo(0, 0);
    let _params = {
      uid: this.uid
    };
    // 初始化默认地址
    axios
      .get(URI + "/address/getDefaultAddress?" + qs.stringify(_params))
      .then(res => {
        let _data = res.data.data;
        this.defaultAddress = _data || {};
      });
    let params = window.localStorage.getItem("order");
    if (params) {
      params = JSON.parse(params);
    }
    this.showBuyType = params.type;
    if (params.type == "brand") {
      this.goodsDetails = params.goodsDetails;
      this.order = params.order;
      if (this.order == null) {
        this.$route.back();
        return;
      }
      this.amount = this.order.num * this.goodsDetails.discountprice;
    } else if (params.type == "cart") {
      this.selectedCartData = params.selectedCartData;
      this.selectedCartId = params.selectedCartId;
      let _amount = 0;
      (this.selectedCartData || []).map(v => {
        _amount += v.num * v.price;
      });
      this.cartAmount = _amount;
      //   console.log(this.selectedCartData, "selectedCartData");
      //   console.log(this.selectedCartId, "selectedCartId");
    }
  },

  methods: {
    onPayTypeChange(type) {
      this.payType = type;
    },

    usePasswordPayCallback() {
      console.log("密码正确callback");
      this.usePayPassword = false;
      if (this.showBuyType == "brand") {
        let _params = Object.assign(
          this.order,
          { type: this.payType },
          { message: this.feedback },
          { addressId: this.defaultAddress.addressId }
        );
        Indicator.open();
        axios.get(URI + "/pay/goodsPay?" + qs.stringify(_params)).then(res => {
          Indicator.close();
          let _data = res.data;
          if (_data.success) {
            this.$router.push("/my-order");
          }
          Toast(_data.msg);
        });
      } else if (this.showBuyType == "cart") {
        let _params = Object.assign(
          { cartIds: this.selectedCartId.join(",") },
          { type: this.payType },
          { message: this.feedback },
          { addressId: this.defaultAddress.addressId },
          { uid: this.uid }
        );
        Indicator.open();
        axios
          .get(URI + "/pay/cartGoodsPay?" + qs.stringify(_params))
          .then(res => {
            Indicator.close();
            let _data = res.data;
            if (_data.success) {
              this.$router.push("/my-order");
            }
            Toast(_data.msg);
          });
      }
    },

    sumbit() {
      if (this.defaultAddress.addressId == null) {
        Toast(`请先添加收货地址`);
        return;
      }
      if (this.payType == 1) {
        this.usePayPassword = true;
        return;
      }

      if (this.showBuyType == "brand") {
        let _params = Object.assign(
          this.order,
          { type: this.payType },
          { message: this.feedback },
          { addressId: this.defaultAddress.addressId },
          { fromType: "WXGZH" }
        );
        Indicator.open();
        axios.get(URI + "/pay/goodsPay?" + qs.stringify(_params)).then(res => {
          Indicator.close();
          let _data = res.data;
          if (_data.success) {
            let _WXPay = _data.data.WXPay;

            // 写死测试
            // console.log(_WXPay, "_WXPay");
            // var appId, timeStamp, nonceStr, package2, signType, paySign;

            // appId = "wxaef4cedcb3731abb"
            // timeStamp = "1529399335";
            // nonceStr = "5030dfa57d204a0a9b406f559bb964b8";
            // package2 = "prepay_id=wx191708550349739ca6f15b2d1608556026"
            // signType = "MD5";
            // paySign = "77D6B9E936698158B006971EBB62C7DD";
            // if (typeof WeixinJSBridge !== "undefined") {
            //   WeixinJSBridge.invoke(
            //     "getBrandWCPayRequest",
            //     {
            //       appId: appId, //公众号名称,由商户传入
            //       timeStamp: timeStamp, //时间戳,自1970年以来的秒数
            //       nonceStr: nonceStr, //随机串
            //       package: package2,
            //       signType: signType, //微信签名方式：
            //       paySign: paySign //微信签名
            //     },
            //     function(res) {
            //       if (res.err_msg == "get_brand_wcpay_request:ok") {
            //         console.log("支付成功");
            //         //支付成功后跳转的页面
            //       } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
            //         console.log("支付取消");
            //       } else if (res.err_msg == "get_brand_wcpay_request:fail") {
            //         console.log("支付失败");
            //         alert(JSON.stringify(res));
            //         //               WeixinJSBridge.call('closeWindow');
            //       } //使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok,但并不保证它绝对可靠。
            //     }
            //   );
            // }

            // 写死end

            WeixinJSBridge.invoke(
              "getBrandWCPayRequest",
              {
                appId: WXPay.appId, //公众号名称,由商户传入
                timeStamp: WXPay.timeStamp, //时间戳,自1970年以来的秒数
                nonceStr: WXPay.nonceStr, //随机串
                package: WXPay.package2,
                signType: WXPay.signType, //微信签名方式：
                paySign: WXPay.paySign //微信签名
              },
              __res => {
                alert(JSON.stringify(__res));
                if (__res.err_msg == "get_brand_wcpay_request:ok") {
                  Toast("支付成功");
                  this.$router.push("/my-order");
                  // console.log("支付成功");
                  //支付成功后跳转的页面
                } else if (__res.err_msg == "get_brand_wcpay_request:cancel") {
                  console.log("支付取消");
                  alert(JSON.stringify(__res));
                } else if (__res.err_msg == "get_brand_wcpay_request:fail") {
                  console.log("支付失败");
                  alert(JSON.stringify(__res));
                  //               WeixinJSBridge.call('closeWindow');
                } //使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok,但并不保证它绝对可靠。
              }
            );

            // this.$router.push("/my-order");
          }
          Toast(_data.msg);
        });
      } else if (this.showBuyType == "cart") {
        let _params = Object.assign(
          { cartIds: this.selectedCartId.join(",") },
          { type: this.payType },
          { message: this.feedback },
          { addressId: this.defaultAddress.addressId },
          { uid: this.uid },
          { fromType: "WXGZH" }
        );
        Indicator.open();
        axios
          .get(URI + "/pay/cartGoodsPay?" + qs.stringify(_params))
          .then(res => {
            Indicator.close();
            let _data = res.data;
            if (_data.success) {
              let _WXPay = _data.data.WXPay;
              //   alert(_WXPay)
              WeixinJSBridge.invoke(
                "getBrandWCPayRequest",
                {
                  appId: WXPay.appId, //公众号名称,由商户传入
                  timeStamp: WXPay.timeStamp, //时间戳,自1970年以来的秒数
                  nonceStr: WXPay.nonceStr, //随机串
                  package: WXPay.package2,
                  signType: WXPay.signType, //微信签名方式：
                  paySign: WXPay.paySign //微信签名
                },
                __res => {
                  alert(JSON.stringify(__res));
                  if (__res.err_msg == "get_brand_wcpay_request:ok") {
                    Toast("支付成功");
                    this.$router.push("/my-order");
                    // console.log("支付成功");
                    //支付成功后跳转的页面
                  } else if (
                    __res.err_msg == "get_brand_wcpay_request:cancel"
                  ) {
                    console.log("支付取消");
                    alert(JSON.stringify(__res));
                  } else if (__res.err_msg == "get_brand_wcpay_request:fail") {
                    console.log("支付失败");
                    alert(JSON.stringify(__res));
                    //               WeixinJSBridge.call('closeWindow');
                  } //使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok,但并不保证它绝对可靠。
                }
              );
              //   this.$router.push("/my-order");
            }
            Toast(_data.msg);
          });
      }
    }
  },

  components: {
    TabBar,
    PayCheck
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.black_bg {
  display: block;
}
.add-add {
  margin-top: 45px !important;
}
#order-set .click-set {
  height: 200px;
}
</style>
