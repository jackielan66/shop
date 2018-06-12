<template>
    <div></div>
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
  name: "LoginTest",

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
    // test
    window.localStorage.removeItem("uid");
    window.localStorage.removeItem("recommendCode");
    window.localStorage.removeItem("sessionId");
    let uid = "";
    let url = window.location.search;
    if (url.includes("&gid=")) {
      uid = url.split("&")[0].split("=")[1];
      let gid = url.split("&")[1].split("=")[1];
      if (!uid) {
        Toast("登录有误！请退出后重新登录");
        return;
      }
      window.localStorage.setItem("uid", uid);
      window.location.href = "/index.html#/details/" + gid;
    } else if (url.includes("nogid=")) {
      let gid = url.split('&')[0].split("=")[1];
      let recommendCode = url.split('&')[1].split("=")[1];
      let sessionId = url.split('&')[2].split("=")[1];
      window.localStorage.setItem('recommendCode',recommendCode)
      window.localStorage.setItem('sessionId',sessionId)
      window.localStorage.removeItem("uid");
      window.location.href = "/index.html#/details/" + gid;
    } else {
      if (url.split("=") && url.split("=").length >= 1 && url.split("=")[1]) {
        uid = url.split("=")[1];
      }
      console.log(uid, "uid");
      // let params = this.$route.query;
      // console.log(this.$route, "pathis.$routerams");
      // let uid = params.uid;
      if (!uid) {
        Toast("登录有误！请退出后重新登录");
        return;
      }
      window.localStorage.setItem("uid", uid);
      window.location.href = "/index.html#/home";
    }
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
