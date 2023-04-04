<template>
  <div class="listHeader">
    <span class="addlist"><button @click="backSubmit">新增留言</button></span>
    <span class="classfy">
      <button @click="allPage()">全部</button>
      <button @click="feelingPage()">情感</button>
      <button @click="politicsPage()">时政</button>
      <button @click="funnyPage()">搞笑</button>
      <button @click="finegoodPage()">美食</button>
    </span>
    <span class="personinfo"><button @click="toPersonInfo">个人信息</button></span>
  </div>
  <div class="listMain">
    <!-- <router-view></router-view> -->
    <MessageList_index :lists="current"></MessageList_index>
  </div>
  <div class="listFooter">
    <span>
      <button @click="prepage">上一页</button>
      <span v-for="i of flag" :key="i">
        <button @click="toPage(i)">{{ i }}</button>
      </span>
      <button @click="nextpage">下一页</button>
    </span>
    <span
      >选择第
      <select @click="selectpage($event)" v-model="index">
        <option v-for="i of flag" :key="i" :value="`${i}`">{{ i }}</option>
      </select>
      页
    </span>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from 'vue'
import MessageList_index from './MessageList_index.vue'
import { useRouter } from 'vue-router'
import getaxios from '../stores/geiaxios'
export default {
  name: 'MessageList',
  setup() {
    const router = useRouter()
    let flag = ref(1)
    let currentpage = ref(1)
    let lists: any = reactive([])
    // 全部的数组划分
    let displayLists: any = reactive([])
    // 根据类型划分的数组
    let fellingLists: any = reactive([])
    let politicLists: any = reactive([])
    let funnyLists: any = reactive([])
    let finefoodLists: any = reactive([])
    // 用于显示的数组
    // 根据类型划分的数组
    let fellingListsdis: any = reactive([])
    let politicListsdis: any = reactive([])
    let funnyListsdis: any = reactive([])
    let finefoodListsdis: any = reactive([])
    let current: any = ref()
    let index: any = ref()
    //定义变量判断是那种类型进行转化
    let listtype = ref('全部')
    // 实现跳转个人信息页面
    function toPersonInfo() {
      router.push('/PersonInfo')
    }

    // 通过发送axio请求获取数据库中的留言信息
    getaxios.getres('', '/getList').then((response) => {
      if (response.status === 200) {
        lists = response.lists
        // console.log(lists)
        //根据类型进行数组划分
        for (let i = 0; i < lists.length; i++) {
          if (lists[i].listtype === '情感') {
            fellingLists.push(lists[i])
          } else if (lists[i].listtype === '时政') {
            politicLists.push(lists[i])
          } else if (lists[i].listtype === '搞笑') {
            funnyLists.push(lists[i])
          } else if (lists[i].listtype === '美食') {
            finefoodLists.push(lists[i])
          }
        }
        for (let i = 0; i < lists.length; i = i + 5) {
          //划分全部数组
          displayLists.push(lists.slice(i, i + 5))
        }
        // 用于分页的数组
        for (let i = 0; i < fellingLists.length; i = i + 5) {
          fellingListsdis.push(fellingLists.slice(i, i + 5))
        }
        for (let i = 0; i < politicLists.length; i = i + 5) {
          politicListsdis.push(politicLists.slice(i, i + 5))
        }
        for (let i = 0; i < funnyLists.length; i = i + 5) {
          funnyListsdis.push(funnyLists.slice(i, i + 5))
        }
        for (let i = 0; i < finefoodLists.length; i = i + 5) {
          finefoodListsdis.push(finefoodLists.slice(i, i + 5))
        }
        current.value = displayLists[0]
        index.value = '1'
        flag.value = Math.ceil(lists.length / 5)
      } else {
        alert(response.message)
        router.push('./Login')
      }
    })
    //console.log(list)

    //根据不同的类型加载不同的分页页面
    function judgeType() {
      if (listtype.value === '全部') {
        return displayLists
      } else if (listtype.value === '情感') {
        return fellingListsdis
      } else if (listtype.value === '时政') {
        return politicListsdis
      } else if (listtype.value === '搞笑') {
        return funnyListsdis
      } else if (listtype.value === '美食') {
        return finefoodListsdis
      }
    }
    //数字分页
    function toPage(i: number) {
      // let count = 0
      // displayLists = []
      // for (let index = 5 * (i - 1); index < 5 * i; index++) {
      //   if (index < lists.length) {
      //     displayLists[count] = lists[index]
      //     count++
      //   } else {
      //     break
      //   }
      // }
      // console.log(displayLists)
      // isfirst = false
      let typelist = judgeType()
      console.log(typelist)
      currentpage.value = i
      index.value = `${currentpage.value}`
      current.value = typelist[i - 1]
    }
    //上一页
    function prepage() {
      if (currentpage.value > 1) {
        let typelist = judgeType()
        console.log(typelist)
        currentpage.value--
        index.value = `${currentpage.value}`
        current.value = typelist[currentpage.value - 1]
      }
    }
    //下一页
    function nextpage() {
      let typelist = judgeType()
      console.log(typelist)
      if (currentpage.value < typelist.length) {
        currentpage.value++
        index.value = `${currentpage.value}`
        current.value = typelist[currentpage.value - 1]
      }
    }
    // 选择分页
    function selectpage(value: any) {
      let typelist = judgeType()
      console.log(typelist)
      currentpage.value = value.target.value
      index.value = `${currentpage.value}`
      current.value = typelist[value.target.value - 1]
    }
    // 全部页面
    function allPage() {
      current.value = displayLists[0]
    }
    // 情感页面
    function feelingPage() {
      listtype.value = '情感'
      current.value = fellingListsdis[0]
    }
    // 时政页面
    function politicsPage() {
      listtype.value = '时政'
      current.value = politicListsdis[0]
    }
    // 美食页面
    function finegoodPage() {
      listtype.value = '美食'
      current.value = finefoodListsdis[0]
    }
    // 搞笑页面
    function funnyPage() {
      listtype.value = '搞笑'
      current.value = funnyListsdis[0]
    }
    // 返回留言界面
    function backSubmit() {
      router.push('./')
    }
    return {
      lists,
      flag,
      currentpage,
      toPage,
      current,
      prepage,
      nextpage,
      selectpage,
      allPage,
      feelingPage,
      politicsPage,
      finegoodPage,
      funnyPage,
      backSubmit,
      toPersonInfo,
      index
    }
  },
  components: {
    MessageList_index
  }
}
</script>

