<template>
    <div id="order-details">
        <mt-header title="订单详情" fixed>
            <mt-button icon="back" slot="left" @click="$router.back()">返回</mt-button>
        </mt-header>

        <div class="add-add">
            <div class="add-box">
                <img src="static/img/add@2x.png" alt="">
                <div class="add">
                    <span>
                        <em>收件人：</em>{{order.name}}</span>
                    <span>{{order.phone}}</span>
                    <p class="C3 S2">{{order.address}}</p>
                </div>
            </div>
        </div>
        <div class="order-table">
            <div class="order-box">
                <div class="header">
                    <div class="company-name">
                        <img src="static/img/icon_Supermarket@2x.png" alt="">
                        <span class="S4 C3">{{order.brand}}</span>
                    </div>
                    <template v-if="order.type==0">
                        <span class="C9 S4" v-show="order.status == 3">待付款</span>
                        <span class="C9 S4" v-show="order.status == 8">待发货</span>
                        <span class="C9 S4" v-show="order.status == 9">已发货</span>
                        <span class="C9 S4" v-show="order.status == -2">订单已取消</span>
                        <span class="C9 S4" v-show="order.status == 12">申请退款，待审核中</span>
                    </template>
                    <template v-if="order.type==1">
                        <span class="C9 S4" v-if="order.status == 1" type="">待发货</span>
                    </template>
                    <!-- <span class="C9 S4" @click="cancelOrder(order)" v-if="order.status == 3" type="">取消订单</span>
                    <span class="C9 S4" v-if="order.status == 3" type="">待付款</span>
                    <span class="C9 S4" v-if="order.status == 9 " type="" @click="$router.push({path:'/order/logistics',query:{expressid:order.expressid,expresscompany:order.expresscompany}})">查看物流 </span>
                    <span class="C9 S4" v-if="order.status == 9" type="">确认收货</span> -->
                </div>
                <div class="clearfix"></div>

                <div class="inftion" v-for="(v,index) in order.orderInfo" :key="index">
                    <div class="img-box">
                        <img v-lazy="WWW + '/' +v.img" alt="">
                    </div>
                    <div class="text-box">
                        <h2 class="C3 S5">
                            <span class="order-label1">品牌</span> {{v.title}}</h2>
                        <div class="shux-box">
                            <div class="span-box">
                                <span class="C2 S10">560ML</span>
                            </div>
                            <div class="number-box">
                                <span class="C3 S6">x
                                    <em class="S10">{{v.num}}</em>
                                </span>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <span class="money S10 C3">¥
                        <em class="S4">{{v.price}}</em>
                    </span>
                </div>
            </div>
            <div class="cost">
                <span class="fl-l S4 C3">邮费</span>
                <span class="fl-r S4 C3">
                    <em class="S10">¥</em>15.00</span>
                <div class="clearfix"></div>
            </div>
            <div class="cost">
                <span class="fl-l S4 C3">实付：
                    <em class="C9 S5">¥</em>
                    <em class="C9 S2">{{totalPrice(order)}}</em>(含运费)</span>
                <template v-if="order.type==0">
                    <!-- <button class="fl-r S4 C3">申请退款</button> -->
                    <!-- <span class="C9 S4" v-show="order.status == 3">待付款</span>
                    <span class="C9 S4" v-show="order.status == 8">待发货</span>
                    <span class="C9 S4" v-show="order.status == 9">已发货</span>
                    <span class="C9 S4" v-show="order.status == -2">订单已取消</span>
                    <span class="C9 S4" v-show="order.status == 12">申请退款，待审核中</span> -->
                </template>
                <template v-if="order.type==1">
                    <!-- <span class="C9 S4" v-if="order.status == 1" type="">待发货</span> -->
                </template>

                <div class="clearfix"></div>
            </div>
        </div>

        <div class="service">
            <ul>
                <li>
                    <img src="img/on-line@2x.png" alt="">
                    <span class="S4 C3">在线客服</span>
                </li>
                <li>
                    <img src="img/telephone@2x.png" alt="">
                    <span class="S4 C3">客服电话</span>
                </li>
                <div class="clearfix"></div>
            </ul>
        </div>

        <div class="order-inf">
            <div class="order-inf-box">
                <p class="S5 C2">订单编号：
                    <span>{{order.orderId}}</span>
                    <!-- <em  v-clipboard:copy="order.orderId" v-clipboard:success="onCopy" v-clipboard:error="onError" >复制</em> -->
                </p>
                <p class="S5 C2">支付方式：
                    <span>{{order.payType == 1 ? '余额支付' : order.payType == 2 ? '微信' : order.payType == 3 ? '支付宝' :'未支付' }}</span>
                </p>
                <p class="S5 C2">下单时间：
                    <span>{{order.createTime }}</span>
                </p>
                <p class="S5 C2">发货时间：
                    <span>{{order.sendTime || '暂无' }}</span>
                </p>
                <p class="S5 C2">快递方式：
                    <span>{{order.expresscompany || '暂无' }}</span>
                </p>
                <p class="S5 C2">运单编号：
                    <span>{{order.expressid || '暂无' }}</span>
                    <em v-clipboard:copy="order.expressid" v-clipboard:success="onCopy" v-clipboard:error="onError" v-if="order.expressid">复制</em>
                </p>
            </div>
        </div>

        <!-- <div class="black_bg display-block"></div>

       <div class="click-set text-center">
            <div class="pick-up C4 S3">
               提货
            </div>
            <span class=" C3 S2">提货需要支付<em>￥0.0</em>运费，确定提货？</span>
            <div class="btn">
                <ul>
                    <li>取消</li>
                    <li>确认</li>
                </ul>
            </div>
       </div> -->

        <div class="bottom-btn">
            <div class="btn-box">
                <div class="box">

                    <template v-if="order.type==0">
                        <button v-show="order.status == 9" @click="$router.push({path:'/order/logistics',query:{expressid:order.expressid,expresscompany:order.expresscompany}})">查看物流</button>
                        <button class="btn-border2" v-show="order.status == 3" @click="cancelOrder(order)">取消订单</button>
                        <button class="btn-border1" v-show="order.status == 9" @click="collectGoods(order)">确认收货</button>
                        <button v-show="order.status == 7">删除订单</button>
                    </template>

                    <template v-if="order.type==1">
                        <span class="C9 S4" v-if="order.status == 1" type="">待发货</span>
                    </template>
                    <button class="btn-border1" @click="$router.push({path:'/details/' + order.gid })">再次购买</button>
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
import VueClipboard from "vue-clipboard2";
import { URI, WWW, getToken } from "@/apiConfig";
import axios from "axios";
import TabBar from "./TabBar";
import qs from "qs";
Vue.use(Lazyload);
Vue.use(InfiniteScroll);
Vue.use(VueClipboard);
export default {
  name: "OrderDetails",

  data() {
    return {
      pageSize: 10,
      pageIndex: 1,
      totalCount: 0,
      status: -1,
      WWW,
      loading: true,
      uid: getToken(),
      orderList: [],
      order: {}
    };
  },

  created() {},

  mounted() {
    //   console.log(this.$route.query,'this.$router.query')
    let _params = this.$route.query;
    axios.get(URI + "/order/detail?" + qs.stringify(_params)).then(res => {
      let _data = res.data;
      this.order = _data.data;
      if (_data.success == false) {
        Toast(_data.msg);
      }
      Indicator.close();
    });
  },

  methods: {
    totalPrice: item => {
      let _amount = 0;
      (item.orderInfo || []).forEach(v => {
        _amount += v.price * v.num;
      });
      return (_amount || 0).toFixed(2);
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
      let _params = this.$route.query;
      axios.get(URI + "/order/detail?" + qs.stringify(_params)).then(res => {
        let _data = res.data;
        this.order = _data.data;
        if (_data.success == false) {
          Toast(_data.msg);
        }
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
      });
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
    onCopy: function(e) {
      Toast(`已复制`);
    },
    onError: function(e) {}
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
