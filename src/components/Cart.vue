<template>

    <div id="cart">
        <mt-header title="购物车" fixed>
            <mt-button v-if="cartStatus===false" slot="right" @click="onEdit(true)">编辑</mt-button>
            <mt-button v-else slot="right" @click="onEdit(false)">完成</mt-button>
        </mt-header>

        <div class="box">
            <div class="cart-table" v-for="(item,index) in cartGoodList" :key="index">
                <div class="cart-box">
                    <div class="cart-heard">
                        <div class="choice" @click="toggleBrand(item)">
                            <img src="static/img/choice-off@2x.png" alt="">
                            <img class="display-none" src="static/img/choice-on@2x.png" alt="">
                        </div>
                        <div class="shop-name">
                            <img src="static/img/icon_Supermarket@2x.png" alt="">
                            <span class="C3 S4">{{item.brand}}</span>
                        </div>
                    </div>
                    <div class="goods-inf" v-for="(cart,index) in item.goods" :key="index">
                        <div class="choice" @click="onCartClick(cart)">
                            <img v-bind:src="toggleSelectIcon(cart)" alt="">
                        </div>
                        <div class="goods-img">
                            <img v-lazy="WWW + '/' + cart.img" alt="" />
                        </div>
                        <div class="goods-text">
                            <h2 class="C3 S5">
                                <span class="order-label1">品牌</span> {{cart.title}}</h2>
                            <p class="C2 S5">
                                <span>芒果味</span>
                            </p>
                            <div class="number">
                                <span class="C9 S1 fl-l">
                                    <em class="S5">¥</em>{{cart.price}}</span>
                                <div class="number-btn fl-r" v-show="cartStatus == false">
                                    <img @click="changeNum('-',item.bid,cart.cardId,index)" src="static/img/btn_jian@2x.png" alt="">
                                    <span class="S4 C3">{{cart.num}}</span>
                                    <img @click="changeNum('+',item.bid,cart.cardId,index)" src="static/img/btn_jia@2x.png" alt="">
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="bottom-settl" v-if="cartStatus === false">
            <div class="choice fl-l width-70" @click="toggleCheckAll()">
                <img v-bind:src="'static/img/choice-' + (isCheckAll ? 'on':'off') +'@2x.png'" alt="">
                <span class="C3 S2"> {{isCheckAll ? '全不选' : '全选'}}</span>
                <span class="S2 C3 fl-r margin-right-5px">总记：
                    <em class="C9 S5">¥</em>
                    <em class="C9 S1">{{totalAmount}}</em>
                </span>
            </div>
            <div class="btn fl-r" @click="submit">
                <span class="C4 S1">结算</span>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="bottom-settl" v-if="cartStatus">
            <div class="choice fl-l width-70" @click="toggleCheckAll()">
                <img v-bind:src="'static/img/choice-' + (isCheckAll ? 'on':'off') +'@2x.png'" alt="">
                <span class="C3 S2"> {{isCheckAll ? '全不选' : '全选'}}</span>
            </div>
            <div class="btn fl-r" @click="delCart">
                <span class="C4 S1">删除</span>
            </div>
            <div class="clearfix"></div>
        </div>

        <!-- 底部道航 -->
        <tab-bar :seleted="`cart`"></tab-bar>

    </div>
    <!-- TOP -->

    <!-- <div class="icon_top">
        <a href="#top">
            <img src="img/icon_top.png" alt="">
        </a>
    </div> -->

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
import { remove } from "lodash";
Vue.use(Lazyload);
Vue.use(InfiniteScroll);

