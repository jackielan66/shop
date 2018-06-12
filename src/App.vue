<template>
    <div id="app">
        <!-- <img src="./assets/logo.png"> -->
        <transition :name="transitionName">
            <router-view/>
        </transition>

    </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      transitionName: ""
    };
  },
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-left";
      } else if (to.meta.index < from.meta.index) {
        this.transitionName = "slide-right";
      } else {
           this.transitionName= ''
      }
    }
  }
};
</script>

<style>
#app {
  /* margin-top: 60px; */
}
</style>
