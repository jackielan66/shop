<template>
    <div id="brand">
        <!-- 筛选 -->
        <div class="black_bg"></div>
        <div class="brand_nav">
            <ul class="brand_nav_top">
                <li class="S2 C6" @click="toggleMenu">品牌分类</li>
                <li class="S2" v-bind:class="type == 1 ? 'C6' : 'C3'" @click="searchUseType(1)">销量</li>
                <li class="S2" v-bind:class="type == 0 ? 'C6' : 'C3'" @click="searchUseType(0)">
                    <span>价格</span><img src="" alt=""></li>
                <div class="clearfix"></div>
            </ul>
            <div class="tow-nav" v-show="isMenuShow">
                <div class="one">
                    <h2 v-for="(item,index) in categoryList" @click="onFirstMenuClick(item)" :key="index" class="S2" v-bind:class="cid == item.cid ? 'C6 bg':'C3' ">{{item.cname}}</h2>
                </div>
                <div class="tow">
                    <h3 v-for="(item,index) in towLevelMenu" :key="index" @click="onSecondMenuClick(item)" class="S2" :class="clid == item.clid ? 'C6' :'C3' ">{{item.clname}}</h3>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>

        <div class="ziying" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="20">
            <ul>
                <li v-for="(item,index) in GoodsList" :key="index">
                    <router-link v-bind:to="'details/'+item.gid">
                        <div class="img_box">
                            <img v-lazy="WWW +'/' + item.mainPic" />
                        </div>
                        <div class="text_p">
                            <p class="C3">{{item.title}}</p>
                        </div>
                        <div class="money">
                            <span class="C1 S1 none-lith">
                                <em class="S6">￥</em>{{item.discountprice}}</span>
                        </div>
                    </router-link>
                </li>

            </ul>
            <div class="clearfix"></div>
        </div>
        <!-- 底部道航 -->
        <tab-bar :seleted="`brand`"></tab-bar>
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
export default {
  name: "Brand",

  data() {
    return {
      GoodsList: [],
      isMenuShow: false,
      categoryList: [], // 一级菜单
      towLevelMenu: [],
      cid: -1,
      clid: -1,
      pageSize: 10,
      pageIndex: 1,
      totalCount: 0,
      type: null,
      direction: null,
      WWW,
      loading: true
    };
  },

  created() {},

  mounted() {
    let _params = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    };
    Indicator.open();

    // 初始化商品列表信息
    axios
      .get(URI + "/goods/getGoodsByclId?" + qs.stringify(_params))
      .then(res => {
        Indicator.close();
        let _data = res.data.data;
        this.GoodsList = _data.pages;
        this.totalCount = _data.totalCount;
        this.loading = false;
      });

    // 初始化请求一级菜单
    axios.get(URI + "/goods/getCategory").then(res => {
      let _data = res.data.data;
      this.categoryList = _data;
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
      this.type = null;
      this.direction = null;
      this.GoodsList = [];
      this.fetchData();
    },

    searchUseType(type){
        this.type=type;
        this.pageIndex=1;
        this.direction = 1;
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
      if (this.type != null) {
        _params.type = this.type;
      }
      if (this.direction != null) {
        _params.direction = this.direction;
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
