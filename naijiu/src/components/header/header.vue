<template>
  <div>
    <el-header>
      <div class="title fl">xxx座椅耐久测试</div>
      <div class="tab fl">
        <router-link class="fl" :to="{name:'autotest'}">
          <p>自动测试</p>
        </router-link>
        <router-link class="fl" :to="{name:'mapping'}">
          <p>接口映射</p>
        </router-link>
        <router-link class="fl" :to="{name:'operand'}">
          <p>硬件操作数</p>
        </router-link>
        <router-link class="fl" :to="{name:'timing'}">
          <p>时序配置</p>
        </router-link>
        <router-link class="fl" :to="{name:'Manual'}">
          <p>手动调试</p>
        </router-link>
      </div>
      <div class="logout fr">
        <img class="fl" src="../../assets/img/logout.png" alt>
        <div class="fr">退出</div>
      </div>
    </el-header>
  </div>
</template>

<script>
export default {
  name: "Vheader",
  data() {
    return {};
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
@import "../../assets/style/clear";

.el-header {
  padding: 0;
  color: #333;
  height: 0.8rem !important;
  line-height: 0.8rem;
  background: linear-gradient(
    0deg,
    rgba(18, 22, 51, 1) 0%,
    rgba(10, 17, 36, 1) 100%
  );
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.23);
  @extend %clearfix;
  font-size: 30px;
}

.title {
  width: 5.78rem;
  background: linear-gradient(
    0deg,
    rgba(0, 137, 221, 1) 0%,
    rgba(0, 228, 255, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-left: 0.29rem;
  box-sizing: border-box;
  font-size: 0.3rem;
}

.tab {
  a {
    display: block;
    width: 1.77rem;
    text-align: center;
    font-size: 0.24rem;
    color: $color-text;
    line-height: 0.8rem;
  }
}

.logout {
  padding-right: 0.56rem;
  box-sizing: border-box;
  img {
    width: 0.3rem;
    height: 0.33rem;
    display: block;
    margin-top: 0.235rem;
    margin-right: 0.14rem;
  }
  div {
    font-size: 0.2rem;
    color: #02f6ff;
  }
}

.router-link-active p {
  //.router-link-active 指定
  color: #fff;
  background: url("../../assets/img/linkactive.png") !important;
  background-repeat: no-repeat !important;
  background-size: 100% 100% !important;
}
</style>
