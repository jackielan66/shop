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

        <div class="order-table" v-for="(item,index) in orderList" :key="index">
            <div class="order-box">
                <div class="header">
                    <div class="company-name">
                        <img src="static/img/icon_Supermarket@2x.png" alt="">
                        <span class="S4 C3">{{item.brand}}</span>
                    </div>
                    <span class="C9 S4">待付款</span>
                </div>
                <div class="clearfix"></div>
                <div class="inftion" v-for="(order,index) in item.orderInfo" :key="index">
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
                            <span class="S10">¥</span>{{item.totalPrice}}</span>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="btn">
                    <div class="btn-box">
                        <button class="btn-border2" type="">取消订单</button>
                        <button class="btn-border1" type="">待付款</button>
                    </div>
                    <div class="clearfix"></div>
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
  name: "MyOrder",

  data() {
    return {
      pageSize: 10,
      pageIndex: 1,
      totalCount: 0,
      status: -1,
      WWW,
      loading: true,
      uid,
      orderList: []
    };
  },

  created() {},

  mounted() {
    let _params = {
      uid,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    };
    axios
      .get(URI + "/order/getOrderByType?" + qs.stringify(_params))
      .then(res => {
        let _data = res.data;
        this.orderList = _data.data.orders;
        Indicator.close();
      });
  },

  methods: {
    onStatusChange(status) {
      this.status = status;
      this.orderList = [];
      this.fetchData();
    },

    fetchData() {
      let _params = {
        uid,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      if (this.status > 0) {
        _params.status = this.status;
      }
      Indicator.open();
      axios
        .get(URI + "/order/getOrderByType?" + qs.stringify(_params))
        .then(res => {
          let _data = res.data;
          this.orderList = _data.data.orders;
          Indicator.close();
        });
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
.order-nav {
  /* margin-top: 45px !important; */
}
</style>
