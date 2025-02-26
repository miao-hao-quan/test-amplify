<template>
  <div class="history-container">
    <div class="search-section">
      <a-row :gutter="24">
        <a-col :xs="24" :sm="12" :md="8" :lg="6">
          <div class="search-item">
            <span class="label">情報源</span>
            <a-input class="search-input" placeholder="🔍Search..." v-model:value="query.source" />
          </div>
        </a-col>
        <a-col :xs="24" :sm="12" :md="8" :lg="6">
          <div class="search-item">
            <span class="label">情報種別</span>
            <a-input class="search-input" placeholder="🔍Search..." v-model:value="query.type" />
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="16" :lg="8">
          <div class="date-section">
            <div class="date-title">検索期間</div>
            <div class="date-row">
              <div class="date-item">
                <span class="label">開始時刻</span>
                <div class="date-input-group">
                  <a-date-picker class="date-picker" v-model:value="beginDate" valueFormat="YYYY-MM-DD" :placeholder="''" />
                  <a-input class="time-input" @blur="onInputChange" v-model:value="beginTime" :placeholder="''" />
                </div>
              </div>
              <div class="date-item">
                <span class="label">终了時刻</span>
                <div class="date-input-group">
                  <a-date-picker class="date-picker" v-model:value="endDate" valueFormat="YYYY-MM-DD" :placeholder="''" />
                  <a-input class="time-input" @blur="onInputChangeEnd" v-model:value="endTime" :placeholder="''" />
                </div>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="4">
          <div class="button-group">
            <button class="primary-btn" @click="queryParams">適用</button>
            <button class="secondary-btn" @click="reset">更新</button>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="table-container">
      <div>
        <a-spin :spinning="spinning" :indicator="indicator">
          <table>
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
                <td class="action-column">
                  <div class="action-buttons">
                    <button class="action-btn download-btn" @click="toDownload(item.path+item.filename)" title="ダウンロード">
                      <img src="../assets/download.svg" width="14" height="14" alt="download" />
                    </button>
                    <button class="action-btn more-btn" title="その他">
                      <img src="../assets/more.svg" width="16" height="16" alt="more" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </a-spin>
      </div>
    </div>
    <div class="pagination-container">
      <div>
        <span class="pagination-text">Rows per page</span>
        <select class="page-select" v-model="query.pageSize" @change="changePageSize"> 
          <option :value="10">10/row</option>
          <option :value="20">20/row</option>
          <option :value="30">30/row</option>
          <option :value="40">40/row</option>
          <option :value="50">50/row</option>
        </select>
      </div>
      <div class="pagination-info">
        <span class="pagination-text">{{query.pageSize*(currentPageIndex+1)+1}} - {{ query.pageSize*(currentPageIndex+2)>total?total:query.pageSize*(currentPageIndex+2) }} / {{ total }}</span>
      </div>
      <div class="pagination-buttons">
        <button
          class="page-btn"
          :class="{'page-btn-disabled': spinning || currentPageIndex === -1}"
          @click="changePage(1)"
        >
          <VerticalRightOutlined />
        </button>
        <button
          class="page-btn"
          :class="{'page-btn-disabled': spinning || currentPageIndex === -1}"
          @click="changePage(2)"
        >
          <LeftOutlined />
        </button>
        <button
          class="page-btn"
          :class="{'page-btn-disabled': spinning || currentPageIndex === pages.length - 1}"
          @click="changePage(3)"
        >
          <RightOutlined />
        </button>
        <button
          class="page-btn"
          :class="{'page-btn-disabled': spinning || currentPageIndex === pages.length - 1}"
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

