<template>
  <div class="history-contanier">
    <a-row type="flex">
      <a-col :span="6">
        <div style="display: flex; align-items: center">
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
          <a-input placeholder="🔍Search..." v-model:value="query.source" />
        </div>
        <div style="display: flex; align-items: center; margin-top: 10px">
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
          <a-input placeholder="🔍Search..." v-model:value="query.type" />
        </div>
      </a-col>
      <a-col :span="10" style="padding-left: 50px">
        <div style="display: flex; align-items: center; padding: 6px">
          <span style="color: white; font-size: 16px; font-weight: 700">
            検索期間
          </span>
        </div>
        <div
          style="
            display: flex;
            align-items: center;
            margin-top: 10px;
            padding-left: 20px;
          "
        >
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
          <a-date-picker style="width: 700px" v-model:value="beginDate" valueFormat="YYYY-MM-DD" />
          <a-input
            style="margin-left: 10px"
            @blur="onInputChange"
            v-model:value="beginTime"
          />
          <span
            style="
              color: white;
              font-size: 16px;
              font-weight: 700;
              margin-right: 10px;
              width: 420px;
              margin-left: 20px;
            "
          >
            终了時刻
          </span>
          <a-date-picker style="width: 700px" v-model:value="endDate" valueFormat="YYYY-MM-DD" />
          <a-input
            style="margin-left: 10px"
            @blur="onInputChangeEnd"
            v-model:value="endTime"
          />
        </div>
      </a-col>
      <a-col
        :span="6"
        style="display: flex; align-items: center; padding-left: 50px"
      >
        <button
          style="padding: 6px 20px; border-radius: 5px; margin-right: 20px"
          @click="queryParams"
        >
          適用
        </button>
        <button style="padding: 6px 20px; border-radius: 5px" @click="reset">
          更新
        </button>
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
        <a-spin :spinning="spinning" :indicator="indicator">
          <table style="width: 100%">
            <thead>
              <tr>
                <th>ID</th>
                <th>情報種別</th>
                <th>情報源</th>
                <th>ファイル名</th>
                <th>ファイルパス</th>
                <th>受信時刻</th>
                <th style="width: 80px"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in historyList" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.type }}</td>
                <td>{{ item.source }}</td>
                <td>{{ item.filename }}</td>
                <td>{{ item.path }}</td>
                <td>{{ item.create_time }}</td>
                <td>
                  <img
                    src="../assets/download.svg"
                    style="color: white"
                    width="14"
                    height="14"
                    @click="toDownload(item.path+item.filename)"
                  />
                  <img
                    src="../assets/more.svg"
                    style="color: white; margin-left: 10px"
                    width="16"
                    height="16"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </a-spin>
      </div>
    </div>
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 10px;
      "
    >
      <div>
        <span style="color: white">Rows per page</span>
        <select style="padding: 6px; border-radius: 4px; margin-left: 10px" v-model="query.pageSize" @change="changePageSize"> 
          <option :value="10">10/row</option>
          <option :value="20">20/row</option>
          <option :value="30">30/row</option>
          <option :value="40">40/row</option>
          <option :value="50">50/row</option>
        </select>
      </div>
      <div style="margin-left: 10px">
        <span style="color: white">{{query.pageSize*(currentPageIndex+1)+1}} - {{ query.pageSize*(currentPageIndex+2)>total?total:query.pageSize*(currentPageIndex+2) }} / {{ total }}</span>
      </div>
      <div style="margin-left: 10px">
        <button
          style="padding: 10px; border-radius: 5px; margin-left: 10px"
          :disabled="spinning"
          @click="changePage(1)"
        >
          <VerticalRightOutlined />
        </button>
        <button
          style="padding: 10px; border-radius: 5px; margin-left: 5px"
          :disabled="spinning"
          @click="changePage(2)"
        >
          <LeftOutlined />
        </button>
        <button
          style="padding: 10px; border-radius: 5px; margin-left: 5px"
          :disabled="spinning"
          @click="changePage(3)"
        >
          <RightOutlined />
        </button>
        <button
          style="padding: 10px; border-radius: 5px; margin-left: 5px"
          :disabled="spinning"
          @click="changePage(4)"
        >
          <VerticalLeftOutlined />
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup >
import {
  CaretDownOutlined,
  MoreOutlined,
  VerticalRightOutlined,
  VerticalLeftOutlined,
  LeftOutlined,
  RightOutlined,
  LoadingOutlined,
} from "@ant-design/icons-vue";
import { getList } from "../api/history";
import { ref, onMounted, reactive, h } from "vue";
import { events } from "aws-amplify/api";

