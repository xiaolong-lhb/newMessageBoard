<template>
  <div id="reg">
    <div><label>账号名：</label><input v-model="user.username" /></div>
    <div><label>真实姓名：</label><input v-model="user.realname" /></div>
    <div><label>密码：</label><input v-model="user.psw" /></div>
    <div><label>确认密码：</label><input v-model="user.comfirmpsw" /></div>
    <div>
      <span><button @click="goRegist">注册、、、</button></span
      ><span class="tex"
        >已有账号，选择 <RouterLink to="/Login" id="routerlogin">登录</RouterLink></span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import getaxios from '../stores/geiaxios'
export default {
  name: 'regist',
  setup() {
    const router = useRouter()
    let user = reactive({
      username: '',
      realname: '',
      psw: '',
      comfirmpsw: ''
    })
    function goRegist() {
      if (user.psw !== user.comfirmpsw) {
        alert('密码与确认密码应该相同！')
        user.comfirmpsw = ''
      } else {
        getaxios
          .postres(
            { username: user.username, realname: user.realname, psw: user.psw },
            './registweb'
          )
          .then((response) => {
            if (response.status) {
              alert('用户注册成功，现在返回登录页面')
              router.push('./Login')
            } else {
              alert('用户注册失败，请重新输入')
              ;(user.username = ''), (user.realname = ''), (user.psw = '')
              user.comfirmpsw = ''
            }
          })
      }
    }
    return {
      user,
      goRegist
    }
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
div a {
  text-decoration: none;
}
#reg {
  width: 500px;
  height: 700px;
  text-align: center;
  margin: 100px auto;
}
#reg div {
  padding-top: 30px;
  display: flex;
  position: relative;
}
#reg div label {
  flex: 1;
  text-align: right;
}
#reg div input {
  flex: 1;
}
#reg div:last-child span {
  flex: 1;
}
#reg div:last-child span button {
  width: 100px;
  height: 30px;
  background-color: rgba(0, 153, 255, 0.692);
  border-radius: 10px;
  border: none;
  color: #fff;
  left: 0px;
}
#reg div:last-child .tex {
  position: absolute;
  bottom: 0px;
  right: 0px;
}
</style>
