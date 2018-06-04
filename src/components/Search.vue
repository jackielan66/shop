<template>
    <div id="search">
        <!-- 头部 -->
        <div class="search-top">
            <div class="search-search">
                <input type="text" v-model="keyword" placeholder="搜索商品" name="">
                <i class="icon-search" @click="onSearch">
                    <img src="static/img/search@2x.png" alt="">
                </i>
            </div>
            <span class="S1" @click="$router.back()">取消</span>
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
        <!-- <div class="hot-search">
            <h3 class="S5 C3">热搜</h3>
            <span class="S5 C3">大红袍</span>
            <span class="S5 C3">肉桂</span>
            <span class="S5 C3">岩茶</span>
            <span class="S5 C3">红茶</span>
            <span class="S5 C3">红糖</span>
            <span class="S5 C3">有机蔬菜</span>
            <span class="S5 C3">酒</span>
        </div>
        <div class="hot-search">
            <h3 class="S5 C3">搜索历史</h3>
            <span class="S5 C3">大红袍</span>
            <span class="S5 C3">肉桂</span>
            <span class="S5 C3">岩茶</span>
            <span class="S5 C3">红茶</span>
            <span class="S5 C3">红糖</span>
            <span class="S5 C3">有机蔬菜</span>
            <span class="S5 C3">酒</span>
        </div>
        <div class="delete">
            <span class="S4 C2">清除历史</span>
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
  name: "Search",

  data() {
    return {
      GoodsList: [],
      WWW,
      loading: true,
      keyword: ""
    };
  },

  mounted() {
    let _params = {
      keyword: this.$route.params.word || ""
    };
    this.keyword = _params.keyword;
    // console.log(this.$route.params, "this.$route.params.searchWord");
    Indicator.open();
    axios
      .get(URI + "/goods/getGoodsByKeyword?" + qs.stringify(_params))
      .then(res => {
        Indicator.close();
        let _data = res.data.data;
        this.GoodsList = _data;
        this.loading = false;
      });
  },

  methods: {
    onSearch() {
      let _params = {
        keyword: this.keyword || ""
      };
      Indicator.open();
      axios
        .get(URI + "/goods/getGoodsByKeyword?" + qs.stringify(_params))
        .then(res => {
          Indicator.close();
          let _data = res.data.data;
          this.GoodsList = _data;
          this.loading = false;
        });
    },

    onSecondMenuClick(secondMenu) {}
  },

  components: {
    TabBar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
