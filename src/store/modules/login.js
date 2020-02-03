import { loginByUserInfo }from '../../api/login'
import { userMenus } from '../../api/menu'
const login = {
  state: {
  		username:sessionStorage.getItem('USERNAME'),
  		role:sessionStorage.getItem('ROLE'),
  		introduce:'',
	  	newrouter:[],
	    menus:[],
  },
  mutations: {
  	SET_USERNAME:(state, username) => {
  		state.username = username;
  	},
  	SET_ROLE:(state, role) => {
  		state.role = role;
  	},
  	SET_INTRODUCE:(state, introduce) =>{
  		state.introduce = introduce;
  	},
  	SET_NEWROUER:(state, newrouter) =>{
  		state.newrouter = newrouter;
	},
	SET_MENUS:(state,menus) =>{
		//console.log(menus);
		state.menus = menus;
	}  
  },
  actions: {
  	Logins({ commit }, info){
  		return new Promise((resolve, reject) => {
      		let data={};
      		loginByUserInfo.map(function (item) { //获取所以用户信息
      			if(info.username === item.username || info.pew === item.pew){
      				commit('SET_USERNAME',item.username);  //将username和role进行存储
      				sessionStorage.setItem('USERNAME', item.username); //存入 session 
      				commit('SET_ROLE',item.role);
					sessionStorage.setItem('ROLE', item.role);
					// 获取菜单信息
					let newChildren= [];
					userMenus.forEach(v=>{
						newChildren.push({
							name:v.name,
							path:v.path,
							component:(resolve) => require(['@/'+v.component],resolve)
						});
					});
					commit('SET_MENUS',newChildren);
      				return data={username:item.username,introduce:item.introduce};
      			}else{
      				return data;
      			}
            });  
  		    resolve(data);
        }).catch(error => {
            reject(error);
        });
  	},
  	Roles({ commit }, newrouter){
        return new Promise((resolve, reject) => {
      		commit('SET_NEWROUER',newrouter); //存储最新路由
      		resolve(newrouter);
        }).catch(error => {
            reject(error);
        });
  	},
  	Logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        
          commit('SET_USERNAME','');
          commit('SET_ROLE','');
          commit('SET_NEWROUER',[]);
          location.reload();
          sessionStorage.removeItem('USERNAME');
          sessionStorage.removeItem('ROLE');
          resolve();
        }).catch(error => {
          reject(error);
        });
    },

  }
}
export default login;