<template>
  <div id="config">
    <div class="timing">
      <div class="tab_box">
        <div
          class="option_two fl item active"
        >Part 1</div>
      </div>
      <!-- tab容器 -->
      <div class="tab_contariner">
        <div class="info_box">
          <div class="step_">
            <div class="set_box">
              <div class="big_let fl">
                <div class="set_left fl">
                  <div class="top_title">
                    <div class="num fl">Step.No</div>
                    <div class="count fl">硬件映射</div>
                    <div class="setzhi fl">指令设置</div>
                    <img src="../../assets/img/add.png" alt>
                  </div>
                  <div class="list">
                    <div class="Set_data" v-for="(val,index) in zlList" :key="index">
                      <div class="list_data fl">{{val.id}}</div>
                      <div class="list_data fl right">
                        <span v-if="val.mapping">{{val.mapping.content}}</span>
                      </div>
                      <div class="list_data fl right" v-if="val.order_set">{{val.order_set}}</div>
                    </div>
<!--                    <div class="Set_data">-->
<!--                      <div class="list_data fl">2</div>-->
<!--                      <div class="list_data fl right">-->
<!--                        <input type="number">-->
<!--                      </div>-->
<!--                    </div>-->
                  </div>
                </div>
                <div class="bottom">
                  <div>
                    <el-button type="primary" style="display: none;">确 定</el-button>
                  </div>
                </div>
              </div>
              <div class="big_rig fl">
                <div class="set_right">
                  <div class="top_title">
                    <div class="num fl">Compose</div>
                    <div class="count fl">Cycle</div>
                    <img src="../../assets/img/add.png"  title="添加指令组合" v-on:click="addListcom">
                  </div>
                  <div class="list">
                    <div class="Set_data"  v-for="(contents,xs) in combinationList" :key="xs">
                      <div class="list_data fl">
                        <select id="left" @change="changeLeft_val(xs,$event)">
                          <option :value="contents.first">{{contents.first}}</option>
                          <option :value="val.id" v-for="(val,index) in zlList" :key="index">{{val.id}}</option>
                        </select>
                        ——
                        <select id="right" @change="changeRight_val(xs,$event)">
                          <option>{{contents.last}}</option>
                          <option :value="val.id"  v-for="(val,index) in zlList" :key="index">{{val.id}}</option>
                          </select>
                      </div>
                      <div class="list_data fl right">
                        <input type="number" v-model="contents.cycle" style="text-align: center;" @blur="change_Cycle(xs,$event)">
                      </div>
                      <div class="delete_zh fl" style="width: 10%" v-on:click="deleteList(contents.id,xs)">删除</div>
                    </div>





                  </div>
                </div>
                <div class="bottom">
                  <div>
                    <el-button type="primary" v-on:click="sendData">确 定</el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- tips -->
    <div class="tip_box" :class="hide === true ? 'hide' :''">
      <div class="kong">
        <i class="el-icon-close" @click="Cancel_add"></i>
      </div>
      <div class="edit_">
        <div class="sx">
          <span>时序名称:</span>
          <input type="text" placeholder="请输入时序名称">
        </div>
        <div class="chioce">
          <div class="desc fl">选择已有时序:</div>
          <div class="select fl">
            空
            <img src="../../assets/img/right_down.png" alt>
          </div>
        </div>
        <el-button type="primary">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props:{
    zlList:{
      type:Array
    },
    combinationList:{
      type:Array
    },
    zuheLISTarr:{
      type:Array
    }
  },
  data() {
    return {
      radio: "1",
      dadio_: "1",
      hide: true, //时序新增编辑框
      // bottomActive: 1, //1是systeam 2是part
      topActive: 1, //1是systeam 2是part
    };
  },
  methods: {
    Add_timing() {
      this.hide = false;
    },
    Cancel_add() {
      this.hide = true;
    },
    Check_tab(num) {
      this.topActive = num;
    },
    Check_out(num) {
      //   console.log(num);
      let check_num = num;
      this.bottomActive = num;
    },
    // 添加指令组合
    addListcom(){
      this.$emit('ADDLIST')
    },
    // 删除指令组合
    deleteList(id,index){
      this.$emit('REMOVELIST',id,index)
    },
    // 起始值
    changeLeft_val(index,e){
      this.$emit("changeLeft_val",index,e.target.value)
    },
    // 结束值
    changeRight_val(index,e){
      this.$emit("changeRight_val",index,e.target.value)
    },
    //Cycle修改
    change_Cycle(index,e){
      console.log(index)
      this.$emit("change_Cycle",index,e.target.value)
    },
    sendData(){
      this.$emit("SNED_DATA")
    }
  }
};
</script>
<style lang='scss'>
@import "../../assets/style/clear.scss";
#config {
  height: 100%;
  position: relative;
  .tip_box {
    font-size: 0.16rem;
    width: 4.31rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);
    &.hide {
      display: none;
    }
    .kong {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      width: 100%;
      height: 0.44rem;
      background: #416ab1;
      position: relative;
      i {
        color: #fff;
        font-size: 0.2rem;
        position: absolute;
        right: 0.18rem;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .edit_ {
      height: 2.44rem;
      background: #2c4775;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      position: relative;
      .sx {
        color: #02f6ff;
        font-size: 0.16rem;
        text-align: center;
        padding-top: 0.49rem;
        margin-bottom: 0.28rem;
        span {
          margin-right: 0.14rem;
        }
        input {
          border: 0;
          width: 2.28rem;
          border-bottom: 1px solid #02f6ff;
          outline: none;
          background: #2c4775;
          height: 0.28rem;
          color: #02f6ff;
        }

        input::-webkit-input-placeholder {
          color: #02f6ff;
        }
      }
      .chioce {
        box-sizing: border-box;
        padding: 0 0.52rem 0 0.29rem;
        @extend %clearfix;
        .desc {
          font-size: 0.16rem;
          color: #00f6ff;
          width: 1.09rem;
          margin-right: 0.08rem;
        }
        .select {
          border: 1px solid #02f6ff;
          width: 2.29rem;
          line-height: 0.28rem;
          color: #02f6ff;
          height: 0.28rem;
          position: relative;
          padding-left: 0.15rem;
          box-sizing: border-box;
          img {
            width: 0.16rem;
            height: 0.1rem;
            position: absolute;
            top: 50%;
            right: 0.1rem;
            transform: translateY(-50%);
          }
        }
      }

      .el-button {
        width: 1.19rem;
        // height: 0.4rem;
        background: #08c2c9;
        color: #fff;
        font-size: 0.16rem;
        border: none;
        position: absolute;
        bottom: 0.42rem;
        right: 0.49rem;
      }
    }
  }
}
.timing {
  font-size: 0.17rem;
  color: #02f6ff;
  .tab_box {
    margin-bottom: 0.22rem;
    @extend %clearfix;
    color: #0d6977;
    background-image: url("../../assets/img/tag.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 1.15rem;
    background-position-x: -0.2rem;
    background-position-y: -0.1rem;
    .option_one {
      width: 50%;
      height: 0.4rem;
      line-height: 0.2rem;
      padding-left: 0.2rem;
      box-sizing: border-box;
    }
    .option_two {
      width: 100%;
      height: 0.4rem;
      line-height: 0.2rem;
      padding-left: 0.1rem;
      box-sizing: border-box;
    }

    .item {
      &.active {
        color: #02f6ff;
        font-size: 0.18rem;
      }
    }
  }
  .tab_contariner {
    width: 100%;
    padding: 0 0.41rem 0 0.17rem;
    box-sizing: border-box;
    .info_box {
      width: 100%;
      .systeam {
        &.hide {
          display: none;
        }

        width: 100%;
        .list_box {
          width: 100%;
          height: 5.59rem;
          max-height: 5.59rem;
          border: 1px solid #1e2d71;
          box-sizing: border-box;
          .list {
            width: 100%;
            height: 0.37rem;
            @extend %clearfix;
            .fl {
              border-right: 1px solid #1e2d71;
              border-bottom: 1px solid #1e2d71;
              box-sizing: border-box;
            }
            .index_ {
              width: 2%;
              height: 100%;
              line-height: 0.37rem;
              text-align: center;
            }
            .name {
              width: 8%;
              height: 100%;
              line-height: 0.37rem;
              text-align: center;
            }
            .feta {
              width: 90%;
              height: 100%;
              line-height: 0.37rem;
              border-right: none;
              padding-left: 0.16rem;
              box-sizing: border-box;
            }
          }
        }
      }

      .step_ {
        width: 100%;
        height: 8.59rem;
        max-height: 8.59rem;
        border: 1px solid #1e2d71;
        box-sizing: border-box;
        &.hide {
          display: none;
        }
        .set_box {
          width: 100%;
          height: 100%;
          @extend %clearfix;
          .big_let {
            height: 100%;
            width: 50%;
            position: relative;
            .bottom {
              width: 100%;
              height: 0.58rem;
              background: #1e2d71;
              position: absolute;
              bottom: 0;
              div {
                position: relative;
                width: 100%;
                height: 100%;
                .el-button {
                  width: 1.19rem;
                  // height: 0.4rem;
                  color: #fff;
                  position: absolute;
                  right: 0.3rem;
                  top: 50%;
                  transform: translateY(-50%);
                }
              }
            }
            .set_left {
              width: 100%;
              height: 5.01rem;
              overflow: auto;
              position: relative;
              padding-bottom: 0.58rem;
              box-sizing: border-box;
              // background: skyblue;
              .top_title {
                @extend %clearfix;
                background: url("../../assets/img/step_bg.png");
                background-size: 100% 100%;
                background-repeat: no-repeat;
                position: relative;
                img {
                  width: 0.25rem;
                  height: 0.25rem;
                  position: absolute;
                  top: 50%;
                  transform: translateY(-50%);
                  right: 0.15rem;
                  display: none;
                }
                .num {
                  width: 33.333%;
                  height: 0.43rem;
                  line-height: 0.43rem;
                  text-align: center;
                }
                .count {
                  width: 33.333%;
                  height: 0.43rem;
                  line-height: 0.43rem;
                }
                .setzhi{
                  width: 33.333%;
                  height: 0.43rem;
                  line-height: 0.43rem;
                }
              }

              .list {
                .Set_data {
                  width: 100%;
                  @extend %clearfix;
                  border-bottom: 1px solid #1e2d71;
                  .list_data {
                    height: 0.57rem;
                    line-height: 0.57rem;
                    width: 33.333%;
                    text-align: center;
                  }
                  .right {
                    text-align: left;
                    input {
                      border: 1px solid #02f6ff;
                      color: #00f6ff;
                      outline: none;
                      width: 0.67rem;
                      height: 0.3rem;
                      background: #0c1127;
                    }

                    input[type="number"] {
                      -moz-appearance: textfield;
                    }
                    input[type="number"]::-webkit-inner-spin-button,
                    input[type="number"]::-webkit-outer-spin-button {
                      -webkit-appearance: none;
                      margin: 0;
                    }
                  }
                }
              }
            }
          }
          .big_rig {
            width: 50%;
            height: 100%;
            position: relative;
            box-sizing: border-box;
            border-left: 1px solid #1E2D71;
            .bottom {
              width: 100%;
              height: 0.58rem;
              background: #1e2d71;
              position: absolute;
              bottom: 0;
              div {
                position: relative;
                width: 100%;
                height: 100%;
                .el-button {
                  width: 1.19rem;
                  // height: 0.4rem;
                  color: #fff;
                  position: absolute;
                  right: 0.3rem;
                  top: 50%;
                  transform: translateY(-50%);
                }
              }
            }
            .set_right {
              //右侧的
              width: 100%;
              height: 5.01rem;
              overflow: auto;
              position: relative;
              padding-bottom: 0.58rem;
              box-sizing: border-box;
              // background: skyblue;
              .top_title {
                @extend %clearfix;
                background: url("../../assets/img/step_bg.png");
                background-size: 100% 100%;
                background-repeat: no-repeat;
                position: relative;
                img {
                  width: 0.25rem;
                  height: 0.25rem;
                  position: absolute;
                  top: 50%;
                  transform: translateY(-50%);
                  right: 0.15rem;
                  cursor:pointer;
                }
                .num {
                  width: 50%;
                  height: 0.43rem;
                  line-height: 0.43rem;
                  text-align: center;
                }
                .count {
                  width: 40%;
                  height: 0.43rem;
                  line-height: 0.43rem;
                }
              }
              .list {
                .Set_data {
                  width: 100%;
                  @extend %clearfix;
                  border-bottom: 1px solid #1e2d71;
                  .list_data {
                    height: 0.57rem;
                    line-height: 0.57rem;
                    width: 50%;
                    text-align: center;
                  }
                  .right {
                    text-align: left;
                    width: 40%;
                    input {
                      border: 1px solid #02f6ff;
                      color: #00f6ff;
                      outline: none;
                      width: 0.67rem;
                      height: 0.3rem;
                      background: #0c1127;
                    }

                    input[type="number"] {
                      -moz-appearance: textfield;
                    }
                    input[type="number"]::-webkit-inner-spin-button,
                    input[type="number"]::-webkit-outer-spin-button {
                      -webkit-appearance: none;
                      margin: 0;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    .edit_box {
      width: 100%;
      position: relative;
      border-left: 1px solid #1e2d71;
      border-bottom: 1px solid #1e2d71;
      border-right: 1px solid #1e2d71;
      box-sizing: border-box;
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
        height: 1.91rem;
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
}
</style>
