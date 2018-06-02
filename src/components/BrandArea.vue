<template>

    <div id="brand-area">
        <mt-header title="品牌专区"  fixed >
            <mt-button icon="back" slot="left" @click="$router.back()">返回</mt-button>
        </mt-header>
        <div class="banner" v-if="topImg">
            <img v-lazy="WWW + '/'+ topImg" alt="">
        </div>

        <div class="ziying">
            <div class="title-top text-center">
                <img src="static/img/line@2x.png" alt="">
                <span class="S1 C7">商品展示</span>
                <img src="static/img/line@2x.png" alt="">
            </div>
            <div class="clearfix"></div>
            <ul>
                <li v-for="(item,index) in goodsList" :key="index">
                    <router-link v-bind:to="'/details/'+item.gid">
                        <div class="img_box">
                            <img v-lazy="WWW + '/'+ item.mainPic">
                        </div>
                        <div class="text_p">
                            <p class="C3">{{item.title}}</p>
                        </div>
                        <div class="money">
                            <span class="C1 S1">
                                <em class="S6">￥</em>{{item.discountprice}}</span>
                            <span class="C2 S4">
                                <em class="S6">￥</em>{{item.originalprice}}</span>
                        </div>
                    </router-link>
                </li>

            </ul>
            <div class="clearfix"></div>
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
  Header
} from "mint-ui";
import Vue from "vue";
import { URI, WWW } from "@/apiConfig";
import axios from "axios";
import TabBar from "./TabBar";
import qs from "qs";
Vue.component(Header.name, Header);
Vue.use(Lazyload);
Vue.use(InfiniteScroll);
export default {
  name: "BrandArea",

  data() {
    return {
      topImg: "",
      goodsList: [],
      WWW,
      loading: true
    };
  },

  created() {},

  mounted() {
    let _params = {
      bid: this.$route.params.bid
    };
    Indicator.open();

    // 初始化商品列表信息
    axios
      .get(URI + "/goods/getBrandGoods?" + qs.stringify(_params))
      .then(res => {
        Indicator.close();
        let _data = res.data.data;
        this.goodsList = _data.goods;
        this.topImg = _data.topImg;
        this.loading = false;
      });

    // 初始化请求一级菜单
    // axios.get(URI + "/goods/getCategory").then(res => {
    //   let _data = res.data.data;
    //   this.categoryList = _data;
    // });
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
      //   let _params = {
      //     pageIndex: this.pageIndex,
      //     pageSize: this.pageSize
      //   };
      //   if (Math.ceil(this.totalCount / this.pageSize) < this.pageIndex - 1) {
      //     this.loading = false;
      //     Toast(`已经是最后一页啦`);
      //     return;
      //   }
      //   if (this.clid >= 0) {
      //     _params.clid = this.clid;
      //   }
      //   Indicator.open();
      //   axios
      //     .get(URI + "/goods/getGoodsByclId?" + qs.stringify(_params))
      //     .then(res => {
      //       Indicator.close();
      //       let _data = res.data.data;
      //       this.totalCount = _data.totalCount;
      //       this.GoodsList = this.GoodsList.concat(_data.pages);
      //       this.loading = false;
      //     });
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
    .banner{
        margin-top: 45px !important;
    }
</style>
