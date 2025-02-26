<template>
  <div class="dashboard-container" style="margin:30px 60px;">
    <!-- 顶部状态栏 -->
    <div class="header-section">
      <dv-decoration-11 style="width:100%;height:100px;">
        <div class="status-col" style="padding: 20px;">
            <div class="status-title" style="padding-top: 40px; font-weight: bold; color: white; font-size: 30px;text-align: center;">システム稼働状況</div>
            <dv-decoration5 :dur="2" style="width:100%;height:40px;" />
            <!-- <div class="status-value" style="color: #00b894;">正常</div> -->
        </div>
      </dv-decoration-11>
      <!-- <div class="filter-section">
        <div class="period-selector">
          <a-select class="dark-select" default-value="last-week">
            <a-select-option value="today">Today</a-select-option>
            <a-select-option value="last-week">Last Week</a-select-option>
            <a-select-option value="last-month">Last Month</a-select-option>
          </a-select>
        </div>
      </div> -->
    </div>

    <!-- 统计卡片行 -->
    <!-- <a-row type="flex" class="stats-row">
      <a-col :span="6" v-for="(stat, index) in stats" :key="index" class="stat-card">
        <div class="stat-content">
          <datav-card :title="stat.title" :value="stat.value" :trend="stat.trend" :icon="stat.icon" :show-warning="stat.showWarning" />
        </div>
      </a-col>
    </a-row> -->
    <div class="box-header">
      <div class="box-text">
        <div>全受信件数</div>
        <dv-decoration-9
          style="width: 150px; height: 150px; margin: 0 auto" :dur="5">10,000</dv-decoration-9>
      </div>
      <div class="box-text">
        <div>エラー件数</div>
        <dv-decoration-9
          style="width: 150px; height: 150px; margin: 0 auto" :dur="5">0</dv-decoration-9>
      </div>
      <div class="box-text">
        <div>リクエスト件数</div>
        <dv-decoration-9
          style="width: 150px; height: 150px; margin: 0 auto" :dur="5">2,345</dv-decoration-9>
      </div>
      <div class="box-text">
        <div>Foo</div>
        <dv-decoration-9
          style="width: 150px; height: 150px; margin: 0 auto" :dur="5">1,934</dv-decoration-9>
      </div>
    </div>
    <div class="scroll-board-container">
      <div class="board-title">
        受信状況サマリ
        <a-select class="chart-select" default-value="week" style="margin-left: auto;">
          <a-select-option value="week">週間</a-select-option>
          <a-select-option value="month">月間</a-select-option>
        </a-select>
      </div>
      <dv-border-box-12>
        <dv-scroll-board 
          ref="scrollBoard" 
          :config="config" 
          style="width: 100%; height: 300px;"
        />
      </dv-border-box-12>
    </div>

    <!-- 底部表格区域 -->
    <!-- <div class="table-section">
      <div class="table-header">
        <div class="tab-container">
          <div class="tab active">
            <span class="tab-icon">📊</span>
            受信状況サマリ
          </div>
          <div class="tab">
            <span class="tab-icon">📈</span>
            リクエスト状況
          </div>
        </div>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>情報種別</th>
              <th>最新受信時刻</th>
              <th>受信件数</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>例子種別1</td>
              <td>2023-10-01 12:00</td>
              <td>10</td>
              <td>
                <span class="status-tag success">OK</span>
              </td>
            </tr>
            <tr>
              <td>例子種別2</td>
              <td>2023-10-01 13:30</td>
              <td>5</td>
              <td>
                <span class="status-tag success">OK</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div> -->

    <!-- 添加图表区域 -->
    <div class="charts-section">
      <dv-border-box1>
        <div class="chart-card">
          <div class="chart-header">
            <h3>受信トレンド</h3>
            <a-select class="chart-select" default-value="week">
              <a-select-option value="week">週間</a-select-option>
              <a-select-option value="month">月間</a-select-option>
            </a-select>
          </div>
          <div ref="chart1Ref" class="chart-container"></div>
        </div>
      </dv-border-box1>
      
      <dv-border-box1>
        <div class="chart-card">
          <div class="chart-header">
            <h3>エラー分析</h3>
            <a-select class="chart-select" default-value="week">
              <a-select-option value="week">週間</a-select-option>
              <a-select-option value="month">月間</a-select-option>
            </a-select>
          </div>
          <div ref="chart2Ref" class="chart-container"></div>
        </div>
      </dv-border-box1>
    </div>
  </div>
