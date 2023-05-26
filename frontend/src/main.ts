import { createApp } from "vue";
import "ant-design-vue/dist/antd.less";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";

createApp(App).use(router).use(Antd).mount("#app");
