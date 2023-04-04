<template>
  <div class="submitReply" v-if="isshow">
    <div>回复内容</div>
    <div><textarea v-model="replyContent"></textarea></div>
    <div>
      <button @click="submitReply">提交回复</button><button @click="concelReply">取消回复</button>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import getaxios from '../stores/geiaxios'
import gettime from '../stores/getTime'
export default {
  name: 'submitReply',
  props: ['isshow', 'listid', 'replynum'],
  setup(props, { emit }) {
    let isshow_d = ref(false)
    let isreply_d = ref(false)
    let replyContent = ref('')
    const router = useRouter()
    function concelReply() {
      emit('changeShow', isshow_d)
    }
    function submitReply() {
      //console.log(props.replynum)
      getaxios
        .postres(
          {
            replyTime: gettime.getTime(),
            replyContent: replyContent.value,
            listid: props.listid,
            replynum: props.replynum
          },
          '/insertReply'
        )
        .then((response) => {
          if (response.status === 200) {
            alert('回复成功')
          } else if (response.status === 404) {
            alert(response.message)
            isreply_d.value = true
            emit('changeReply', isreply_d)
          } else {
            alert(response.message)
            router.push('/Login')
          }
        })
      emit('changeShow', isshow_d)
    }
    return {
      isshow_d,
      concelReply,
      submitReply,
      replyContent
    }
  }
}
</script>

<style>
.submitReply {
  width: 500px;
  height: 400px;
  font-size: 18px;
  position: absolute;
  left: -30%;
  top: 60%;
  border: rgb(44, 40, 40) 1px solid;
  background-color: #c4bebecc;
}
.submitReply div:first-child {
  padding-left: 50px;
  margin: 30px 30px;
}
.submitReply div:nth-child(2) textarea {
  width: 400px;
  height: 150px;
  margin: 0 auto;
  margin: 30px 30px;
  overflow-y: scroll;
}
.submitReply div:last-child button {
  width: auto;
  height: auto;
  padding: 10px 30px;
  border-radius: 10px;
  font-size: 18px;
  margin: 0px 50px;
}
.submitReply div:last-child button:first-child {
  background-color: rgba(0, 153, 255, 0.692);
  color: #fff;
  border: none;
}
.submitReply div:last-child button:last-child {
  border: rgb(44, 40, 40) 1px solid;
  color: #000;
  background-color: #fff;
}
</style>
