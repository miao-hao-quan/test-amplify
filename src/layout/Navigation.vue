<template>
  <a-layout class="layout">
    <a-layout-header>
        <div style="font-size: 22px;font-weight: 800;">BASIL Monitor -{{currentMenu == 1?'Dashboard':currentMenu == 2?'History':'Help'}}-</div>
        <div style="display: flex;margin-left: 30px;">
          <div style="margin-left: 30px;font-size: 14px;font-weight: 500;cursor: pointer;" @click="changeMenu(1)">Dashboard</div>
          <div style="margin-left: 30px;font-size: 14px;font-weight: 500;cursor: pointer;" @click="changeMenu(2)">History</div>
          <div style="margin-left: 30px;font-size: 14px;font-weight: 500;cursor: pointer;" @click="changeMenu(3)">Help</div>
        </div>
    </a-layout-header>
    <a-layout-content>
        <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
const router = useRouter();
const currentMenu = ref(1);

const changeMenu = (key:any) => {
  switch (key) {
    case 1:
      router.push({
        path: "/dashboard",
      });
      break;
    case 2:
      router.push({
        path: "/history",
      });
      break;
    case 3:
      router.push({
        path: "/help",
      });
      break;
  }
  currentMenu.value = key
};

onMounted(() => {
  router.push({
    path: "/",
  });
});
</script>

<style scoped>
.ant-layout-header {
  display: flex;
  background: black;
  color: white;
  align-items: center;
}

</style>
