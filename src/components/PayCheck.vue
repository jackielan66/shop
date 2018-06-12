<template>
    <div class="">
        <div class="">
            <!-- <p @click.prevent="pushShow = false">使用余额支付 8864</p>
                <p>支付密码：</p> -->
            <ul class="write-input clearfix">
                <input type="tel" ref="input" maxlength="6" class="realInput" v-model="realInput" autofocus @keyup="getNum()" @keydown="delNum()">
                <li v-for="(disInput,index) in disInputs" :key="index">
                    <input type="password" maxlength="1" disabled v-model="disInput.value">
                </li>
            </ul>
            <div style="padding:10px">
                <mt-button size="large" @click="goPay">确认支付</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import { Field, Toast, Indicator } from "mint-ui";
import { URI, WWW, uid, getToken } from "@/apiConfig";
import axios from "axios";
import TabBar from "./TabBar";
import qs from "qs";
export default {
  name: "PayCheck",
  data() {
    return {
      messagepacket: false,
      packets: [],
      disInputs: [
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" }
      ],
      realInput: "",
      pushShow: false
    };
  },
  mounted() {
    this.$refs.input.focus();
  },
  methods: {
    getNum() {
      for (var i = 0; i < this.realInput.length; i++) {
        this.disInputs[i].value = this.realInput.charAt(i);
        // 表示字符串中某个位置的数字，即字符在字符串中的下标。
      }
    },
    delNum() {
      var oEvent = window.event;
      if (oEvent.keyCode == 8) {
        if (this.realInput.length > 0) {
          this.disInputs[this.realInput.length - 1].value = "";
        }
      }
    },
    goPay() {
      let _params = {
        uid: getToken(),
        payPwd: this.realInput
      };
      Indicator.open();
      axios.get(URI + "/pay/checkPayPwd?" + qs.stringify(_params)).then(res => {
        Indicator.close();
        let _data = res.data;
        if (_data.success) {
          //   this.$router.push("/my-order");
          this.$emit("usePasswordPayCallback");
        }
        Toast(_data.msg);
      });
    },
    enterPwd() {
      this.pushShow = true;
      this.$refs.input.focus();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.enter-password {
  text-align: right;
  color: #1d890d;
  font-size: 18px;
  line-height: 2;
  margin-top: 20px;
  padding-right: 20px;
}
.phonenum-show {
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
}
.getback-title span {
  position: absolute;
  right: 0;
  top: 3px;
  width: 15px;
  height: 15px;
  display: inline-block;
}
.write-phonenum-1000 {
  top: -1000px !important;
}
.write-phonenum {
  position: absolute;
  top: 50%;
  margin-top: -100px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  padding: 30px 10px 0;
  background: #fff;
}
.write-phonenum p {
  font-size: 14px;
  margin-left: 30px;
  line-height: 2;
}
.write-phonenum p span {
  color: #3b90d1;
}
.write-input {
  width: 312px;
  text-align: center;
  /* margin: 10px auto; */
  position: relative;
}
.write-input li {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin: 0 5px;
  border: 1px solid #888888;
}
.write-input li input {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  resize: none;
  outline: none;
  border: 0;
  width: 30px;
  line-height: 30px;
  text-align: center;
  height: 30px;
  font-size: 16px;
}
.write-phonenum .mint-button--default {
  background: #3b90d1;
  color: #fff;
  font-family: "微软雅黑";
  font-size: 14px;
  width: 80%;
  margin: 10px auto;
}
.realInput {
  /* Keyword values */
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  resize: none;
  outline: none;
  border: 0;
  z-index: 3;
  position: absolute;
  width: 290px;
  height: 30px;
  line-height: 30px;
  background: none;
  display: block;
  left: 50%;
  margin-left: -145px;
  top: 34px;
  opacity: 0;
  font-size: 0px;
  caret-color: #fff;
  color: #000;
  text-indent: -5em;
  font-size: 30px;
  top: 1px;
}
input[type="tel"]:disabled {
  background-color: #fff;
}
</style>
