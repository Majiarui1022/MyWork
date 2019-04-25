<template>
  <div class="edit_box" :class="status? '':'hide'">
    <div class="top">
      <i class="el-icon-close" @click="hideTips"></i>
    </div>
    <div class="edit">
      <div class="edit_info">
        <span>添加名称:</span>
        <input type="text" placeholder="请输入名称" v-model="msg">
        <div class="script_list">
          <span style="display: block;margin: 0" v-on:click="scriptLstrt" >{{bigList[isdefaultName].name}}</span>
          <img class="right" src="../../assets/img/right_down.png" alt>
          <div class="select_scriptList" :class="ischecked == true?'':'hide'">
            <ul>
              <li></li>
              <li v-on:click="selectScript(index,item.id)" v-for="(item,index) in bigList" :key="index">{{item.name}}</li>
            </ul>
          </div>
        </div>
        <div class="btn_box">
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "edit",
  props: {
    bigList:{
      type:Array
    }
  },
  data() {
    return {
      msg: "",
      isdefaultName:0,        //默认显示脚本第一条
      ischecked:false,
      script_id:null
    };
  },
  methods: {
    hideTips() {
      this.$store.commit('EDIT_NAME',false);
    },
    selectScript(index,id){
      this.ischecked = !this.ischecked
      this.isdefaultName = index
      this.script_id = id
    },
    scriptLstrt(){
      this.ischecked = !this.ischecked
    },
    confirm() {
        this.$emit('aaaaaaaaaa',this.msg,this.script_id)
    }
  },
  computed:{
      status() {
          return this.$store.state.isAddname
      }
  }

};
</script>
<style lang='scss' scoped>
.edit_box {
  width: 4.31rem;
  height: 3.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  background: skyblue;
  font-size: 0.24rem;
  color: #02f6ff;
  border-radius: 5px;
  &.hide {
    display: none;
  }
  .top {
    width: 100%;
    height: 0.44rem;
    background: #416ab1;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    position: relative;
    i {
      color: #fff;
      font-size: 0.3rem;
      position: absolute;
      top: 50%;
      right: 0.1rem;
      transform: translateY(-50%);
    }
  }
  .edit {
    width: 100%;
    height: 3.1rem;;
    background: #2c4775;
    .edit_info {
      padding: 0.5rem 0.5rem;
      box-sizing: border-box;
      font-size: 0.16rem;
      span {
        margin-right: 0.2rem;
      }
      input {
        border: 0;
        outline: none;
        background: transparent;
        color: #02f6ff;
        border-bottom: 1px solid #02f6ff;
      }

      input::-webkit-input-placeholder {
        color: #02f6ff;
      }
      .script_list{
        width: 100%;
        height:.46rem;
        margin-top: .3rem;
        position: relative;
        line-height: .46rem;
        text-indent: .1rem;
        img{
          position: absolute;
          right: 0.1rem;
          width: 0.23rem;
          height: 0.13rem;
          bottom: .16rem;
        }
        .select_scriptList{
          width: 100%;
          position: absolute;
          height:3rem;
          top:.46rem;
          left: 0;
          background: #416ab1;
          &.hide{
            display: none;
          }
          ul{
            li{
              list-style: none;
            }
          }
        }
      }
      .btn_box {
        margin-top: 0.5rem;
        width: 100%;
        text-align: right;
      }
    }
  }
}
</style>
