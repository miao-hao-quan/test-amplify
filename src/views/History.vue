<template>
  <div class="history-contanier">
    <a-row type="flex">
      <a-col  :span="6">
        <div style="display: flex;align-items: center;">
          <span
          style="
            color: white;
            font-size: 16px;
            font-weight: 700;
            margin-right: 8px;
            width: 90px;
          "
        >
          情報源
        </span>
        <a-input placeholder="🔍 Search..." v-model:value="query.source"  />
        </div>
        <div style="display: flex;align-items: center;margin-top: 10px">
          <span
          style="
            color: white;
            font-size: 16px;
            font-weight: 700;
            margin-right: 8px;
            width: 90px;
          "
        >
        情報種別
        </span>
        <a-input placeholder="🔍 Search..." v-model:value="query.type"  />
        </div>
      </a-col>
      <a-col  :span="10" style="padding-left: 50px;">
        <div style="display: flex;align-items: center;padding: 6px;">
          <span
          style="
            color: white;
            font-size: 16px;
            font-weight: 700;
          "
        >
        検索期間
        </span>
        </div>
        <div style="display: flex;align-items: center;margin-top: 10px;padding-left: 20px;">
          <span
          style="
            color: white;
            font-size: 16px;
            font-weight: 700;
            margin-right: 10px;
            width: 420px;
          "
        >
        開始時刻
        </span>
        <a-date-picker style="width: 700px;" />
        <a-input style="margin-left: 10px" />
        <span
          style="
            color: white;
            font-size: 16px;
            font-weight: 700;
            margin-right: 10px;
            width: 420px;
            margin-left: 20px
          "
        >
        终了時刻
        </span>
        <a-date-picker style="width: 700px;" />
        <a-input style="margin-left: 10px" />
        </div>
      </a-col>
      <a-col :span="6" style="display: flex;align-items: center;padding-left: 50px;">
        <button style="padding:6px 20px;border-radius: 5px;margin-right: 20px;" @click="init">適用</button>
        <button style="padding:6px 20px;border-radius: 5px;">更新</button>
      </a-col>
    </a-row>
    <div
      style="
        margin-top: 15px;
        background-color: rgb(57, 57, 57, 0.8);
        padding-bottom: 200px;
      "
    >
      <div>
        <table style="width: 100%">
          <thead>
            <tr>
              <th>ID</th>
              <th>情報種別</th>
              <th>情報源</th>
              <th>ファイル名</th>
              <th>ファイルパス</th>
              <th>受信時刻</th>
              <th style="width: 80px;"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in historyList" :key="item.id">
              <td>{{item.id}}</td>
              <td>{{item.type}}</td>
              <td>{{item.source}}</td>
              <td>{{item.filename}}</td>
              <td>{{item.path}}</td>
              <td>{{item.create_time}}</td>
              <td>
                <img src="../assets/download.svg" style="color: white;" width="14" height="14" />
                <img src="../assets/more.svg" style="color: white;margin-left: 10px" width="16" height="16" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div style="display: flex;align-items: center;justify-content: flex-end;margin-top: 10px;">
      <div>
        <span style="color: white;">Rows per page</span>
        <select style="padding: 6px;border-radius: 4px;margin-left: 10px">
          <option>10/row</option>
        </select>
      </div>
      <div style="margin-left: 10px">
        <span style="color: white;">1 -10 / 406</span>
      </div>
      <div style="margin-left: 10px">
        <button style="padding: 10px;border-radius: 5px;margin-left: 10px;"><VerticalRightOutlined /></button>
        <button style="padding: 10px;border-radius: 5px;margin-left: 5px;"><LeftOutlined /></button>
        <button style="padding: 10px;border-radius: 5px;margin-left: 5px;" @click="init"><RightOutlined /></button>
        <button style="padding: 10px;border-radius: 5px;margin-left: 5px;"><VerticalLeftOutlined /></button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup >
import { CaretDownOutlined, MoreOutlined,VerticalRightOutlined,VerticalLeftOutlined,LeftOutlined,RightOutlined } from "@ant-design/icons-vue";
import { getList } from "../api/history";
import { ref,onMounted,reactive } from "vue";

const historyList = ref<HistoryItem[]>()
const total = ref()
const query = reactive({
  lastKey:"",
  type:"",
  source:"",
  startTime:null,
  endTime:null,
  pageSize:10,
})
const lastQuery = reactive({
  lastKey:"",
  type:null,
  source:null,
  startTime:null,
  endTime:null,
  pageSize:10,
})

interface HistoryItem {
  id: number;
  type: string;
  source: string;
  filename: string;
  path: string;
  create_time: Date | string; 
}

const init = () =>{
  if(JSON.stringify(query) !== JSON.stringify(lastQuery)){
    query.lastKey = ""
  }
  getList(query).then((res:any)=>{
    total.value = res.Count
    historyList.value = res.Items
    query.lastKey = res.LastEvaluatedKey.id
    Object.assign(lastQuery,query)
  })
}

onMounted(()=>{
  init()
})

</script>

<style scoped>
.history-contanier {
  background-color: black;
  padding: 20px;
}
th {
  text-align: left;
  padding: 10px 0px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  background-color: rgb(138, 138, 138);
  padding-left: 18px;
  border-right:1px solid  rgb(57, 57, 57, 0.8);
}
td {
  color: rgba(255, 255, 255, 0.8);
  padding: 10px 0px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-left: 18px;
  border-right:1px solid rgba(255, 255, 255, 0.2);
}
label {
  color: white !important;
}
</style>