const toDownload =  (key:string) => {
  getList({"isDownload":"1","key":key}).then((res: any) => {
    window.location.href = res.data.downloadUrl
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

onMounted(async () => {
  await getPages();
  init();
});
</script>

<style scoped>
.history-container {
  background-color: #0a1545;
  padding: 24px;
  min-height: 100vh;
  color: #fff;
}

.search-section {
  background: rgb(29,46,117);
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.search-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 12px;
}

.label {
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
}

.search-input {
  flex: 1;
  min-width: 0;
}

.date-section {
  margin-bottom: 20px;
}

.date-title {
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 16px;
}

.date-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.date-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.date-input-group {
  display: grid;
  grid-template-columns: 1fr 80px;
  gap: 8px;
}

.date-picker {
  width: 100%;
}

.time-input {
  width: 100%;
}

.button-group {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  align-items: flex-end;
  height: 100%;
  padding-bottom: 20px;
}

.primary-btn {
  background: rgb(46,144,163);
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(108, 92, 231, 0.2);
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(108, 92, 231, 0.3);
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 10px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.table-container {
  background: rgb(29,46,117);
  border-radius: 12px;
  padding: 20px;
  margin-top: 24px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-bottom: 20px;
}

th {
  text-align: left;
  padding: 16px 24px;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
  background-color: rgb(46,144,163);
  border: none;
}

th:first-child {
  border-top-left-radius: 8px;
}

th:last-child {
  border-top-right-radius: 8px;
}

td {
  padding: 16px 24px;
  color: rgba(255, 255, 255, 0.85);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s;
}

tr:hover td {
  background-color: rgba(108, 92, 231, 0.05);
}

.pagination-container {
  background: rgb(29,46,117);
  padding: 16px 24px;
  border-radius: 12px;
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.pagination-text {
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
}

.page-select {
  background: rgba(108, 92, 231, 0.1);
  color: white;
  border: 1px solid rgba(108, 92, 231, 0.2);
  border-radius: 6px;
  padding: 8px 12px;
  margin-left: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-select:hover {
  background: rgba(108, 92, 231, 0.2);
  border-color: rgb(10, 21, 69);
}

.pagination-buttons {
  display: flex;
  gap: 8px;
}

.page-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(108, 92, 231, 0.1);
  border: 1px solid rgba(108, 92, 231, 0.2);
  border-radius: 6px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:hover:not(.page-btn-disabled) {
  background: rgba(108, 92, 231, 0.2);
  border-color: rgb(10, 21, 69);
  transform: translateY(-2px);
}

.page-btn-disabled {
  background: rgba(255, 255, 255, 0.05);
  border-color: transparent;
  color: rgba(255, 255, 255, 0.3);
  cursor: not-allowed;
}

.pagination-info {
  display: flex;
  align-items: center;
}

@media (max-width: 768px) {
  .pagination-container {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .pagination-buttons {
    justify-content: center;
  }
}

:deep(.ant-input) {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 8px;
  transition: all 0.3s ease;
}

:deep(.ant-input:hover),
:deep(.ant-input:focus) {
  border-color: rgb(10, 21, 69);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.2);
}

:deep(.ant-picker) {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  width: 100%;
}

:deep(.ant-picker:hover),
:deep(.ant-picker:focus) {
  border-color: rgb(10, 21, 69);
  background: rgba(255, 255, 255, 0.15);
}

:deep(.ant-picker-input > input::placeholder) {
  color: transparent;
}

:deep(.ant-input::placeholder) {
  color: transparent;
}

select {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 8px 12px;
  transition: all 0.3s ease;
}

select:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgb(10, 21, 69);
}

@media (max-width: 992px) {
  .button-group {
    justify-content: flex-start;
    padding-bottom: 0;
  }
  
  .date-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .search-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .label {
    margin-bottom: 8px;
  }

  .search-input {
    width: 100%;
  }

  .button-group {
    flex-direction: column;
    width: 100%;
  }

  .primary-btn,
  .secondary-btn {
    width: 100%;
  }
}

.action-column {
  padding: 8px 16px !important;
  text-align: right;
}

.action-buttons {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  align-items: center;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.download-btn {
  background: rgba(108, 92, 231, 0.1);
}

.download-btn:hover {
  background: rgba(108, 92, 231, 0.2);
}

.more-btn {
  background: rgba(255, 255, 255, 0.1);
}

.more-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.action-btn img {
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.action-btn:hover img {
  opacity: 1;
}

:deep(.ant-picker-input > input) {
  color: white;
}

:deep(.ant-picker-suffix) {
  color: rgba(255, 255, 255, 0.85);
}
</style>