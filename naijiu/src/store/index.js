import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)



const store = new Vuex.Store({
    state: {
        isAddname: false,
        jkys: [],
        childjkys: [],
        topActive:1,
        readytimer:{},
        getTimer:{},                //当前年月日定时器的修改
        timers:null,
        sec:1,                      //秒
        scriptID:0,          //脚本ID
        exeid:0,           //选择执行器
        indexap:0,
        partID:-1
    },
    mutations: {
        EDIT_NAME(state, editname) {
            // console.log('执行了')
            state.isAddname = editname;
        },
      //改变显示状态
       CHANGE_STATE(state, num){
          state.topActive = num;

       },
        SEND_TIEMR(state,timer){

          if(timer.state == 1){
            // clearInterval(state.timers)
            // state.readytimer.runyears = timer.years;
            // state.readytimer.runtimers = timer.timers;
            console.log('设备已开始')
            state.timers = setInterval(()=>{
              state.sec++
              state.readytimer.dingTimer = state.sec;
            },1000)



          }else if(timer.state == 0){
            // 启动定时器进行相加
            console.log('设备已暂停')
            clearInterval(state.timers)
          }else if(timer.state == -1){
            // state.timers
            // clearInterval(state.timers)
            console.log('设备已重启')
            clearInterval(state.timers)
                state.sec = 0;
            state.readytimer.dingTimer = state.sec;

            state.readytimer.runyears = undefined
          }



            state.readytimer.runyears = timer.years;
            state.readytimer.runtimers = timer.timers;
            state.readytimer.state = timer.state;

          let data = Object.assign({},state.readytimer);
          // 将state.personInfo指向新对象的引用地址
          state.readytimer = data;


          console.log( state.readytimer)
        },

        // STEATTIMER(val){
        //   if(val == 1){
        //     state.timers = setInterval(()=>{
        //       state.sec++
        //       readytimer.timer = sec;
        //     },1000)
        //   }else if(val == 0){
        //     clearInterval(state.timers)
        //   }else if(val == -1){
        //     clearInterval(state.timers)
        //     state.sec = 0;
        //     readytimer.timer = sec;
        //   }
        //   console.log(state.sec)
        // },
          //管理时间
          TIMER_SET(state){

          },

        ADD_INTER(state, arr) {
            // for (let index = 0; index < arr.length; index++) {
            //     let element = arr[index];
            //     state.jkys.push({
            //         daihao:element.daihao,
            //         jiekou:element.jiekou,
            //         yingshe:element.yingshe,
            //     })
            // }
            state.jkys = arr;
        },
        ADD_CHILD(state, arr) {
            for (let index = 0; index < arr.length; index++) {
                let element = arr[index];
                state.childjkys.push({
                    daihao:element.daihao,
                    jiekou:element.jiekou,
                    yingshe:element.yingshe,
                })
            }

        },


        EDIT_DH(state, editname) {
            let jkys = state.jkys;
            for (let index = 0; index < jkys.length; index++) {
                let element = jkys[index];
                element.daihao = editname
            }
        },
      SCRIPT_ID(state,datas){
          state.scriptID = datas
        console.log('我执行了aaaaaaaa')
        console.log(datas)
      },


      SELECTEXEID(state,index){
        state.exeid = index
      },
      INDEX_BIAO(state,index){
          state.indexap = index
      },


      PARTID(state,data){
        state.partID = data
      },


    },

    action:{
        async Timer(){
          setInterval(()=>{
            var myDate = new Date();
            myDate.getFullYear();    //获取完整的年份(4位,1970-????)
            myDate.getMonth();       //获取当前月份(0-11,0代表1月)
            myDate.getDate();        //获取当前日(1-31)
            myDate.getHours();       //获取当前小时数(0-23)
            myDate.getMinutes();     //获取当前分钟数(0-59)
            myDate.getSeconds();     //获取当前秒数(0-59)
            var strYears = `${ myDate.getFullYear()}/${  myDate.getMonth()+1}/${myDate.getDate()}`,
              sttTimer = `${ myDate.getHours()}:${  myDate.getMinutes()}:${myDate.getSeconds()}`;
            console.log(strYears)
          })
        }
    }

})

export default store
