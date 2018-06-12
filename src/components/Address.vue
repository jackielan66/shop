<template>
    <div id="address">
        <mt-header title="收货地址" fixed>
            <mt-button icon="back" slot="left" @click="$router.back()">返回</mt-button>

        </mt-header>
        <div class="address-content">
            <div class="add-table" v-for="(item,index) in addrList" :key="index">
                <div class="add-box">
                    <img @click="setDefaultAddr(item)" v-bind:src="'static/img/choice-' + (item.defaultAddress == 1? 'on' :'off') +'@2x.png'" alt="">
                    <div class="add-text" @click="setDefaultAddr(item)">
                        <span>{{item.name}}</span>
                        <span>{{item.phone}}</span>
                        <em></em>
                        <p>{{item.area + ' ' +item.detail }}</p>
                    </div>
                    <img src="static/img/edit@2x.png" alt="" @click="editAddr(item)">
                </div>
            </div>
        </div>

        <div class="add-btn" @click="editAddr(null)">
            <button>新增地址</button>
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
export default {
  name: "Address",

  data() {
    return {
      addrList: [],
      goodsDetails: {},
      defaultAddress: {},
      order: {},
      WWW,
      loading: true,
      uid: getToken(),
      amount: 0,
      payType: 1,
      feedback: ""
    };
  },

  created() {},

  mounted() {
    let _params = {
      uid:this.uid
    };
    // 获取所有地址
    axios
      .get(URI + "/address/getAddressByUid?" + qs.stringify(_params))
      .then(res => {
        let _data = res.data.data;
        this.addrList = _data;
        // window.localStorage.setItem('addrList', _data);
      });
  },

  methods: {
    editAddr(address) {
      if (address) {
        this.$router.push(`/address-edit?addressId=${address.addressId}`);
      } else {
        this.$router.push("/address-edit");
      }
    },
    setDefaultAddr(item) {
      item.defaultAddress = 1;
      item.uid = this.uid;
      axios
        .get(URI + "/address/editAddress?" + qs.stringify(item))
        .then(res => {
          let _data = res.data;
          if (_data.success) {
            this.$router.back();
          }
          Toast(_data.msg);
        });

      //
    }
  },

  components: {
    TabBar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.address-content {
  margin-top: 45px !important;
}
</style>
