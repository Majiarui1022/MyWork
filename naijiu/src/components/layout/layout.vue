<template>
  <div class="layout">
    <el-container direction="vertical">
      <Vheader></Vheader>
      <router-view></router-view>
    </el-container>
  </div>
</template>
<script>
import Vheader from '../header/header'
export default {
  name: "layout",
  components:{
    Vheader,
  }
};
</script>
<style lang="scss" scoped>
.layout {
  height: 100%;
}
.el-container {
  height: 100%;
}




</style>
