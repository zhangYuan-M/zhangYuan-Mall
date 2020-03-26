import {finalRequest} from './request.js'

export function getDetailData(iid) {
	return finalRequest({
		url: '/detail',
		params: {
			iid
		}
	})
}

export function getRecommendData() {
	return finalRequest({
		url: '/recommend'
	})
}

// DetailBaseInfo 组件的展示数据
export class GoodsInfoBase {
	constructor(itemInfo, columns, services) {
	  this.desc = itemInfo.desc
		this.lowNowPrice = itemInfo.lowNowPrice	
		this.oldPrice = itemInfo.oldPrice
		this.discountDesc = itemInfo.discountDesc
		this.columns = columns  // 数组
		this.services = services  // 数组
		this.title = itemInfo.title
	}
}

// 商家的信息
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}