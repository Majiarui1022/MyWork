<template>
  <div class="aside_box">
    <div class="content-box">
      <div class="jb">测试时序</div>
      <div class="select_box">
        <div class="select fl" v-on:click="chengeHide">
          {{scriptdata[scriptIndex].name}}
          <img class="right" src="../../assets/img/right_down.png" alt>
        </div>
        <div class="reset fl">
          <img src="../../assets/img/load.png" alt>
        </div>
        <div class="script_box" :class="ishide == true?'':'hide'">
          <ul>
            <li v-for="(val,index) in scriptdata" :key="index" v-on:click="shouPart(val.id,index)">
              <span :id="val.id">{{val.name}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="select_list">
        <ul  :class=" ishide == true ?'hide':''">
          <li class="lisDom" :id="val.id" v-for="(val,index) in PartList" :key="index" v-on:click="select_partChange(val.id,index)">
            <span class="one fl">{{val.name1}}</span>
            <span class="two fl">{{val.name2}}</span>
          </li>
<!--          <li class="lisDom">-->
<!--            <span class="one fl">Part 2</span>-->
<!--            <span class="two fl">稳定测试</span>-->
<!--          </li>-->
        </ul>
        <div class="color"></div>
      </div>

      <div class="edit_box" style="height: 4rem;">
        <div class="tab_box_">
          <div
            class="systeam fl"
            :class="count == 1 ? 'active':''"
            @click="Check_tab(1)"
          >System</div>
          <div
            class="part fl"
            :class="count == 2 ? 'active':''"
            @click="Check_tab(2)"
          >Part</div>
        </div>
        <div class="edit" :class="count == 1 ? '': 'hide'" style="height: 3.4rem;">
          <div class="project_name">
            <span>项目名称:</span>
            <input type="text" placeholder="请输入项目名称" v-model="product_nume">
          </div>
          <div class="set">
            <el-radio v-model="radio" label="1">设定时间:</el-radio>
            <input class="right" type="text"  placeholder="请输入设定时间" v-model="set_tiemr">
            <br/>
            <br/>
            <el-radio v-model="radio" label="2">设定次数:</el-radio>
            <input type="text" placeholder="请输入设定次数" v-model="set_num">
          </div>
          <div class="spaceing">
            <span class="sapce">间隔运行</span>
            <el-radio v-model="dadio_" label="1">ON</el-radio>
            <el-radio v-model="dadio_" label="0">OFF</el-radio>
          </div>
          <div class="rest">
            <span>休息时间:</span>
            <input type="text" placeholder="请输入休息时间" v-model="xiu_timer">
          </div>
          <div class="rest">
            <span>运行时间:</span>
            <input type="text" placeholder="请输入运行时间" v-model="run_timer">
          </div>
          <el-button type="primary" @click="addSystem">确 定</el-button>
        </div>
        <div class="edit_part" :class="count == 1 ? 'hide': ''">
          <div class="input_">
            <span>Part</span>
            <input class="num" type="number" v-model="name1">
            <input class="mc" type="text" placeholder="请输入名称" v-model="name2">
          </div>
          <el-button type="primary" @click='ADDPart'>确 定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Loading } from 'element-ui';
