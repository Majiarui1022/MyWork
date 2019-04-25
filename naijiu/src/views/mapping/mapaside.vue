<template>
  <div class="aside_box">
    <div class="content-box">
      <div class="jb">接口定义</div>
      <div class="select_box">
        <div class="select fl" @click="totas">
          <span>{{bigList[isdefaultName].name}}</span>
          <!-- <input type="text" :class="editINput? '':'hide'" v-model="Add_name" id="focus"> -->
          <img class="right" src="../../assets/img/right_down.png" alt>
        </div>
        <div class="reset fl" @click="add_name">
          <img src="../../assets/img/add.png" alt>
        </div>
      </div>
      <div class="select_list">
        <div class="subtitle" :class="isbig ? '':'hide'">
          <p class="fl">模块</p>
          <p class="fl">代号</p>
        </div>
        <div class="list_item" :class="isbig ? 'hide':''">
          <p v-for="(item,index) in bigList" @click="Getpart(item.id,index)">{{item.name}}</p>
        </div>

        <ul :class="isbig ? '':'hide'">
          <li v-if="ExecutorList.length>0">
            <span class="one fl">{{ExecutorList[ischeck_exe].name}}</span>
            <span class="two fl">
              <div @dblclick="Release">
                <input
                  type="text"
                  :disabled="dsable"
                  v-model="ExecutorList[ischeck_exe].code"
                  @keyup.enter="EditExe(ExecutorList[ischeck_exe].id,$event,ExecutorList[ischeck_exe].name,ischeck_exe)"
                >
              </div>
              <span style="position: absolute;right: .4rem" v-on:click="remoceExe(ExecutorList[ischeck_exe].id,ischeck_exe)">2</span>
            </span>
          </li>
