<template>
  <div class="manualmain">
    <div class="big_box">
      <div class="left_box fl">
        <div class="input_value">
          <div class="item">
            <div class="fl">P：</div>
            <input class="fl" type="number">
          </div>
          <div class="item">
            <div class="fl">I：</div>
            <input class="fl" type="number">
          </div>
          <div class="item">
            <div class="fl">D：</div>
            <input class="fl" type="number">
          </div>
          <div class="item last">
            <div class="fl">通道选择:</div>
            <select class="fr" name id></select>
          </div>
        </div>
        <div class="btn_box">
          <el-button class="btn1">运行</el-button>
          <el-button class="btn2">确定</el-button>
        </div>
        <div class="line_box">
          <ve-line
            :data="chartData"
            :settings="chartSettings"
            width="100%"
            height="100%"
            :judge-width="chartSettings.sc"
          ></ve-line>
        </div>
        <div class="line"></div>
        <div class="order">
          <p class="title">Part 1</p>
          <div class="order_box">
            <div class="list">
              <div class="item one">Step.No</div>
              <div class="item two">指令</div>
              <div class="item three">操作</div>
            </div>
            <div class="list">
              <div class="item one list_item">1</div>
              <div class="item two list_item">这是指令啊啊啊啊啊</div>
              <div class="item three list_item">
                <el-button>发送</el-button>
              </div>
            </div>
            <div class="list">
              <div class="item one list_item">1</div>
              <div class="item two list_item">这是指令啊啊啊啊发啊啊</div>
              <div class="item three list_item">
                <el-button>发送</el-button>
              </div>
            </div>
    
          </div>
        </div>
      </div>
      <div class="right_box fl">
        <div class="right_big">
          <div class="right_top">
            <div class="choice">
              <div class="fl">选择Part：</div>
              <select class="select_ fl" name id></select>
            </div>
            <div class="btn_box">
              <el-button class="btn1">运行</el-button>
              <el-button class="btn2">单步运行</el-button>
            </div>
            <div class="link_box">
              <img src="../../assets/img/link.png" alt>
              <p>链接设备</p>
            </div>
          </div>
          <div class="run_list">
            <div class="list">
              <div class="item">名称</div>
              <div class="item">接口</div>
              <div class="item">单位</div>
              <div class="item last">状态</div>
            </div>
              <div class="list">
              <div class="item">真寻</div>
              <div class="item">dv1.1</div>
              <div class="item">m.c</div>
              <div class="item last">哈哈</div>
            </div>
              <div class="list">
              <div class="item">真寻</div>
              <div class="item">dv1</div>
              <div class="item">m.c</div>
              <div class="item last">黑hi</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: [""],
  data() {
    this.chartSettings = {
      metrics: ["访问用户"],
      dimension: ["日期"],
      sc: true
    };
    return {
      chartData: {
        columns: ["日期", "访问用户"],
        rows: [
          { 日期: "1/1", 访问用户: 1393 },
          { 日期: "1/2", 访问用户: 3530 },
          { 日期: "1/3", 访问用户: 2923 },
          { 日期: "1/4", 访问用户: 1723 },
          { 日期: "1/5", 访问用户: 3792 },
          { 日期: "1/6", 访问用户: 4593 }
        ]
      }
    };
  },
  methods: {
    change() {
      const arr = [1, 2, 3];
      const [a, b, c] = arr;
      console.log(a);

      this.$store.commit("chnage", {
        s: 100,
        e: 101,
        c: 2
      });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "../../assets/style/clear.scss";
.manualmain {
  width: 100%;
  height: 100%;
  padding: 0.14rem 0.19rem 0.13rem 0.17rem;
  box-sizing: border-box;
  font-size: 0.16rem;
  color: #02f6ff;
  .big_box {
    background: #12324b;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    @extend %clearfix;
    .left_box {
      width: 50%;
      height: 100%;
      padding: 0.42rem 0.28rem 0.4rem 0.28rem;
      box-sizing: border-box;
      .input_value {
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        margin-bottom: 0.25rem;
        .item {
          margin-right: 0.17rem;
          flex: 1;
          div {
            height: 0.31rem;
            line-height: 0.31rem;
          }
          select {
            width: 1.25rem;
            height: 0.31rem;
            border: 0;
            outline: none;
            background: #12324b;
            border: 1px solid #02f6ff;
          }
          input {
            outline: none;
            border: 1px solid #02f6ff;
            width: 0.77rem;
            height: 0.31rem;
            background: #12324b;
            color: #02f6ff;
            padding-left: 0.09rem;
            box-sizing: border-box;
          }
        }

        .last {
          margin-right: 0;
          flex: 2;
        }
      }
      .btn_box {
        width: 100%;
        position: relative;
        height: 0.3rem;
        margin-bottom: 0.21rem;
        .btn1 {
          width: 0.89rem;
          background: #0ed776;
          color: #fff;
          border: 0;
          position: absolute;
          right: 1rem;
        }

        .btn2 {
          width: 0.89rem;
          background: #08c2c9;
          color: #fff;
          border: 0;
          right: 0;
          position: absolute;
        }
      }

      .line_box {
        width: 100%;
        height: 3.13rem;
        background: #131a38;
        border-radius: 5px;
        margin-bottom: 0.19rem;
      }

      .line {
        width: 100%;
        height: 1px;
        background: #0c1127;
      }
      .order {
        width: 100%;
        .title {
          height: 0.55rem;
          line-height: 0.55rem;
          width: 100%;
        }
        .order_box {
          width: 100%;
          height: 3.59rem;
          max-height: 3.59rem;
          overflow: auto;
          border: 1px solid #131a38;
          .list {
            width: 100%;
            display: flex;
            flex-wrap: nowrap;
            .item {
              flex: 1;
              text-align: center;
              height: 0.36rem;
              line-height: 0.36rem;
              border-right: 1px solid #131a38;
              border-bottom: 1px solid #131a38;
            }
            .two {
              flex: 2;
            }
            .three {
              flex: 2;
              border-right: none;
            }
            .list_item {
              height: 0.3rem;
              line-height: 0.3rem;
              .el-button {
                width: 0.63rem;
                color: #fff;
                background: #08c2c9;
                border: none;
                padding: 0.04rem 0.17rem;
              }
            }
          }
        }
      }
    }

    .right_box {
      width: 50%;
      height: 100%;
      border-left: 1px solid #0c1127;
      box-sizing: border-box;
      .right_big {
        width: 100%;
        height: 100%;
        padding: 0.42rem 0.52rem 0 0.14rem;
        box-sizing: border-box;
        .right_top {
          width: 100%;
          height: 1.29rem;
          margin-bottom: 0.24rem;
          position: relative;
          .choice {
            width: 100%;
            @extend %clearfix;
            margin-bottom: 0.36rem;
            div {
              height: 0.31rem;
              width: 0.9rem;
              text-align: center;
              line-height: 0.31rem;
            }
            .select_ {
              width: 1.45rem;
              height: 0.31rem;
              border: 1px solid #02f6ff;
              background: #12324b;
              outline: none;
            }
          }
          .btn_box {
            width: 100%;
            .btn1 {
              border: none;
              background: #0e80d7;
              padding: 0.16rem 0.53rem;
              color: #fff;
            }
            .btn2 {
              border: none;
              background: #0ed776;
              padding: 0.16rem 0.53rem;
              color: #fff;
            }
          }
          .link_box {
            width: 1.46rem;
            height: 1.29rem;
            background: #071c2c;
            border-radius: 5px;
            text-align: center;
            position: absolute;
            right: 0;
            top: 0;
            margin-bottom: 0.24rem;
            img {
              display: block;
              width: 0.52rem;
              height: 0.52rem;
              margin: 0.21rem auto 0.15rem auto;
            }
            p {
              font-size: 0.25rem;
              background: linear-gradient(
                0deg,
                rgba(0, 137, 221, 1) 0%,
                rgba(0, 228, 255, 1) 100%
              );
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }
        }

        .run_list {
          width: 100%;
          max-height: 3.96rem;
          height: 3.96rem;
          overflow: auto;
          border: 1px solid #131A38;
          .list {
            width: 100%;
            height: 0.36rem;
            display: flex;
            flex-wrap: nowrap;
            border-bottom: 1px solid #131A38;
            .item {
              flex: 1;
              text-align: center;
              line-height: 0.36rem;
              border-right: 1px solid #131A38;
            }

            .last{
              border-right: none;
            }
          }
        }
      }
    }
  }
}

input[type="number"] {
  -moz-appearance: textfield;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>