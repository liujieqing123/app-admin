<template>
	<view class="DealerIndex">
		<!-- 头部 -->
		<view class="header">
			<view class="header_info">
				<view class="header_title">今日收入</view>
				<view class="header_number">￥{{sales_list.todayincome}}</view>
			</view>
			<view class="line"></view>
			<view class="header_info">
				<view class="header_title">当月收入</view>
				<view class="header_number">￥{{sales_list.monthincome}}</view>
			</view>
		</view>

		<!-- tab -->
		<view class="tab">
			<view @tap="seleItem(index)" :class="{active_style:sel === index}" v-for="(item,index) in list" :key="index">
				<text>{{item}}</text>
				<text class="tab_line"></text>
			</view>
		</view>

		<!-- 销量信息 -->
		<view class="SalesInfo">
			<view class="ShopInfo" v-if="sel == 0">
				<view class="title">昨天订单量</view>
				<view class="number">{{sales_list.yesterdayOrderCount}}</view>
			</view>
			<view class="ShopInfo" v-if="sel == 1">
				<view class="title">今日订单量</view>
				<view class="number">{{sales_list.todaydayOrderCount}}</view>
			</view>
			<view class="ShopInfo" v-if="sel == 2">
				<view class="title">当月订单量</view>
				<view class="number">{{sales_list.thisMonthOrderCount}}</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: ["昨天订单量", "今日订单量", "当月订单量"],
				sel: 0,
				sales_list: {}
			}
		},
		mounted() {
			// 请求数据
			this.geData()
		},
		onLoad() {

		},
		methods: {
			// 获取数据
			geData() {
				this.$api.DealerIndex({
					
				}).then((res) => {
					if (res.data.errcode == 0) {
						this.sales_list = res.data.data;
					} else {
						uni.showToast({
							title: '获取数据失败',
							icon: 'none',
							duration: 2000
						});
					}

				}).catch((err) => {
					uni.showToast({
						title: '请求异常',
						icon: 'none',
						duration: 2000
					});
				})
			},
			// 选项卡切换
			seleItem(index) {
				this.sel = index;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.DealerIndex {
		position: relative;

		.header {
			height: 193upx;
			padding-top: 155upx;
			background-image: linear-gradient(150deg,
				#ffad7b 0%,
				#febf66 100%),
				linear-gradient(#e74c3c,
				#e74c3c);
			background-blend-mode: normal,
				normal;
			display: flex;
			justify-content: center;

			.header_info {
				height: 128upx;
				padding: 0upx 74upx 0upx 74upx;
				letter-spacing: 5upx;

				.header_title {
					font-size: 32upx;
					color: #ffffff;
					text-align: center;
				}

				.header_number {
					font-size: 40upx;
					color: #ffffff;
					text-align: center;
				}
			}

			.line {
				width: 5upx;
				height: 128upx;
				background-color: #ffffff;
				border-radius: 2upx;
				opacity: 0.16;
			}
		}

		.tab {
			width: 100%;
			height: 66upx;
			margin-top: 36upx;
			border-bottom: 1upx solid #F1F0F0;
			display: flex;
			justify-content: space-around;
			letter-spacing: 5upx;

			view {
				width: 33.33%;
				font-size: 32upx;
				color: #9aabb8;
				display: flex;
				justify-content: space-between;
				flex-direction: column;
				align-items: center;
				font-weight: 600;

				.tab_line {
					width: 64upx;
					height: 8upx;
				}
			}

			.active_style {
				color: #333333;

				.tab_line {
					width: 64upx;
					height: 8upx;
					background-image: linear-gradient(-28deg,
						#ffad7b 0%,
						#febf66 100%),
						linear-gradient(#e74c3c,
						#e74c3c);
					background-blend-mode: normal,
						normal;
					border-radius: 4upx;
				}
			}
		}

		// 销量信息
		.SalesInfo {
			display: flex;
			justify-content: center;

			.ShopInfo {
				margin-top: 211upx;
				letter-spacing: 5upx;
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;

				.title {
					font-size: 40upx;
					color: #febe67;
				}

				.number {
					font-size: 98upx;
					color: #febf66;
				}
			}
		}

	}
</style>
