import Vue from 'vue';
import router from './router'
import { powerRouter } from './router';
import store from './store';
import App from './app.vue';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
    if(store.getters.menus && store.getters.menus.length>0){ 
    	if(store.getters.newrouter.length !== 0){  
       		next();
	    }else{
            let newrouter = powerRouter;
            newrouter[0].children = store.getters.menus;
            newrouter[0].redirect = store.getters.menus[0].path;
            router.addRoutes(newrouter) 
            store.dispatch('Roles',newrouter).then(res => { 
                next({ ...to })
            }).catch((e) => {       

            })
	    }	  
    }else{
       	if (['/login'].indexOf(to.path) !== -1) { 
           next()
        } else {
           next('/login')
        }
    }
})
new Vue({
    el:'#app',
    router: router,
    store: store,
    render:h=>h(App)
});

