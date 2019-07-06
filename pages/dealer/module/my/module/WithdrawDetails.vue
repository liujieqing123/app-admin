<template>
	<view class="withdraw_details">
		<view class="money">
			<view class="title">出账金额</view>
			<view class="explain">￥{{InfoList.pdc_amount}}</view>
		</view>
		<view>
			<view class="title">类型</view>
			<view class="explain">支出</view>
		</view>
		<view>
			<view class="title">提现方式</view>
			<view class="explain">{{InfoList.pdc_method}}</view>
		</view>
		<view>
			<view class="title">状态</view>
			<view class="done">{{InfoList.pdc_payment_state}}</view>
		</view>
		<view>
			<view class="title">出账时间</view>
			<view class="explain">{{InfoList.pdc_payment_time | changTime}}</view>
		</view>
		<view>
			<view class="title">备注</view>
			<view class="explain">{{InfoList.remark}}</view>
		</view>
		<view>
			<view class="title">提现完成凭证:</view>
		</view>
		<view class="ph">
			<view class="photo">
				<image :src="InfoList.pdc_pay_img"/>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
	
		},
		data() {
			return {
				pdc_id:'',
				InfoList:{},
				type:''
			}
		},
		onLoad(option) {
			this.pdc_id = option.pdc_id;
			this.type = option.type;
			// 请求数据
			this.GetDepositInfo()
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
			// 请求数据
			GetDepositInfo(){
				this.$api.DepositInfo({
					pdc_id:this.pdc_id,
					type:this.type
				}).then((res) => {
					console.log(res)
					if (res.data.errcode == 0) {
						this.InfoList = res.data.data;
						console.log(this.InfoList)
					}else {
						uni.showToast({
							title: '请求失败',
							icon: 'none',
							duration: 2000
						});
					}
				}).catch((err) => {
					uni.showToast({
						title: err,
						icon: 'none',
						duration: 2000
					});
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.withdraw_details{
		padding: 20upx 30upx;
		view{
			height: 50upx;
			display: flex;
			justify-content: space-between;
			color: #585858;
			font-size: 28upx;
			.explain{
				color: #999;
			}
			.done{
				color: #FF9A85;
			}
		}
		.ph{
			width: 100%;
			height: 300upx;
			display: flex;
			justify-content: center;
			align-items: center;
			.photo{
				width: 300upx;
				height: 300upx;
				image{
					width: 300upx;
					height: 300upx;
				}
			}
		}
		.money{
			height: 130upx;
			border-bottom: 1upx solid #ccc;
			font-size: 30upx;
			line-height: 130upx;
			font-weight: 600;
			margin-bottom: 30upx;
			.explain{
				font-size: 40upx;
				font-weight: 400;
				color: #FF9191;
			}
		}
	}
</style>
