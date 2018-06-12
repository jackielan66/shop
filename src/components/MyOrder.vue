<template>
    <div id="my-order">
        <!-- <mt-header title="我的订单" fixed>
            <mt-button icon="back" slot="left" @click="$router.back()">返回</mt-button>
        </mt-header> -->

        <div class="order-nav">
            <ul>
                <li @click="onStatusChange(-1)">
                    <span v-bind:class=" status == -1 ? 'C9 my-order-span' : ''">全部</span>
                </li>
                <li @click="onStatusChange(3)">
                    <span v-bind:class=" status == 3 ? 'C9 my-order-span': ''">待付款</span>
                </li>
                <li @click="onStatusChange(8)">
                    <span v-bind:class=" status == 8 ? 'C9 my-order-span' : ''">待发货</span>
                </li>
                <li @click="onStatusChange(9)">
                    <span v-bind:class=" status == 9 ? 'C9 my-order-span' : '' ">已发货</span>
                </li>
            </ul>
            <div class="clearfix"></div>
        </div>

        <div v-show="orderList.length == 0" class="no-data">
            无相关订单数据
        </div>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="20">
            <div class="order-table" v-for="(item,index) in orderList" :key="index">
                <div class="order-box">
                    <div class="header">
                        <div class="company-name">
                            <img src="static/img/icon_Supermarket@2x.png" alt="">
                            <span class="S4 C3">{{item.brand}}</span>
                        </div>
                        <template v-show="item.type==0">
                            <span class="C9 S4" v-show="item.status == 3">待付款</span>
                            <span class="C9 S4" v-show="item.status == 12">待审核</span>
                            <span class="C9 S4" v-show="item.status == 8">待发货</span>
                            <span class="C9 S4" v-show="item.status == 9">已发货</span>
                            <span class="C9 S4" v-show="item.status == 7">已收货</span>
                            <span class="C9 S4" v-show="item.status == -2">订单已取消</span>
                        </template>
                        <template v-show="item.type==1">
                            <span class="C9 S4" v-show="item.status == 5">待审核</span>
                            <span class="C9 S4" v-show="item.status == 1" type="">待发货</span>
                            <span class="C9 S4" v-show="item.status == 4">待付款</span>
                        </template>
                    </div>
                    <div class="clearfix"></div>
                    <div class="inftion" v-for="(order,index) in item.orderInfo" :key="index" @click="goOrderDetails(item)">
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
                    <div class="time">
                        <div class="time-box">
                            <span class="C2 S10">{{item.createTime}}</span>
                        </div>
                        <div class="settlement">
                            <span class="S4 C9">
                                <em class="C3">合计：</em>
                                <span class="S10">¥</span>{{totalPrice(item)}}</span>
                        </div>
                        <div class="clearfix"></div>
                    </div>

                    <div class="btn" v-if="item.type==0">
                        <div class="btn-box">
                            <button class="btn-border2" @click="refundMoney(item)" v-if="item.status == 8" type="">申请退款</button>
                            <button class="btn-border2" @click="cancelOrder(item)" v-if="item.status == 3" type="">取消订单</button>
                            <button class="btn-border1" @click="goPay(item)" v-if="item.status == 3" type="">待付款</button>
                            <!-- <button class="btn-border1" @click="rejectOrder(item)" v-if="item.status == 8" type="">申请退款</button> -->
                            <button class="btn-border2" v-if="item.status == 9 " type="" @click="$router.push({path:'/order/logistics',query:{expressid:item.expressid,expresscompany:item.expresscompany}})">查看物流 </button>
                            <button class="btn-border1" v-if="item.status == 9" @click="collectGoods(item)">确认收货</button>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="btn" v-if="item.type==1">
                        <div class="btn-box">
                            <button class="btn-border2" @click="refundMoney(item)" v-if="item.status == 1" type="">申请退款</button>
                            <button class="btn-border2" @click="cancelOrder(item)" v-if="item.status == 4" type="">取消订单</button>
                            <button class="btn-border1" v-if="item.status == 4" @click="goPay(item)" type="">待付款</button>
                            <!-- <button class="btn-border1" @click="rejectOrder(item)" v-if="item.status == 8" type="">申请退款</button> -->
                            <button class="btn-border2" v-if="item.status == 9 " type="" @click="$router.push({path:'/order/logistics',query:{expressid:item.expressid,expresscompany:item.expresscompany}})">查看物流 </button>
                            <button class="btn-border1" v-if="item.status == 9" @click="collectGoods(item)">确认收货</button>
                        </div>
                        <div class="clearfix"></div>
                    </div>

                </div>
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
import { URI, WWW, uid, getToken } from "@/apiConfig";
import axios from "axios";
import TabBar from "./TabBar";
import qs from "qs";
Vue.use(Lazyload);
Vue.use(InfiniteScroll);
export default {
  name: "MyOrder",

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
      orderList: []
    };
  },

  created() {},

  mounted() {
    let _params = {
      uid: this.uid,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    };
    axios
      .get(URI + "/order/getOrderByType?" + qs.stringify(_params))
      .then(res => {
        let _data = res.data;
        this.orderList = _data.data.orders;
        this.pageCount = _data.data.pageCount;
        Indicator.close();
        this.loading = false;
      });
  },

  methods: {
    onStatusChange(status) {
      this.pageSize = 10;
      this.status = status;
      this.pageCount = 2;
      this.orderList = [];
      this.fetchData();
    },

    totalPrice: item => {
      let _amount = 0;
      (item.orderInfo || []).forEach(v => {
        _amount += v.price * v.num;
      });
      return (_amount || 0).toFixed(2);
    },

    rejectOrder(item) {
      //   MessageBox.confirm("确定申请退款么?")
      //     .then(action => {
      //       let _params = {
      //         orderId: item.orderId,
      //         type: item.type
      //       };
      //       Indicator.open();
      //       axios
      //         .get(URI + "/order/cancelOrder?" + qs.stringify(_params))
      //         .then(res => {
      //           let _data = res.data;
      //           Toast(_data.msg);
      //           this.fetchData();
      //           Indicator.close();
      //         });
      //     })
      //     .catch(() => {});
    },

    cancelOrder(item) {
      MessageBox.confirm("确定取消订单么?")
        .then(action => {
          let _params = {
            orderId: item.orderId,
            type: item.type
          };
          Indicator.open();
          axios
            .get(URI + "/order/cancelOrder?" + qs.stringify(_params))
            .then(res => {
              let _data = res.data;
              Toast(_data.msg);
              this.fetchData();
              Indicator.close();
            });
        })
        .catch(() => {});
    },

    fetchData() {
      let _params = {
        uid: this.uid,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      if (this.pageCount <= 1) {
        this.loading = false;
        if (this.orderList.length != 0) {
          Toast(`已经是最后一页啦`);
        }
        return;
      }
      if (this.status > 0) {
        _params.status = this.status;
      }
      Indicator.open();
      axios
        .get(URI + "/order/getOrderByType?" + qs.stringify(_params))
        .then(res => {
          let _data = res.data;
          this.orderList = _data.data.orders;
          this.pageCount = _data.data.pageCount
          Indicator.close();
          this.loading = false;
        });
    },

    goOrderDetails(order) {
      // console.log(order,'order')
      this.$router.push({
        path: "/order-details",
        query: { type: order.type, orderId: order.orderId }
      });
    },

    refundMoney(order) {
      //   console.log(order, "order");
      window.localStorage.setItem("refundOrder", JSON.stringify(order));
      this.$router.push({ name: "Refund" });
      return;
      MessageBox.confirm("确定申请退款么?")
        .then(action => {
          let _params = {
            orderId: order.orderId,
            type: order.type
          };
          Indicator.open();
          axios
            .get(URI + "/order/applyRefun?" + qs.stringify(_params))
            .then(res => {
              let _data = res.data;
              Toast(_data.msg);
              this.fetchData();
              Indicator.close();
            });
        })
        .catch(() => {});
    },

    collectGoods(order) {
      // console.log(order,'order')
      MessageBox.confirm("确定收货了么?")
        .then(action => {
          let _params = {
            orderId: order.orderId,
            type: order.type
          };
          Indicator.open();
          axios
            .get(URI + "/order/receiptGoodsV2?" + qs.stringify(_params))
            .then(res => {
              let _data = res.data;
              Toast(_data.msg);
              this.fetchData();
              Indicator.close();
            });
        })
        .catch(() => {});
    },
    loadMore() {
      this.loading = true;
      this.pageSize = this.pageSize + 10;
      this.fetchData();
      // setTimeout(() => {
      //   let last = this.list[this.list.length - 1];
      //   for (let i = 1; i <= 10; i++) {
      //     this.list.push(last + i);
      //   }
      //   this.loading = false;
      // }, 2500);
    },
    goPay(order) {
      console.log(order, "orderorder order");
      if (order.type == 0) {
        let _params = {
          type: "brand",
          order: {
            gid: order.orderInfo[0].gid,
            uid: this.uid,
            type: 2,
            num: order.orderInfo[0].num,
            title: order.orderInfo[0].title
          },
          goodsDetails: order.orderInfo[0]
        };
        window.localStorage.setItem("order", JSON.stringify(_params));
        this.$router.push({ name: "OrderSet", params: _params });
      } else if (order.type == 1) {
        // let { selectedCartData, selectedCartId } = this;
        // let _params = {
        //   type: "cart",
        //   selectedCartData:,
        //   selectedCartId
        // };
        // window.localStorage.setItem("order", JSON.stringify(_params));
        // this.$router.push({ name: "OrderSet", params: _params });
      }

      //   let _params = {
      //     type: "brand",
      //     order: {
      //       gid: this.$route.params.id,
      //       uid: this.uid,
      //       type: 2,
      //       num: this.num,
      //       title: this.goodsDetails.title
      //     },
      //     goodsDetails: this.goodsDetails
      //   };
      //   window.localStorage.setItem("order", JSON.stringify(_params));
      //   this.$router.push({ name: "OrderSet", params: _params });
    }
  },

  components: {
    TabBar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.order-nav {
  /* margin-top: 45px !important; */
}
</style>
