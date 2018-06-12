<template>
    <div id="details">
        <div>
            <!-- <div class="swiper-container swiper-container-horizontal">
                <div class="swiper-wrapper" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);">
                    <div class="swiper-slide swiper-slide-active" v-for="details in detailsList.banner">
                        <img v-bind:src="www+details">
                    </div>
                </div>
                <div class="swiper-pagination swiper-pagination-bullets swiper-pagination-bullets-dynamic" style="width: 80px;">
                    <span class="swiper-pagination-bullet swiper-pagination-bullet-active swiper-pagination-bullet-active-main" style="left:32px;">
                    </span>
                </div>
            </div> -->
            <div>
                <img v-bind:src="WWW + '/' + goodsDetails.banner" alt="">
            </div>
            <div class="details-title">
                <h1 class="C3 S1">{{goodsDetails.title}}</h1>
            </div>
            <div class="biaoqian">
                <div class="biaoqian-1">
                    <img src="static/img/icon_hook@2x.png" alt="">
                    <span class="S5">10年以上名企</span>
                </div>
                <div class="biaoqian-2">
                    <img src="static/img/icon_hook@2x.png" alt="">
                    <span class="S5">正品严选</span>
                </div>
                <div class="biaoqian-3">
                    <img src="static/img/icon_hook@2x.png" alt="">
                    <span class="S5">假一赔十</span>
                </div>
                <div class="clearfix"></div>
            </div>
            <hr>
            <div class="price">
                <span class="S2 C3">单价：
                    <em class="C1 S5">￥
                        <span class="S7">{{goodsDetails.discountprice }}</span>
                    </em>
                    <em class="C2 S5 text-unline">￥
                        <span class="S2">{{goodsDetails.originalPrice}}</span>
                    </em>
                </span>
            </div>
            <hr>
            <div class="freight">
                <span class="S2 C3">运费：
                    <em>10</em>
                </span>
            </div>
            <div class="text-top S7 C3">
                商品介绍
            </div>
            <div class="details-img" v-show="goodsDetailImg.length>0">
                <div v-for="(item,index) in goodsDetailImg" :key="index">
                    <img v-lazy="WWW + '/' +item" alt="" />
                </div>
            </div>
            <div class="button-nav S1 C4">
                <ul>
                    <li class="width-15" @click="$router.push('/home')">
                        <img src="static/img/icon_home@2x.png" alt="">
                        <h2 class="S6">首页</h2>
                    </li>
                    <li class="width-15" @click="$router.push('/brand/'+goodsDetails.brand.bid)">
                        <img src="static/img/icon_Supermarket@2x.png" alt="">
                        <h2 class="S6">店铺</h2>
                    </li>
                    <li class="bg-y" @click="onJoinCart(1)">加入购物车</li>
                    <li class="bg-r" @click="onJoinCart(0)">立即购买</li>
                </ul>
                <div class="clearfix"></div>
            </div>
        </div>

        <!-- //弹出层 -->
        <div class="attribute" v-show="toggleBuyMenu">
            <div class="attribute-box" @click.stop="toggleBuyMenu=true">
                <div class="box">
                    <div class="attribute-img">
                        <img v-lazy="WWW + '/' +  goodsAttr.img" alt="">
                    </div>
                    <div class="shux-box">
                        <span class="C9 S5">¥
                            <em class="S7">{{goodsAttr.price}}</em>
                        </span>
                        <p>库存：
                            <span>{{goodsAttr.stock}}</span>
                        </p>
                        <!-- <p>已选：
                            <span>白茶</span>
                        </p> -->
                    </div>
                    <hr>
                    <!-- <h2 class="S1 C3">颜色分类</h2>
                    <div class="option">
                        <span class="bg-co">白茶</span>
                        <span>红茶</span>
                    </div> -->
                    <div class="number">
                        <span>数量：</span>
                        <div class="add">
                            <img src="static/img/_@2x.png" alt="" @click="changeNum('-')">
                            <em>{{num}}</em>
                            <img src="static/img/+@2x.png" alt="" @click="changeNum('+')">
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="close" @click.stop="toggleBuyMenu=false">
                        <img src="static/img/close@2x.png" alt="">
                    </div>
                </div>
                <div class="btn" @click="onSumbit">
                    确定
                </div>
            </div>
        </div>
        <!-- 绑定手机弹窗 -->
        <details-bind-phone @bindPhoneCallback="bindPhoneCallback" v-if="showPhoneModal"></details-bind-phone>
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
import DetailsBindPhone from "./DetailsBindPhone";
import qs from "qs";
Vue.use(Lazyload);
Vue.use(InfiniteScroll);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

