<template>
  <div v-if="Object.keys(itemParams).length !== 0">
    <span class="intruduce">商品参数</span>
    <div class="detail-params">
      <table class="params">
        <tr v-for="(item, index) in itemParams.rule.tables[0]" :key="index">
          <td v-for="(item2, indey) in item" :key="indey">{{ item2 }}</td>
        </tr>
      </table>
    </div>
    <div class="show-more">
      <div class="moving" @click="divClick">查看全部</div>
    </div>
    <div class="shop" v-show="isShowDetailParams" ref="showMore">
      <table class="shop-detail">
        <tr v-for="(item, index) in itemParams.info.set" :key="index">
          <td>{{ item.key }}</td>
          <td class="value">{{ item.value }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailParamsInfo',
  props: {
    itemParams: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      isShowDetailParams: false,
      top: 0
    }
  },
  methods: {
    divClick() {
      this.isShowDetailParams = !this.isShowDetailParams
      this.$nextTick(() => {
        this.top = this.$refs.showMore.offsetHeight
      })
    }
  },
  watch: {
    top() {
      this.$emit('showMoreClick', this.top)
    }
  }
}
</script>

<style scoped="scoped">
.params {
  background-color: #f9f9f9;
  padding-left: 15px;
  flex: 1;
  color: black;
  border-collapse: collapse;
}

.params tr {
  text-align: left;
  line-height: 29px;
}

.params td {
  padding: 6px;
  border-bottom: 1px solid #d6d6d6;
}

.detail-params {
  text-align: center;
  display: flex;
  font-size: 14px;
  margin-top: 15px;
}

.shop-detail {
  padding: 10px;
  width: 100%;
  border-collapse: collapse;
}

.shop-detail tr {
  line-height: 41px;
}

.value {
  color: #d9906c;
  width: 75%;
}

.shop {
  padding: 15px;
  font-size: 14px;
  color: black;
}

.shop-detail td {
  border-bottom: 1px solid #d6d6d6;
}

.intruduce {
  padding: 10px;
  margin-bottom: 15px;
  background-color: #efefef;
  border-radius: 40%;
  animation: myMove, 5s infinite;
  box-shadow: 5px 5px 5px lightgray;
}

@keyframes myMove {
  from {
    background-color: #f3f3f3;
  }

  to {
    background-color: #cecece;
  }
}
.show-more {
  display: block;
  /* text-align: center; */
  font-size: 14px;
  line-height: 40px;
  background-color: #f7f7f7;
}
.moving {
  position: relative;
  animation: myfirst, 4s;
  width: 100px;
  height: 40px;
}
/* 	@keyframes myfirst
	{
		0%   {left: 0px;}
		25%  { left: 50px;}
		50%  { left: 100px;}
		75%  { left: 50px;}
		100% {left: 0px;}
	} */
</style>
