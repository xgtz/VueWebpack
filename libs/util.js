
import axios from 'axios';
import config from '../static/project.config.json';

//console.log(config);
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 基本配置
const Util={
    apiPath:config.apiPath,
}
// Ajax通用配置
Util.ajax = axios.create({
    baseURL: Util.apiPath
});
//添加相应拦截器
Util.ajax.interceptors.response.use( res => {
    return res.data;
});

export default Util;