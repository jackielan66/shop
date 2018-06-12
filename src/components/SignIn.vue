<template>
    <div id="sign">
        <div class="bg-sign">
            <div class="sign-box">
                <div class="phone">
                    <img src="static/img/icon-phone.png" alt="">
                    <input type="text" v-model="phone" placeholder="请输入手机号码" name="">
                </div>
                <div class="phone">
                    <img class="width-20px" src="static/img/Code@2x.png" alt="">
                    <input type="text" placeholder="请输入邀请码" name="">
                </div>
                <div class="code">
                    <img src="static/img/icon-Code.png" alt="">
                    <input type="text" placeholder="请输入验证码" name="">
                    <button type="" @click="getCode">获取验证码</button>
                </div>
                <button class="margin-top-20px" @click="submit" type="">绑定手机</button>
            </div>
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
  name: "SignIn",

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
      uid,
      phone: "",
      code:'',
      recommendCode:''
    };
  },

  created() {},

  mounted() {
    // console.log(this.$route.params.id, "$route.params.id");
    let _params = {
      uid: uid
    };
    // Indicator.open();
    // 初始化个人信息中心
    // axios.get(URI + "/user/userCenter?" + qs.stringify(_params)).then(res => {
    //   Indicator.close();
    //   let _data = res.data.data;
    //   this.account = _data;
    // });
  },

  methods: {
    getCode() {
      let _params = {
        phone: this.phone
      };
      axios.get(URI + "/user/sendMsg?" + qs.stringify(_params)).then(res => {
        let _data = res.data;
        // if (res.data.success) {
        //   this.toggleBuyMenu = false;
        // } else {
        //   // Toast(`操作失败，请重新操作`);
        // }
        Toast(_data.msg);
      });
    },
    submit(type) {
      console.log(this.phone, "-----");
      if (this.password !== this.confirmPas) {
        Toast(`两次输入密码不一致，请修改 `);
      } else {
        let _params = {
          sessionId: uid,
          phone: this.phone,
          code: this.code,
          recommendCode: this.recommendCode
        };
        axios.get(URI + "/user/bindWX" + qs.stringify(_params)).then(res => {
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