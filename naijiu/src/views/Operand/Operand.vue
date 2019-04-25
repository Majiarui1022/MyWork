<template>
  <el-container>
    <el-aside>
      <operandaside
        :scriptdata="scriptdata"
        :PartList="PartList"
        @script_id="script_id"
        @select_zhiling="select_zhiling"
        @ADDPART="ADDPART"
        @addSystem="addSystem"
      ></operandaside>
    </el-aside>
    <el-main>
      <operandmain
      :System="System"
      :zhiling="zhiling"
      :yu="yu"
      @delteZL="delteZL"
      @change_order="change_order"
      @change_MAX="change_MAX"
      @change_MIN="change_MIN"
      @change_TIME="change_TIME"
      @SEND_DATA="SEND_DATA"
      @CHECKED_DW="CHECKED_DW"
      @CHANGE_UNIT="CHANGE_UNIT"
      @CHANGE_CART="CHANGE_CART"
      @ADD_ZHILING="ADD_ZHILING"
      @seleceYingshe="seleceYingshe"
      @selectaa="selectaa"
      @selectScriptYING="selectScriptYING"
      ></operandmain>
    </el-main>
  </el-container>
</template>

<script>
import operandaside from "./Operandaside";
import operandmain from "./Operanmain"
import { Loading } from 'element-ui';
export default {
  name: "",
  components: {
    operandaside,
    operandmain
  },
  data() {
    return {
      loadingInstance:'',     //加载动画
      scriptdata:[{}],   //大脚本
      PartList:[],
      System:[],       //System表格
      zhiling:[],
      yu:[],
      Twobas:[],
      PARTID:''

    };
  },
  created() {
    this.getBigScript()

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
          this.systemOned(res.data[0].id)
          let scriptID = res.data[0].id
          this.$store.commit('SCRIPT_ID',scriptID);
        })
        .catch(err => {
          console.log(err);
        });
    },

    //请求part列表   System表格  指令
    scriptOnec(id){
      this.$store.commit('SCRIPT_ID',id);
      this.$axios({
        method: "get",
        url: `/parts/?script=${id}`,
      })
        .then(res => {
          //请求part列表
          console.log(res.data);
          this.PartList = res.data
          //System表格
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 请求system列表
    systemOned(id){
      this.$axios({
        method: "get",
        url: `/systems/?script=${id}`,
      })
        .then(res => {
          //请求part列表
          console.log(res.data);
          this.System = res.data[0]
          //System表格
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 子组件传值  请求part列表
    script_id(id){
      console.log(id)
      this.scriptOnec(id)
      this.systemOned(id)
    },
    // 子组件传值  请求指令列表
    select_zhiling(id){
      this.PARTID = id;
      this.$store.commit("PARTID",id)
      this.$axios({
        method: "get",
        url: `h_parts/${id}/`,
      })
        .then(res => {
          console.log(res.data.orders);

          this.zhiling = res.data.orders;

          let that = this
          if(res.data.orders.length >0){
            for(var i = 0;i<res.data.orders.length;i++){
              that.zhiling[i].arr = []
            }
            console.log( that.zhiling)
          }

          // this.Twobas = this.zhiling;
          //   for(let i = 0;i<this.Twobas.length;i++){
          //     if(res.data.orders[i].unit != null) {
          //       this.zhiling[i].units = res.data.orders[i].unit
          //       console.log(this.zhiling[i])
          //       this.Twobas[i].unit = res.data.orders[i].unit.id
          //       this.Twobas[i].mapping1 = res.data.orders[i].mapping.id
          //       this.Twobas[i].order_name1 = res.data.orders[i].mapping.order
          //     }
          //   }

            console.log(this.zhiling)
          this.zhiling_dan()
        })
        .catch(err => {
          console.log(err);
        });
    },


    // 请求余下单位

    zhiling_dan(){
      this.$axios({
        method: "get",
        url: `units/`,
      })
        .then(res => {
          console.log(res.data);
          // res.data.splice(0,1)
          this.yu = res.data
          console.log(this.yu)
        })
        .catch(err => {
          console.log(err);
        });
    },


    // 添加part
    ADDPART(name1,name2){
      this.loadingInstance = Loading.service({ text: '玩命加载中...' });
      console.log(this.$store.state.scriptID)
      var that = this
      this.$axios({
        method: "post",
        url: `h_parts/`,
        data:{
          name1:name1,
          name2:name2,
          script:that.$store.state.scriptID
        }
      })
        .then(res => {
          console.log(res.data);
          that.PartList.push(res.data)
          that. loadingInstance.close();
        })
        .catch(err => {
          console.log(err);
          that. loadingInstance.close();
        });
    },


    // 删除单个指令
    delteZL(index,id){
      // 加载动画
      this.$axios({
        method:"delete",
        url: `orders/${id}/`,
      })
        .then(res => {
          const h = this.$createElement;
          this.$notify({
            title: '成功',
            message: h('i', { style: 'color: teal'}, '删除成功')
          });
          this.zhiling.splice(index,1)
        })
        .catch(err => {
          console.log(err);


          const h = this.$createElement;
          this.$notify({
            title: '错误',
            message: h('i', { style: 'color: red'}, '删除错误')
          });
        });
    },


    // 修改System

    addSystem(obj){
      const h = this.$createElement;
      console.log(obj)
      this.$axios({
        method: "post",
        url: `systems/`,
        data:obj
      })
        .then(res => {
          console.log(res.data);
          this.System = res.data
          this.$notify({
            title: '成功',
            message: h('i', { style: 'color: teal'}, '修改成功')
          });
        })
        .catch(err => {
          console.log(err);
          this.$notify({
            title: '错误',
            message: h('i', { style: 'color: red'}, `修改错误`)
          });
        });
    },


    CHECKED_DW(index){
      this.zhiling[index].switch = !this.zhiling[index].switch;
      // this.Twobas[index].switch = this.zhiling[index].switch;
      // if(!this.Twobas[index].switch){
      //   this.Twobas[index].max = null
      //   this.Twobas[index].min = null
      //   this.Twobas[index].time_out = null
      // }
      // console.log(this.Twobas[index].switch)
    },






    // 修改硬件映射
    seleceYingshe(val,val2,index){
        this.Twobas[index].mapping1 = val2;
      this.Twobas[index].order_name1 = val;
      console.log(this.Twobas)
    },

    //修改指令
    selectaa(val,index){
      this.Twobas[index].order_name1 = val;
    },

    //选择指令后选择硬件映射
    selectScriptYING(val,index){
      this.Twobas[index].mapping1 = val;
    },



    // 指令设置
    change_order(index,val){
      this.Twobas[index].order_set = val;
      // console.log(this.Twobas)
      // console.log(this.Twobas[0].order_set)
    },
    // max设置
    change_MAX(val,idnex){
      this.Twobas[idnex].max = val;
    },
    // min设置
    change_MIN(index,val){
      // console.log('我执行了');
      // console.log(this.Twobas[index].min)
      this.Twobas[index].min = val;
    },
    // timeout设置
    change_TIME(index,val){
      this.Twobas[index].time_out = val;
    },
    // 单位设置
    CHANGE_UNIT(index,id){
      this.Twobas[index].unit = id;
    },
    CHANGE_CART(index,val){
      this.Twobas[index].orders = val
      // console.log(this.Twobas[index].orders)
    },
    SEND_DATA(zhiling){
      console.log(zhiling)
      this.Twobas = []
     for(var i = 0;i<zhiling.length;i++){
       if(zhiling[i].mapping == null){
         zhiling[i].mapping={id:null}
       }
       if(zhiling[i].unit == null){
         zhiling[i].unit={id:null}
       }
       this.Twobas.push({
           id:zhiling[i].id,
           switch:zhiling[i].switch,
           order_set:zhiling[i].order_set,
           time_out:zhiling[i].time_out,
           sequential_part:this.$store.state.partID,     //可能拿不到
           min:zhiling[i].min,
           max:zhiling[i].max,
           unit:zhiling[i].unit.id,
           order_name:zhiling[i].order_name.name,
           mapping:zhiling[i].mapping.id
         })
     }
      console.log(this.Twobas)
      const h = this.$createElement;
      this.$axios({
        method: "post",
        url: `orders/`,
        data:this.Twobas
      })
        .then(res => {
          console.log(res.data);
          this.$notify({
            title: '成功',
            message: h('i', { style: 'color: teal'}, '修改成功')
          });
        })
        .catch(err => {
          console.log(err);
          this.$notify({
            title: '错误',
            message: h('i', { style: 'color: red'}, `修改错误`)
          });
        });
    },
    ADD_ZHILING(){
      if(this.$store.state.partID == -1){
        return
      }
      if(this.zhiling.length<1){
          this.zhiling.push({
            Sequential_Part:this.$store.state.partID,
            arr:[],
            id:null,
            mapping:null,
            max:null,
            min:null,
            order_auto_set:null,
            order_name:{
              id:null,
              name:null
            },
            order_set:null,
            switch:false,
            time_out:null,
            unit:null,
          })

        console.log(this.zhiling)
        return
      }
      console.log(this.$store.state.partID)
      console.log(this.zhiling)
      let arr=Object.assign({},this.zhiling[0])
      arr.id = null
      arr.order_set = null
      arr.switch = false
      arr.min = null
      arr.max = null
      arr.time_out = null
      this.zhiling.push(arr)
      // let Sequential_Part = this.PARTID;
      // let units = this.zhiling[0].units
      //   this.zhiling.push({
      //     Sequential_Part:Sequential_Part,
      //     id:null,
      //     max: null,
      //     min: null,
      //     order: "",
      //     order_content: "啊水水",
      //     order_set: "",
      //     switch: true,
      //     time_out: null,
      //     unit: 1,
      //     units:units
      //   })
    }
  }
}
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
