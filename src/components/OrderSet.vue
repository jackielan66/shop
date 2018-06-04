<template>
    <div id="order-set">
        <!-- 头部 -->
        <mt-header title="订单购买" fixed>
            <mt-button icon="back" slot="left" @click="$router.back()">返回</mt-button>
        </mt-header>

        <div class="add-add">
            <div class="add-box">
                <img src="static/img/add@2x.png" alt="">
                <div class="add">
                    <span>
                        <em>收件人：</em>{{defaultAddress.name}}</span>
                    <span>{{defaultAddress.phone}}</span>
                    <p class="C3 S2">{{defaultAddress.area + ' ' +defaultAddress.detail }}</p>
                </div>
                <div class="add-1 display-none">
                    <span class="C3 S7">请填写收货地址</span>
                </div>
                <img class="add-next" src="img/icon_next@2x.png" alt="">
            </div>
        </div>
        <div class="order-table">
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
                    <em class="S10">¥</em>10.00</span>
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

        <!-- <div class="black_bg display-block"></div> -->

        <!-- <div class="click-set text-center">
            <div class="pick-up C4 S3">
               请输入支付密码
            </div>
            <span class=" C9 S5">¥<em class="S7">369.00</em></span>
            <form class="input-box">
                <input readonly type="password" maxlength="1" disabled="disabled">
                <input readonly type="password" maxlength="1" disabled="disabled">
                <input readonly type="password" maxlength="1" disabled="disabled">
                <input readonly type="password" maxlength="1" disabled="disabled">
                <input readonly type="password" maxlength="1" disabled="disabled">
                <input readonly type="password" maxlength="1" disabled="disabled">
            </form>
       </div> -->

        <div class="bottom-btn">
            <div class="money">
                <span class="S1 C2">合计：
                    <em class="C1">￥{{amount}}</em>
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
import { URI, WWW, uid } from "@/apiConfig";
import axios from "axios";
import TabBar from "./TabBar";
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
      uid,
      amount: 0,
      payType: 1,
      feedback: ""
    };
  },

  created() {},

  mounted() {
    this.goodsDetails = this.$route.params.goodsDetails;
    this.order = this.$route.params.order;
    if(this.order == null){
        this.$route
        return
    }
    this.amount = (this.order.num * this.goodsDetails.discountprice).toFixed(2);
    let _params = {
      uid
      //   name:'收货地址陈总',
      //   phone:15960061702,
      //   area:' 福建省的啊',
      //   detail:' 福建省的1313123啊',
      //   defaultAddress:1
    };

    // axios
    //   .get(URI + "/address/addAddress?" + qs.stringify(_params))
    //   .then(res => {
    //     Indicator.close();
    //     // let _data = res.data.data;
    //     // this.GoodsList = _data.pages;
    //     // this.totalCount = _data.totalCount;
    //     // this.loading = false;
    //   });

    // 初始化商地址
    axios
      .get(URI + "/address/getDefaultAddress?" + qs.stringify(_params))
      .then(res => {
        let _data = res.data.data;
        this.defaultAddress = _data;
      });
  },

  methods: {
    onPayTypeChange(type) {
      this.payType = type;
    },
    sumbit() {
      console.log(this.order, "order");
      let _params = Object.assign(
        this.order,
        { type: this.payType },
        { message: this.feedback },
        { addressId: "394b8dedf7e9468fb91380661dd963ce" }
      );
      Indicator.open();
      axios.get(URI + "/pay/goodsPay?" + qs.stringify(_params)).then(res => {
        Indicator.close();
        let _data = res.data;
        if(_data.success){
            this.$route.push('/my-order')
        }
        Toast(_data.msg);

        // this.GoodsList = _data.pages;
        // this.totalCount = _data.totalCount;
        // this.loading = false;
      });
    }
  },

  components: {
    TabBar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add-add {
  margin-top: 45px !important;
}
</style>
