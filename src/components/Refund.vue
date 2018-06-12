<template>
    <div id="refund">
        <mt-header title="申请退款" fixed>
            <mt-button icon="back" slot="left" @click="$router.back()">返回</mt-button>
        </mt-header>

        <div class="order-table">
            <div class="order-box">
                <div class="header">
                    <div class="company-name">
                        <img src="static/img/icon_Supermarket@2x.png" alt="">
                        <span class="S4 C3">{{refundOrder.brand}}</span>
                    </div>
                    <span class="C9 S4">待发货</span>
                </div>
                <div class="clearfix"></div>
                <div class="inftion" v-for="(order,index) in refundOrder.orderInfo" :key="index">
                    <div class="img-box">
                        <img v-lazy="WWW + '/' +order.img" alt="">
                    </div>
                    <div class="text-box">
                        <h2 class="C3 S5">
                            <span class="order-label1">品牌</span> {{order.title}}</h2>
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
                        <em class="S4">{{order.price}}</em>
                    </span>
                </div>
            </div>
        </div>
        <div class="reason">
            <div class="reason-box">
                <span class="fl-l C3 S2">退款原因</span>
                <input class="reason-input" v-model="message" placeholder="请输入退款原因" />
                <!-- <img class="fl-r" src="static/img/icon_next@2x.png" alt=""> -->
                <div class="clearfix"></div>
            </div>
        </div>
        <div class="reason">
            <div class="reason-box">
                <span class="fl-l C3 S2">退款金额</span>
                <span class="fl-r C9 S2">
                    <em>¥</em>{{amount | fmoney }}</span>
                <div class="clearfix"></div>
            </div>
        </div>

        <div class="btn" @click="refundMoney(refundOrder)">
            <span>申请退款</span>
        </div>

        <div class="black_bg"></div>
        <div class="popup">
            <div class="popup-box">

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
  InfiniteScroll,
  MessageBox
} from "mint-ui";
import Vue from "vue";
import { URI, WWW, getToken } from "@/apiConfig";
import axios from "axios";
import TabBar from "./TabBar";
import qs from "qs";
Vue.use(Lazyload);
Vue.use(InfiniteScroll);
export default {
  name: "Refund",

  data() {
    return {
      pageSize: 10,
      pageIndex: 1,
      totalCount: 0,
      pageCount: 0,
      status: -1,
      WWW,
      loading: true,
      uid: getToken(),
      orderList: [],
      refundOrder: {},
      message: "",
      amount: 0
    };
  },

  computed: {},
  filters: {
    fmoney: num => {
      return (num || 0).toFixed(2);
    }
  },

  mounted() {
    let refundOrder = window.localStorage.getItem("refundOrder");
    if (refundOrder) {
      refundOrder = JSON.parse(refundOrder);
    } else {
      Toast(`此订单有误，请重新选择订单`);
      this.$router.push({ name: "MyOrder" });
      return;
    }
    let _amount = 0;
    refundOrder.orderInfo.forEach(v => {
      _amount += v.num * v.price;
    });
    this.amount = _amount;
    this.refundOrder = refundOrder;
  },

  methods: {
    refundMoney(order) {
      MessageBox.confirm("确定申请退款么?")
        .then(action => {
          let _params = {
            orderId: order.orderId,
            type: order.type,
            msg: this.message
          };
          Indicator.open();
          axios
            .get(URI + "/order/applyRefun?" + qs.stringify(_params))
            .then(res => {
              let _data = res.data;
              Indicator.close();
              if (_data.success) {
                this.$router.push("/order/refund-success");
                return;
              }
              Toast(_data.msg);
            });
        })
        .catch(() => {});
    }
  },

  components: {
    TabBar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.order-table {
  margin-top: 45px !important;
}
.reason-box input {
  margin-left: 20px;
  width: 70%;
}
</style>
