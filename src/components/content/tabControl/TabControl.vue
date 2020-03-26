<template>
	<div class="tab-control">
		<div v-for="(item, index) in titles" :key="index" class="tab-control-item" @click="tabClick(index)">
			<span :class="{active :index === currentIndex}">{{item}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'TabControl',
		data() {
			return {
				currentIndex: 0
			}
		},
		methods: {
			tabClick(index) {
				this.currentIndex = index
				this.$emit('tabClick', index)
			}
		},
		props: {
			titles: {
				type: Array,
				default () {
					return {}
				}
			}
		}
	}
</script>

<style>
	.tab-control {
		height: 2.5rem;
		background: white;
		display: flex;
		padding-top: 9px;
	}

	.tab-control-item {
		flex: 1;
		text-align: center;
	}

	.active {
		color: indianred;
		border-bottom: solid indianred 2px;
		padding: 5px;
	}
</style>
