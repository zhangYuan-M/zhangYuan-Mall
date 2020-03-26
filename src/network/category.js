import {finalRequest} from './request.js'

export function getCategory() {
	return finalRequest({
		url: '/category',
		method: 'get'
	})
}

export function getCategoryMaitKey(maitKey) {
	return finalRequest({
		url: '/subcategory',
		params: {
			maitKey
		}
	})
}

export function getCategoryMiniWallkey(miniWallkey, type) {
	return finalRequest({
		url: '/subcategory/detail',
		params: {
			miniWallkey,
			type
		}
	})
}