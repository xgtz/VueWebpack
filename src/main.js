import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from './app.vue';
import Ajax from '../libs/vue-xhr';
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Ajax);

const Routers =[
    {
        path:'/index',
        meta:{ title:'首页'},
        component:(resolve) => require(['./components/index.vue'],resolve)
    },
    {
        path:'/about',
        meta:{title:'关于'},
        component:(resolve) => require(['./components/about.vue'],resolve)
    },
    {
        path:'/user/:id',
        meta:{title:'个人主页'},
        component:(resolve) => require(['./components/user.vue'],resolve)
    },
    {
        path:'/login',
        meta:{title:'登录'},
        component:(resolve) => require(['./components/login.vue'],resolve)
    },
    {
        path:'*',
        redirect:'/index'
    }
];

const RouterConfig={
    mode:'history',
    routes: Routers
}

const router = new VueRouter(RouterConfig);
router.beforeEach((to,from,next) =>{
    window.document.title=to.meta.title;
    var token = window.localStorage.getItem('token');
    if(token){
        next();
    } else{
        if(to.path=='/login'){
            next();
        } else{
            next('/login');
        }
        
    }

   
});
router.afterEach((to,from,next) =>{
    window.scrollTo(0,0);
});


// vuex配置
const store = new Vuex.Store({
    state:{
        count:0,
        list:[1,5,8,10,30,50]
    },
    getters:{
        filteredList: state=>{
            return state.list.filter(item => item<10);
        },
        filteredListCount:(state,getters) =>{
            return getters.filteredList.length;
        }
    },
    mutations:{
        increment(state,params){
            state.count+=params.count;
        }
    },
    actions:{
        increment(context,params){
            return new Promise( resolve =>{
                setTimeout(()=>{
                    context.commit(params);
                    resolve();
                },1000)
            });
        }
    }
});

new Vue({
    el:'#app',
    router: router,
    store: store,
    render:h=>h(App)
});