export default {
  name: "Details",

  data() {
    return {
      goodsDetails: {},
      goodsDetailImg: [],
      toggleBuyMenu: false,
      num: 1,
      WWW,
      URI,
      uid: getToken(),
      loading: false,
      goodsAttr: {},
      isJoinCart: 0,
      showPhoneModal: false
    };
  },

  created() {},

  mounted() {
    // console.log(this.$route.params.id, "$route.params.id");
    // window.location = "#top";
    window.scrollTo(0, 0);
    let _params = {
      gid: this.$route.params.id,
      // uid: this.uid,
      type: 2
    };
    Indicator.open();
    // 初始化商品列表信息
    axios.get(URI + "/goods/detail?" + qs.stringify(_params)).then(res => {
      Indicator.close();
      let _data = res.data.data || {};
      this.goodsDetails = _data;
      if (_data.goodsDetailImg) {
        this.goodsDetailImg = _data.goodsDetailImg.split(",");
      }
    });
  },

  methods: {
    onJoinCart(type) {
      if (!this.uid) {
        this.showPhoneModal = true;
        return;
      }
      this.toggleBuyMenu = !this.toggleBuyMenu;
      this.isJoinCart = type;
      this.getGoodInfo();
    },

    getGoodInfo() {
      let _params = {
        gid: this.$route.params.id,
        num: this.num
      };
      axios
        .get(URI + "/goods/getAttributeInfo?" + qs.stringify(_params))
        .then(res => {
          let _data = res.data.data;
          this.goodsAttr = _data;
        });
    },

    changeNum(type) {
      if (type == "-") {
        if (this.num == 1) {
          Toast(`最少数量必须为 0 `);
          return;
        }
        this.num--;
      } else if (type == "+") {
        this.num++;
      }
      this.getGoodInfo();
    },

    onSumbit() {
      if (this.isJoinCart) {
        this.addCart();
      } else {
        this.goOrder();
      }
    },

    goOrder() {
      let _params = {
        type: "brand",
        order: {
          gid: this.$route.params.id,
          uid: this.uid,
          type: 2,
          num: this.num,
          title: this.goodsDetails.title
        },
        goodsDetails: this.goodsDetails
      };
      window.localStorage.setItem("order", JSON.stringify(_params));
      this.$router.push({ name: "OrderSet", params: _params });
    },

    addCart() {
      let _params = {
        gid: this.$route.params.id,
        uid: this.uid,
        type: 2,
        num: this.num,
        title: this.goodsDetails.title
      };
      axios.get(URI + "/cart/addCart?" + qs.stringify(_params)).then(res => {
        let _data = res.data.data;
        if (res.data.success) {
          this.toggleBuyMenu = false;
          Toast(`加入购物车成功`);
        } else {
          Toast(`操作失败，请重新操作`);
        }
        // this.towLevelMenu = _data;
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
    },
    bindPhoneCallback() {
      console.log("绑定手机回调");
      this.showPhoneModal = false;
    }
  },

  components: {
    TabBar,
    DetailsBindPhone
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#details .attribute {
  display: block;
}
.details-img {
  margin-bottom: 50px;
}
</style>
