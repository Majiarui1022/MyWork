<template>
  <div class="operan">
    <div class="order">
      <div class="part">
<!--        <div>Part1</div>-->
<!--        <img src="../../assets/img/tag.png" alt>-->
        <div class="timing">
          <div class="tab_box">
            <div
              class="option_one fl item"
              :class="count == 1 ? 'active':''"
              @click="Check_tab(1)"
            >System</div>
            <div
              class="option_two fl item"
              :class="count == 2 ? 'active':''"
              @click="Check_tab(2)"
            >Part 1</div>
          </div>
        </div>
      </div>
      <div class="big_order">
              <!--part1-->
        <div class="order_top" :class="count == 2? '':'hide'">
          <div class="order_top_info" style="height: 4.38rem">
            <div class="title">
              <p>指令解析</p>
              <div class="req">
                <input type="file" id="file" ref="upload" accept=".xml, .xlsx" class="outputlist_upload">
                <img src="../../assets/img/req.png" alt>
              </div>
            </div>
            <div class="content_box">
              <div class="list_item">
                <p class="fl or">指令</p>
                <p class="fl ormsg">指令说明</p>
              </div>

              <div class="list_item" v-for="(item,index) in ceshia" :key="index">
                <p class="fl or item">{{item.msg.order}}</p>
                <p class="fl ormsg item">{{item.msg.js}}</p>
              </div>

            </div>
          </div>
        </div>
              <!--system-->
        <div class="info_box">
          <div class="systeam" :class="count == 1? '':'hide'">
            <div class="list_box">
              <div v-if="System">
                <div class="list">
                  <div class="index_ fl">1</div>
                  <div class="name fl">Name</div>
                  <div class="feta fl">Nature</div>
                </div>
                <div class="list">
                  <div class="index_ fl">2</div>
                  <div class="name fl">项目名称</div>
                  <div class="feta fl">{{System.project_name}}</div>
                </div>
                <div class="list">
                  <div class="index_ fl">3</div>
                  <div class="name fl">设定时间</div>
                  <div class="feta fl">{{System.set_time}}</div>
                </div>
                <div class="list">
                  <div class="index_ fl">4</div>
                  <div class="name fl">间隔运行</div>
                  <div class="feta fl">{{System.intervals == 1?'ON':'OFF'}}</div>
                </div>
                <div class="list">
                  <div class="index_ fl">5</div>
                  <div class="name fl">休息时间</div>
                  <div class="feta fl">{{System.rest_time}}</div>
                </div>
                <div class="list">
                  <div class="index_ fl">6</div>
                  <div class="name fl">运行时间</div>
                  <div class="feta fl">{{System.run_time}}</div>
                </div>
                <div class="list">
                  <div class="index_ fl">7</div>
                  <div class="name fl">设定次数</div>
                  <div class="feta fl">{{System.set_num}}</div>
                </div>
              </div>
            </div>
          </div>
