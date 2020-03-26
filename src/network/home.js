import {
	finalRequest
} from './request.js'

// 获取首页的展示数据
export function getHomeAllData() {
	return finalRequest({
		url: '/home/multidata',
		method: 'get'
	})
}

// 获取商品的详细数据，包括上拉加载的数据
export function getHomeData(type, page) {
	return finalRequest({
		url: '/home/data',
		params: {
			type,
			page
		}
	})
}
