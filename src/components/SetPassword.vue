<template>
    <div id="password">
        <mt-header title="支付密码" fixed>
            <mt-button icon="back" slot="left" @click="$router.back()">返回</mt-button>
        </mt-header>
        <div class="password-box">
            <div class="box">
                <label>
                    <span style="opacity:0">占位</span>密码：</label>
                <input type="password" v-model="password" maxlength="6" placeholder="请输入您的密码">
            </div>
            <div class="box">
                <label>确认密码：</label>
                <input type="password" v-model="confirmPas" maxlength="6" placeholder="请再次输入密码">
            </div>
        </div>
        <div class="btn">
            <button @click="submit" type="">确认</button>
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
  InfiniteScroll
} from "mint-ui";
import Vue from "vue";
import { URI, WWW, getToken } from "@/apiConfig";
import axios from "axios";
import TabBar from "./TabBar";
import qs from "qs";
Vue.use(Lazyload);
Vue.use(InfiniteScroll);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

export default {
  name: "SetPassword",

  data() {
    return {
      password: "",
      confirmPas: "",
      toggleBuyMenu: false,
      num: 1,
      WWW,
      URI,
      loading: false,
      goodsAttr: {},
      account: {},
      uid: getToken()
    };
  },

  created() {},

  mounted() {
    // console.log(this.$route.params.id, "$route.params.id");
    let _params = {
      uid: this.uid
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
    submit(type) {
      if (this.password !== this.confirmPas) {
        Toast(`两次输入密码不一致，请修改 `);
      } else {
        let _params = {
          uid: this.uid,
          password: this.password
        };
        axios
          .get(URI + "/pay/setPayPassword?" + qs.stringify(_params))
          .then(res => {
            let _data = res.data;
            if (res.data.success) {
              this.toggleBuyMenu = false;
            } else {
              // Toast(`操作失败，请重新操作`);
            }
            Toast(_data.msg);
            // this.towLevelMenu = _data;
          });
      }
    },

    onSumbit() {
      this.addCart();
    },

    addCart() {},

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
.password-box {
  margin-top: 45px !important;
}
</style>
