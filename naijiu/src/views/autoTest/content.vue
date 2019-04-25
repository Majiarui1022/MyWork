<template>
  <div class="content">
    <div class="data_sheet">
      <div class="loop">当前循环次数:3次</div>
      <div id="myChart" :style="{width: '100%', height: '7.24rem'}"></div>
    </div>
    <div class="device_box">
      <div class="device_box_info">
        <div class="item fl" v-on:click="linkEquipment">
          <img src="../../assets/img/link.png" alt>
          链接设备
        </div>
        <div class="item fl" v-on:click="stareLink">
          <img src="../../assets/img/start.png" alt>
          {{stateWords}}
        </div>
        <div class="item fl" v-on:click="endLink">
          <img src="../../assets/img/end.png" alt>
          重置
        </div>
      </div>
      <!-- <button @click="change1" ref="btn">改变</button> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Vcontent",
  data() {
    return {
      echarts_data:{
        title: {
          text: "曲线示意图",
          textStyle: {
            //标题颜色
            fontSize: 24,
            fontWeight: "normal",
            color: "#02F6FF"
          },
          x: "center",
          y: "top",
          top: 0
        },
        grid: {
          y: 100
        },
        legend: {
          data: ["撞击曲线"],
          right:'10%',
          textStyle: {
            color: "#02F6FF",
            fontSize: "16"
          },
          y: 50
        },
        tooltip: {},
        xAxis: {
          data: [5,10,10,10,32,40,52,58,60,68,69,80,84,89,90,95],
          axisLine: {
            lineStyle: {
              width: 1,
              color: "#0F1C56"
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#00FFD2"
            }
          }
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              width: 1,
              color: "#0F1C56"
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#00FFD2"
            }
          },
          splitLine: {
            lineStyle: {
              color: "#0F1C56"
            }
          }
        },
        series: [
          {
            name: "撞击曲线",
            type: "line",
            data: [1,0,1,0,1,0,0,1,0,0,1,0,1,0,1,0,1],
            color: "#02F6FF"
          }
        ]
      },
      state:-1,    //-1代表未选择  0代表链接 1代表开始   2代表结束
      stateWords:'开始',
      objTimer:{}   //共享属性传值
    };
  },
  created(){

  },
  methods: {
    drawLine(data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption(data);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    // change1() {
    //   let data = this.echarts_data;
    //   data.xAxis.data = ["10", "20", "30", "40", "50", "60", "70","80","90","100"];
    //   data.series[0].data = [5, 10, 16, 10, 5, 20,23,45,6,1];
    //   //      //更新数据
    //   this.drawLine(data)
    //   console.log(this.$refs)
    // }


    // 选择设备进行连接
    linkEquipment(){
      var that = this
      if(that.state == -1){
        that.state = 0;    //在他连接成功后加入标识该值为0
        console.log("我已经链接")
      }else if(that.state != -1){
        that.tit("您已经链接了设备")
      }else{
        that.tit("请选择设备")
      }

      },
    // 开始链接
      stareLink(){
        var that = this
        if(that.state == 0){
          that.state = 1;
          that.stateWords = "暂停"
          console.log("我已经开始")

          //获取当前日期以及存储数据
          var myDate = new Date();
            myDate.getFullYear();    //获取完整的年份(4位,1970-????)
            myDate.getMonth();       //获取当前月份(0-11,0代表1月)
            myDate.getDate();        //获取当前日(1-31)
            myDate.getHours();       //获取当前小时数(0-23)
            myDate.getMinutes();     //获取当前分钟数(0-59)
            myDate.getSeconds();     //获取当前秒数(0-59)
          var strYears = `${ myDate.getFullYear()}/${  myDate.getMonth()+1}/${myDate.getDate()}`,
            sttTimer = `${ myDate.getHours()}:${  myDate.getMinutes()}:${myDate.getSeconds()}`;
            this.objTimer.years = strYears;       //年月日
            this.objTimer.timers = sttTimer;      //时分秒
            this.objTimer.state =  this.state;    //当前状态
            this.objTimer.num = 0
          // this.$axios({
          //   methods: "get",
          //   url: "get_set_numtime/" + id + ""
          // }).then(res => {
          //   console.log(res.data);
          // });



          this.$store.commit('SEND_TIEMR',this.objTimer);

        }else if(that.state == 1){
          this.stateWords = "开始";
          console.log(`我已经结束{this.state}`);
          that.state = 2
          this.objTimer.state =  this.state;
          this.$store.commit('SEND_TIEMR',this.objTimer);
        }else if(that.state == 2){
          that.state = 1;
          that.stateWords = "暂停"
          this.objTimer.state =  this.state;    //当前状态
          this.$store.commit('SEND_TIEMR',this.objTimer);
          console.log("我已经开始")
        }else{
          that.tit("请先连接")
        }
      },
      // 结束连接
      endLink(){
        var that = this
      if(that.state == 1 || that.state == 2 || that.state == 0){
        that.state = -1;
        that.stateWords = "开始"

        this.objTimer.state =  this.state;
        this.$store.commit('SEND_TIEMR',this.objTimer);

        console.log("我已经重置")
      }else{
        this.tit("请一步一步来")
      }

      },




      // 未选择的提示框
    tit(title){
      const h = this.$createElement;
      this.$notify({
        title: '警告',
        message: h('i', { style: 'color: teal'}, `${title}`)
      });
    }
  },
  mounted() {
    var data = this.echarts_data;
    setTimeout(() => {
      this.drawLine(data);
    });
  },

  components: {}
};
</script>
<style lang='scss' scoped>
@import "../../assets/style/clear.scss";
.data_sheet {
  height: 7.24rem;
  width: 100%;
  padding: 0 0.1rem;
  padding-top: 0.62rem;
  // padding-right: 1rem;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
  position: relative;
  .loop {
    font-size: 0.16rem;
    color: #00ffd2;
    top: 13%;
    left: 1.29rem;
    position: absolute;
  }
  .ve-line {
    padding: 0 1.4rem 0 0.82rem;
    box-sizing: border-box;
  }
}
.content {
  width: 100%;
  height: 100%;
  background: #0c1127;
  .el-main {
    padding: 0;
  }

  .device_box {
    width: 100%;
    height: 1.82rem;
    border-top: 2px solid #0f1c56;
    padding: 0.38rem 0 0.36rem 0;
    box-sizing: border-box;
    position: relative;
    .device_box_info {
      @extend %clearfix;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .item {
        font-size: 0.24rem;
        color: #009fff;
        text-align: center;
        width: 1.03rem;
        margin-right: 1rem;
        cursor: pointer;
        img {
          width: 0.64rem;
          height: 0.63rem;
          display: block;
          margin: 0 auto;
          margin-bottom: 0.22rem;
        }
      }
    }
  }
}
</style>
