<template>
  <h2>个人信息详情</h2>
  <div class="personContain">
    <div>
      <span>账号：</span><span>{{ username }}</span>
    </div>
    <div>
      <span>真实姓名：</span><span>{{ realname }}</span>
    </div>
    <div>
      <span>头像：</span><span><img src="" alt="点击更新头像" /><input /></span><span></span>
    </div>
  </div>
  <div class="backList">
    <button @click="backListB">返回留言列表</button>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import getaxios from '../stores/geiaxios'
export default {
  name: 'PersonInfo',
  setup() {
    const router = useRouter()
    let username = ref('')
    let realname = ref('')
    // getaxios.getres('', '/getPerson/').then((response) => {
    //   console.log(response)
    // })
    //console.log(username.value)
    // axios({
    //   method:'post',
    //   url:'http://localhost:80/loginweb/',
    //   // headers:{
    //   //   Authorization: window.localStorage.token
    //   // }
    // }).then((response)=>{
    //   console.log(response)
    // })
    getaxios.getres('', '/getPerson').then((response) => {
      if (response.status === 200) {
        username.value = response.username
        realname.value = response.realname
      } else {
        alert(response.message)
        router.push('./Login')
      }
    })

    function backListB() {
      router.push('/MessageList')
    }
    // 实现上传图片功能
    function changePic() {
      console.log('虽然不见但是发挥作用')
    }
    return {
      backListB,
      username,
      realname,
      changePic
    }
  }
}
</script>

<style>
h2 {
  width: 100%;
  height: 100px;
  padding: 50px 100px;
}
.personContain {
  width: 100%;
  height: auto;
}
.personContain div {
  width: 500px;
  height: auto;
  margin: 20px auto;
  display: flex;
  font-size: 18px;
}
.personContain div span {
  flex: 1;
}
.detailContain div span:first-child {
  text-align: right;
}
.backList button {
  width: auto;
  height: auto;
  font-size: 18px;
  padding: 20px 40px;
  color: #000;
  background-color: aliceblue;
  border: rgb(44, 40, 40) 1px solid;
  margin-left: 200px;
  margin-top: 50px;
}
img {
  cursor: pointer;
}
</style>
