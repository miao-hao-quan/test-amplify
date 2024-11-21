import  Layout from '@/layout/Navigation.vue';

const routes = [
    {
        path: "/",
        component: Layout,
        redirect: '/dashboard',
        children:[
            {
                path: '/dashboard',
                name: 'dashboard',
                component: () => import('@/views/Dashboard.vue'),
                meta: {title: 'dashboard'}
            }
        ]
    },
    {
        path: "/history",
        component: Layout,
        redirect: '/history',
        children:[
            {
                path: '/history',
                name: 'history',
                component: () => import('@/views/History.vue'),
                meta: {title: 'History'}
            }
        ]
    }
]

// 判断路由是否存在
const existsRoute_inner = (path:any, theRoutes:any) => {
    for (let i = 0; i < theRoutes.length; i++) {
        const r = theRoutes[i];
        if (r.path == path) {
            return true;
        }
        if (r.children && r.children.length) {
            const existsInChildren = existsRoute_inner(path, r.children);
            if (existsInChildren) return true;
        }
    }
    return false;
};

export const existsRoute = (path:any) => {

    return existsRoute_inner(path, routes);

};

export default routes;