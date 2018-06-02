<template>

    <div id="about">
        <mt-header title="关于我们" fixed>
            <mt-button icon="back" slot="left" @click="$router.back()">返回</mt-button>
        </mt-header>
        <div class="logo">
            <img src="static/img/img-logo@2x.png" alt="">
        </div>
        <div class="text-box">
            <div class="box">
                <p>三人喜是福建陆地包网络科技有限公司旗下一家创新云超市，商品共享，店主分销。品鉴师严选10年以上名企商品入驻，由工厂直邮到消费者，确保货真价实。让消费者真正买到放心商品，每日购惊喜，让每一位用户有机会免费得商品。
                </p>
            </div>
        </div>
        <div class="btn-box">

            <div class="phone" @click="popupVisible=true">
                <span class="fl-l">客服电话</span>
                <img class="fl-r" src="static/img/icon_next@2x.png" alt="">
            </div>
            <div class="phone">
                <span class="fl-l">在线客服</span>
                <img class="fl-r" src="static/img/icon_next@2x.png" alt="">
            </div>
        </div>
        <mt-popup v-model="popupVisible" modal="false" position="right">
            412412412412
        </mt-popup>
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
  Popup
} from "mint-ui";
import Vue from "vue";
import { URI, WWW } from "@/apiConfig";
import axios from "axios";
import TabBar from "./TabBar";
import qs from "qs";
Vue.use(Lazyload);
Vue.use(InfiniteScroll);
Vue.component(Popup.name, Popup);
export default {
  name: "About",

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
      loading: true,
      popupVisible: false
    };
  },

  created() {},

  mounted() {
    let _params = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    };
    // Indicator.open();

    // 初始化商品列表信息
    // axios
    //   .get(URI + "/goods/getGoodsByclId?" + qs.stringify(_params))
    //   .then(res => {
    //     Indicator.close();
    //     let _data = res.data.data;
    //     this.GoodsList = _data.pages;
    //     this.totalCount = _data.totalCount;
    //     this.loading = false;
    //   });

    // // 初始化请求一级菜单
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
      this.type = null;
      this.direction = null;
      this.GoodsList = [];
      this.fetchData();
    },

    searchUseType(type) {
      this.type = type;
      this.pageIndex = 1;
      this.direction = 1;
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
.logo {
  margin-top: 45px !important;
}
</style>
