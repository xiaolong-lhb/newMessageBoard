<template>
  <div id="reg">
    <div><label for="username">账号名：</label><input type="text" v-model="user.username" /></div>
    <div><label for="pws">密码：</label><input type="password" v-model="user.psw" /></div>
    <div>
      <span><button id="loginb" @click="goLogin">登录</button></span>
      <span class="tex"
        >如果没有账号，选择 <RouterLink to="/Regist" id="routerregist">注册</RouterLink></span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
import getaxios from '../stores/geiaxios'
import { useRouter } from 'vue-router'
export default {
  name: 'login',
  setup() {
    const router = useRouter()
    let user = reactive({
      username: '',
      psw: ''
    })
    let url = ''
    function goLogin() {
      // router.push({
      //   path: '/',
      //   query: {
      //     username: user.username
      //   }
      // })
      // axios({
      //   method:'post',
      //   url:'http://127.0.0.1/loginweb',
      //   data:{
      //     username:user.username,
      //     psw:user.psw
      //   }
      // }).then((response)=>{
      //   if(response.data.status === 0){
      //       console.log(response.data.token)
      //       alert(`${user.username}${response.data.msg}`)
      //       //window.localStorage.removeItem('token')
      //       window.localStorage.setItem('token',response.data.token)
      //       //router.push('./')
      //     }
      //   else if(response.data.status === 1){
      //       alert(response.data.msg)
      //   }else alert(response.data.msg)
      // })
      getaxios.postres({ username: user.username, psw: user.psw }, '/loginweb').then((response) => {
        if (response.status === 0) {
          alert(`${user.username}${response.msg}`)
          //window.localStorage.removeItem('token')
          window.localStorage.setItem('token', response.token)
          router.push({
            path: '/'
          })
        } else if (response.status === 1) {
          alert(response.msg)
        } else alert(response.msg)
      })
    }
    return {
      url,
      user,
      goLogin
    }
  }
}
</script>

<style>
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
