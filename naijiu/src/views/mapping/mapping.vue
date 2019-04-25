<template>
  <el-container>
    <el-aside>
      <asideTime
        :bigList="bigList"
        :ExecutorList="ExecutorList"
        :ModeList="ModeList"
        @changeZhi="changeZhi"
        @EditExecutor="EditExecutor"
        @changeMode="changeMode"
        @EditModes="EditModes"
        @startzhixing="startzhixing"
        @alldata="alldata"
        @deleteEXE="deleteEXE"
        @deleteModew="deleteModew"
      ></asideTime>
    </el-aside>
    <el-main>
      <mappingmain
        :Interface="Interface.Executor"
        :Interfaces="Interface.Mode"
        :executorS="executorS"
        @sendData="sendData"
      ></mappingmain>
    </el-main>
    <mappedit
      :bigList="bigList"
      @aaaaaaaaaa="aaaaaaaaaa"
    ></mappedit>
  </el-container>
</template>

<script>
import asideTime from "./mapaside";
import mappingmain from "./mappmain";
import mappedit from "./edit";
import { Loading } from 'element-ui';
export default {
  name: "mapping",
  components: {
    asideTime,
    mappingmain,
    mappedit,
    allList:{}
  },
  inject:['reload'],
  data() {
    return {
      bigList: [{}], //大的脚本名字
      ExecutorList: [], //执行器的数据
      ModeList: [], //模块的数据
      Interface: {
        Executor:[],
        Mode:[],
      }, //接口数据
      executorS:[],
      loadingInstance:''
    };
  },
  beforeCreate(){
  },
  created() {
    // this.getBigScript();
    this.getScript()
    // this.loadingInstance = Loading.service({ text: '玩命加载中...' });
  },
  mounted(){
    // this.loadingInstance.close();
  },
  methods: {

    getScript(){
      let that = this;
      this.$axios({
        //获取大的脚本
        method: "get",
        url: "scripts/"
      })
        .then(res => {
          console.log(res.data);
          this.bigList = res.data
          // this.allDatas(res.data[0].id)
          this.alldata(res.data[0].id)
        })
        .catch(err => {
          console.log(err);
        });
    },

    alldata(id){
      this.$axios({
        method: "get",
        url: `/inter_maps/${id}/`
      })
        .then(res => {

          this.allList = {}
          this.ExecutorList=[]
          this.ModeList = []
          this.Interface.Mode=[]
          this.Interface.Executor = []
          this.allList = Object.assign({},res.data)
          console.log(res.data)
          // let a = 0;
          this.executorS = []
          for(var i = 0;i<res.data.hardwares.length;i++){

            if(res.data.hardwares[i].category == 0){
              this.executorS.push(res.data.hardwares[i])
              this.ExecutorList.push(res.data.hardwares[i])
              this.Interface.Executor.push(res.data.hardwares[i])
              console.log(this.Interface.Executor)
            }else if(res.data.hardwares[i].category == 1){
              // a++
              this.ModeList.push(res.data.hardwares[i])
              this.Interface.Mode.push(res.data.hardwares[i])
              console.log(this.Interface.Mode)
            }
          }
          // if(a == res.data.hardwares.length){
          //   this.ExecutorList.push({
          //     category:0,
          //     code:null,
          //     id:null,
          //     mappings:[],
          //     name:null
          //   })
          // }

        })
        .catch(err => {
          console.log(err);
        });
    },
    // 删除执行器
    deleteEXE(id,index){
      if(id == null){
        this.$store.commit('INDEX_BIAO',0)
        this.Interface.Executor.splice(index,1)
        this.executorS = []
        if(this.Interface.Executor.length >0){
          this.executorS.push(this.Interface.Executor[0])
        }
        if(this.Interface.Executor.length <=0){
          this.reload()
          console.log(this.Interface.Executor.length)
        }

      }else{
        this.$axios({
          method: "delete",
          url: `/hardware/${id}`,
        })
          .then(res => {
            console.log(res.data);
            this.$store.commit('INDEX_BIAO',0)
            this.Interface.Executor.splice(index,1)
            console.log(this.Interface.Executor)
            this.executorS = []
            if(this.Interface.Executor.length >0){
              this.executorS.push(this.Interface.Executor[0])
            }
            if(this.Interface.Executor.length <=0){
              this.reload()
              console.log(this.Interface.Executor.length)
            }
          })
          .catch(err => {
            console.log(err);
          });
      }

    },
    //删除模块
    deleteModew(id,index){

      if(id == null){
        this.Interface.Mode.splice(index,1)
      }else{
        this.$axios({
          method: "delete",
          url: `/hardware/${id}`,
        })
          .then(res => {
            console.log(res.data);
            this.reload()
            this.Interface.Mode.splice(index,1)
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

    changeZhi(val){
      if(this.Interface.Executor.length < 1){
        this.executorS = val
      }
      this.Interface.Executor =val
      console.log(this.Interface.Executor)
      console.log(val)
    },


    aaaaaaaaaa(val,id){
      let that = this
      this.loadingInstance = Loading.service({ text: '玩命加载中...' });
      this.$axios({
          method: "post",
          url: `/cr_scripts/ `,
          data:{
            name:val,
            copy_script_id:id
          }
        })
          .then(res => {
            console.log(res.data);
            this.bigList.push(res.data)
            this.$store.commit('EDIT_NAME',false);
            that.loadingInstance.close();
          })
          .catch(err => {

            console.log(err);
          });
    },

    //
    // //获取对应脚本的数据
    // allDatas(id){
    //   this.$axios({
    //
    //     method: "get",
    //     url: `/inter_maps/${id}/`
    //   })
    //     .then(res => {
    //       console.log(res.data);
    //       this.ExecutorList = res.data.executor;    //执行器数据
    //       this.ModeList = res.data.modes
    //     })
    //     .catch(err => {

    //       console.log(err);
    //     });
    // },

    startzhixing(index){

      this.executorS = []
      this.executorS.push(this.ExecutorList[index])
      console.log(this.executorS)
    },

    sendData(exe,mode){
      console.log(exe)
      console.log(mode)
      let that = this
      this.loadingInstance = Loading.service({ text: '玩命加载中...' });
      this.allList.hardwares = []
        for(var i = 0; i<mode.length;i++){
          this.allList.hardwares.push(mode[i])
        }
        for(var j = 0; j<exe.length;j++){
          this.allList.hardwares.push(exe[j])
        }
      console.log(this.allList)
      this.$axios({
        method: "POST",
        url: `/inter_maps/`,
        data:this.allList
      })
        .then(res => {
          console.log(res.data);
          that.loadingInstance.close();
          this.reload()
        })
        .catch(err => {
          console.log(err);
          that.loadingInstance.close();
        });
    },








    // 添加新脚本
    // Add(msg) {
    //   let that = this
    //   let javascriptList = this.bigList;
    //   let flag = true;
    //   for (let index = 0; index < javascriptList.length; index++) {
    //     const element = javascriptList[index];
    //     if (element.name == msg) {
    //       flag = false;
    //     }
    //   }
    //   if (!flag) {
    //     return false;
    //   }
    //   this.bigList.push({
    //     name:msg
    //   })
    //   console.log(this.bigList)
    //   //这里是新增脚本的方法
    //   // this.$axios({
    //   //   method: "post",
    //   //   url: "create_script/",
    //   //   data: {
    //   //     script_name: msg
    //   //   }
    //   // })
    //   //   .then(res => {
    //   //     console.log(res.data);
    //   //   })
    //   //   .catch(err => {
    //   //     console.log(err);
    //   //   });
    // },

    // Getinter(data) {
    //   //用户上传的执行器数据
    //   console.log("用户上传的Executor数据");
    //   this.Interface.executor = data;
    // },
    // Upload_mode(data) {
    //   //用户上传的模块数据
    //   this.Interface.mode = data;
    // },


    changeMode(val){
      this.Interface.Mode = val
    },
    //修改执行器的代号
    EditExecutor(id, editname,index) {
      if(id == null){
        console.log(editname,this.$store.state.exeid)
        for(var i = 0;i<this.Interface.Executor[this.$store.state.exeid].mappings.length;i++){
          this.Interface.Executor[this.$store.state.exeid].mappings[i].hardware = editname
        }
        // this.Interface.Executor
        console.log(this.Interface.Mode)
      }


      else{
          this.$axios({
            method: "patch",
            url: `/hardware/${id}/`,
            data:{
              code:editname
            },
          })
            .then(res => {
              console.log(res.data);
              for(var i = 0;i<this.Interface.Executor[this.$store.state.exeid].mappings.length;i++){
                this.Interface.Executor[this.$store.state.exeid].mappings[i].hardware = editname
              }
            })
            .catch(err => {
              console.log(err);
            });
      }
      // this.Interface.Executor[this.$store.state.exeid].mappings

      // this.Interface.Mode
      // hardware
      // this.amend(id,editname)
      // console.log(id);
      // console.log(editname);
      // let ExecutorList = this.Interface.executor;
      // for (let index = 0; index < ExecutorList.length; index++) {
      //   let element = ExecutorList[index];
      //   if (element.cid == id) {
      //     element.code_name = editname;
      //   }
      // }
    },



    //修改模块的代号
    EditModes(id, editname,index) {
      if(id == null){
        for(var i=0;i<this.Interface.Mode[index].mappings.length;i++){
          this.Interface.Mode[index].mappings[i].hardware = editname
          console.log( this.Interface.Mode[index].mappings[i].hardware)
          console.log(this.Interface.Mode[index])
        }
      }else{
        this.$axios({
          method: "patch",
          url: `/hardware/${id}/`,
          data:{
            code:editname
          },
        })
          .then(res => {
            console.log(res.data);
            for(var i=0;i<this.Interface.Mode[index].mappings.length;i++){
              this.Interface.Mode[index].mappings[i].hardware = editname
              console.log( this.Interface.Mode[index].mappings[i].hardware)
              console.log(this.Interface.Mode[index])
            }
          })
          .catch(err => {
            console.log(err);
          });

      }

        // this.amend(id,editname)
    },


    // 修改执行器代号   模块代号操作

    // amend(id,editname){
    //
    //
    //   console.log(editname)
    //   let that = this;
    //   let Modelist = this.Interface.data;
    //   if(Modelist == undefined){
    //     this.$notify.error({
    //       title: '失败',
    //       message:`修改失败`
    //     })
    //     this.ONCE_SCRIPT(that)
    //     return
    //   }
    //   for (let index = 0; index < Modelist.length; index++) {
    //     for(let val = 0; val<Modelist[index].length; val++){
    //       if(Modelist[index]){
    //         let element = Modelist[index];
    //         let elementTwo = element[val];
    //         if (elementTwo.code.code_id == id) {
    //
    //
    //
    //           this.$axios({
    //             method: "post",
    //             url:`/update_code_name/`,
    //             data:{
    //               code_id:id,
    //               code_name:editname
    //             }
    //           })
    //             .then(res => {
    //               console.log(res)
    //               if(res.data.status!= 200){
    //                 this.$notify.error({
    //                   title: '失败',
    //                   message:`${res.data.msg}`
    //                 })
    //
    //                 this.ONCE_SCRIPT(that)
    //
    //
    //
    //
    //
    //                 return
    //               }
    //
    //               elementTwo.code.code_name = editname;
    //               let z = that.Interface.data
    //               console.log(that.Interface)
    //               that.Interface = {}
    //               that.Interface.data = z;
    //               this.$notify({
    //                 title: '成功',
    //                 message: `${res.data.msg}`,
    //                 type: 'success'
    //               });
    //             })
    //             .catch(err => {
    //               console.log(err);
    //               this.$notify.error({
    //                 title: '失败',
    //                 message:`${res.data.msg}`
    //               });
    //             });
    //
    //
    //
    //
    //
    //         }
    //       }
    //     }
    //   }
    //
    // },



    // 单独调用模块
    // ONCE_SCRIPT(that){
    //   let scriptID = this.$store.state.scriptID;
    //   console.log(scriptID)
    //   this.$axios({
    //     method: "get",
    //     url: `get_mode/${scriptID}`,
    //   })
    //     .then(res => {
    //       console.log(res.data);
    //       that.ModeList = res.data.msg;
    //       resolve(res.data.msg);
    //       if (res.data.msg.length == 0) {
    //         that.ModeList = [{ name: "" }];
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },



    // getBiginfo(id) {
    //
    //   this.$store.commit('SCRIPT_ID',id);
    //
    //   let that = this;
    //   const Getinterface = async () => {
    //     const exe = await that.getExecutor(id);
    //     const mode = await that.getMode(id);
    //     console.log(exe)
    //     console.log(mode)
    //     console.log('看上面！！！！！！！')
    //     let data = [];
    //     if (exe.length == 0) {
    //       data = [];
    //     } else {
    //       let Executorid = exe[0].code.code_id;
    //       data.push(Executorid);
    //       if (mode.length != 0) {
    //         for (let index = 0; index < mode.length; index++) {
    //           let element = mode[index];
    //           data.push(element.code.code_id);
    //         }
    //       }
    //     }
    //     that.getInterface(data);
    //
    //   };
    //   Getinterface();
    //
    // },


    // async getBigScript() {
    //   //获取大的脚本
    //   this.$axios({
    //     method: "get",
    //     url: "get_script_info/"
    //   })
    //     .then(res => {
    //       console.log(res.data.msg);
    //       this.bigList = res.data.msg;
    //       let defaultid = res.data.msg[0].id
    //       this.$store.commit('SCRIPT_ID', res.data.msg[0].id);
    //       let that = this;
    //       const my = async () => {
    //         const f = await that.getExecutor(defaultid);
    //         const s = await that.getMode(defaultid);
    //         let Data = [];
    //         if (f.length == 0) {
    //           Data = [];
    //         } else {
    //           console.log(s)
    //           let Executorid = f[0].code.code_id;
    //           Data.push(Executorid);
    //           if (s.length != 0) {
    //             for (let index = 0; index < s.length; index++) {
    //               const element = s[index];
    //               Data.push(element.code.code_id);
    //             }
    //           }
    //         }
    //
    //         that.getInterface(Data);
    //       };
    //       my();
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },

    // getExecutor(id) {
    //   //获取执行器
    //   return new Promise((resolve, reject) => {
    //     this.$axios({
    //       method: "get",
    //       url:`/get_executor/${id}`,
    //     })
    //       .then(res => {
    //         console.log(res.data);
    //         this.ExecutorList = res.data.msg;
    //         resolve(res.data.msg);
    //         if (res.data.msg.length == 0) {
    //           this.ExecutorList = [{ name: "" }];
    //         }
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //   });
    // },
    //
    // getMode(id) {
    //   //获取模块
    //   return new Promise((resolve, reject) => {
    //     this.$axios({
    //       method: "get",
    //       url: `get_mode/${id}`,
    //     })
    //       .then(res => {
    //         console.log(res.data);
    //         this.ModeList = res.data.msg;
    //         console.log(this.ModeList)
    //         resolve(res.data.msg);
    //         if (res.data.msg.length == 0) {
    //           this.ModeList = [{ name: "" }];
    //         }
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //   });
    // },
    //
    // getInterface(arr) {
    //   //获取执行器模块的数据
    //   this.$axios({
    //     method: "post",
    //     url: "get_hardmapping/",
    //     data: {
    //       code: arr
    //     }
    //   })
    //     .then(res => {
    //       console.log(res.data);
    //       if (res.data.msg == null || res.data.msg == "") {
    //         this.Interface = {};
    //       } else {
    //         this.Interface = {};
    //         this.Interface.data = res.data.msg;
    //         console.log(this.Interface.data)
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },


    //导入执行器
    // channel_executor(name,jiekou){
    //   console.log(name)
    //   console.log(jiekou[0])
    //   this.ExecutorList = []
    //   this.ExecutorList.push({
    //     code:{
    //       code_id : null,
    //       code_name:null
    //     },
    //     executor_id:null,
    //     executor_name : name
    //   })
    //   let arr=[]
    //   for(var i =0;i<jiekou.length;i++){
    //     arr.push(
    //      {
    //        code:{
    //          code_id : null,
    //          code_name:null
    //        },
    //        content:'',           //硬件映射
    //        hardmapping_id:null,
    //        interface:`${jiekou[i]}`,
    //        remerk:''
    //      }
    //     )
    //   }
    //   console.log(arr)
    //   this.Interface={}
    //   this.Interface.data = []
    //   this.Interface.data.push(arr)
    //   console.log(this.Interface.data)
    //   // arr=[]
    // }
  },

};
</script>
<style lang='scss' scoped>
.el-container {
  position: relative;
}

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
}
</style>
