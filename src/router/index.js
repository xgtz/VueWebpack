import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Index from '@/components/index'
Vue.use(Router)

// const red = { template: '<div style="background-color:#de5b5b;color:#fff; font-size:30px;line-height:100px;text-align:center;">red页面</div>' }
// const yellow = { template: '<div style="background-color:#dee066;color:#fff; font-size:30px;line-height:100px;text-align:center;">yellow页面</div>' }
// const blue = { template: '<div style="background-color:#6680e0;color:#fff; font-size:30px;line-height:100px;text-align:center;">blue页面</div>' }

export default new Router({
    mode:'history',
    routes:[
        {
            path:'/login',
            name:'Login',
            component:Login
        }
    ]
});

export const powerRouter = [
    {
        path:'/',redirect:'/red',name:'index',component:Index,hidden:false,
        children:[
            // {path:'/red',name:'red',component:(resolve) => require(['@/components/header/red'],resolve)},
            // {path:'/yellow',name:'yellow',component:(resolve) => require(['@/components/header/yellow'],resolve),meta:{role:'B'}},
            // {path:'/blue',name:'blue',component:(resolve) =>require(['@/components/header/blue'],resolve),meta:{role:'C'}}
        ]
    }
];