export default {
  name: "Cart",

  data() {
    return {
      cartGoodList: [],
      WWW,
      uid: getToken(),
      loading: false,
      cartStatus: false, // 购物车是否在编辑状态
      selectedCartId: [],
      selectedCartData: [], // 勾选购物车的数据
      isCheckAll: false
    };
  },

  computed: {
    brandIsCheck(item) {},
    totalAmount() {
      let _amount = 0;
      this.selectedCartData.forEach(v => {
        _amount += v.num * v.price;
      });
      return _amount.toFixed(2);
    }
  },

  created() {},

  mounted() {
    let _params = {
      uid: this.uid
    };
    Indicator.open();
    // 初始化购物车列表
    axios.get(URI + "/cart/intoCart?" + qs.stringify(_params)).then(res => {
      Indicator.close();
      let _data = res.data.data;
      this.cartGoodList = _data;
    });
  },

  methods: {
    fetchData() {
      let _params = {
        uid: this.uid
      };
      // 初始化购物车列表
      axios.get(URI + "/cart/intoCart?" + qs.stringify(_params)).then(res => {
        Indicator.close();
        let _data = res.data.data;
        this.cartGoodList = _data;

        let _selectedCartData = [];
        this.cartGoodList.forEach(v => {
          v.goods.map(cart => {
            this.selectedCartId.forEach(item => {
              if (item == cart.cardId) {
                _selectedCartData.push(cart);
              }
            });
          });
        });
        this.selectedCartData = _selectedCartData;
      });
    },

    onEdit(status) {
      this.cartStatus = status;
    },

    changeNum(type, bid, cartId, index) {
      //   console.log(bid, "bid");
      //   console.log(cartId, "cartId");
      //   console.log(index, "index");
      let mapObj = this.cartGoodList.find(v => {
        return v.bid === bid;
      });
      let mapGood = mapObj.goods[index];
      if (mapGood.cardId !== cartId) {
        Toast("操作有误，请重新刷新页面操作");
        return;
      }

      if (type == "-") {
        if (mapGood.num == 1) {
          Toast(`最少数量必须为 0 `);
          return;
        }
        mapGood.num--;
      } else if (type == "+") {
        mapGood.num++;
      }
      let _params = {
        cartId: cartId,
        num: mapGood.num
      };
      axios.get(URI + "/cart/modifyNum?" + qs.stringify(_params)).then(res => {
        this.fetchData();
      });
    },

    onCartClick(cart) {
      let _index = -1;
      let selectedCartId = this.selectedCartId;
      let selectedCartData = this.selectedCartData;
      selectedCartId.map((v, index) => {
        if (v == cart.cardId) {
          _index = index;
        }
      });
      if (_index >= 0) {
        selectedCartId.splice(_index, 1);
        selectedCartData.splice(_index, 1);
      } else {
        selectedCartId = selectedCartId.concat(cart.cardId);
        selectedCartData = selectedCartData.concat(cart);
      }
      this.selectedCartId = selectedCartId;
      this.selectedCartData = selectedCartData;
    },

    delCart() {
      if (this.cartStatus === false) {
        // 购物车不是编辑状态
        Toast(`操作有误，请重新点击编辑按钮`);
        return;
      }
      if (this.selectedCartId.length == 0) {
        // 购物车不是编辑状态
        Toast(`操作有误，未勾选商品`);
        return;
      }
      let _params = {
        cartIds: this.selectedCartId.join(",")
      };
      axios
        .get(URI + "/cart/delCartGoods?" + qs.stringify(_params))
        .then(res => {
          let _data = res.data;
          if (_data.success) {
            this.fetchData();
            this.selectedCartId = [];
          }
          Toast(_data.msg);
        });
    },

    toggleSelectIcon(cart) {
      let isChecked = this.selectedCartId.some(v => v == cart.cardId);
      if (isChecked) {
        return "static/img/choice-on@2x.png";
      } else {
        return "static/img/choice-off@2x.png";
      }
    },

    submit() {
      // 结算
      if (this.selectedCartId.length == 0) {
        Toast(`请勾选要结算的产品`);
        return;
      }
      let { selectedCartData, selectedCartId } = this;
      let _params = {
        type: "cart",
        selectedCartData,
        selectedCartId
      };
      window.localStorage.setItem("order", JSON.stringify(_params));
      this.$router.push({ name: "OrderSet", params: _params });
    },

    toggleCheckAll() {
      // 全选 / 全不选
      this.isCheckAll = !this.isCheckAll;
      if (this.isCheckAll) {
        let _selectedCartId = [];
        let _selectedCartData = [];
        this.cartGoodList.forEach(v => {
          v.goods.map(item => {
            _selectedCartId.push(item.cardId);
            _selectedCartData.push(item);
          });
        });
        this.selectedCartId = _selectedCartId;
        this.selectedCartData = _selectedCartData;
      } else {
        this.selectedCartId = [];
        this.selectedCartData = [];
      }
    },

    toggleBrand(item) {
      // 选择品牌全选、全不选
      console.log(item);
      let _selectedCartId = this.selectedCartId.concat([]);
      let _selectedCartData = [];
      let _chooseItemLength = 0; // 该条购物车下已经勾选多少条
      const _maxGoodsLenght = item.goods; // 本购物id的购车数量

      item.goods.forEach((v, index) => {
        if (this.selectedCartId.length == 0) {
          _selectedCartId.push(v.cardId);
          _chooseItemLength = _maxGoodsLenght;
        } else {
          let index = -1;
          let _isHasKeyInArray = this.selectedCartId.some((o, index) => {
            if (o == v.cardId) {
              index = index;
            }
            return o == v.cardId;
          });
          if (_isHasKeyInArray) {
          } else {
            _selectedCartId.push(v.cardId);
          }
          //   this.selectedCartId.forEach((selectedId, J) => {
          //     if (v.cardId == selectedId) {
          //     } else {
          //       _selectedCartId.push(v.cardId);
          //     }
          //   });
        }
      });
      this.selectedCartId = _selectedCartId;
      console.log(_selectedCartId, "_selectedCartId");
    },

    loadMore() {
      this.loading = true;
      this.pageIndex = this.pageIndex + 1;
      this.fetchData();
    }
  },

  components: {
    TabBar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.brand_nav .tow-nav {
  display: block;
}
</style>
