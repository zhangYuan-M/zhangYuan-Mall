<template>
	<div class="check-button">
		<img src="../../../assets/img/cart/tick.svg" :class="{checked: isChecked}"/>
	</div>
</template>

<script>
	export default {
		name: 'CheckButton',
		props: {
			isChecked: {  // 改变这个量可以修改颜色，视图层的修改
				type: Boolean,
				default: false  // 修改模型的变量，不要直接修改这里的数据
			}
		}
	}
</script>

<style scoped="scoped">
	img{
		border-radius: 50%;
		border: 1px solid gainsboro;
	}
	.checked{
		background: hotpink;
	}
</style>
