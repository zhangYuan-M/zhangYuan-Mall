<template>
  <div class="detail-shop-info">
    <div class="top-part">
      <img :src="shop.logo" />
      <span>{{ shop.name }}</span>
      <div class="more-shop">进店逛逛</div>
    </div>
    <div class="center-part">
      <div class="center1">
        <div class="one">
          <div class="goods-count">{{ shop.fans | showCount }}</div>
          <div class="totle-item">总销量</div>
        </div>
        <div class="two">
          <div class="goods-count">{{ shop.goodsCount }}</div>
          <div class="totle-item">全部宝贝</div>
        </div>
      </div>
      <div class="center2">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.score }}</td>
            <td :class="{ red: showGood(item) == '高' }">
              <span :class="{ green: showGood(item) == '低' }">{{ showGood(item) }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailShopInfo',
  props: {
    shop: Object
  },
  data() {
    return {
      isRed: false
    }
  },
  methods: {
    showGood(item) {
      return item.score > 4.8 ? '高' : '低'
    }
  },
  filters: {
    showCount(value) {
      if (value > 10000) {
        value = (value / 1000).toFixed(1) + '万'
      }
      return value
    }
  }
}
</script>

<style scoped="scoped">
.detail-shop-info {
  padding-top: 18px;
}

.top-part img {
  position: relative;
  left: 0.44rem;
  height: 3.575rem;
  border-radius: 50%;
}

.top-part span {
  position: relative;
  top: -24px;
  left: 1.975rem;
}

.center-part {
  display: flex;
  padding: 20px 20px 10px 24px;
}

.center1,
.center2 {
  flex: 1;
  display: flex;
}
.more-shop {
  background-color: #eaeaf0;
  padding: 7px;
  border-radius: 45%;
  display: inline-block;
  position: absolute;
  right: 22px;
  font-size: 13px;
}

.center1 {
  border-right: 1px solid gainsboro;
}

.one,
.two {
  flex: 1;
}

.totle-item {
  padding-top: 9px;
  font-size: 13px;
  color: black;
  text-align: center;
}

.goods-count {
  font-size: 20px;
  text-align: center;
}

table {
  text-align: center;
  margin-left: 27px;
  font-size: 14px;
  position: relative;
  top: -17px;
}

td {
  font-size: 0.76rem;
  padding: 5px;
}

.red {
  color: #f13e3a;
}

.green {
  color: green;
}
</style>