<!--          <div class="step_" :class="topActive == 2? '':'hide'" style="display: none;">-->
<!--            <div class="set_box">-->
<!--              <div class="big_let fl">-->
<!--                <div class="set_left fl">-->
<!--                  <div class="top_title">-->
<!--                    <div class="num fl">Step.No</div>-->
<!--                    <div class="count fl">Conut</div>-->
<!--                    <img src="../../assets/img/add.png" alt>-->
<!--                  </div>-->
<!--                  <div class="list">-->
<!--                    <div class="Set_data">-->
<!--                      <div class="list_data fl">1</div>-->
<!--                      <div class="list_data fl right">-->
<!--                        <input type="number">-->
<!--                      </div>-->
<!--                    </div>-->
<!--                    <div class="Set_data">-->
<!--                      <div class="list_data fl">2</div>-->
<!--                      <div class="list_data fl right">-->
<!--                        <input type="number">-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class="bottom">-->
<!--                  <div>-->
<!--                    <el-button type="primary">确 定</el-button>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="big_rig fl">-->
<!--                <div class="set_right">-->
<!--                  <div class="top_title">-->
<!--                    <div class="num fl">Compose</div>-->
<!--                    <div class="count fl">Cycle</div>-->
<!--                    <img src="../../assets/img/add.png" alt>-->
<!--                  </div>-->
<!--                  <div class="list">-->
<!--                    <div class="Set_data">-->
<!--                      <div class="list_data fl">-->
<!--                        <select id="left">-->
<!--                          <option value="1">1</option>-->
<!--                        </select>-->
<!--                        ——-->
<!--                        <select id="right">-->
<!--                          <option value="1">1</option>-->
<!--                        </select>-->
<!--                      </div>-->
<!--                      <div class="list_data fl right">-->
<!--                        <input type="number">-->
<!--                      </div>-->
<!--                    </div>-->
<!--                    <div class="Set_data">-->
<!--                      <div class="list_data fl">-->
<!--                        <select id="left">-->
<!--                          <option value="1">1</option>-->
<!--                        </select>-->
<!--                        ——-->
<!--                        <select id="right">-->
<!--                          <option value="1">1</option>-->
<!--                        </select>-->
<!--                      </div>-->
<!--                      <div class="list_data fl right">-->
<!--                        <input type="number">-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class="bottom">-->
<!--                  <div>-->
<!--                    <el-button type="primary">确 定</el-button>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
        </div>
        <div class="order_bottom">
          <div class="order_info_">
            <img src="../../assets/img/add.png" alt="" v-on:click="addZhiling()">
          </div>
          <div class="setorder">
            <div class="list_item">
              <div class="stem fl">Step No</div>
              <div class="yingshe fl">硬件映射</div>
              <div class="orders fl">指令</div>
              <div class="set_order fl">指令设置</div>
              <div class="kong fl"></div>
              <div class="unit fl">单位</div>
              <div class="max fl">Max</div>
              <div class="min fl">Min</div>
              <div class="time fl">Timeout(ms)</div>
              <div class="time fl">操作</div>
            </div>
            <div class="list_item table_list_item" v-for="(val,index) in zhiling" :key="index">
              <div class="stem fl">{{index}}</div>
              <div class="yingshe fl" v-on:click="select_yingshe(index)">
                <div class="One_yingshe"><span v-if="val.mapping">{{val.mapping.content}}</span></div>
                <div class="content_list" :class="ischck_yingshe == index?'':'hide'">
                    <ul>
                      <li v-for="(zhival,botIndex) in yuYings" class="1" v-on:click="changeYingshe(index,botIndex)">{{zhival.content}}</li>
                      <li v-for="(yings,inx) in val.arr" class="2" v-on:click="changeYingshe(index,inx)">{{yings.content}}</li>
                    </ul>
                </div>
<!--                <select name class="aa" id="select_yingshe" v-on:click="select_yingshe" @change="select_ling($event,index)">-->
<!--&lt;!&ndash;                  默认显示&ndash;&gt;-->
<!--                  <option name="baaa" :id="val.mapping.id" :value="val.mapping.content">{{val.mapping.content}}</option>-->
<!--&lt;!&ndash;                    先点击映射&ndash;&gt;-->
<!--                  <option  :name="botIndex" :id="zhival.id" v-for="(zhival,botIndex) in yuYings" :key="botIndex">{{zhival.content}}</option>-->
<!--                </select>-->
              </div>
              <div class="orders fl"v-on:click="select_zLaa(index)">


                <div class="One_yingshe" v-if="val.order_name">{{val.order_name.name}}</div>
                <div class="content_list" :class="ischeck_zhiling == index?'':'hide'">
                  <ul>
                    <li v-for="(zhival,botIndex) in zhiLing" v-on:click="changeOrder(index,botIndex)">{{zhival.name}}</li>
                  </ul>
                </div>


<!--                <select name id  @change="changeZhil($event,index)" @click="select_zLaa">-->
<!--&lt;!&ndash;                  默认显示&ndash;&gt;-->
<!--                  <option v-show="val.order_name" :value="val.order_name.name">{{val.order_name.name}}</option>-->
<!--&lt;!&ndash;                  选择映射之后&ndash;&gt;-->
<!--                  <option :value="zhival.name" :name="botIndex" v-for="(zhival,botIndex) in zhiLing" :key="botIndex">{{zhival.name}}</option>-->
<!--                </select>-->
              </div>
              <div class="set_order fl">
                <input
                  type="text"
                  placeholder="请输入指令的设置"
                  v-model="val.order_set"
                >
              </div>
              <div class="kong fl">
                <span v-on:click="checked_dw(index)">
                  <i class="el-icon-check" :class="val.switch==true?'':'hide'"></i>
                </span>
              </div>
              <div class="unit fl" v-on:click="select_unit(index)">
