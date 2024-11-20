<template>
  <div class="container">
    <a-tabs v-model:activeKey="activeKey" type="card">
    <a-tab-pane key="1" tab="test">
    <a-table
    :columns="columns"
    :pagination="false"
    size="small"
    :row-key="record => record.id"
    :data-source="dataSource"
  >
  </a-table>
</a-tab-pane>
    <!-- <a-tab-pane key="2" tab="リクエスト状況">Content of Tab Pane 2</a-tab-pane> -->
  </a-tabs>
  </div>
  
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { getList } from '../api/test';
const activeKey = ref('1');
const dataSource = ref([]);

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Sort',
    dataIndex: 'sort',
  },
  {
    title: 'CreateTime',
    dataIndex: 'create_time',
  },
];
onMounted(()=>{
  getList().then((res:any)=>{
    dataSource.value = res.Items
  })
})
</script>
<style scoped>
  .container{
    width: 100%;
    background-color: rgb(57, 57, 57);
    padding: 20px;
  }
  :deep(.ant-tabs-tab){
    border:none !important;
    border-radius: 0px !important;
    background-color: rgb(82, 82, 82)!important;
    color: gray;
  }
  :deep(.ant-tabs-tab-active){
    background-color: rgb(66, 65, 65)!important;
    border-top: 2px solid rgb(67, 120, 214) !important;
  }
  :deep(.ant-tabs-tab-active .ant-tabs-tab-btn){
    color: white!important;
  }
  :deep(.ant-table){
    border-radius: 0px !important;
  }
  :deep(.ant-table-thead>tr>th){
    color: white !important;
    background-color: rgb(68, 68, 68)!important;
  }
  :deep(.ant-table-wrapper .ant-table-container table>thead>tr:first-child >*:last-child){
    border-radius: 0px !important;
  }
  :deep(.ant-table-wrapper .ant-table-container table>thead>tr:first-child >*:first-child){
    border-radius: 0px !important;
  }
  :deep(.ant-table-tbody){
    background-color: rgb(57, 57, 57);
    color: white;
  }
  :deep(.ant-table-cell-row-hover){
    background-color: rgb(57, 57, 57) !important;
  }
  :deep(.ant-tabs-nav){
    margin: 0px !important;
  }
</style>

