import axios from 'axios' // 引入



// 封装post,get方法
export default class http  {
     #axios;
    constructor (baseURL) {
        this.#axios = axios.create({
        baseURL: baseURL,
        // 因为跨域了，所以这里如果写的话会自动拼接，会有两份，所以隐藏了
        timeout: 30000 // 设置最大请求时间
    });

// /* 请求拦截器（请求之前的操作） */
    this.#axios.interceptors.request.use(
        config => {
            // 如果有需要在这里开启请求时的loading动画效果
            // config.headers.Authorization = getToken  //添加token,需要结合自己的实际情况添加，
            return config
        },
        err => Promise.reject(err)
    );
// /* 请求之后的操作 */
        this.#axios.interceptors.response.use((res) => {
                console.log(res)
                // 在这里关闭请求时的loading动画效果
                // 这里用于处理返回的结果，比如如果是返回401无权限，可能会是跳回到登录页的操作，结合自己的业务逻辑写
                // 一定结合自己的后端的返回代码进行操作
                // if (res.data.code === 401) {
                //   console.log('无权限操作')
                // }
                return res
            },
            err => {
                if (err) {
                    // 在这里关闭请求时的loading动画效果
                    console.log('请求网络失败', err)
                }
                return Promise.reject(err)
            }
        )
    }

    get ({url , params }) {
        return new Promise((resolve, reject) => {
            this.#axios({
                url,
                params,
                headers: { 'Content-Type': 'application/json;charset=UTF-8' },
                method: 'GET'
            }).then(res => {
                resolve(res.data)
                return res
            }).catch(error => {
                reject(error)
            })
        })
    };
    post ({url, params }) {
        return new Promise((resolve, reject) => {
            this.#axios({
                url,
                data: params,
                headers: { 'Content-Type': 'application/json;charset=UTF-8' },
                method: 'POST'
            }).then(res => {
                resolve(res.data)
                return res
            }).catch(error => {
                reject(error)
            })
        })
    }
}

