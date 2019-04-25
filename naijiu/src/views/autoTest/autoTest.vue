<template>
  <el-container>
    <el-aside>
      <asideTime
        :script_data="script_data"
        :part_data="part_data"
        :all="alls"
        @changeCheck="Lisendata"
         @select_all="select_"
        @list_pro="pro_list"
        @changeNum="changeNum"
      ></asideTime>
    </el-aside>
    <el-main>
      <maincontent></maincontent>
    </el-main>
  </el-container>
</template>

<script>
import asideTime from "./asideTime";
import maincontent from "./content";
export default {
  name: "bodyset",
  components: {
    asideTime,
    maincontent
  },
  data() {
    return {
      script_data: [{}], //初始脚本数据
      part_data: [{}], //part脚本
      alls: false, //判断是否全部选中
    };
  },
  methods: {
    Getdata() {
      console.log("请求");
      let that = this;
      this.$axios({
        //获取大的脚本
        method: "get",
        url: "scripts/"
      })
        .then(res => {
          console.log(res.data);
          that.script_data = res.data;
          console.log(res.data);
          let defaultid = res.data[0].id;
          this.$store.commit('SCRIPT_ID',res.data[0].id)
          that.getPart(defaultid);
          this.getsys(defaultid)





        })
        .catch(err => {
          console.log(err);
          console.log("错误了");
        });
    },

    // 获取脚本对应的part
    getPart(id) {
      this.$axios({
        method: "get",
        url:`parts/?script=${id}`
      }).then(res => {
        console.log(res.data);
        this.part_data = res.data;
        let a = 0;
        for(var i = 0;i <this.part_data.length;i++){
          if(this.part_data[i].is_check == false){
            a = 1
          }
        }
        if(a == 1){
          this.alls = false
        }else{
          this.alls = true
        }
      });
    },
    is_all(item) {
      return item.select == true;
    },


    //获取脚本对应的sys
    getsys(){

    },
    // 单选
    Lisendata(index,id) {
      console.log("子组件传过来的值" + index);
      let that = this;
      this.part_data[index].is_check = !this.part_data[index].is_check;
      console.log(this.part_data);
      let lists = this.part_data;
      let isflag = lists.every(function(lists) {
        return lists.is_check == true;
      });
      if (isflag) {
        this.alls = true;
      } else {
        this.alls = false;
      }
      console.log( this.part_data[index].is_check)

      this.$axios({
        method: "put",
        url:`parts/${id}/`,
        data:{
          is_check:this.part_data[index].is_check
        }
      }).then(res => {
        console.log(res.data);
      })
        .catch(err => {
          console.log(err);
        });



    },

    // 全选
    select_() {
      let list = this.part_data;
      // this.alls = !this.alls;
      console.log(this.alls)
      if (this.alls) {
        this.alls = false;
        for (let i = 0; i < list.length; i++) {
          list[i].is_check = false;
        }
      } else {
         this.alls = true;
        for (let i = 0; i < list.length; i++) {
          list[i].is_check = true;
        }
      }
        this.$axios({
          method:'put',
          url:`/all_parts/${this.$store.state.scriptID}/`,
          data:{
            is_all_check:this.alls
          }
        }).then(res  =>{
          console.log(res.data)
        })
    },
    pro_list(data){
      this.part_data = data;
    },
    // 修改大循环次数
    changeNum(id,words,checkeds){
      console.log(checkeds)
      this.$axios({
        method: "put",
        url:`parts/${id}/`,
        data:{
          big_cycle:words,
          is_check:checkeds
        }
      }).then(res => {
        console.log(res.data);
      })
      .catch(err => {
          console.log(err);
      });


      // this.$axios({
      //   method: "put",
      //   url:`parts/${id}/`,
      //   data:{
      //     big_cycle:words,
      //     is_check:checkeds
      //   }
      // })
      //   .then(res => {
      //     alert('成功')
      //     console.log(res.data);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    }
  },
  created() {
    this.Getdata();
  },

  mounted() {

  }
};
</script>
<style lang='scss' scoped>
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
