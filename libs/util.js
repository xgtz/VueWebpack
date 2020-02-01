import axios from 'axios';
// 基本配置
const Util={
    apiPath:'http://127.0.0.1:4001/',
}

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Ajax通用配置
Util.ajax = axios.create({
    baseURL: Util.apiPath
});
//添加相应拦截器
Util.ajax.interceptors.response.use( res => {
    return res.data;
});

export default Util;