<!--          item.mode_id-->
          <li
            v-for="(item,index) in ModeList"
            v-if="ModeList.length>0"
          >
            <span class="one fl">{{item.name}}</span>
            <span class="two fl">
              <div @dblclick="Release">
                <input
                  type="text"
                  :disabled="dsable"
                  @keyup.enter="EditMode(item.id,$event,index)"
                  v-model="item.code"
                >
              </div>
              <span v-on:click="removeMOde(ModeList[index].id,index)" style="position: absolute;right: .4rem">2</span>
            </span>
          </li>
        </ul>
        <div class="color"></div>
      </div>
      <!-- 执行器 -->
      <div class="container">
        <div class="exe">执行器</div>
        <div class="select_box">
          <div class="slect_title fl" @click="ShowexeList">
            <span v-if="ExecutorList.length>0">{{ExecutorList[ischeck_exe].name}}</span>
            <img src="../../assets/img/right_down.png" alt>
          </div>
          <div class="chioce fl">
            <input type="file" ref="upload" accept=".xml" @change="executorListchange" id="file_executor" class="outputlist_upload">
            <img src="../../assets/img/file.png" alt>
          </div>
          <div class="exe_list" :class="isexe ? '':'hide'">
            <p v-for="(item,index) in ExecutorList" v-on:click="changezhixngq(index)">{{item.name}}</p>
          </div>
        </div>
        <div class="exe">模块</div>
        <div class="select_box">
          <div class="slect_title fl" @click="showmoudle">
            <span v-if="ModeList.length>0">{{ModeList[ischeck_mode].name}}</span>
            <img src="../../assets/img/right_down.png" alt>
          </div>
          <div class="chioce fl">
            <img src="../../assets/img/file.png" alt>
            <input type="file" id="file_Mode" ref="upload_child" @change="ModeListchange"  accept=".xml" class="outputlist_upload">
          </div>
          <div class="exe_list" :class="ismoudle ? '':'hide'">
            <p v-for="(item,index) in ModeList" :key="item.id" v-on:click="changeMode(index)">{{item.name}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mapaside",
  props: {
    bigList: {
      type: Array
    },
    ExecutorList: {
      type: Array,
    },
    ModeList: {
      type: Array,
    },
  },
  data() {
    return {
      outputs: [],
      outputs_child: [],
      isbig: true,
      dsable: true,
      Dh: "",
      focusStatus: false,
      isdefaultName: 0, //默认显示的脚本名称
      isexe: false, //是否显示执行器
      ismoudle: false, //是否显示模块
      ischeck_exe: 0, //默认显示执行器第一个
      ischeck_mode: 0,
      isActive_exe: "", //选中时的样式
      isActivemode: "",
      dont:true,  //控制能否上传文件
    };
  },
  created(){
  },
  methods: {
    readExcel() {
      let that = this
      var files = $('#file_executor').prop('files')
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
        console.log(xmlDoc);
          let arr = []
        $(xmlDoc).find("Interfaces").each(function(i)
        {
          var lower = $(this).children("Interface").text();
          var upper = $(this).children("Interface_num").text();
          var order = $(this).children("category").text();
            arr.push({
              id:null,
              content:null,
              interface:lower,
              interface_num:upper,
              remark:'',
              order:order,
              hardware:''
            })

        });
        console.log(arr)
        that.ExecutorList.push({
          id:null,
          name:$(xmlDoc).children('PLC').children('actuator').children('name').text(),
          code:'',
          category:0,
          mappings:arr
        })
       console.log(that.ExecutorList)
        that.$emit('changeZhi',that.ExecutorList)

      }

    },
    readChildExcel() {


      let that = this
      var files = $('#file_Mode').prop('files')
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
        console.log(xmlDoc);
        let arr = []
        $(xmlDoc).find("Interfaces").each(function (i) {
          var lower = $(this).children("Interface").text();
          var upper = $(this).children("Interface_num").text();
          var order = $(this).children("category").text();
          ///后续操作。。。
          arr.push({
            id: null,
            content: null,
            interface: lower,
            interface_num: upper,
            remark: '',
            order: order,
            hardware: ''
          })


        });
        console.log(arr)
        that.ModeList.push({
          id: null,
          name: $(xmlDoc).children('PLC').children('actuator').children('name').text(),
          code: '',
          category: 1,
          mappings: arr
        })
        console.log(that.ModeList)
        that.$emit('changeMode', that.ModeList)




      }
    },

    remoceExe(id,index){

      this.$emit('deleteEXE',id,index,)
    },

    //删除模块
    removeMOde(id,index){
      this.$emit('deleteModew',id,index)
    },

    Getpart(id,index) {
     this.$emit('alldata',id);
      this.isbig = true;
      this.isdefaultName = index;
    },

    ShowexeList() {
      //切换关闭显示执行器
        this.isexe = !this.isexe;

    },

    showmoudle() {
      //切换关闭模块
      this.ismoudle = !this.ismoudle;
    },

    add_name() {
      //新增大的脚本
      this.$store.commit("EDIT_NAME", true);
    },
    totas() {
      this.isbig = !this.isbig; //选择下拉框
    },

    Release() {
      //双击显示修改
      this.dsable = false;
    },

    EditExe(id,e,words,index) {   //修改执行器代号
      console.log('我进来了',e.target.value)
      this.$emit('EditExecutor',id,e.target.value,index);
      this.dsable = true;
    },
    EditMode(id,e,index) {
      this.$emit('EditModes',id,e.target.value,index);
      this.dsable = true;
    },

    // 更换执行器
    changezhixngq(index){
      this.ischeck_exe = index
      this.isexe = !this.isexe;
      this.$store.commit('SELECTEXEID',index);
      console.log('这是下标啊啊啊啊啊啊'+index)
      this.$emit('startzhixing',index)
    },
    // 选择模块
    changeMode(index){
      this.ischeck_mode = index;
      this.ismoudle = !this.ismoudle;
    },
    executorListchange(){
      console.log('出发了')
      this.readExcel();
    },
    ModeListchange(){
      console.log('模块出发了')
      this.readChildExcel();
    }

  },
  mounted() {
  },
  watch:{
    ExecutorList(newValue,oldValue) {
      console.log(newValue)
      console.log('监听啊啊111');
      this.ischeck_exe  =  this.$store.state.indexap
    },
    ModeList(newValue){
        console.log(newValue)
    }
  }
};
</script>
<style lang='scss' scoped>
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
      span {
        &.hide {
          display: none;
        }
      }
      input {
        width: 90%;
        height: 100%;
        outline: none;
        border: 0;
        position: absolute;
        top: 0;
        left: 0;
        background: transparent;
        padding-left: 0.2rem;
        box-sizing: border-box;
        color: #02f6ff;
        font-size: 0.24rem;
        &.hide {
          display: none;
        }
      }
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
      background: linear-gradient(
        0deg,
        rgba(20, 117, 121, 1) 0%,
        rgba(14, 20, 44, 1) 49%,
        rgba(20, 117, 121, 1) 100%
      );
      opacity: 0.78;
      position: relative;
      img {
        width: 0.3rem;
        height: 0.3rem;
        top: 50%;
        left: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
        display: block;
      }
    }
  }

  .select_list {
    width: 100%;
    max-height: 3.02rem;
    height: 3.02rem;
    position: relative;
    background: rgba(2, 246, 255, 0.2);
    margin-bottom: 0.36rem;
    .subtitle {
      @extend %clearfix;
      width: 100%;
      &.hide {
        display: none;
      }
      p {
        height: 0.48rem;
        line-height: 0.48rem;
        font-size: 0.24rem;
        color: #7fb0c1;
        width: 50%;
        text-align: center;
      }
    }
    .list_item {
      width: 100%;
      height: 2.61rem;
      max-height: 2.61rem;
      overflow: auto;
      color: #02f6ff;
      font-size: 0.24rem;
      p {
        padding: 0.1rem 0.1rem;
        box-sizing: border-box;
      }
      &.hide {
        display: none;
      }
    }

    ul {
      width: 100%;
      @extend %clearfix;
      &.hide {
        display: none;
      }
      li {
        font-size: 0.2rem;
        color: #02f6ff;
        height: 0.5rem;
        line-height: 0.5rem;
        position: relative;
        &.checkActive {
          background: #2d408a;
        }

        .one {
          width: 50%;
          display: inline-block;
          padding-left: 0.12rem;
          box-sizing: border-box;
        }
        .two {
          width: 50%;
          height: 100%;
          display: inline-block;
          text-align: center;
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
            input {
              width: 100%;
              height: 100%;
              outline: none;
              border: 0;
              background: transparent;
              color: #02f6ff;
              display: block;
              padding-left: 0.1rem;
              box-sizing: border-box;
            }
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

  .container {
    width: 100%;
    .exe {
      width: 1.77rem;
      height: 0.44rem;
      line-height: 0.44rem;
      padding-left: 0.14rem;
      box-sizing: border-box;
      color: #fff;
      font-size: 0.2rem;
      background: linear-gradient(
        90deg,
        rgba(31, 178, 204, 1) 0%,
        rgba(11, 18, 39, 0.44) 100%
      );
      margin-bottom: 0.36rem;
    }

    .select_box {
      width: 100%;
      font-size: 0.24rem;
      color: #02f6ff;
      height: 0.42rem;
      line-height: 0.42rem;
      margin-bottom: 0.39rem;
      position: relative;
      .exe_list {
        width: 100%;
        height: 2rem;
        max-height: 2rem;
        overflow: auto;
        background: #093f51;
        position: absolute;
        z-index: 10;
        top: 0.42rem;
        p {
          padding: 0.1rem 0.1rem;
          box-sizing: border-box;
        }
        &.hide {
          display: none;
        }
      }
      .slect_title {
        width: 4.62rem;
        height: 100%;
        background-image: url("../../assets/img/side_down.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        padding-left: 0.16rem;
        box-sizing: border-box;
        position: relative;
        img {
          width: 0.23rem;
          height: 0.13rem;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 0.17rem;
        }
      }

      .chioce {
        width: 0.43rem;
        height: 100%;
        position: relative;
        background: linear-gradient(
          0deg,
          rgba(20, 117, 121, 1) 0%,
          rgba(14, 20, 44, 1) 49%,
          rgba(20, 117, 121, 1) 100%
        );
        opacity: 0.78;
        img {
          width: 0.28rem;
          height: 0.24rem;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: block;
        }
        input {
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 1;
          opacity: 0;
        }
      }
    }
  }
}
</style>
