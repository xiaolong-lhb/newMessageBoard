<template>
  <ul>
    <li v-for="(Mlist, index) in lists" :key="Mlist.idmessage_list">
      {{ index + 1 }} &nbsp;&nbsp;&nbsp; {{ Mlist.messageTitle }} &nbsp;&nbsp;&nbsp; 留言时间：{{
        Mlist.messageTime
      }}
      &nbsp;&nbsp;&nbsp; 点赞数：{{ Mlist.messageLikes }} &nbsp;&nbsp;&nbsp; 回复数：{{
        Mlist.messageReplys
      }}
      &nbsp;&nbsp;&nbsp;
      <RouterLink :to="{ path: '/listDetail', query: { id: Mlist.idmessage_list } }"
        >查看详情</RouterLink
      >
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  name: 'MessageList_index',
  props: ['lists'],
  setup() {}
}
</script>

<style scoped>
ul li {
  font-size: 18px;
  padding: 5px 0px;
}
</style>
