<template>
  <div class="detailHeader">
    <span class="backList"><button @click="backListB">返回留言列表</button></span>
    <span class="replyPower">
      <button @click="agreed($event)" v-show="!isbutton">点赞</button>
      <button v-show="isbutton">已点赞</button>
      <button @click="replyed($event)" v-show="!isreply">回复</button>
      <button v-show="isreply">已回复</button>
      <submitReply
        :isshow="isshow"
        @changeShow="changeShow"
        :listid="listid"
        @changeReply="changeReply"
        :replynum="replynum"
      ></submitReply>
    </span>
  </div>
  <div class="detailContain">
    <div>
      <span>所属分类：</span><span>{{ listType }}</span>
    </div>
    <div>
      <span>标题：</span><span>{{ listTitle }}</span>
    </div>
    <div>
      <span>内容：</span><span>{{ listContent }}</span>
    </div>
    <div>
      <span>留言时间：</span><span>{{ listTime }}</span>
    </div>
    <div>
      <span>留言人：</span><span>{{ listPerson }}<img src="" alt="点击更新头像" /></span>
    </div>
  </div>
  <div class="reply">
    <h3>留言回复列表</h3>
    <listDetail_index :replyList="currentReply"></listDetail_index>
  </div>
  <div class="replyFooter" v-show="footshow">
    <span>
      <button @click="replyPre">上一页</button>
      <span v-for="i of flag" :key="i">
        <button @click="page(i)">{{ i }}</button>
      </span>
      <button @click="replyNext">下一页</button>
    </span>
    <span
      >选择第
      <select @click="selectReplypage($event)" v-model="index">
        <option v-for="i of flag" :key="i" :value="`${i}`">{{ i }}</option>
      </select>
      页
    </span>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import listDetail_index from './listDetail_index.vue'
import submitReply from './submitReply.vue'
import getaxios from '../stores/geiaxios'
export default {
  name: 'ListDetail',
  components: {
    listDetail_index,
    submitReply
  },
  setup() {
    let displayReplylist: any = reactive([])
    const router = useRouter()
    const route = useRoute()
    let listid = route.query.id
    //console.log(listid)
    let listType = ref('')
    let listTitle = ref('')
    let listContent = ref('')
    let listTime = ref('')
    let listPerson = ref('')
    let listLikes: number = 0
    let listReplys: number = 0
    let replynum = ref(0)
    let replylist: any = reactive([])
    let currentpage = ref(1)
    let index = ref('1')
    let flag = ref(1)
    let isshow = ref(false)
    let footshow = ref(true)
    let currentReply: any = ref([])
    // 定义一个变量来控制回复按钮的样式
    let isreply = ref(false)
    function changeReply(val: any) {
      isreply.value = val.value
      console.log(isreply.value)
    }
    // 定义一个变量来控制点赞按钮的样式
    let isbutton = ref(false)
    //通过发送axios请求来判断用户是否已经点赞
    getaxios.postres({ id: listid }, '/getIslike').then((response) => {
      if (response.status) {
        isbutton.value = true
      } else {
        isbutton.value = false
      }
    })
    getaxios.postres({ id: listid }, '/getListDetail').then((response) => {
      // console.log(response)
      const listDetail = response.detail
      // console.log(listDetail)
      listType.value = listDetail.messageType
      listTitle.value = listDetail.messageTitle
      listContent.value = listDetail.messageContent
      listTime.value = listDetail.messageTime
      listPerson.value = listDetail.messagePerson
      listLikes = listDetail.messageLikes
      listReplys = listDetail.messageReplys
    })
    // 获取该条消息的全部回复信息
    getaxios.postres({ listid: listid }, '/getReply').then((response) => {
      if (response.status === 200) {
        replylist = response.replyinfos
        replylist.reverse()
        if (replylist.length === 0) {
          footshow.value = false
        } else {
          for (let i = 0; i < replylist.length; i = i + 5) {
            displayReplylist.push(replylist.slice(i, i + 5))
          }
          currentReply.value = displayReplylist[0]
          index.value = '1'
          flag.value = Math.ceil(replylist.length / 5)
        }
      }
    })
    function backListB() {
      router.push('/MessageList')
    }
    function page(i: number) {
      currentpage.value = i
      index.value = `${currentpage.value}`
      currentReply.value = displayReplylist[i - 1]
    }
    function selectReplypage(value: any) {
      currentpage.value = value.target.value
      currentReply.value = displayReplylist[value.target.value - 1]
    }
    //上一页
    function replyPre() {
      if (currentpage.value > 1) {
        currentpage.value--
        index.value = `${currentpage.value}`
        currentReply.value = displayReplylist[currentpage.value - 1]
      }
    }
    //下一页
    function replyNext() {
      if (currentpage.value < displayReplylist.length) {
        currentpage.value++
        index.value = `${currentpage.value}`
        currentReply.value = displayReplylist[currentpage.value - 1]
      }
    }
    // 子组件改变弹窗状态
    function changeShow(val: any) {
      console.log(val.value)
      isshow.value = val.value
    }
    // 实现点赞功能
    function agreed(e: any) {
      let likenum = listLikes + 1
      getaxios
        .postres({ messageLikes: likenum, idmessage_list: listid }, '/insertLikes')
        .then((response) => {
          if (response.status === 200) {
            // e.target.disabled = true
            // e.srcElement.innerText = '已点赞'
            // e.srcElement.style.background = '#fff'
            // e.srcElement.style.color = '#000'
            isbutton.value = true
          } else {
            alert(response.message)
            router.push('./Login')
          }
        })
    }
    function replyed(e: any) {
      replynum.value = listReplys + 1
      //console.log(replynum)
      isshow.value = true
      if (isreply.value) {
        e.target.disabled = true
        e.srcElement.innerText = '已回复'
        e.srcElement.style.background = '#fff'
        e.srcElement.style.color = '#000'
      }
    }
    return {
      replylist,
      currentReply,
      flag,
      page,
      selectReplypage,
      replyPre,
      replyNext,
      index,
      backListB,
      isshow,
      changeShow,
      agreed,
      listType,
      listTitle,
      listContent,
      listTime,
      listPerson,
      footshow,
      replyed,
      listid,
      changeReply,
      replynum,
      isreply,
      isbutton
    }
  }
}
</script>

