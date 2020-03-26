import axios from 'axios'

export function finalRequest(config) {
	const instance = axios.create({
		baseURL: 'http://106.54.54.237:8000/api/wh',
		timeout: 10000000
	})
	// 使用拦截器，截取有用的数据
	// 拦截响应
	instance.interceptors.response.use(res => {
		// 也是需要返回数据
		return res.data
	}, err => {
		console.log(err)
	})
	// instance axios 实例返回的就是promise实例
	return instance(config)
}
