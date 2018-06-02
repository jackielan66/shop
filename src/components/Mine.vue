<template>
    <div id="my">
        <div class="my-top">
            <div class="box">
                <div class="header-box" v-show="account.avatar">
                    <img v-lazy="WWW + '/' + account.avatar" alt="">
                </div>
                <div class="name-box S4 C8">
                    <h2>{{account.loginName}}</h2>
                    <span>ID:
                        <em>{{uid}}</em>
                    </span>
                </div>
                <img class="set-up" src="static/img/set-up@2x.png" alt="">
            </div>
        </div>
        <div class="account text-center">
            <ul>
                <li>
                    <h2 class="C8 S7">{{account.money}}</h2>
                    <span class="C3 S10">钱包</span>
                </li>
                <li>
                    <h2 class="C8 S7">{{account.point}}</h2>
                    <span class="C3 S10">喜币</span>
                </li>
                <div class="clearfix"></div>
            </ul>
        </div>

        <div class="line"></div>
        <router-link to="/my-order">
            <div class="my-table">
                <div class="table">
                    <img src="static/img/my-order@2x.png" alt="">
                    <span class="C3 S4">我的订单</span>
                    <img class="next" src="static/img/icon_next@2x.png" alt="">
                </div>
            </div>
        </router-link>

        <div class="my-table">
            <div class="table">
                <img src="static/img/share@2x.png" alt="">
                <span class="C3 S4">分享奖励</span>
                <img class="next" src="static/img/icon_next@2x.png" alt="">
            </div>
        </div>
        <router-link to="/my/about">
            <div class="my-table">
                <div class="table">
                    <img src="static/img/about@2x.png" alt="">
                    <span class="C3 S4">关于我们</span>
                    <img class="next" src="static/img/icon_next@2x.png" alt="">
                </div>
            </div>
        </router-link>

        <tab-bar :seleted="`my`"></tab-bar>
    </div>
    <!-- 底部道航 -->

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
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
let uid = `1fb004b2cbe54c0b92bcab3cb58ad9c3`;
export default {
  name: "Mine",

  data() {
    return {
      myList: [],
      myList: [],
      toggleBuyMenu: false,
      num: 1,
      WWW,
      URI,
      loading: false,
      goodsAttr: {},
      account: {},
      uid
    };
  },

  created() {},

  mounted() {
    // console.log(this.$route.params.id, "$route.params.id");
    let _params = {
      uid: uid
    };
    Indicator.open();
    // 初始化个人信息中心
    axios.get(URI + "/user/userCenter?" + qs.stringify(_params)).then(res => {
      Indicator.close();
      let _data = res.data.data;
      this.account = _data;
    });
  },

  methods: {
    onJoinCart() {
      this.toggleBuyMenu = !this.toggleBuyMenu;
      this.getGoodInfo();
    },

    getGoodInfo() {
      let _params = {
        gid: this.$route.params.id,
        num: this.num
      };
      axios.get(URI + "/user/userCenter?" + qs.stringify(_params)).then(res => {
        let _data = res.data.data;
        this.goodsAttr = _data;
      });
    },

    changeNum(type) {
      if (type == "-") {
        if (this.num == 1) {
          Toast(`最少数量必须为 0 `);
          return;
        }
        this.num--;
      } else if (type == "+") {
        this.num++;
      }
      this.getGoodInfo();
    },

    onSumbit() {
      this.addCart();
    },

    addCart() {
      let _params = {
        gid: this.$route.params.id,
        uid: uid,
        type: 2,
        num: this.num,
        title: this.goodsDetails.title
      };
      axios.get(URI + "/cart/addCart?" + qs.stringify(_params)).then(res => {
        let _data = res.data.data;
        if (res.data.success) {
          this.toggleBuyMenu = false;
          Toast(`加入购物车成功`);
        } else {
          Toast(`操作失败，请重新操作`);
        }
        // this.towLevelMenu = _data;
      });
    },

    loadMore() {
      this.loading = true;
      this.pageIndex = this.pageIndex + 1;
      this.fetchData();
      // setTimeout(() => {
      //   let last = this.list[this.list.length - 1];
      //   for (let i = 1; i <= 10; i++) {
      //     this.list.push(last + i);
      //   }
      //   this.loading = false;
      // }, 2500);
    }
  },

  components: {
    TabBar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#details .attribute {
  display: block;
}
</style>
