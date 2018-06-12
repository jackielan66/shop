<template>
    <div id="refunds">

        <div class="icon-refunds">
            <div class="refunds-box">
                <img src="static/img/icon-success@2x.png" alt="">
            </div>
            <span>申请退款已提交，请等待确认</span>
            <button class="C8 S1" @click="onOk">确定</button>
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
import { URI, WWW, uid } from "@/apiConfig";
import axios from "axios";
import TabBar from "./TabBar";
import qs from "qs";
Vue.use(Lazyload);
Vue.use(InfiniteScroll);
export default {
  name: "RefundSuccess",

  data() {
    return {
      pageSize: 10,
      pageIndex: 1,
      totalCount: 0,
      pageCount: 0,
      status: -1,
      WWW,
      loading: true,
      uid,
      orderList: [],
      refundOrder: {},
      message: ""
    };
  },

  created() {},

  mounted() {
    window.localStorage.removeItem("refundOrder");
  },
  filters: {
    fmoney: num => {
      return (num || 0).toFixed(2);
    }
  },
  methods: {
    onOk(order) {
      this.$router.push({ name: "Mine" });
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
</style>
