<template>
  <ul>
    <li v-for="(rList, index) in replyList" :key="index">
      <div>
        <span>回复者：{{ rList.replyPerson }}</span
        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>回复时间：{{ rList.replyTime }}</span>
      </div>
      <div>{{ rList.replyContent }}</div>
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  name: 'listDetail_index',
  props: ['replyList'],
  setup() {}
}
</script>

<style scoped>
ul li {
  font-size: 18px;
  padding-top: 5px;
  list-style: none;
}
ul li div:first-child {
  color: rgb(22, 118, 197);
}
</style>
