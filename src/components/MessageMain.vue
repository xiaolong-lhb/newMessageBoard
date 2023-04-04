<template>
  <div id="contain">
    <div class="Mheader">
      <button @click="goMessageList">查看留言列表</button>
      <button @click="toPersonInfo">个人信息</button>
    </div>
    <div class="Mmain">
      <div>
        <label for="division">留言分类：</label>
        <select v-model="listType">
          <option value="情感">情感</option>
          <option value="时政">时政</option>
          <option value="搞笑">搞笑</option>
          <option value="美食">美食</option>
        </select>
      </div>
      <div><label for="title">标题：</label><input type="text" v-model="title" /></div>
      <div><label for="content">内容：</label><textarea v-model="content"></textarea></div>
    </div>
    <div class="Mfooter">
      <button @click="submitList">提交留言</button>
      <button>重置</button>
    </div>
  </div>
</template>

<script lang="ts">
import getaxios from '../stores/geiaxios'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
import gettime from '../stores/getTime'
export default {
  name: 'MessageMain',
  setup() {
    const router = useRouter()
    let username = ref('')
    let listType = ref('情感')
    let title = ref('')
    let content = ref('')
    // // 打印时间
    // console.log(gettime.getTime())
    // // 打印接收到的参数
    // console.log(route.query.username)
    getaxios.getres('', '/islogin').then((response) => {
      if (response.status === 200) {
        //alert('欢迎来到留言板！！')
      } else {
        alert(response.message)
        router.push('./Login')
      }
    })
    function goMessageList() {
      router.push('./MessageList')
    }
    function submitList() {
      if (title.value === '') {
        alert('标题不可为空！！')
      } else if (content.value === '') {
        alert('内容不可为空！！')
      } else {
        getaxios.getres('', './submitList').then((response) => {
          username.value = response.username
          getaxios
            .postres(
              {
                messagePerson: username.value,
                messageType: listType.value,
                messageTitle: title.value,
                messagecontent: content.value,
                messageTime: gettime.getTime(),
                messageLikes: 0,
                messageReplys: 0
              },
              './submitList'
            )
            .then((response) => {
              if (response.status === 200) {
                alert(response.message)
                router.push('./MessageList')
              } else if (response.status === 404) {
                alert('未知错误，请重新输入留言内容')
              } else {
                alert(response.message)
                router.push('./Login')
              }
            })
        })
      }
    }
    // 跳转到个人信息界面
    function toPersonInfo() {
      router.push({
        path: '/PersonInfo'
      })
    }
    return {
      goMessageList,
      listType,
      title,
      content,
      submitList,
      toPersonInfo
    }
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
#contain {
  margin: 100px auto;
  width: 800px;
  height: 800px;
  letter-spacing: 5px;
}
.Mheader {
  width: 800px;
  height: 50px;
  position: relative;
}
.Mheader button {
  width: auto;
  height: auto;
  padding: 10px 30px;
  border-radius: 10px;
  font-size: 18px;
}
.Mheader button:first-child {
  position: absolute;
  background-color: rgba(0, 153, 255, 0.692);
  border: none;
  color: #fff;
  left: 0px;
}
.Mheader button:last-child {
  position: absolute;
  background-color: #fff;
  border-style: #000 1px solid;
  color: #000;
  right: 0px;
}
.Mmain {
  width: 800px;
  height: 300px;
  font-size: 18px;
}
.Mmain div {
  height: 50px;
}

.Mmain div label {
  display: inline-block;
  margin: 15px auto;
  width: 150px;
  height: 50px;
  text-align: right;
}
.Mmain div:first-child select {
  height: 30px;
  width: 80px;
  text-align: center;
}

.Mmain div:nth-child(2) input {
  height: 20px;
  width: 400px;
  font-size: 16px;
  /* text-align: center; */
}
.Mmain div:last-child {
  height: 200px;
}
.Mmain div:last-child label {
  vertical-align: top;
}
.Mmain div:last-child textarea {
  height: 150px;
  width: 500px;
  font-size: 16px;
  /* text-align: center; */
}
.Mfooter {
  width: 400px;
  height: 50px;
  margin-left: 150px;
}
.Mfooter button {
  width: auto;
  height: auto;
  padding: 10px 30px;
  border-radius: 10px;
  font-size: 18px;
}
.Mfooter button:first-child {
  background-color: rgba(0, 153, 255, 0.692);
  color: #fff;
  border: none;
}
.Mfooter button:last-child {
  border-style: rgb(44, 40, 40) 1px solid;
  margin-left: 100px;
}
</style>
