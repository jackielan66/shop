<template>
    <div id="share">
		<div class="share-top">
			<img src="static/img/red-top@2x.png" alt="">
		</div>
		<div class="qr-code">
			<div class="code">
				<img src="" alt="">
			</div>
		</div>
		<div class="btn">
			<img src="static/img/img-btn@2x.png" alt="">
		</div>
		<div class="huod">
			<img src="static/img/img-huod@2x.png" alt="">
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
  name: "Share",

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
    
  },

  methods: {
    toggleMenu() {
      this.isMenuShow = !this.isMenuShow;
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
