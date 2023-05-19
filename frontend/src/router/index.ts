import StartPage from "@/modules/StartPage/StartPage.vue";
import AddCard from "@/modules/common/AddCard.vue";
import PersonCard from "@/modules/PersonCard/PersonCard.vue";
import PersonCardAdditionalInfo from "@/modules/PersonCard/components/AdditionalInfo.vue";
import EntityCardAdditionalInfo from "@/modules/EntityCard/components/AdditionalInfo.vue";
import EntityCard from "@/modules/EntityCard/EntityCard.vue";
import PersonRegistry from "@/modules/PersonRegistry/PersonRegistry.vue";
import EntityRegistry from "@/modules/EntityRegistry/EntityRegistry.vue";
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
    path: "/entityRegistry",
    name: "EntityRegistry",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: EntityRegistry,
  },
  {
    path: "/entityRegistry/card/:mode/:id?/mainInfo",
    name: "EntityCard",
    component: EntityCard,
  },
  {
    path: "/entityRegistry/card/:mode/:id?/additionalInfo",
    name: "EntityCardAdditionalInfo",
    component: EntityCardAdditionalInfo,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
