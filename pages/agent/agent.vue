<template>
	<view class="agent">
		<view class='tab_item'>
			<AgentIndex v-if="cur_id === 0"></AgentIndex>
			<AgentOrder v-if="cur_id === 1" :usertype = "user_type"></AgentOrder>
			<AgentDealer v-if="cur_id === 2"></AgentDealer>
			<AgentMy v-if="cur_id === 3" :usertype = "user_type"></AgentMy>
		</view>

		<view class='tab_select'>
			<view @tap="curId(0)" :class="{'cur':cur_id===0}">
				<view class="icon one"></view>
				<view class="title">首页</view>
			</view>
			<view @tap="curId(1)" :class="{'cur':cur_id===1}">
				<view class="icon two"></view>
				<view class="title">订单</view>
			</view>
			<view @tap="curId(2)" :class="{'cur':cur_id===2}">
				<view class="icon tree"></view>
				<view class="title">经销商</view>
			</view>
			<view @tap="curId(3)" :class="{'cur':cur_id===3}">
				<view class="icon four"></view>
				<view class="title">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	import AgentIndex from "./module/home/agent_index.vue";
	import AgentOrder from "./module/order/agent_order.vue";
	import AgentDealer from "./module/dealerList/agent_dealer.vue";
	import AgentMy from "./module/my/agent_my.vue";
	var _self;
	export default {
		components: {
			AgentIndex,
			AgentOrder,
			AgentDealer,
			AgentMy
		},
		data() {
			return {
				cur_id: 0,
				user_type:''
			}
		},
		onReady() {
			
		},
		onLoad() {
			_self = this;
			//获取缓存的数据
			//获取缓存的数据
			 _self.user_type = uni.getStorageSync('type');
		},
		methods: {
			//tabbar切换
			curId(str) {
				_self.cur_id = str;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.agent {
		.tab_item {}

		.tab_select {
			width: 750upx;
			height: 98upx;
			background-color: #fff;
			box-shadow: 0upx 6upx 54upx 14upx rgba(120, 62, 15, 0.08);
			display: flex;
			justify-content: space-around;
			position: fixed;
			left: 0upx;
			bottom: 0upx;

			view {
				display: flex;
				justify-content: space-around;
				flex-direction: column;
				align-items: center;
				.icon {
					width: 42upx;
					height: 42upx;
				}
				.one{
					background-image: url('~@/static/images/t5.png');
					background-repeat: no-repeat;
					background-size: 42upx 42upx;
				}
				.two{
					background-image: url('~@/static/images/t1.png');
					background-repeat: no-repeat;
					background-size: 42upx 42upx;
				}
				.tree{
					background-image: url('~@/static/images/t16.png');
					background-repeat: no-repeat;
					background-size: 42upx 42upx;
				}
				.four{
					background-image: url('~@/static/images/t8.png');
					background-repeat: no-repeat;
					background-size: 42upx 42upx;
				}
				.title {
					font-size: 24upx;
					color: #999999;
				}
			}

			.cur {
				.one{
					background-image: url('~@/static/images/t6.png');
					background-repeat: no-repeat;
					background-size: 42upx 42upx;
				}
				.two{
					background-image: url('~@/static/images/t2.png');
					background-repeat: no-repeat;
					background-size: 42upx 42upx;
				}
				.tree{
					background-image: url('~@/static/images/t15.png');
					background-repeat: no-repeat;
					background-size: 42upx 42upx;
				}
				.four{
					background-image: url('~@/static/images/t9.png');
					background-repeat: no-repeat;
					background-size: 42upx 42upx;
				}
				.title {
					color: #febf66;
				}
			}

		}
	}
</style>