const historyList = ref<HistoryItem[]>();
const query = reactive({
  isGetCount: 0,
  lastKey: "",
  type: "",
  source: "",
  startTime: "",
  endTime: "",
  pageSize: 10,
});
const lastQuery = reactive({
  isGetCount: 0,
  lastKey: "",
  type: null,
  source: null,
  startTime: "",
  endTime: "",
  pageSize: 10,
});
const spinning = ref(false);
const indicator = h(LoadingOutlined, {
  style: {
    fontSize: "24px",
    color: "gray",
  },
  spin: true,
});
interface HistoryItem {
  id: number;
  type: string;
  source: string;
  filename: string;
  path: string;
  create_time: Date | string;
}

const init = () => {
  query.isGetCount = 0;
  spinning.value = true;
  getList(query).then((res: any) => {
    historyList.value = res.Items;
    Object.assign(lastQuery, query);
    spinning.value = false;
  });
};

const pages = ref([{ id: "" }]);
const currentPageIndex = ref(-1);
const total = ref(0);
const beginDate = ref(null);
const beginTime = ref("00:00");
const endDate = ref(null);
const endTime = ref("23:59");
const validTimePattern = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/;
const onInputChange = (event: any) => {
  const inputValue = event.target.value;
  if (!validTimePattern.test(inputValue)) {
    beginTime.value = "00:00";
  } else {
    const [hours, minutes] = inputValue.split(":").map(Number);
    if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
      beginTime.value = inputValue;
    } else {
      beginTime.value = "00:00";
    }
  }
};
const onInputChangeEnd = (event: any) => {
  const inputValue = event.target.value;
  if (!validTimePattern.test(inputValue)) {
    endTime.value = "23:59";
  } else {
    const [hours, minutes] = inputValue.split(":").map(Number);
    if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
      endTime.value = inputValue;
    } else {
      endTime.value = "23:59";
    }
  }
}

const queryParams = async () => {
  spinning.value = true;
  if(beginDate.value!=null){
    query.startTime = beginDate.value + " "+ beginTime.value+":00"
  }else{
    query.startTime = ""
  }
  if(endDate.value!=null){
    query.endTime = endDate.value + " "+ endTime.value+":59"
  }else{
    query.endTime = ""
  }
  if (JSON.stringify(query) !== JSON.stringify(lastQuery)) {
    query.lastKey = "";
    await getPages();
  }
  init();
};

const getPages = () => {
  spinning.value = true;
  currentPageIndex.value = -1;
  return new Promise((resolve: any, rejects) => {
    query.isGetCount = 1;
    getList(query).then((res: any) => {
      total.value = res.total;
      pages.value = res.pages;
      resolve();
    });
  });
};

const changePageSize = async () => {
  spinning.value = true;
  await getPages()
  init()
};

const changePage = (type: number) => {
  switch (type) {
    case 1:
      if (pages.value.length > 0 && currentPageIndex.value != -1) {
        spinning.value = true;
        currentPageIndex.value = -1;
        query.lastKey = "";
        init();
      }
      break;
    case 2:
      if (pages.value.length > 0 && currentPageIndex.value > -1) {
        spinning.value = true;
        currentPageIndex.value = currentPageIndex.value - 1;
        if (currentPageIndex.value == -1) {
          query.lastKey = "";
        } else {
          query.lastKey = pages.value[currentPageIndex.value].id;
        }
        init();
      }
      break;
    case 3:
      if (
        pages.value.length > 0 &&
        pages.value.length > currentPageIndex.value + 1
      ) {
        spinning.value = true;
        currentPageIndex.value = currentPageIndex.value + 1;
        query.lastKey = pages.value[currentPageIndex.value].id;
        init();
      }
      break;
    case 4:
      if (
        pages.value.length > 0 &&
        pages.value.length > currentPageIndex.value + 1
      ) {
        spinning.value = true;
        currentPageIndex.value = pages.value.length - 1;
        console.log();
        query.lastKey = pages.value[currentPageIndex.value].id;
        init();
      }
      break;
  }
};

const reset = async () => {
  query.lastKey = "";
  query.type = "";
  query.source = "";
  query.startTime = "";
  query.endTime = "";
  beginDate.value = null;
  beginTime.value = "00:00";
  endDate.value = null;
  endTime.value = "23:59";
  Object.assign(lastQuery, query);
  await getPages();
  init();
};

const toDownload =  (key:string) => {
  getList({"isDownload":"1","key":key}).then((res: any) => {
    window.location.href = res.data.downloadUrl
  });
};



onMounted(async () => {
  await getPages();
  init();
});
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
  border-right: 1px solid rgb(57, 57, 57, 0.8);
}
td {
  color: rgba(255, 255, 255, 0.8);
  padding: 10px 0px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-left: 18px;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}
label {
  color: white !important;
}
</style>