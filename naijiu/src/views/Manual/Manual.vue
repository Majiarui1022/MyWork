<template>
  <el-container>
    <el-aside>
      <manualaside></manualaside>
    </el-aside>
    <el-main>
      <manualmain></manualmain>
    </el-main>
  </el-container>
</template>

<script>
import manualaside from './Manualaside';
import manualmain from './Manualmain';
export default {
  name: "Manual",
  components:{
    manualaside,
    manualmain
  },
  data() {
    return {};
  },
};
</script>
<style lang='scss' scoped>
.el-aside {
  background-color: #d3dce6;
  height: 100%;
  width: 5.76rem !important;
  background: linear-gradient(
    270deg,
    rgba(18, 22, 51, 1) 0%,
    rgba(10, 17, 36, 1) 52%
  );
  box-shadow: 3px 0px 3px 0px rgba(0, 0, 0, 0.23);
}

.el-main {
  padding: 0;
  background: #0c1127;
}
</style>