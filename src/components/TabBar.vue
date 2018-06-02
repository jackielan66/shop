<template>
  <!-- 底部道航 -->
        <div class="bottom_nav">
    	<ul>
    		<router-link to="/home">
    			<li>
    				<img v-bind:src="'static/img/icon_home_' + (seleted=='home'?'on':'off') + '@2x.png'" />
    				<h2 class="S6 C3">首页</h2>
    			</li>
    		</router-link>
    		<router-link to="/brand">
    			<li>
                    <img v-bind:src="'static/img/icon_fenlei_' + (seleted=='brand'?'on':'off') + '@2x.png'" />
    				<h2 class="S6 C3">品牌区</h2>
    			</li>
    		</router-link>
    		<router-link to="/cart">
    			<li>
                    <img v-bind:src="'static/img/icon-cart-' + (seleted=='cart'?'on':'off') + '@2x.png'" />
    				<h2 class="S6 C3">购物车</h2>
    			</li>
    		</router-link>
    		<router-link to="/my">
    			<li>
                    <img v-bind:src="'static/img/icon_my_' + (seleted=='my'?'on':'off') + '@2x.png'" />
    				<h2 class="S6 C3">我的</h2>
    			</li>
    		</router-link>
    	</ul>
    	<div class="clearfix"></div>
        </div>
</template>

<script>
export default {
  name: "TabBar",

  props: ["seleted"], // 子组件获取父组件的数据

  created() {},

  mounted() {},

  data() {
    return {};
  },

  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
