<template>
  <div class="detail-goods-info" v-if="Object.keys(goodsInfo).length !== 0">
    <div class="one-part">
      <div>店家寄语：</div>
      <span>{{ goodsInfo.desc }}</span>
    </div>
    <div class="two-part">
      <span>{{ goodsInfo.detailImage[0].key }}</span>
    </div>
    <div class="third-part">
      <div v-for="(item, index) in goodsInfo.detailImage[0].list" :key="index">
        <img :src="item" @load="imgLoadOver" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailGoodsInfo',
  props: {
    goodsInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      totleImage: 0, //获取商品图片的数量
      count: 0 // 加载图片的计数
    }
  },
  created() {
    // console.log(this.goodsInfo)  // 观察者模式？？？
    // this.totleImage = this.goodsInfo.detailImage[0].list.length
  },
  methods: {
    imgLoadOver() {
      if (++this.count === this.totleImage) {
        this.$emit('imgLoadOver')
      }
    }
  },
  watch: {
    goodsInfo() {
      this.totleImage = this.goodsInfo.detailImage[0].list.length
    }
  }
}
</script>

<style scoped="scoped">
.detail-goods-info {
  border-top: 3px solid lightgrey;
}

.one-part {
  color: black;
  padding: 14px;
  font-size: 15px;
  border-bottom: 1px dashed gainsboro;
}

.one-part div {
  font-size: 16px;
  margin-bottom: 6px;
}

.two-part span {
  background-color: rgba(231, 231, 231, 76);
  border-radius: 45%;
  padding: 10px;
  box-shadow: 4px 4px 4px #b4b4b4;
  color: gray;
  position: relative;
  left: -20px;
  /* animation: mymove 5s infinite; */
}

/* 	@keyframes mymove {
		from {
			background-color: #c2c2c2;
		}
		to {
			background-color:#b8b4b8;
		}
	} */

.two-part {
  margin: 20px;
}

img {
  width: 100%;
}
</style>
