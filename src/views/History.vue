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
        <a-input  />
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
        <a-input  />
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
        <button style="width: 60px;padding: 6px;border-radius: 5px;">更新</button>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>種別1</td>
              <td>情報源1</td>
              <td>ファイル名1</td>
              <td>ファイルパス1</td>
              <td>受信時刻1</td>
              <td>download</td>
            </tr>
            <tr>
              <td>2</td>
              <td>種別2</td>
              <td>情報源2</td>
              <td>ファイル名2</td>
              <td>ファイルパス2</td>
              <td>受信時刻2</td>
              <td>download</td>
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
.history-contanier {
  background-color: black;
  padding: 20px;
}
th {
  text-align: left;
  padding: 10px 0px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  background-color: rgb(68, 68, 68);
  padding-left: 18px;
}
td {
  color: rgba(255, 255, 255, 0.8);
  padding: 10px 0px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-left: 18px;
}
label {
  color: white !important;
}
</style>