export default {
  props:{
    scriptdata:{
      type: Array
    },
    PartList:{
      type: Array
    }
  },
  name: "timingaside",

  data() {
    return {
      loadingInstance:'',      //加载中
      topActive: 1, //1是systeam 2是part
      ishide:false,
      scriptIndex:0,      //初始脚本的下标
      name1:'',      //添加part的名字
      name2:'',       //添加part名称


      // system
      System:{},                    //总表
      product_nume:'',              //项目名称
      set_tiemr:'',              ///设定时间
      set_num:'',                  //设定次数
      radio: "1",                 //1为设定十四间   2为设定次数
      dadio_: "1",                //1为ON    0为OFF
      xiu_timer:'',               //休息时间
      run_timer:''                //运行时间
    };
  },
  computed:{
    count(){
      return this.$store.state.topActive
    }
  },
  methods:{
    // 浮动显示
    Check_tab(num) {
      this.topActive = num;
      this.$store.commit('CHANGE_STATE',this.topActive);
    },

    // 导入脚本
    Add_timing() {
      this.hide = false;
    },
    chengeHide(){
      this.ishide = !this.ishide
    },
    shouPart(id,index){
      this.scriptIndex = index;
      this.ishide = !this.ishide;
      this.$emit('script_id',id);
    },

    // 更改System
    addSystem(){
      // product_nume:'',              //项目名称
      //   set_tiemr:'',              ///设定时间
      //   set_num:'',                  //设定次数
      //   radio: "1",                 //1为设定时间   2为设定次数
      //   dadio_: "1",                //1为ON    2为OFF
      //   xiu_timer:'',               //休息时间
      //   run_timer:''
      if(this.radio == 1){
        this.System.set_num = 0;
        this.System.set_time = this.set_tiemr;
      }else if(this.radio == 2){
        this.System.set_time = 0;
        this.System.set_num =this.set_num
      }


      this.System.project_name = this.product_nume;
      this.System.intervals = this.dadio_;
      this.System.rest_time = this.xiu_timer
      this.System.run_time = this.run_timer
      this.System.script_id = this.$store.state.scriptID

      this.$emit('addSystem',this.System)

    },

    //选择指令
    select_partChange(id,index){
      console.log(id,index)
      this.$emit('select_zhiling',id);
    },

      // 添加PART
    ADDPart(){

      this.$emit('ADDPART',this.name1,this.name2)



    },
    // 关闭加载
    closeInstance(){
      this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
        this.loadingInstance.close();
      });
    }
  }
};
</script>
<style lang='scss'>
@import "../../assets/style/clear.scss";
.aside_box {
  width: 100%;
  height: 100%;
}
.content-box {
  height: 100%;
  width: 100%;
  padding: 0.22rem 0.41rem 0.41rem 0.27rem;
  box-sizing: border-box;
  color: #02f6ff;
  .jb {
    width: 1.77rem;
    height: 0.44rem;
    line-height: 0.44rem;
    color: #fff;
    font-size: 0.2rem;
    background: linear-gradient(
      90deg,
      rgba(31, 178, 204, 1) 0%,
      rgba(11, 18, 39, 0.44) 100%
    );
    box-sizing: border-box;
    padding-left: 0.14rem;
    margin-bottom: 0.29rem;
  }

  .select_box {
    width: 100%;
    position: relative;
    @extend %clearfix;
    .select {
      width: 4.62rem;
      height: 0.42rem;
      line-height: 0.42rem;
      background-image: url("../../assets/img/side_down.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      font-size: 0.24rem;
      color: #02f6ff;
      box-sizing: border-box;
      padding-left: 0.14rem;
      position: relative;
      .right {
        position: absolute;
        right: 0.17rem;
        bottom: 0.12rem;
        width: 0.23rem;
        height: 0.13rem;
      }
    }

    .reset {
      width: 0.46rem;
      height: 0.42rem;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }


    .script_box{
      width: 100%;
      position: absolute;
      left: 0;
      top: .4rem;
      z-index: 999;
      background: rgba(2, 246, 255, 0.2);
      &.hide{
        display: none;
      }
      ul{
        width: 100%;
        li{
          font-size: 0.24rem;
          color: #02f6ff;
          height: 0.5rem;
          line-height: 0.5rem;
          position: relative;
          span{
            font-size: 0.24rem;
          }
        }
      }
    }
  }

  .select_list {
    width: 100%;
    max-height: 3.02rem;
    height: 3.02rem;
    position: relative;
    background: rgba(2, 246, 255, 0.2);
    padding-top: 0.14rem;
    box-sizing: border-box;
    ul {
      width: 100%;
      @extend %clearfix;
      &.hide{
        display: none;
      }
      .lisDom {
        font-size: 0.2rem;
        color: #02f6ff;
        height: 0.5rem;
        line-height: 0.5rem;
        position: relative;
        background: #2d408a;
        .one {
          width: 30%;
          display: inline-block;
          padding-left: 0.12rem;
          box-sizing: border-box;
        }
        .two {
          width: 70%;
          height: 100%;
          display: inline-block;
          position: relative;
          div {
            width: 0.67rem;
            height: 0.26rem;
            border: 1px solid #02f6ff;
            line-height: 0.26rem;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }

    .color {
      width: 100%;
      height: 0.41rem;
      background: #11546b;
      position: absolute;
      bottom: 0;
    }
  }

  .edit_box {
    width: 100%;
    position: relative;
    /*border-left: 1px solid #1e2d71;*/
    /*border-bottom: 1px solid #1e2d71;*/
    /*border-right: 1px solid #1e2d71;*/
    box-sizing: border-box;
    margin-top: 1rem;
    border:1px solid #1e2d71;
    .tab_box_ {
      border: 1px solid #12315f;
      height: 0.24rem;
      width: 1.18rem;
      @extend %clearfix;
      margin-bottom: 0.17rem;
      .systeam {
        border-right: 1px solid #12315f;
      }
      div {
        width: 50%;
        box-sizing: border-box;
        height: 0.24rem;
        line-height: 0.24rem;
        font-size: 0.12rem;
        text-align: center;
        cursor: pointer;
        &.active {
          background: #12315f;
        }
      }
    }
    .new {
      width: 0.97rem;
      height: 0.32rem;
      line-height: 0.32rem;
      position: absolute;
      top: 0;
      right: 0;
      border: 1px solid #2027bd;
      text-align: center;
      font-size: 0.16rem;
      cursor: pointer;
    }

    .edit {
      width: 100%;
      padding-left: 0.15rem;
      box-sizing: border-box;
      font-size: 0.12rem;
      padding-bottom: 0.29rem;
      // margin-bottom: 0.29rem;
      &.hide {
        display: none;
      }
      position: relative;
      .el-button {
        width: 1.19rem;
        // height: 0.4rem;
        color: #fff;
        background: #08c2c9;
        border: none;
        position: absolute;
        bottom: 0.14rem;
        right: 0.56rem;
      }
      .project_name {
        margin-bottom: 0.25rem;
        span {
          margin-right: 0.15rem;
        }
        input {
          outline: none;
          border: 1px solid #02f6ff;
          padding-left: 0.17rem;
          box-sizing: border-box;
          height: 0.24rem;
          background: #0c1127;
          color: #02f6ff;
        }
        input::-webkit-input-placeholder {
          color: #02f6ff;
        }
      }
      .set {
        margin-bottom: 0.12rem;
        .el-radio__input .el-radio__inner ,.is-checked .el-radio__inner{
          background: #0c1127;
          border-color: #00f6ff;
        }
        .el-radio__inner::after {
          background-color: #00f6ff;
        }
        .el-radio__input.is-checked + .el-radio__label {
          color: #00f6ff;
        }
        .el-radio__inner {
          background: #0c1127;
          border-color: #00f6ff;
        }

        .el-radio__label {
          color: #127d81;
        }

        .right {
          margin-right: 0.45rem;
        }

        input {
          outline: none;
          border: 1px solid #02f6ff;
          padding-left: 0.17rem;
          box-sizing: border-box;
          height: 0.24rem;
          background: #0c1127;
          color: #02f6ff;
        }
        input::-webkit-input-placeholder {
          color: #02f6ff;
        }
      }
      .spaceing {
        font-size: 0.12rem;
        padding-left: 0.22rem;
        box-sizing: border-box;
        margin-bottom: 0.08rem;
        .el-radio__input.is-checked .el-radio__inner {
          background: #0c1127;
          border-color: #00f6ff;
        }
        .el-radio__inner::after {
          background-color: #00f6ff;
        }
        .el-radio__input.is-checked + .el-radio__label {
          color: #00f6ff;
        }
        .el-radio__inner {
          background: #0c1127;
          border-color: #00f6ff;
        }

        .el-radio__label {
          color: #127d81;
        }
        .sapce {
          margin-right: 0.19rem;
        }
      }

      .rest {
        padding-left: 0.22rem;
        box-sizing: border-box;
        margin-bottom: 0.08rem;
        span {
          margin-right: 0.19rem;
        }

        input {
          outline: none;
          border: 1px solid #02f6ff;
          padding-left: 0.17rem;
          box-sizing: border-box;
          height: 0.24rem;
          background: #0c1127;
          color: #02f6ff;
        }
        input::-webkit-input-placeholder {
          color: #02f6ff;
        }
      }
    }

    .edit_part {
      width: 100%;
      height: 3.5rem;
      padding-left: 0.16rem;
      box-sizing: border-box;
      position: relative;
      &.hide {
        display: none;
      }
      .input_ {
        width: 100%;
        span {
          font-size: 0.12rem;
        }
        .num {
          width: 0.64rem;
          height: 0.24rem;
          border: 1px solid #00f6ff;
          outline: none;
          background: #0c1127;
          color: #00f6ff;
          box-sizing: border-box;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .mc {
          width: 1.94rem;
          height: 0.24rem;
          color: #00f6ff;
          border: 1px solid #00f6ff;
          outline: none;
          background: #0c1127;
          padding-left: 0.1rem;
          box-sizing: border-box;
        }

        input::-webkit-input-placeholder {
          color: #02f6ff;
        }
      }
      .el-button {
        width: 1.19rem;
        // height: 0.4rem;
        color: #fff;
        font-size: 0.16rem;
        position: absolute;
        bottom: 0.26rem;
        right: 0.56rem;
        background: #08c2c9;
      }
    }
  }
}
</style>
