<template>
    <div id="sign">
        <div class="black_bg display-block"></div>
        <div class="bd-iphone">
            <span>为保证账号安全，请绑定手机号码</span>
            <div class="input-box">
                <input type="text" v-model="phone" placeholder="请输入手机号码" name="">
                <input class="width-110 fl-l" v-model="code" type="text" placeholder="请输入验证码" name="">
                <input class="width-80 fl-r" v-bind:disabled="isBtnDisabled" v-bind:value="btnValue" @click="getCode" type="button" name="">
                <div class="clearfix"></div>
            </div>
            <button class="C3" type="" @click="submit(0)"> 取消</button>
            <button class="C9" type="" @click="submit(1)">确认</button>
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
export default {
  name: "DetailsBindPhone",

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
      phone: "",
      code: "",
      recommendCode: "",
      time: 60,
      isBtnDisabled: false,
      btnValue: `获取验证码`
    };
  },

  created() {},

  mounted() {
    // console.log(this.$route.params.id, "$route.params.id");
    // let _params = {
    //   uid: uid
    // };
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
        Toast(_data.msg);
        if (_data.success) {
          this.isBtnDisabled = true;
          let That = this;
          let _time = window.setInterval(() => {
            That.time = That.time - 1;
            if (That.time > 0) {
              That.btnValue = That.time;
            } else {
              this.isBtnDisabled = false;
              That.btnValue = `获取验证码`;
              That.time  = 60;
              window.clearInterval(_time)
            }
          }, 1000);
        }
      });
    },
    submit(type) {
      console.log(this.phone, "-----");
      if (!type) {
        this.$emit("bindPhoneCallback");
      } else {
        let sessionId = window.localStorage.getItem("sessionId");
        let recommendCode = window.localStorage.getItem("recommendCode");
        if (!sessionId || !recommendCode) {
          Toast(`登录问题，请关闭微信后重新登录`);
          return;
        }
        let _params = {
          sessionId: sessionId,
          phone: this.phone,
          code: this.code,
          recommendCode: recommendCode
        };
        axios.get(URI + "/goods/bindWX?" + qs.stringify(_params)).then(res => {
          let _data = res.data;
          if (_data.success) {
            if (_data.data.uid) {
              window.localStorage.setItem("uid", _data.data.uid);
              window.localStorage.removeItem("recommendCode");
              window.localStorage.removeItem("sessionId");
              this.$emit("bindPhoneCallback");
              Toast(_data.msg);
            }
          } else {
            Toast(_data.msg);
          }
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
</style>