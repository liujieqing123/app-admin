<template>
	<view class="AgentIndex">
		<!-- 头部 -->
		<view class="header">
			<view class="header_info">
				<view class="header_title">今日收入</view>
				<view class="header_number">￥{{Income_list.todayincome}}</view>
			</view>
			<view class="line"></view>
			<view class="header_info">
				<view class="header_title">当月收入</view>
				<view class="header_number">￥{{Income_list.monthincome}}</view>
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
			<view class="ShopInfo" v-for="(item,index) in seller_list" :key="index">
				<view>
					<view class="photo">
						<image :src="item.avatar" />
					</view>
					<text class="ShopName">{{item.shop_name}}</text>
				</view>
				<view v-if="sel == 0">
					<text class="ShopSales">昨天销量：</text>
					<text class="ShopName">{{item.yesterdayOrderCount}}</text>
				</view>
				<view v-if="sel == 1">
					<text class="ShopSales">今日销量：</text>
					<text class="ShopName">{{item.todaydayOrderCount}}</text>
				</view>
				<view v-if="sel == 2">
					<text class="ShopSales">当月销量：</text>
					<text class="ShopName">{{item.thisMonthOrderCount}}</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: ["昨天销量", "今日销量", "当月销量"],
				sel: 0,
				seller_list: [],
				Income_list: {}
			}
		},
		mounted() {
			//发起请求(列表数据)
			this.getListData();
			//发起请求(今日收入当月收入数据)
			this.getIncome();
		},
		onLoad() {

		},
		methods: {
			//请求列表数据
			getListData() {
				this.$api.AgentIndex({}).then((res) => {
					if(res.data.errcode === 0) {
						this.seller_list = res.data.data;
					}
				}).catch((err) => {
					uni.showToast({
						title: '请求异常',
						icon: 'none',
						mask: true
					});
				})
			},
			//请求今日收入当月收入数据
			getIncome() {
				this.$api.SellerIncome({}).then((res) => {
					if(res.data.errcode === 0) {
						this.Income_list = res.data.data;
					}
				}).catch((err) => {
					uni.showToast({
						title: '请求异常',
						icon: 'none',
						mask: true
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
	.AgentIndex {
		.header {
			height: 198upx;
			padding-top: 150upx;
			background-image: linear-gradient(150deg,
				#ffad7b 0%,
				#febf66 100%),
				linear-gradient(#e74c3c,
				#e74c3c);
			background-blend-mode: normal,
				normal;
			display: flex;
			justify-content: center;
			align-items: center;

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
			height: 66upx;
			padding: 0upx 114upx 0upx 114upx;
			margin-top: 36upx;
			border-bottom: 1upx solid #F1F0F0;
			display: flex;
			justify-content: space-around;
			letter-spacing: 5upx;

			view {
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
			padding: 66upx 30upx 0upx 30upx;

			.ShopInfo {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 35upx;

				view {
					font-size: 32upx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.photo {
						width: 88upx;
						height: 88upx;
						overflow: hidden;
						display: flex;
						justify-content: flex-start;
						align-items: center;
						border-radius: 100%;
						margin-right: 10upx;
						border: 1px solid #f1f1f1;
						image {
							width: 100%;
							height: 100%;
						}
					}

					.ShopName {
						color: #666666;
						letter-spacing: 5upx;
					}

					.ShopSales {
						color: #999999;
						letter-spacing: 5upx;
					}
				}
			}
		}

	}
</style>
