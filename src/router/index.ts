import { createRouter, createWebHistory } from 'vue-router'
import applyManager from '../applyManager/index.vue';
import applyManager2 from '../applyManager2/index.vue';
import formDesign from '../formDesign/index.vue';
import Test from '../../package/formDesign/test.vue';

export const myRoutes = [

  {
    path: '/',
    name: 'form',
    title: '',
    component: formDesign
  },{
    path: '/test',
    name: 'home',
    title: '',
    component: Test
  },
  {
    path: '/home1',
    // redirect: '/home1',
    name: 'home1',
    title: '',
    component: applyManager2
  },{
    path: '/form-design',
    // redirect: '/home1',
    name: 'formDesign',
    title: '',
    component: formDesign
  },

];




const router = createRouter({
  history: createWebHistory(),
  routes: myRoutes
})
router.afterEach((to, from) => {
  // 在每次路由跳转后滚动到顶部
  window.scrollTo(0, 0);
});
export default router
