const getters = {
    username: state => state.login.username,
    role: state => state.login.role,
    newrouter: state => state.login.newrouter,
    menus: state => state.login.menus
  };
  export default getters