<template>
  <el-container>
    <el-aside>
      <timingaside
        :scriptdata="scriptdata"
        :PartList="PartList"
        @script_id="script_id"
        @Part_id="Part_id"
      ></timingaside>
    </el-aside>
    <el-main>
     <timinmain
      :zlList="zlList"
      :combinationList="combinationList"
      :zuheLISTarr="zuheLISTarr"
      @ADDLIST="ADDLIST"
      @REMOVELIST="REMOVELIST"
      @changeLeft_val="changeLeft_val"
      @changeRight_val="changeRight_val"
      @change_Cycle="change_Cycle"
      @SNED_DATA="SNED_DATA"
     ></timinmain>
    </el-main>
  </el-container>
</template>

<script>
import timingaside from './timingaside';
import timinmain from './timingmain';
export default {
  name: "timing",
  components:{
      timingaside,
      timinmain
  },
  data() {
    return {
      scriptdata:[{}],   //大脚本
      PartList:[],
      zlList:[],
      combinationList:[],
      zuheLISTarr:[],  //添加组合指令的模拟数组
      zuheLIST:0,      //添加组合指令的个数
      starts:false
    };
  },
  methods:{
    async getBigScript(){
      var that = this
      //获取大的脚本
      this.$axios({
        method: "get",
        url: "scripts/"
      })
        .then(res => {
          console.log(res.data);
          this.scriptdata = res.data;
          this.scriptOnec(res.data[0].id)   //函数脚本part列表数据
          let scriptID = res.data[0].id
          this.$store.commit('SCRIPT_ID',scriptID);
        })
        .catch(err => {
          console.log(err);
        });
    },

     //请求part列表
    scriptOnec(id){
      this.$store.commit('SCRIPT_ID',id);
      this.$axios({
        method: "get",
        url: `parts/?script=${id}`,
      })
        .then(res => {
          //请求part列表
          console.log(res.data);
          this.PartList = res.data
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 子组件传值  请求part列表
    script_id(id){
      console.log(id)
      this.scriptOnec(id)
    },


    // 选择Part请求指令
    Part_id(id){
      this.zuheLIST = 0
      this.starts = true
      this.$store.commit('PARTID',id)
      // 请求指令
      this.$axios({
        method: "get",
        url: `h_parts/${id}/`,
      })
        .then(res => {
          console.log(res.data.orders);
          this.zlList = res.data.orders
          if(res.data.orders.length<=0){
            this.starts = false
          }
        })
        .catch(err => {
          console.log(err);
        })


        console.log(id)
      // 请求组合指令
      this.$axios({
        method: "get",
        url: `order_combinations/?sequential_part=${id}`,
      })
        .then(res => {
          console.log(res.data);
          this.combinationList = res.data
        })
        .catch(err => {
          console.log(err);
        })


    },
    // 添加指令
    ADDLIST(){
      if(!this.starts){
        this.$notify({
          title: '警告',
          message: '您没有选择part或者指令为空',
          type: 'warning'
        });
        return
      }
      this.zuheLIST++
      this.combinationList.push({
        cycle: this.zuheLIST,
        first: this.zlList[0].id,
        id: null,
        last: this.zlList[0].id,
        sequential_part: this.$store.state.partID
      })
      console.log(this.combinationList)
      // this.zuheLIST++
      // this.zuheLISTarr.push(this.zuheLIST)
      // console.log(this.zuheLISTarr)
    },


    // 删除指令
    REMOVELIST(id,index){
        console.log(index)
      if(id == null){
        this.combinationList.splice(index,1)
        console.log(this.combinationList)
        return
      }
      this.$axios({
        method: "delete",
        url: `order_combinations/${id}/`,
      })
        .then(res => {
          console.log(res.data);
          this.combinationList.splice(index,1)
        })
        .catch(err => {
          console.log(err);
        })
    },
    // 起始值修改
    changeLeft_val(idnex,words){
      this.combinationList[idnex].first = words
      console.log(this.combinationList[idnex].first)
    },
    // 结束值修改
    changeRight_val(idnex,words){
      this.combinationList[idnex].last = words
    },
    change_Cycle(index,words){
      this.combinationList[index].cycle = words
      console.log(index)
    },

    SNED_DATA(){
      console.log(this.combinationList)
      this.$axios({
        method: "post",
        url: `order_combinations/`,
        data:this.combinationList
      })
        .then(res => {
          console.log(res.data);
          this.combinationList = res.data
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success'
          });
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  created() {
    this.getBigScript()
  }
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
