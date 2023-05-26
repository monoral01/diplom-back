import StartPage from "@/modules/StartPage/StartPage.vue";
import AddCard from "@/modules/common/AddCard.vue";
import PersonCard from "@/modules/PersonCard/PersonCard.vue";
import PersonCardAdditionalInfo from "@/modules/PersonCard/components/AdditionalInfo.vue";
import CompanyCardAdditionalInfo from "@/modules/CompanyCard/components/AdditionalInfo.vue";
import CompanyCard from "@/modules/CompanyCard/CompanyCard.vue";
import PersonRegistry from "@/modules/PersonRegistry/PersonRegistry.vue";
import CompanyRegistry from "@/modules/CompanyRegistry/CompanyRegistry.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "StartPage",
    component: StartPage,
  },
  {
    path: "/addCard",
    name: "AddCard",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AddCard,
  },
  {
    path: "/personRegistry",
    name: "PersonRegistry",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: PersonRegistry,
  },
  {
    path: "/personRegistry/card/:mode/:id?/mainInfo",
    name: "PersonCard",
    component: PersonCard,
  },
  {
    path: "/personRegistry/card/:mode/:id?/additionalInfo",
    name: "PersonCardAdditionalInfo",
    component: PersonCardAdditionalInfo,
  },
  {
    path: "/companyRegistry",
    name: "CompanyRegistry",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: CompanyRegistry,
  },
  {
    path: "/companyRegistry/card/:mode/:id?/mainInfo",
    name: "CompanyCard",
    component: CompanyCard,
  },
  {
    path: "/companyRegistry/card/:mode/:id?/additionalInfo",
    name: "CompanyCardAdditionalInfo",
    component: CompanyCardAdditionalInfo,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
