import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { default as routes, existsRoute } from './routes';

const router = createRouter({
	history: createWebHashHistory(),
	routes
});


// 全局前置导航守卫
router.beforeEach(async (to, from) => {
	if(!existsRoute(to.path)){
		return {name:'NotFound',query:{toPath:to.path}}
	}
	return true;
})

export default router;