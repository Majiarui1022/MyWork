<template>
  <div class="mappmain">
    <div class="data-box">
      <div style="min-height:8.46rem;">
        <ul>
          <li>
            <div class="item fl one">代号</div>
            <div class="item fl two">接口</div>
            <div class="item fl five">编号</div>
            <div class="item fl three">硬件映射</div>
            <div class="item fl four">备注</div>
          </li>
        </ul>
        <ul v-for="(item,index) in executorS" :key="index">
          <li v-for="(val,ix) in item.mappings">
            <div class="item fl one">{{val.hardware}}</div>
            <div class="item fl two">{{val.interface}}</div>
            <div class="item fl five">{{val.order}}</div>
            <div class="item fl three"  @dblclick="Release">
              <input
                type="text"
                placeholder="请输入硬件映射"
                v-model="val.content"
                @blur="changeYS(val.id,index,ix,val.content)"
                :disabled="dsable"
              >
            </div>
            <div class="item fl four"  @dblclick="Release">
              <input
                type="text"
                v-model="val.remark"
                placeholder="请输入备注"
                @blur="ExechangeBZ(val.id,index,ix,val.remark)"
                :disabled="dsable"
              >
            </div>
          </li>
        </ul>

        <ul v-for="(val,index) in Interfaces">
          <li v-for="(item,ine) in val.mappings">
            <div class="item fl one">{{item.hardware}}</div>
            <div class="item fl two">{{item.interface}}</div>
            <div class="item fl five">{{item.order}}</div>
            <div class="item fl three"  @dblclick="Release">
              <input
                type="text"
                placeholder="请输入硬件映射"
                v-model="item.content"
                @blur="changeYS(item.id,index,ine,item.content)"
                :disabled="dsable"
              >
            </div>
            <div class="item fl four"  @dblclick="Release">
              <input
                type="text"
                v-model="item.remark"
                placeholder="请输入备注"
                @blur="ExechangeBZ(item.id,index,ine,item.remark)"
                :disabled="dsable"
              >
            </div>
          </li>
        </ul>
      </div>
      <div class="btn_box">
        <el-button type="primary" @click="get">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mappmain",
  props: {
    Interface: {
      type: Array
    },
    Interfaces: {
      type: Array
    },
    executorS:{
      type: Array
    }
  },
  data() {
    return {
      list: [],
      dsable:true,
      c:''
    };
  },
  methods: {
    get() {
      // console.log(this.$store.state.jkys);
      // console.log(this.Interface.data)
      console.log(this.Interface[this.$store.state.exeid])
      this.$emit('sendData',this.executorS,this.Interfaces)
    },
    // 双击修改
    Release(){
      this.dsable = false
    },
    // 执行器硬件映射的修改
    changeYS(id,index,ix,valB){
      if(id == null){

      }else{
        this.$axios({
          method: "patch",
          url: `/mo_mappings/${id}/`,
          data: {
            id:id,
            content:valB
          }
        })
          .then(res => {
            console.log(res.data);
            this.dsable = true;
          })
          .catch(err => {
            console.log(err);
            this.dsable = true;
            this.$notify.error({
              title: '错误',
              message: '修改错误'
            });
          });

      }
      // this.$axios({
      //   method: "post",
      //   url: "update_rc/",
      //   data: {
      //     hardmapping_id:id,
      //     remark:valB,
      //     content:valY
      //   }
      // })
      //   .then(res => {
      //     console.log(res.data);
      //     this.dsable = true;
      //   })
      //   .catch(err => {
      //     console.log(err);
      //     this.dsable = true;
      //     this.$notify.error({
      //       title: '错误',
      //       message: '修改错误'
      //     });
      //   });
    },
    // 执行器备注的修改
    ExechangeBZ(id,index,index2,valB){
      if(id == null){
      }else{
        this.$axios({
          method: "patch",
          url: `/mo_mappings/${id}/`,
          data: {
            id:id,
            remark:valB
          }
        })
          .then(res => {
            console.log(res.data);
            this.dsable = true;
          })
          .catch(err => {
            console.log(err);
            this.dsable = true;
            this.$notify.error({
              title: '错误',
              message: '修改错误'
            });
          });
      }
    }
  },
  computed: {
      tis(){
        return this.$store.state.exeid
      }
  },
  watch:{
    // 接收两个参数 第一个是改变后的新值newvalue,第二个是老值oldvalue，
    // 只写一个，默认是新值
    Interface(news,olds){
      // 这样重新赋值后，就得到了父组件动态改变的数据
      // this.currentValue = val
      console.log('zaizhelio')
      console.log(news)
      this.c = news[this.$store.state.isAddname]
      console.log('这是下笔哎啊啊啊 啊啊啊啊 '+this.$store.state.exeid)
      console.log(olds)
    },
    Interfaces(news,olds){
      // 这样重新赋值后，就得到了父组件动态改变的数据
      // this.currentValue = val
      console.log(news)
      console.log(olds)
    },
    executorS(news,olds){
      console.log(news)
      console.log(olds)
    }
  },
};
</script>
<style lang='scss' scoped>
@import "../../assets/style/clear.scss";
.mappmain {
  font-size: 0.14rem;
  background: #0c1127;
  height: 100%;
  color: #02f6ff;
  .data-box {
    width: 100%;
    height: 100%;
    padding: 0.26rem 0.41rem 0 0.17rem;
    box-sizing: border-box;
    overflow: auto;
    ul {
      border: 1px solid #1e2d71;
      li {
        width: 100%;
        height: 0.49rem;
        text-align: center;
        @extend %clearfix;

        .item {
          border-right: 1px solid #1e2d71;
          border-bottom: 1px solid #1e2d71;
          box-sizing: border-box;
        }
        .one {
          width: 10%;
          height: 100%;
          line-height: 0.49rem;
        }
        .two {
          width: 10%;
          height: 100%;
          line-height: 0.49rem;
        }
        .five{
          width: 10%;
          height: 100%;
          line-height: 0.49rem;
        }
        .three {
          width: 40%;
          height: 100%;
          line-height: 0.49rem;
          input {
            border: none;
            outline: none;
            width: 100%;
            height: 100%;
            display: block;
            background: #0c1127;
            padding-left: 0.61rem;
            box-sizing: border-box;
            color: #02f6ff;
          }

          ::-webkit-input-placeholder {
            color: #7785c3;
            text-align: center;
          }
        }
        .four {
          width: 30%;
          height: 100%;
          line-height: 0.49rem;
          border-right: none;
          input {
            border: none;
            outline: none;
            width: 100%;
            height: 100%;
            display: block;
            background: #0c1127;
            padding-left: 0.61rem;
            box-sizing: border-box;
            color: #02f6ff;
          }

          ::-webkit-input-placeholder {
            color: #7785c3;
            text-align: center;
          }
        }
      }
    }
  }
}

.btn_box {
  @extend %clearfix;
  .el-button {
    width: 2rem;
    height: 0.6rem;
    background: #11546b;
    border: 0;
    font-size: 0.24rem;
    float: right;
    margin-top: 0.25rem;
  }
}
</style>
