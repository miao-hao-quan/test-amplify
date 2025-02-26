<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="header-title">BASIL Monitor</div>
      <div class="nav-menu">
        <div class="nav-item" 
             :class="{'active': currentMenu === 1}" 
             @click="changeMenu(1)">Dashboard</div>
        <div class="nav-item" 
             :class="{'active': currentMenu === 2}" 
             @click="changeMenu(2)">History</div>
        <div class="nav-item" 
             :class="{'active': currentMenu === 3}" 
             @click="changeMenu(3)">Help</div>
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
  background: rgb(10, 21, 69);
  color: white;
  align-items: center;
  padding: 0 24px;
  height: 64px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
}

.ant-layout-header::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: rgba(255, 255, 255, 0.2);
}

.ant-layout-content {
  background: rgba(10,21,69);
}

.header-title {
  font-size: 22px;
  font-weight: 800;
  color: #fff;
}

.nav-menu {
  display: flex;
  margin-left: 30px;
  height: 100%;
  align-items: center;
}

.nav-item {
  position: relative;
  padding: 0 20px;
  margin-left: 30px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  height: 64px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.85);
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: rgb(13, 47, 105);
  transform: scaleX(0);
  transition: transform 0.3s ease;
  border-radius: 3px 3px 0 0;
}

.nav-item:hover::after {
  transform: scaleX(0.3);
}

.nav-item.active {
  color: white;
  position: relative;
  background: rgb(13, 47, 105);
}

.nav-item.active::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: rgb(13, 47, 105);
  opacity: 0.5;
}

.nav-item.active::after {
  transform: scaleX(1);
  box-shadow: 0 0 10px rgba(108, 92, 231, 0.3);
}

.nav-item:hover {
  color: white;
  background: rgba(108, 92, 231, 0.05);
}

:deep(.ant-layout) {
  background: #1e2139;
}
</style>