</template>
<script setup lang="ts">
import { CaretDownOutlined, CaretUpOutlined, MoreOutlined } from "@ant-design/icons-vue";
import { ref, onMounted, reactive } from 'vue';
import * as echarts from 'echarts';
const config = reactive({
  header: ['情報種別', '最新受信時刻', '受信件数', 'Status'],
  data: [
    ['例子種別1', '2023-10-01 13:30', '<span style="color:#67e0e3;">10</span>','<span style="color:#9fe6b8;">OK</span>'],
    ['例子種別2', '2023-10-01 12:00', '<span style="color:#67e0e3;">10</span>', '<span style="color:#9fe6b8;">OK</span>'],
    ['例子種別3', '2024-10-01 12:00', '<span style="color:#67e0e3;">10</span>', '<span style="color:#fb7293;">ERROR</span>'],
    ['例子種別4', '2024-10-01 12:00', '<span style="color:#67e0e3;">10</span>', '<span style="color:#9fe6b8;">OK</span>'],
    ['例子種別5', '2024-10-01 12:00', '<span style="color:#67e0e3;">10</span>', '<span style="color:#9fe6b8;">OK</span>'],
  ],
  index: true,
  columnWidth: [50],
  align: ['center'],
  headerBGC: 'rgb(46, 144, 163)',
  oddRowBGC: 'rgb(29, 46, 117)',
  evenRowBGC: 'rgb(29, 46, 117)',
})
const stats = [
  { 
    title: '全受信件数',
    value: '10,000',
    trend: '-22%',
    showWarning: true,
    icon: '📥'
  },
  { 
    title: 'エラー件数',
    value: '0',
    trend: '+7%',
    icon: '⚠️'
  },
  { 
    title: 'リクエスト件数',
    value: '2,345',
    footer: 'CAD',
    icon: '🔄'
  },
  { 
    title: 'Foo',
    value: '1,934',
    icon: '📌'
  },
];

const chart1Ref = ref<HTMLElement | null>(null);
const chart2Ref = ref<HTMLElement | null>(null);

