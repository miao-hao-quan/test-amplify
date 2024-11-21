<template>
  <div class="dashboard-contanier">
    <a-row type="flex" style="justify-content: space-between; align-items: end">
      <a-col
        style="
          width: 73.6%;
          background-color: rgb(57, 57, 57, 0.8);
          padding: 10px 15px 5px 30px;
        "
      >
        <div style="color: white; margin-bottom: 2px; font-size: 16px">
          システム稼働状況
        </div>
        <div
          style="
            font-size: 30px;
            padding: 4px;
            background-color: rgb(174, 211, 148);
          "
        >
          正常
        </div>
      </a-col>
      <a-col :span="5">
        <div>
          <select
            style="
              width: 100%;
              padding: 8px;
              background-color: rgb(57, 57, 57, 0.8);
              border: none;
              color: gray;
            "
          >
            <option>Last Week</option>
          </select>
        </div>
      </a-col>
    </a-row>
    <a-row
      type="flex"
      style="justify-content: space-between; align-items: end; margin-top: 20px"
    >
      <a-col :span="5" style="background-color: rgb(57, 57, 57, 0.8)">
        <div style="padding: 15px; color: white">
          <div
            style="
              font-size: 16px;
              font-weight: 400px;
              display: flex;
              justify-content: space-between;
            "
          >
            <div>全受信件数</div>
            <div style="display: flex; align-items: center">
              <img
                src="../assets/warn.svg"
                width="14"
                height="14"
                style="margin-right: 20px"
              />
              <MoreOutlined />
            </div>
          </div>
          <div style="margin-top: 30px; font-size: 40px">10,000</div>
          <div
            style="margin-top: 8px; font-size: 12px; color: gray; height: 12px"
          >
            22%
            <CaretDownOutlined style="color: red" />
          </div>
        </div>
      </a-col>
      <a-col :span="5" style="background-color: rgb(57, 57, 57, 0.8)">
        <div style="padding: 15px; color: white">
          <div
            style="
              font-size: 16px;
              font-weight: 400px;
              display: flex;
              justify-content: space-between;
            "
          >
            <div>エラー件数</div>
            <div style="display: flex; align-items: center">
              <MoreOutlined />
            </div>
          </div>
          <div style="margin-top: 30px; font-size: 40px">0</div>
          <div
            style="margin-top: 8px; font-size: 12px; color: gray; height: 12px"
          >
            7%
            <CaretDownOutlined style="color: red" />
          </div>
        </div>
      </a-col>
      <a-col :span="5" style="background-color: rgb(57, 57, 57, 0.8)">
        <div style="padding: 15px; color: white">
          <div
            style="
              font-size: 16px;
              font-weight: 400px;
              display: flex;
              justify-content: space-between;
            "
          >
            <div>リクエスト件数</div>
            <div style="display: flex; align-items: center">
              <MoreOutlined />
            </div>
          </div>
          <div style="margin-top: 30px; font-size: 40px">2,345</div>
          <div
            style="margin-top: 8px; font-size: 12px; color: gray; height: 12px"
          >
            CAD
          </div>
        </div>
      </a-col>
      <a-col :span="5" style="background-color: rgb(57, 57, 57, 0.8)">
        <div style="padding: 15px; color: white">
          <div
            style="
              font-size: 16px;
              font-weight: 400px;
              display: flex;
              justify-content: space-between;
            "
          >
            <div>Foo</div>
            <div style="display: flex; align-items: center">
              <MoreOutlined />
            </div>
          </div>
          <div style="margin-top: 30px; font-size: 40px">1,934</div>
          <div
            style="margin-top: 8px; font-size: 12px; color: gray; height: 12px"
          ></div>
        </div>
      </a-col>
    </a-row>
    <div style="margin-top: 15px; background-color: rgb(57, 57, 57, 0.8);padding-bottom: 200px;">
      <div style="display: flex">
        <div
          style="
            padding: 12px 0px 12px 20px;
            border-top: 2px solid rgb(66, 118, 209);
            color: white;
            width: 150px;
            cursor: pointer;
          "
        >
          受信状況サマリ
        </div>
        <div
          style="
            padding: 12px 0px 12px 20px;
            background-color: rgb(57, 57, 57, 0.8);
            color: gray;
            width: 150px;
            cursor: pointer;
          "
        >
          リクエスト状況
        </div>
      </div>
      <div>
        <table style="width: 100%;">
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
              <td style="color: green;">OK</td>
            </tr>
            <tr>
              <td>例子種別2</td>
              <td>2023-10-01 13:30</td>
              <td>5</td>
              <td style="color: green;">OK</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { CaretDownOutlined, MoreOutlined } from "@ant-design/icons-vue";
</script>

<style scoped>
.dashboard-contanier {
  background-color: black;
  padding: 20px;
}
th{
  text-align: left;
  padding: 10px 0px;
  color: rgba(255, 255, 255, 0.8) ;
  font-weight: 500;
  background-color: rgb(68, 68, 68);
  padding-left: 18px;
}
td{
  color: rgba(255, 255, 255, 0.8) ;
  padding: 10px 0px;
  border-bottom:1px solid rgba(255, 255, 255, 0.2) ;
  padding-left: 18px;
}
</style>