<!--                <select name id="abc"  @change="changeunit($event,index)">-->
<!--                  <option :id="val.units.id" :value="val.units.name">{{val.units.name}}</option>-->
<!--                  <option :id="item.id" v-for="(item,num) in yu" :value="item.name" :key="num">{{item.name}}</option>-->
<!--                </select>-->

                <div class="One_yingshe" v-if="val.unit" >{{val.unit.name}}</div>
                <div class="content_list" :class="ischeck_unit == index?'':'hide'">
                  <ul>
                    <li v-for="(item,num) in yu" v-on:click="changeUnit(index,num)">{{item.name}}</li>
                  </ul>
                </div>
              </div>
              <div class="max fl">
                <input
                  type="text"
                  v-model="val.max"
                  @blur="set_max(index,$event)"
                  :disabled="!val.switch"
                >
              </div>
              <div class="min fl">
                <input
                  type="text"
                  v-model="val.min"
                  @blur="set_min($event,index)"
                  :disabled="!val.switch"
                >
              </div>
              <div class="time fl">
                <input
                  type="text"
                  v-model="val.time_out"
                  @blur="set_time(index,$event)"
                  :disabled="!val.switch"
                >
              </div>
              <div class="stem fl deleteZ" v-on:click="deleteZL(index,val.id)">删除</div>
            </div>
          </div>
          <div class="bottom_box">
            <el-button type="primary" v-on:click="send_data">确定</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import XLSX from "xlsx";