onMounted(() => {
  // 初始化第一个图表
  const chart1 = echarts.init(chart1Ref.value!);
  chart1.setOption({
    backgroundColor: '#0a1545',
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLine: {
        lineStyle: {
          color: '#888'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#888'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    series: [
      {
        name: '受信件数',
        type: 'line',
        smooth: true,
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        areaStyle: {
          opacity: 0.1
        },
        itemStyle: {
          color: 'rgb(46, 144, 163)'
        },
        lineStyle: {
          width: 3,
          color: 'rgb(46, 144, 163)'
        }
      }
    ]
  });

  // 初始化第二个图表
  const chart2 = echarts.init(chart2Ref.value!);
  chart2.setOption({
    backgroundColor: '#0a1545',
    tooltip: {
      trigger: 'item'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['タイプA', 'タイプB', 'タイプC', 'タイプD', 'タイプE', 'タイプF'],
      axisLine: {
        lineStyle: {
          color: '#888'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#888'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    series: [
      {
        name: 'データ',
        type: 'bar',
        data: [1048, 735, 580, 484, 600, 720],
        itemStyle: {
          color: 'rgb(46, 144, 163)'
        }
      }
    ]
  });

  // 响应式调整
  window.addEventListener('resize', () => {
    chart1.resize();
    chart2.resize();
  });
});
</script>

<style scoped>
:deep(.ant-select-selector) {
  background: linear-gradient(145deg, #252b48, #2d325a) !important;
  background-color: linear-gradient(145deg, #252b48, #2d325a) !important;
  color: white !important;
  border: 1px solid white !important;
}
:deep(.ant-select-arrow) {
  color: white !important;
}
.box-header {
  padding: 30px;
  color: #ffff;
  display: flex;
  line-height: 50px;
  font-size: 18px;
  font-weight: bold;
  justify-content: space-around;
}
.box-text {
    height: 270px;
    width: 270px;
    background-color: rgb(29, 46, 117);
    border-radius: 5px;
    text-align: center;
    line-height: 100px;
  }
.dashboard-container {
  background-color: #0a1545;
  padding: 16px;
  min-height: 100vh;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  margin-bottom: 24px;
}

.status-col {
  flex: 1;
  /* background: rgb(29, 46, 117); */
  padding: 16px 24px;
  border-radius: 12px;
  /* box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); */
}

.status-title {
  color: #ffffff;
  font-size: 16px;
  margin-bottom: 8px;
}

.status-value {
  font-size: 30px;
  padding: 8px;
  background-color: #00b894;
  color: white;
  border-radius: 6px;
  text-align: center;
}

.filter-section {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  min-height: 32px;
}

.period-selector {
  width: 200px;
}

.dark-select {
  width: 100%;
  background: linear-gradient(145deg, #252b48, #2d325a);
  border-radius: 8px;
}

.stats-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  gap: 24px;
}

.stat-card {
  flex: 1;
  min-width: 0;
  background: linear-gradient(145deg, #252b48, #2d325a);
  border-radius: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.stat-card:hover {
  transform: translateY(-5px);
  background: linear-gradient(145deg, #2d325a, #353b6d);
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #6c5ce7, #00b894);
  opacity: 0;
  transition: opacity 0.3s;
}

.stat-card:hover::before {
  opacity: 1;
}

.stat-content {
  padding: 20px;
  color: white;
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  margin-bottom: 20px;
}

.stat-icons {
  display: flex;
  align-items: center;
  gap: 12px;
}

.warning-icon {
  width: 14px;
  height: 14px;
}

.stat-value {
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 12px;
}

.stat-footer {
  font-size: 12px;
  color: #888;
}

.stat-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  font-size: 18px;
}

.icon-1 { background: rgba(0, 184, 148, 0.2); }
.icon-2 { background: rgba(255, 118, 117, 0.2); }
.icon-3 { background: rgba(108, 92, 231, 0.2); }
.icon-4 { background: rgba(253, 203, 110, 0.2); }

.trend-up {
  color: #00b894;
  display: flex;
  align-items: center;
  gap: 4px;
}

.trend-down {
  color: #ff7675;
  display: flex;
  align-items: center;
  gap: 4px;
}

.table-section {
  background: linear-gradient(145deg, #252b48, #2d325a);
  border-radius: 12px;
  overflow: hidden;
}

.table-header {
  display: flex;
  padding: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.tab-container {
  display: flex;
}

.tab {
  padding: 16px 24px;
  color: #888;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
}

.tab::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: #6c5ce7;
  transition: all 0.3s;
  transform: translateX(-50%);
}

.tab:hover::after {
  width: 30%;
}

.tab.active::after {
  width: 100%;
}

.tab-icon {
  font-size: 18px;
}

.tab.active {
  color: white;
  border-bottom: 2px solid #6c5ce7;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  padding: 16px 24px;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
  background-color: rgba(108, 92, 231, 0.1);
}

td {
  padding: 16px 24px;
  color: rgba(255, 255, 255, 0.85);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.status-tag {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.status-tag.success {
  background-color: rgba(0, 184, 148, 0.2);
  color: #00b894;
  border: 1px solid rgba(0, 184, 148, 0.3);
}

.charts-section {
  margin-top: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

:deep(.dv-dv-border-box1) {
  padding: 8px;
  width: 100%;
  height: 100%;
  --border-color: rgba(108, 92, 231, 0.6);
  --border-width: 3px;
  --border-radius: 12px;
}

.chart-card {
  /* background: linear-gradient(145deg, #252b48, #2d325a); */
  border-radius: 12px;
  padding: 20px;
  box-shadow: none;
  margin: 10px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chart-header h3 {
  color: white;
  margin: 0;
  font-size: 16px;
}

.chart-container {
  height: 300px;
  width: 100%;
}

.chart-select {
  width: 100px;
}

.scroll-board-container {
  padding: 24px;
}

.board-title {
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-icon {
  font-size: 20px;
}

:deep(.dv-border-box-12) {
  width: 100%;
  height: calc(100% - 40px);
  padding: 15px;
}
</style>