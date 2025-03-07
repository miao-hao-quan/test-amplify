// import "./assets/main.css";
import { createApp } from "vue";
import DataVVue3 from '@kjgl77/datav-vue3';
import Antd from 'ant-design-vue';
import router from '@/router'
import App from "./App.vue";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import 'ant-design-vue/dist/reset.css';

Amplify.configure(outputs);

const app = createApp(App);
app.use(DataVVue3)
app.use(Antd).use(router).mount('#app')
