<template>
    <div id="logistics">
        <mt-header title="我的物流" fixed>
            <mt-button icon="back" slot="left" @click="$router.back()">返回</mt-button>
        </mt-header>
        <div class="logistics-inf">
            <div class="inf-box">
                <p class="C3 S4">运单号：
                    <span>{{$route.query.expressid}}</span>
                    <em class="C2" v-clipboard:copy="$route.query.expressid" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</em>
                </p>
                <p class="C3 S4">承运公司：
                    <span>{{$route.query.expresscompany}}</span>
                </p>
                <p class="C3 S4">承运公司电话：
                    <a href="tel:666666" class="C10" title="">6666666</a>
                </p>
            </div>
        </div>

        <div class="real-time">
            <div class="position-box " v-for="(item,index) in traces" :key="index" v-bind:class="index ==0 && 'first-position-box' ">
                <div class="text-box " v-bind:class="index ==0 && 'first-text-box' ">
                    <p class="C3 S4">{{item.AcceptStation}}</p>
                    <span class="C2 S5">{{item.AcceptTime}}</span>
                </div>
            </div>
        </div>

        <!-- TOP -->
        <!-- <div class="icon_top">
            <a href="#top">
                <img src="img/icon_top.png" alt="">
            </a>
        </div> -->
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
import { URI, WWW } from "@/apiConfig";
import axios from "axios";
import TabBar from "./TabBar";
import qs from "qs";
Vue.use(Lazyload);
Vue.use(InfiniteScroll);
import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);
export default {
  name: "Logistics",

  data() {
    return {
      pageSize: 10,
      pageIndex: 1,
      totalCount: 0,
      status: -1,
      WWW,
      loading: true,
      uid: ``,
      orderList: [],
      expressData: {},
      traces: []
    };
  },

  created() {},

  mounted() {
    let _params = this.$route.query;
    // Indicator.open();
    axios
      .get(URI + "/order/getLogisticsInfo?" + qs.stringify(_params))
      .then(res => {
        Indicator.close();
        let _data = res.data;
        if (_data.success) {
          this.expressData = _data.data;
          this.traces = _data.data.Traces.reverse();
        } else {
          Toast(_data.msg);
        }
      });
  },

  methods: {
    onCopy: function(e) {
      Toast(`已复制`);
      //   alert("You just copied: " + e.text);
    },
    onError: function(e) {
      //   alert("Failed to copy texts");
    }
  },

  components: {
    TabBar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logistics-inf {
  margin-top: 45px !important;
}
</style>