<style scoped>
.listHeader {
  width: 100%;
  height: 100px;
  padding: 50px;
  position: relative;
}

/* .listHeader button {
  width: auto;
  height: auto;
  border-radius: 10px;
  font-size: 18px;
  margin: 0 50px;
  position: absolute;
} */
.listHeader .addlist button {
  background-color: rgba(0, 153, 255, 0.692);
  color: #fff;
  border: none;
  font-size: 18px;
  padding: 10px 50px;
  position: absolute;
  left: 50px;
}
.listHeader .personinfo button {
  background-color: #fff;
  color: #000;
  padding: 5px 40px;
  font-size: 18px;
  border: rgb(44, 40, 40) 1px solid;
  position: absolute;
  right: 200px;
}
.listHeader .classfy {
  position: absolute;
  left: 35%;
  width: 500px;
  height: 100px;
}
.listHeader .classfy button {
  padding: 20px 30px;
  border: none;
  font-size: 20px;
  background-color: #fff;
  left: 100px;
}
.listHeader .classfy button:hover {
  cursor: pointer;
  color: rgb(60, 60, 218);
}
.listHeader .classfy button:focus {
  color: rgb(60, 60, 218);
}
.listMain {
  height: 300px;
  width: 100%;
  text-align: center;
  /* background-color: bisque; */
  padding: 40px 0px;
}
.listFooter {
  height: 100px;
  width: auto;
  position: relative;
  text-align: right;
}
.listFooter span button {
  padding: 0px 10px;
  border: none;
  font-size: 16px;
  background-color: #fff;
}
.listFooter span button:hover {
  cursor: pointer;
  color: rgb(60, 60, 218);
}
.listFooter span button:focus {
  color: rgb(60, 60, 218);
}
.listFooter span:last-child {
  margin-right: 50px;
}
</style>