export default {
  props:{
    System:{},
    zhiling:{
      type: Array
    },
    yu:{
      type:Array
    },
    PARTID:{

    }
  },
  name: "Operandmain",
  data() {
    return {
      ReaderList: [],
      outputs: [],
      topActive:1,
      ceshia:[],
      ischck_yingshe:-1,
      a:1,
      c:1,
      b:1,
      ischeck_zhiling:-1,
      ischeck_unit:-1,
      // zhiYing:[],




      yuYings:[],             //先点击映射
      select_sendA:false,      //选择请求方式
      select_sendB:false,      //选择请求方式
      zhiLing:[]
    };
  },
  computed:{
    count(){
      return this.$store.state.topActive
    }
  },
  methods: {
    readExcel(e) {
      //父级的导入  C:\Users\kf\Desktop
      //表格导入
      var that = this;
      // const files = e.target.files;
      // console.log(files);
      // if (files.length <= 0) {
      //   //如果没有文件名
      //   return false;
      // } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
      //   this.$Message.error("上传格式不正确，请上传xls或者xlsx格式");
      //   return false;
      // }

      //console.log(that.$refs.upload.files); //文件名称

      // const fileReader = new FileReader();
      // fileReader.onload = ev => {
      //   try {
      //     const data = ev.target.result;
      //     const workbook = XLSX.read(data, {
      //       type: "binary"
      //     });
      //     const wsname = workbook.SheetNames[0]; //取第一张表
      //     const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容
      //     console.log(ws);
      //     that.ReaderList = ws;
      //     that.outputs = []; //清空接收数据
      //     for (var i = 0; i < ws.length; i++) {
      //       var sheetData = {
      //         address: ws[i].addr,
      //         value: ws[i].value
      //       };
      //       that.outputs.push(sheetData);
      //     }
      //     this.$refs.upload.value = "";
      //   } catch (e) {
      //     return false;
      //   }
      // };
      // fileReader.readAsBinaryString(files[0]);
// -----------------------------------------------------------
      var files = $('#file').prop('files')
      var reader = new FileReader();//新建一个FileReader
      console.log(files)
      reader.readAsText(files[0], "UTF-8");//读取文件
      reader.onload = function(evt) { //读取完文件之后会回来这里
        var fileString = evt.target.result; // 读取文件内容
        console.log(fileString)


        var xmlDoc = null;
        if (window.DOMParser) {
          var parser = new DOMParser();
          xmlDoc = parser.parseFromString(fileString, "text/xml");
        } else {
          //IE
          xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
          xmlDoc.async = "false";
          xmlDoc.loadXML(fileString);
        }
        console.log(xmlDoc)
        $(xmlDoc).find("Instruction").each(function(i)
          {
            var lower = $(this).children("order").text();
            var upper = $(this).children("explain").text();
            ///后续操作。。。
            that.ceshia.push({
              msg:{
                order:`${lower}`,
                js:`${upper}`
              }
            })
          });
      }
// -----------------------------------------------------------------------
//       console.log( $("#file")[0].files)
//       //   let urls = $('#file').val()
//       // console.log(urls)
//       // var that = this
//       $.ajax({
//         url: `../../../static/data/Instructionset.xml`,
//         dataType: 'xml',
//         type: 'GET',
//         timeout: 2000,
//         error: function(xml)
//         {
//           console.log(xml)
//           alert("加载XML 文件出错！");
//         },
//         success: function(xml)
//         {
//           console.log(xml)
//           $(xml).find("Instruction").each(function(i)
//           {
//             var lower = $(this).children("order").text();
//             var upper = $(this).children("explain").text();
//             ///后续操作。。。
//             that.ceshia.push({
//               msg:{
//                 order:`${lower}`,
//                 js:`${upper}`
//               }
//             })
//           });
//           console.log(that.ceshia)
//         }
//       });
    },

    // 请求余下单位
    select_unit(index){
      this.b++;
      if(this.b %2 == 0){
        this.ischeck_unit = index
      }else{
        this.ischeck_unit = -1
      }
    },




//根据脚本获取全部映射和对应的指令
    select_yingshe(index){
      // 控制显示隐藏
      this.a++
      if(this.a%2 == 0){
        this.ischck_yingshe = index
      }else{
        this.ischck_yingshe = -1
        console.log(1231132313)
      }
// ------------------
      if(this.select_sendA){
        return
      }else{
        this.select_sendB = true
      }
      var that = this
      this.$axios({
        method: "get",
        url: `sel_mappings/?script_id=${that.$store.state.scriptID}`,
      })
        .then(res => {
          console.log(res.data);
          this.yuYings = res.data
        })
        .catch(err => {
          console.log(err);
        });
    },
    //选择脚本之后的选择指令
    select_ling(e,index){
      let select_id = $("#select_yingshe option:checked").attr("id");
      this.$emit('selectScriptYING',select_id,index)
      if(this.select_sendA){
        return
      }else{
        this.select_sendB = true
      }
        for(var i = 0;i<this.yuYings.length;i++){
          if(e.target.value == this.yuYings[i].content){
            this.zhiling[index].order_name.name =  this.yuYings[i].order;
            this.$emit('seleceYingshe',e.target.value,this.yuYings[i].id,index)
          }
        }
    },

    // 改变映射
    changeYingshe(index,index2){
      this.ischck_yingshe = -1
      if(this.zhiling[index].arr.length<1){
        if(this.zhiling[index].mapping == null){
          this.zhiling[index].mapping={content:null,id:null,}
          this.zhiling[index].mapping.content = this.yuYings[index2].content
          this.zhiling[index].mapping.id = this.yuYings[index2].id
        }else{
          console.log(this.yuYings[index2].content)
          this.zhiling[index].mapping.content = this.yuYings[index2].content
          this.zhiling[index].mapping.id = this.yuYings[index2].id
        }
      }else{

        if(this.zhiling[index].mapping == null){
          this.zhiling[index].mapping={content:null,id:null,}
          this.zhiling[index].mapping.content = this.zhiling[index].arr[index2].content
          this.zhiling[index].mapping.id = this.zhiling[index].arr[index2].id
        }else{
          this.zhiling[index].mapping.content = this.zhiling[index].arr[index2].content
          this.zhiling[index].mapping.id = this.zhiling[index].arr[index2].id
        }
      }

      // this.$emit('seleceYingshe',this.yuYings[index2].content,this.yuYings[index2].id,index)
    },

    // 改变指令
    changeOrder(index,index2){
      this.ischeck_zhiling = -1;
      console.log(this.zhiling[index].order_name.name)
      this.zhiling[index].order_name.name  = this.zhiLing[index2].name
      this.zhiling[index].order_name.id  = this.zhiLing[index2].id


      var that = this
      this.$axios({
        method: `get`,
        url: `/sel_orders/?order_name=${this.zhiLing[index2].name}&script_id=${this.$store.state.scriptID}`,
      })
        .then(res => {
          console.log(res.data)
          // this.zhiYing = res.data
          this.zhiling[index].arr =  res.data
          if(this.zhiling[index].mapping == null){
            this.zhiling[index].mapping={content:null,id:null,}
          }
          if(this.zhiling[index].arr.length <1){
            this.zhiling[index].mapping.content = null
            this.zhiling[index].mapping.id = null
          }else{
            this.zhiling[index].mapping.content = this.zhiling[index].arr[0].content
            this.zhiling[index].mapping.id = this.zhiling[index].arr[0].id
          }
          console.log(this.zhiling)
          // if(res.data.length <1){
          //   this.zhiling[index].mapping1 = null
          // }
          // this.$emit('selectaa',e.target.value,index)
        })
        .catch(err => {
          console.log(err);
        });

    },
    // 改变单位
    changeUnit(index,index2){
      if(this.zhiling[index].unit == null){
        this.zhiling[index].unit = {}
        this.zhiling[index].unit = {name:this.yu[index2].name,id:this.yu[index2].id}

      }else{
        this.zhiling[index].unit.name  = this.yu[index2].name
        this.zhiling[index].unit.id  = this.yu[index2].id
      }
    },


    // 选择指令之后啊

    select_zLaa(index){
      this.c++;
      if(this.c%2 == 0){
        this.ischeck_zhiling = index
      }else{
        this.ischeck_zhiling = -1
      }
      if(this.select_sendB){
        return
      }else{
        this.select_sendA = true
        var that = this
        this.$axios({
          method: "get",
          url: `/order_names/`,
        })
          .then(res => {
            console.log(res.data)
            this.zhiLing = res.data
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

     //选择指令  请求映射
    changeZhil(e,index){
      var that = this
      if(this.select_sendB){
        return
      }else{
        this.select_sendA = true
        console.log(this.select_sendA)
        var that = this
        this.$axios({
          method: `get`,
          url: `/sel_orders/?order_name=${e.target.value}&script_id=${this.$store.state.scriptID}`,
        })
          .then(res => {
            console.log(res.data)
            // this.yuYings = res.data
            // if(res.data.length <1){
            //   this.zhiling[index].mapping1 = null
            // }
            // this.$emit('selectaa',e.target.value,index)
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

















    select_zhilingPart(index){
      console.log('我在这里'+index)
    },

    // 拷贝修改
    Check_tab(num) {
      this.topActive = num;
      this.$store.commit('CHANGE_STATE',this.topActive);
    },


    // 删除指令
    deleteZL(index,id){
      console.log(index,id)
      this.$emit('delteZL',index,id)
    },


    // 指令设置
    set_order(index,e){
      this.$emit('change_order',index,e.target.value);
    },

    // MAX设置
    set_max(index,e){
      console.log(e.target.value)
      // this.$emit('change_MAX',e.target.value,index);
    },
    //min设置
    set_min(e,index){
      console.log(e.target.value)
      // this.$emit('change_MIN',index,e.target.value);
    },
    // 延时设置
    set_time(index,e){
      // this.$emit('change_TIME',index,e.target.value);
    },
    // 指令设置
    changezhiling(event,index){
      console.log(event.target); //获取商品ID，即option对应的ID值
      // this.$emit("CHANGE_CART",index,event.target.value)
    },
    // 单位设置
    changeunit(event,index){
      console.log(index)
      console.log(event.target.value); //获取商品ID，即option对应的ID值
      let select_id = $("#abc option:checked").attr("id"); //获取商品ID，即option对应的ID值\\
      this.$emit("CHANGE_UNIT",index,select_id )
    },
    send_data(){
      // console.log(this.zhiling)
      this.$emit('SEND_DATA',this.zhiling);
},
    // 添加指令
    addZhiling(){
      this.$emit('ADD_ZHILING',);
    },
    // 是否选中
    checked_dw(index){
      this.$emit('CHECKED_DW',index);
    }

  },
  mounted() {
      this.$refs.upload.addEventListener("change", e => {
      //绑定监听表格导入事件
      this.readExcel(e);
    });
  },
  watch:{
    zhiling(newValue,oldValue) {
      console.log(newValue)
    },
  }
};
</script>
<style lang='scss' scoped>
@import "../../assets/style/clear.scss";
.operan {
  width: 100%;
  height: 100%;
  color: #02f6ff;
  font-size: 0.22rem;
  .order {
    .part {
      height: 0.4rem;
      position: relative;
      overflow: hidden;
      /*img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: -0.1rem;
        left: -0.2rem;
        z-index: 0;
      }
      div {
        position: relative;
        z-index: 1;
        padding-left: 0.2rem;
        line-height: 0.2rem;
        box-sizing: border-box;
        font-size: 0.22rem;
      }*/
      .timing {
        font-size: 0.17rem;
        color: #02f6ff;
        .tab_box {
          margin-bottom: 0.22rem;
          @extend %clearfix;
          color: #0d6977;
          background-image: url("../../assets/img/system.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          width: 2.55rem;
          background-position-x: -0.2rem;
          background-position-y: -0.1rem;
          .option_one {
            width: 50%;
            height: 0.4rem;
            line-height: 0.2rem;
            padding-left: 0.2rem;
            box-sizing: border-box;
            cursor: pointer;
          }
          .option_two {
            width: 50%;
            height: 0.4rem;
            line-height: 0.2rem;
            padding-left: 0.1rem;
            box-sizing: border-box;
            cursor: pointer;
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
              height: 5.59rem;
              max-height: 5.59rem;
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
                      }
                      .num {
                        width: 50%;
                        height: 0.43rem;
                        line-height: 0.43rem;
                        text-align: center;
                      }
                      .count {
                        width: 50%;
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
                      }
                      .num {
                        width: 60%;
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
                          width: 60%;
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

    }

    width: 100%;
    height: 100%;
    .big_order {
      padding: 0.22rem 0.41rem 0.2rem 0.17rem;
      box-sizing: border-box;

      /*part*/
      .order_top {
        width: 100%;
        height: 4.38rem;
        border: 1px solid #1e2d71;
        margin-bottom: 0.24rem;
        &.hide{
          display: none;
        }
        .title {
          width: 100%;
          height: 0.43rem;
          background: url("../../assets/img/step_bg.png");
          background-size: 100% 100%;
          position: relative;
          p {
            line-height: 0.43rem;
            height: 100%;
            padding-left: 0.77rem;
            box-sizing: border-box;
          }
          .req {
            width: 0.29rem;
            height: 0.27rem;
            position: absolute;
            right: 0.16rem;
            top: 50%;
            transform: translateY(-50%);
            .outputlist_upload {
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              opacity: 0;
            }
          }
        }
        .content_box {
          width: 100%;
          max-height: 3.94rem;
          overflow: auto;
          .list_item {
            height: 0.53rem;
            @extend %clearfix;
            text-align: center;
            .or {
              width: 20%;
              height: 100%;
              line-height: 0.53rem;
              border-right: 1px solid #1e2d71;
              border-bottom: 1px solid #1e2d71;
              box-sizing: border-box;
            }
            .ormsg {
              width: 80%;
              height: 100%;
              line-height: 0.53rem;
              border-bottom: 1px solid #1e2d71;
              box-sizing: border-box;
            }

            .item {
              color: #7785c3;
            }
          }
        }
      }


      /*table----system*/
      .info_box {
        width: 100%;
        .systeam {
          &.hide {
            display: none;
          }

          width: 100%;
          .list_box {
            width: 100%;
            height: 4.38rem;
            max-height: 4.38rem;
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
          height: 5.59rem;
          max-height: 5.59rem;
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
                  }
                  .num {
                    width: 50%;
                    height: 0.43rem;
                    line-height: 0.43rem;
                    text-align: center;
                  }
                  .count {
                    width: 50%;
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
                  }
                  .num {
                    width: 60%;
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
                      width: 60%;
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



      .order_bottom {
        width: 100%;
        height: 3.98rem;
        // border-left: 1px solid #1e2d71;
        // border-right: 1px solid #1e2d71;
        // background: skyblue;
        box-sizing: border-box;
        .order_info_ {
          width: 100%;
          height: 0.43rem;
          background: url("../../assets/img/step_bg.png");
          background-size: 100% 100%;
          position: relative;
          img{
            position: absolute;
            display: block;
            width: 0.25rem;
            height:0.25rem;
            right: .3rem;
            top:.12rem;
            cursor: pointer;
          }
        }
        .setorder {
          width: 100%;
          max-height: 3.54rem;
          height: 3.54rem;
          overflow: auto;
          border-left: 1px solid #1e2d71;
          border-right: 1px solid #1e2d71;
          box-sizing: border-box;
          .list_item {
            @extend %clearfix;
            .fl {
              height: 0.53rem;
              line-height: 0.53rem;
              text-align: center;
              border-right: 1px solid #1e2d71;
              border-bottom: 1px solid #1e2d71;
              box-sizing: border-box;
              font-size: 0.14rem;
            }
            .stem {
              width: 10%;
            }
            .orders {
              width: 15%;
              position: relative;
              .content_list{
                position: absolute;
                width: 100%;
                top: 0.53rem;
                left: 0;
                z-index: 999;
                height: 2.4rem;
                overflow: hidden;
                ul{
                  width: 100%;
                  height: 2.4rem;
                  overflow: auto;
                  background: steelblue;
                  li{
                    border-bottom: 1px solid skyblue;
                    cursor: pointer;
                  }
                }
                &.hide{
                  display: none;
                }
              }
            }
            .yingshe{
              width: 10%;
              position: relative;
              .One_yingshe{
                width: 100%;
              }
             .content_list{
               position: absolute;
               width: 100%;
               top: 0.53rem;
               left: 0;
               z-index: 999;
               height: 2.4rem;
               overflow: hidden;
               ul{
                 width: 100%;
                 height: 2.4rem;
                 overflow: auto;
                 background: steelblue;
                 li{
                   border-bottom: 1px solid skyblue;
                 }
               }
               &.hide{
                 display: none;
               }
             }

            }
            .set_order {
              width: 20%;
              input {
                background: #0c1127;
                border: 0;
                outline: none;
                color: #7785c3;
                text-align: center;
              }
              ::-webkit-input-placeholder {
                color: #7785c3;
              }
            }
            .kong {
              width: 5%;
              position: relative;
              span {
                width: 0.2rem;
                height: 0.2rem;
                border: 2px solid #02f6ff;
                display: block;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                position: absolute;
                i {
                  font-size: 0.24rem;
                  position: absolute;
                  top: 0;
                  left: -2px;
                  &.hide {
                    display: none;
                  }
                }
              }
            }
            .unit {
              width: 10%;
              position: relative;
              .One_yingshe{
                width: 100%;
              }
              .content_list{
                position: absolute;
                width: 100%;
                top: 0.53rem;
                left: 0;
                z-index: 999;
                height: 2.4rem;
                overflow: hidden;
                ul{
                  width: 100%;
                  height: 2.4rem;
                  overflow: auto;
                  background: steelblue;
                  li{
                    border-bottom: 1px solid skyblue;
                  }
                }
                &.hide{
                  display: none;
                }
              }
            }

            .max {
              width: 5%;
              input{
                width: 100%;
                height:100%;
                text-align: center;
                border: 0;
                background: transparent;
                outline: none;
                color:#02f6ff;
              }
            }
            .min {
              width: 5%;
              input{
                width: 100%;
                height:100%;
                text-align: center;
                border: 0;
                background: transparent;
                outline: none;
                color:#02f6ff;
              }
            }
            .time {
              width: 10%;
              input{
                width: 100%;
                height:100%;
                text-align: center;
                border: 0;
                background: transparent;
                outline: none;
                color:#02f6ff;
              }
            }
            .deleteP{
              width: 10%;
              border-right: none;
              input{
                width: 100%;
                height:100%;
                text-align: center;
                border: 0;
                background: transparent;
                outline: none;
                color:#02f6ff;
              }
            }
            .deleteZ{
              cursor: pointer;
            }
          }
        }
        .bottom_box {
          width: 100%;
          height: 0.58rem;
          background: #1e2d71;
          position: relative;
          .el-button {
            width: 1.19rem;
            position: absolute;
            right: 0.27rem;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
  }
}
</style>
