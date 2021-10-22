import Axios, { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import qs from 'qs'

interface axiosObj {
    get?: any
    post?: any
    put?: any
    delete?: any
    sendForm?: any
    postForm?: any
}
const baseURL = ''
const axios = Axios.create({
    baseURL,
    timeout: 20000,
})

// 请求拦截器
axios.interceptors.request.use((config: AxiosRequestConfig) =>
    // 可以根据实际情况对config做处理，比如给请求头添加token
    config,
    (error) => Promise.reject(error))

// 响应拦截
axios.interceptors.response.use((response) => response, (error) => {
    if (error.response && error.response.data) {
        const code = error.response.status
        const msg = error.response.data.message
        ElMessage.error(`Code:${code}, Message: ${msg}`)
    } else {
        ElMessage.error(`${error}`)
    }
    return Promise.reject(error)
})

const http: axiosObj = Object.create(null)

http.get = function (url: string, params: any, opts: any = { isShowLoading: true }) {
    const tempUrl = `${url}?${qs.stringify(params, { indices: false })}`
    return axios.get(tempUrl, opts)
}

http.post = function (url: string, params: any, opts: any = { isShowLoading: true }) {
    opts.method = 'post'
    opts.url = url
    opts.data = params
    return axios.request(opts)
}

http.put = function (url: string, params: any, opts: any = { isShowLoading: true }) {
    opts.method = 'put'
    opts.url = url
    opts.data = params
    return axios.request(opts)
}

http.delete = function (url: string, params: any, opts: any = { isShowLoading: true }) {
    opts.method = 'delete'
    opts.url = url
    opts.data = params
    return axios.request(opts)
}

interface fileObj {
    file: any
    [key: string]: any
}
// 上传文件只有file放到formData中，其他的拼接到url
http.sendForm = function (url: string, params: fileObj, opts: any = { isShowLoading: true }) {
    const formData = new FormData() as any
    const otherParam: any = {}
    Object.keys(params).map((key) => {
        if (key === 'file') {
            formData.append(key, params[key])
        } else {
            otherParam[key] = params[key]
        }
        return undefined
    })
    opts.url = `${url}?${qs.stringify(otherParam, { indices: false })}`
    opts.method = 'post'
    opts.data = formData
    return axios.request(opts)
}

export default http
