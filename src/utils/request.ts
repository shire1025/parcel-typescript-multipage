import axios from 'axios';
import * as qs from 'qs';
import {
    HTTP_STATUS
} from '../constants/ecode';
import isString from 'lodash/isString';

const http = axios.create({
    baseURL: '/bdsaas/ajax/',
    timeout: 20000,
    responseType: 'json',
    withCredentials: true, // 是否允许带cookie这些
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
    transformRequest: [
        function (data) {
            // console.log('transformRequest', data);
            let m = {
                // token: store.state.token,
                // COMPANYID: store.state.userInfo.companyId
            };
            // console.log('transformRequest', qs.stringify(_.assign(data, m)));
            return qs.stringify(_.assign(data, m));
        }
    ],
    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [function (data) {
        // 这里提前处理返回的数据
        return data;
    }],
    paramsSerializer(data) {
        return qs.stringify(data);
    }
});

// 添加请求拦截器
http.interceptors.request.use((config: any) => {
    //完全不存在token 直接驳回请求，并跳转登录
    if (config.method === 'get') {
        config.params.token = undefined;
    }
    if (config.method === 'post') {
    }
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use((response: any) => {
    // console.log('http', response.data)
    response.data = isString(response.data) ? JSON.parse(response.data) : response.data;
    const data = response.data;
    if (response.request.status && response.request.status === 200) {
        // let msgLen = (data.rspMsg && data.rspMsg.length) || 0;
        switch (Number(data.rspCode)) {
            case HTTP_STATUS.SUCCESS:
                //正常反馈
                return response;
            case HTTP_STATUS.ERROR:
                //参数错误
                // Notice.warning({
                //     title: msgLen > 20 ? '温馨提示' : data.rspMsg,
                //     desc: msgLen > 20 ? data.rspMsg : ''
                // });
                // Promise.reject(response)
                return Promise.reject(response);
            case HTTP_STATUS.AUTHENTICATE:
                //未登录
                return;
            default:
                //额外参数
                return Promise.reject(response);
        }
    } else {
        return response;
    }
    // 对响应数据做点什么
}, function (error: any) {
    console.log('error', error);
    // console.log('error222', error.code, error.message, error.config);
    //请求超时
    if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1 && !error.config._retry) {
        // Notice.destroy();
        // Notice.error({ title: '请求超时，请稍候重试' });
    }
    if (error.request.status === HTTP_STATUS.OK) {
        return;
    }
    //==============  错误处理  ====================
    if (error.response.status) {
        switch (error.response.status) {
            case HTTP_STATUS.BAD_REQUEST:
                error.message = '请求错误(400)';
                break;
            case HTTP_STATUS.CLIENT_AUTH_ERROR:
                error.message = '未授权，请重新登录(401)';
                break;
            case HTTP_STATUS.FORBIDDEN:
                error.message = '拒绝访问(403)';
                break;
            case HTTP_STATUS.NOT_FOUND:
                error.message = '网络请求不存在(404)';
                break;
            case HTTP_STATUS.REQUEST_TIMEDOUT:
                error.message = '请求超时(408)';
                break;
            case HTTP_STATUS.SERVER_ERROR:
                error.message = '服务器错误(500)';
                break;
            case HTTP_STATUS.BAD_GATEWAY:
                error.message = '网络错误(502)';
                break;
            case HTTP_STATUS.SERVICE_UNAVAILABLE:
                error.message = '服务不可用(503)';
                break;
            case HTTP_STATUS.GATEWAY_TIMEOUT:
                error.message = '网络超时(504)';
                break;
            default:
                error.message = `连接出错(${error.response.status})!`;
        }
        // Notice.error({ title: error.message });
    } else {
        error.message = '连接服务器失败!';
    }
    // 对响应错误做点什么
    return Promise.reject(error);
});

/**
 * 封装后的axios 上传方法
 *
 * @param {string} url 请求路径
 * @param {object} formData blob
 * @param {object} [config] 特殊配置项（选填）
 * @returns
 */
http.upload = (url: string, formData: object, config: object = {}) => {
    return http.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        transformRequest: [function (data) {
            return data;
        }],
        ...config
    });
};
export default http;