<template>
	<view class="property">
		<view class="info">
			<view class="advance">
				<view class="AdvanceMun">{{amount.normal_money}}</view>
				<view class="AdvanceMoney">可提现金额</view>
				<button @tap="Withdraw">提现</button>
			</view>
			<view class="account">
				<view class="AccountMun">{{amount.frozen_money}}</view>
				<view class="AccountMoney">待结算金额</view>
				<view class="explain">说明：下个月会自动结算到可提现金额</view>
			</view>
			<view class="launched">
				<view class="title">已发起的提现</view>
				<view class="launlist">
					<view class="list" v-for="(item,index) in withdrawalList" :key="index">
						<text class="date">{{item.pdc_addtime | changTime}}</text>
						<text class="time">提现{{item.pdc_amount}}元</text>
						<text class="state">{{item.pdc_payment_state == 1? '已提现': '处理中'}}</text>
					</view>
					<view class='hint_text' v-if='withdrawalList.length == 0'>没有已发起的提现</view>
				</view>
			</view>
			<view class="PropertyInfo" @tap="Accounts">
				<text>财产明细</text>
				<text class="iconfont icon-zhankai"></text>
			</view>
		</view>

	</view>
</template>

<script>
	var _self;
	export default {
		components: {

		},
		data() {
			return {
				amount: '',
				withdrawalList: {},
				usertype: '',
				
			}
		},
		onLoad(option) {
			_self = this;
			_self.usertype = option.user_type; //传过来的用户类型
			//发起请求(金额)
			this.getMoney();
			//发起请求(提现列表)
			this.getMoneyList();
		},
		filters: {
			changTime(str) {
				let time = new Date(str * 1000);
				let y = time.getFullYear();
				let m = time.getMonth() + 1;
				if (m < 10) {
					m = '0' + m;
				}
				let t = time.getDate();
				if (t < 10) {
					t = '0' + t;
				}
				let h = time.getHours();
				if (h < 10) {
					h = '0' + h;
				}
				let min = time.getMinutes();
				if (min < 10) {
					min = '0' + min;
				}
				let s = time.getSeconds();
				if (s < 10) {
					s = '0' + s;
				}
				let chang_time = y + '-' + m + '-' + t + ' ' + h + ':' + min + ':' + s;
				return chang_time
			}
		},
		methods: {
			//发起请求(金额)
			getMoney(){
				this.$api.SellerMoney({
					
				}).then((res) => {
					_self.amount = res.data.data;
					console.log(_self.amount)
				}).catch((err) => {
					console.log('request fail', err);
				})
			},
			//发起请求(提现列表)
			getMoneyList(){
				this.$api.SellerMoneyLog({
					
				}).then((res) => {
					_self.withdrawalList = res.data.data.data;
					console.log(_self.withdrawalList)
				}).catch((err) => {
					console.log('request fail', err);
				})
			},
			//点击提现，跳转到提现页面
			Withdraw() {
				uni.navigateTo({
					url: './WithdrawDeposit'
				})
			},
			//财产明细
			Accounts() {
				uni.navigateTo({
					url: './DetailedAccounts?user_type='+this.usertype
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.property {
		.info {
			padding: 48upx 31upx 0upx 29upx;

			.advance {
				width: 690upx;
				height: 238upx;
				background-image: linear-gradient(176deg,
					#ff9570 0%,
					#ffc177 100%),
					linear-gradient(#febf66,
					#febf66);
				background-blend-mode: normal, normal;
				border-radius: 10upx;
				padding-top: 53upx;

				.AdvanceMun {
					font-size: 56upx;
					color: #ffffff;
					text-align: center;
					letter-spacing: 5upx;
				}

				.AdvanceMoney {
					font-size: 30upx;
					color: #ffffff;
					text-align: center;
					margin-top: 10upx;
					letter-spacing: 5upx;
				}

				button {
					width: 202upx;
					height: 58upx;
					background-color: #ff6a48;
					border-radius: 29upx;
					font-size: 30upx;
					line-height: 58upx;
					color: #ffffff;
					margin-top: 33upx;
					letter-spacing: 10upx;
				}

			}

			.account {
				width: 690upx;
				height: 238upx;
				background-image: linear-gradient(176deg,
					#ff7272 0%,
					#ffafaf 100%),
					linear-gradient(#febf66,
					#febf66);
				background-blend-mode: normal, normal;
				border-radius: 10upx;
				margin-top: 30upx;
				padding-top: 53upx;

				.AccountMun {
					font-size: 56upx;
					color: #ffffff;
					text-align: center;
					letter-spacing: 5upx;
				}

				.AccountMoney {
					font-size: 30upx;
					color: #ffffff;
					text-align: center;
					margin-top: 10upx;
					letter-spacing: 5upx;
				}

				.explain {
					font-size: 24upx;
					color: #ffffff;
					text-align: center;
					margin-top: 35upx;
					letter-spacing: 5upx;
				}
			}

			.launched {
				margin-top: 64upx;
				padding: 0upx 35upx 0upx 33upx;

				.title {
					font-size: 32upx;
					color: #333333;
					text-align: center;
					margin-bottom: 51upx;
					letter-spacing: 5upx;
				}

				.launlist {
					height: 215upx;
					overflow-y: auto;
					border-radius: 15upx;
					border: 1px solid #f6f6f6;
					.list {
						font-size: 24upx;
						margin-bottom: 30upx;

						.date {
							margin-right: 25upx;
						}

						.time {
							margin-right: 55upx;
							letter-spacing: 5upx;
						}

						.state {
							color: #febf66;
							letter-spacing: 5upx;
						}
					}
				}
				.hint_text {
					text-align: center;
					color: #ccc;
					font-size: 14upx;
					margin-top: 40upx;
				}
			}

			.PropertyInfo {
				margin: 131upx 0upx 30upx 0upx;
				text-align: center;

				text {
					font-size: 28upx;
					color: #999999;
					margin-right: 10upx;
					letter-spacing: 5upx;
				}

				.iconfont {
					font-size: 20upx;
				}
			}

		}
	}
</style>
