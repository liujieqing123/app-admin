<template>
	<view class="dealer">
		<view class='tab_item'>
			<DealerIndex v-if="curId===0"></DealerIndex>
			<DealerOrder v-if="curId===1" :usertype = "user_type"></DealerOrder>
			<DealerGoods v-if="curId===2"></DealerGoods>
			<DealerMy v-if="curId===3" :DealerPhone = "dealer_phone" :usertype = "user_type"></DealerMy>
		</view>

		<view class='tab_select'>
			<view @tap="curId=0" :class="{'cur':curId===0}">
				<view class="icon one"></view>
				<view class="title">首页</view>
			</view>
			<view @tap="curId=1" :class="{'cur':curId===1}">
				<view class="icon two"></view>
				<view class="title">订单</view>
			</view>
			<view @tap="curId=2" :class="{'cur':curId===2}">
				<view class="icon tree"></view>
				<view class="title">商品</view>
			</view>
			<view @tap="curId=3" :class="{'cur':curId===3}">
				<view class="icon four"></view>
				<view class="title">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	import DealerIndex from "./module/home/dealer_index.vue";
	import DealerOrder from "./module/order/dealer_order.vue";
	import DealerGoods from "./module/shopGoods/dealer_goods.vue";
	import DealerMy from "./module/my/dealer_my.vue";
	var _self;
	export default {
		components: {
			DealerIndex,
			DealerOrder,
			DealerGoods,
			DealerMy
		},
		data() {
			return {
				curId: 0,
				dealer_phone:'',
				user_type:''
			}
		},
		onLoad(option) {
			_self = this;
			//获取缓存的数据
			 _self.dealer_phone = uni.getStorageSync('phone');
			 _self.user_type = uni.getStorageSync('type');
			 if(option.curId == 2) {
				 this.curId = 2
			 }
			 console.log(this.curId)
			 console.log(option)
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.dealer {
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
			z-index: 99;
			view {
				display: flex;
				justify-content: space-around;
				flex-direction: column;
				align-items: center;

				.icon {
					width: 42upx;
					height: 42upx;
				}

				.one {
					background-image: url('~@/static/images/t5.png');
					background-repeat: no-repeat;
					background-size: 42upx 42upx;
				}

				.two {
					background-image: url('~@/static/images/t1.png');
					background-repeat: no-repeat;
					background-size: 42upx 42upx;
				}

				.tree {
					background-image: url('~@/static/images/t3.png');
					background-repeat: no-repeat;
					background-size: 42upx 42upx;
				}

				.four {
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
				.one {
					background-image: url('~@/static/images/t6.png');
					background-repeat: no-repeat;
					background-size: 42upx 42upx;
				}

				.two {
					background-image: url('~@/static/images/t2.png');
					background-repeat: no-repeat;
					background-size: 42upx 42upx;
				}

				.tree {
					background-image: url('~@/static/images/t4.png');
					background-repeat: no-repeat;
					background-size: 42upx 42upx;
				}

				.four {
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
