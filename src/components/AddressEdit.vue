<template>
    <div id="address">
        <mt-header :title="type==0?'修改地址':'添加地址'" fixed>
            <mt-button icon="back" slot="left" @click="$router.back()">返回</mt-button>
            <mt-button v-if="type==0" slot="right" @click="delAddress">删除</mt-button>
        </mt-header>
        <div class="address-content">
            <div class="inf">
                <div class="inf-table">
                    <label class="S2 C2">收货人</label>
                    <input v-model="address.name" type="text" placeholder="收货人" name="">
                </div>
            </div>
            <div class="inf margin-top-0">
                <div class="inf-table">
                    <label class="S2 C2">手机号码</label>
                    <input type="text" v-model="address.phone" placeholder="手机号码" name="">
                </div>
            </div>
            <div class="line"></div>
            <div class="inf margin-top-0">
                <div class="inf-table">
                    <label class="S2 C2">所在地区</label>
                    <input type="text" v-model="address.area" placeholder="所在地区" name="">
                </div>
            </div>
            <div class="inf margin-top-0 height-50">
                <div class="inf-table">
                    <label class="S2 C2 line-height-50">详细地址</label>
                    <textarea v-model="address.detail" name=""></textarea>
                </div>
            </div>
            <div class="line"></div>
            <div class="inf margin-top-0 height-50">
                <div class="inf-table" @click="setDefaultAddr">
                    <label class="S2 C2 line-height-50">设置为默认地址</label>
                    <img v-show="address.defaultAddress==0" src="static/img/add-switch-off@2x.png" alt="">
                    <img v-show="address.defaultAddress==1" src="static/img/add-switch-on@2x.png" alt="">
                </div>
            </div>
            <div class="pretion-btn" @click="sumbit">
                {{type==0?'保存':'添加'}}
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
  InfiniteScroll,
  MessageBox
} from "mint-ui";
import Vue from "vue";
import { URI, WWW, uid, getToken } from "@/apiConfig";
import axios from "axios";
import TabBar from "./TabBar";
import qs from "qs";
Vue.use(Lazyload);
Vue.use(InfiniteScroll);
export default {
  name: "AddressEdit",

  data() {
    return {
      address: {
        area: "",
        defaultAddress: "1",
        detail: "",
        name: "",
        phone: ""
      },
      order: {},
      WWW,
      loading: true,
      uid: getToken(),
      type: 0 //修改，添加
    };
  },

  mounted() {
    // console.log(window.location, "------");
    let _urlString = window.location.hash;
    if (_urlString.includes("addressId=")) {
      this.type = 0;
      // 获取所有地址
      let addressId = _urlString.split("addressId=")[1];
      if (!addressId) {
        Toast(`操作有误`);
        this.$router.back();
        return;
      }
      let _params = {
        uid:this.uid
      };
      axios
        .get(URI + "/address/getAddressByUid?" + qs.stringify(_params))
        .then(res => {
          let _data = res.data.data;
          _data.forEach(element => {
            if (element.addressId == addressId) {
              this.address = element;
            }
          });
          // this.addrList = _data;
        });
    } else {
      this.type = 1;
    }
  },

  methods: {
    sumbit() {
      //   console.log(this.order, "order");
      this.address.uid = this.uid;
      if (this.type == 1) {
        axios
          .get(URI + "/address/addAddress?" + qs.stringify(this.address))
          .then(res => {
            Indicator.close();
            let _data = res.data;
            if (_data.success) {
              this.$router.back();
            }
            Toast(_data.msg);
          });
      } else {
        axios
          .get(URI + "/address/editAddress?" + qs.stringify(this.address))
          .then(res => {
            Indicator.close();
            let _data = res.data;
            if (_data.success) {
              this.$router.back();
            }
            Toast(_data.msg);
          });
      }
    },
    setDefaultAddr() {
      if (this.address.defaultAddress == 0) {
        this.address.defaultAddress = 1;
      } else if (this.address.defaultAddress == 1) {
        this.address.defaultAddress = 0;
      }
    },
    delAddress() {
      MessageBox.confirm("确定删除么?")
        .then(action => {
          let _params = {
            uid: this.uid,
            addressId: this.address.addressId
          };
          Indicator.open();
          axios
            .get(URI + "/address/delAddress?" + qs.stringify(_params))
            .then(res => {
              Indicator.close();
              let _data = res.data;
              this.$router.back();
              Toast(_data.msg);
            });
        })
        .catch(() => {});
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
