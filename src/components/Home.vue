<template>
    <div id="home">
        <!-- 头部 -->
        <div class="top">
            <a href="##">
                <span class="message-span"></span>
            </a>
            <input class="title" v-model="searchWord" type="text" placeholder="搜索" name="">

            <span @click="gotoSearch" class="search-span"></span>

        </div>
        <div class="clearfix"></div>

        <!-- banner -->
        <template v-if="bannerList.length>0">
            <div class="banner">
                <mt-swipe :auto="5000" :continuous="false">
                    <mt-swipe-item v-for="(home,index) in bannerList" :key="index">
                        <img v-lazy="www+ '/' +home.img" />
                    </mt-swipe-item>
                </mt-swipe>
                <!-- <div class="choujian">
    		  <img src="static/img/icon_choujiang@2x.png" alt="">
    	   </div> -->
            </div>
        </template>
        <!-- <div class="tishi">
            <img src="./static/img/tishi@2x.png" alt="">
            <a href="##">
                <marquee behavior="scroll" direction="left" scrollamount="3">系统正在维护中，暂时无法正常使用，敬请谅解。</marquee>
            </a>
            <button type="">X</button>
        </div> -->

        <!-- 促销专区 -->
        <div class="cuxiao">
            <h1>惊喜购</h1>
            <a v-if="promotionList.promotionImg" href="https://websanrenxi.oss-cn-beijing.aliyuncs.com/promotion.html">
                <img v-lazy="www + '/' +promotionList.promotionImg" alt="">
            </a>
        </div>

        <!-- 品牌推荐 -->
        <div class="pinpai">
            <h1>品牌推荐</h1>
            <router-link v-bind:to="'/brand/'+ item.bid" v-for="(item,index) in brandsList" v-bind:key="index">
                <img v-lazy="www+'/' +item.imgurl" alt="">
            </router-link>
        </div>

        <!-- 自营专区 -->
        <div class="ziying">
            <h1>口碑好货</h1>
            <router-link to="/brand">
                <div class="more">
                    <span>更多</span>
                    <img src="static/img/icon_next@2x.png" alt="" />
                </div>
            </router-link>
            <div class="clearfix"></div>
            <ul>
                <li v-for="(item,index) in homeList" v-bind:key="index">
                    <router-link v-bind:to="'/details/'+item.gid">
                        <div class="img_box">
                            <img v-lazy="www+'/' +item.mainPic" alt="">
                        </div>
                        <div class="text_p">
                            <p class="C3">{{item.title}}</p>
                        </div>
                        <div class="money">
                            <span class="C1 S1">
                                <em class="S6">￥</em>{{item.discountprice}}</span>
                            <!-- <span class="C2 S4"><em class="S6">￥</em>899</span> -->
                        </div>
                    </router-link>
                </li>
            </ul>
            <div class="clearfix"></div>
            <div class="img-buttom">
                <img src="static/img/img-buttom@2x.png" alt="">
            </div>
        </div>

        <!-- 底部道航 -->
        <tab-bar :seleted="`home`"></tab-bar>

        <!-- 瓜分弹窗 -->

        <!-- <div class="guaifen">
            <div class="guaifen_box text-center">
                <img src="img/img_monet_box@2x.png" alt="">
                <h2 class="S7 C4">恭喜您！抽到
                    <span class="S8 C1">20</span>
                    <em class="C1 C4">喜币</em>
                </h2>
                <span class="S5 C3">每天一次 &nbsp;瓜分千万喜币</span>
                <div class="close">
                    <img src="img/icon_cha@2x.png" alt="">
                </div>
            </div>
        </div> -->

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
  InfiniteScroll,
  Header
} from "mint-ui";
import { URI, WWW } from "@/apiConfig";
import Vue from "vue";
import axios from "axios";
import TabBar from "./TabBar";
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.use(Lazyload);
export default {
  name: "Home",

  data() {
    return {
      promotionList: {},
      bannerList: [],
      brandsList: [],
      homeList: [],
      www: WWW,
      searchWord: ""
    };
  },

  created() {},

  mounted() {
    // test end
    axios.get(URI + "/goods/home").then(res => {
      let _data = res.data.data;
      this.promotionList = _data;
      this.bannerList = _data.banners;
      this.brandsList = _data.brands;
      this.homeList = _data.goodsInfo;
    });
  },

  methods: {
    gotoSearch() {
      this.$router.push({ name: "Search", params: { word: this.searchWord } });
      //   this.$router.push("/search?word=" + );
    }
  },

  components: {
    TabBar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.banner {
  height: 180px;
}
</style>
