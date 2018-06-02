<template>

    <div id="cart">
        <mt-header title="购物车" fixed>
            <mt-button slot="right" @click="$router.back()">编辑</mt-button>
        </mt-header>

        <div class="box">
            <div class="cart-table" v-for="(item,index) in cartGoodList" :key="index">
                <div class="cart-box">
                    <div class="cart-heard">
                        <div class="choice">
                            <img src="static/img/choice-off@2x.png" alt="">
                            <img class="display-none" src="static/img/choice-on@2x.png" alt="">
                        </div>
                        <div class="shop-name">
                            <img src="static/img/icon_Supermarket@2x.png" alt="">
                            <span class="C3 S4">{{item.brand}}</span>
                        </div>
                    </div>
                    <div class="goods-inf" v-for="(cart,index) in item.goods" :key="index" >
                        <div class="choice">
                            <img src="static/img/choice-off@2x.png" alt="">
                            <img class="display-none" src="static/img/choice-on@2x.png" alt="">
                        </div>
                        <div class="goods-img">
                            <img v-lazy="WWW + '/' + cart.img" alt=""/>
                        </div>
                        <div class="goods-text">
                            <h2 class="C3 S5">
                                <span class="order-label1">品牌</span> {{cart.title}}</h2>
                            <p class="C2 S5">
                                <span>芒果味</span>
                            </p>
                            <div class="number">
                                <span class="C9 S1 fl-l">
                                    <em class="S5">¥</em>{{cart.price}}</span>
                                <div class="number-btn fl-r">
                                    <img src="static/img/btn_jian@2x.png" alt="">
                                    <span class="S4 C3">{{cart.num}}</span>
                                    <img src="static/img/btn_jia@2x.png" alt="">
                                </div>

                            </div>
                        </div>
                    </div>
         
                </div>
            </div>
        </div>

        <div class="bottom-settl">
            <div class="choice fl-l width-70">
                <img src="static/img/choice-off@2x.png" alt="">
                <img class="display-none" src="static/img/choice-on@2x.png" alt="">
                <span class="C3 S2">全选</span>
                <span class="S2 C3 fl-r margin-right-5px">总记：
                    <em class="C9 S5">¥</em>
                    <em class="C9 S1">913.99</em>
                </span>
            </div>
            <div class="btn fl-r">
                <span class="C4 S1">结算</span>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="bottom-settl display-none">
            <div class="choice fl-l width-70">
                <img src="static/img/choice-off@2x.png" alt="">
                <span class="C3 S2">全选</span>
            </div>
            <div class="btn fl-r">
                <span class="C4 S1">删除</span>
            </div>
            <div class="clearfix"></div>
        </div>

        <!-- 底部道航 -->
        <tab-bar :seleted="`cart`"></tab-bar>

    </div>
    <!-- TOP -->

    <!-- <div class="icon_top">
        <a href="#top">
            <img src="img/icon_top.png" alt="">
        </a>
    </div> -->

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
let uid = `1fb004b2cbe54c0b92bcab3cb58ad9c3`;
export default {
  name: "Cart",

  data() {
    return {
      cartGoodList: [],
      WWW,
      uid,
      loading: false
    };
  },

  created() {},

  mounted() {
    let _params = {
      uid: this.uid
    };
    Indicator.open();
    // 初始化购物车列表
    axios.get(URI + "/cart/intoCart?" + qs.stringify(_params)).then(res => {
      Indicator.close();
      let _data = res.data.data;
      this.cartGoodList = _data;
    });
  },

  methods: {
    toggleMenu() {
      this.isMenuShow = !this.isMenuShow;
    },

    onFirstMenuClick(firstMenu) {
      let _params = { cid: firstMenu.cid };
      this.cid = _params.cid;
      axios
        .get(URI + "/goods/getCategoryLeaf?" + qs.stringify(_params))
        .then(res => {
          let _data = res.data.data;
          this.towLevelMenu = _data;
        });
    },

    onSecondMenuClick(secondMenu) {
      this.isMenuShow = false;
      let _params = { clid: secondMenu.clid };
      if (secondMenu.clid == this.clid) {
        return;
      }
      this.clid = _params.clid;
      this.pageIndex = 1;
      this.GoodsList = [];
      this.fetchData();
    },

    fetchData() {
      let _params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      if (Math.ceil(this.totalCount / this.pageSize) < this.pageIndex - 1) {
        this.loading = false;
        Toast(`已经是最后一页啦`);
        return;
      }
      if (this.clid >= 0) {
        _params.clid = this.clid;
      }
      Indicator.open();
      axios
        .get(URI + "/goods/getGoodsByclId?" + qs.stringify(_params))
        .then(res => {
          Indicator.close();
          let _data = res.data.data;
          this.totalCount = _data.totalCount;
          this.GoodsList = this.GoodsList.concat(_data.pages);
          this.loading = false;
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
.brand_nav .tow-nav {
  display: block;
}
</style>