<style scoped>
.detailHeader {
  width: 100%;
  height: 100px;
  padding-top: 50px;
  position: relative;
}
button {
  width: auto;
  height: auto;
  font-size: 18px;
}
.detailHeader .backList button {
  padding: 20px 40px;
  color: #000;
  background-color: aliceblue;
  border: rgb(44, 40, 40) 1px solid;
  position: absolute;
  left: 200px;
  margin: 0;
}
.detailHeader .replyPower {
  width: 400px;
  height: 100px;
  position: absolute;
  right: 200px;
}
.detailHeader .replyPower button:nth-child(3) {
  padding: 10px 20px;
  color: aliceblue;
  background-color: #0eacdb;
  border: none;
  margin: 0px 25px;
}
.detailHeader .replyPower button:nth-child(1) {
  padding: 10px 20px;
  color: aliceblue;
  background-color: #0eacdb;
  border: none;
  margin: 0px 25px;
}
.detailHeader .replyPower button:nth-child(2) {
  padding: 10px 20px;
  color: #000;
  background-color: aliceblue;
  border: none;
  margin: 0px 25px;
  pointer-events: none;
}
.detailHeader .replyPower button:nth-child(4) {
  padding: 10px 20px;
  color: #000;
  background-color: aliceblue;
  border: none;
  margin: 0px 25px;
  pointer-events: none;
}
.detailContain {
  width: 100%;
  height: auto;
}
.detailContain div {
  width: 600px;
  height: auto;
  margin: 20px auto;
  display: flex;
  font-size: 18px;
}
.detailContain div span {
  flex: 1;
}
.detailContain div span:first-child {
  text-align: right;
}
.reply {
  margin: 20px 100px;
  width: 100%;
  height: auto;
  padding: 10px 0px;
}
.replyFooter {
  width: 100%;
  height: 100px;
  padding-left: 50px;
  font-size: 18px;
}
.replyFooter span button {
  padding: 0px 10px;
  border: none;
  font-size: 16px;
  background-color: #fff;
}
.replyFooter span button:hover {
  cursor: pointer;
  color: rgb(60, 60, 218);
}
.replyFooter span button:focus {
  color: rgb(60, 60, 218);
}
img {
  cursor: pointer;
}
</style>
