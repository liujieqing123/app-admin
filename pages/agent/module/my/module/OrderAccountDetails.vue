<template>
	<view class="order_accodetail">
		<view class="money">
			<view class="title">进账金额</view>
			<view class="explain">￥{{InfoList.orderbill_money}}</view>
		</view>
		<view>
			<view>类型</view>
			<view>收入</view>
		</view>
		<view>
			<view>收入方式</view>
			<view>{{InfoList.orderbill_remark}}</view>
		</view>
		<view>
			<view>订单归属</view>
			<view>{{InfoList.dealer_name}}</view>
		</view>
		<view>
			<view>进账时间</view>
			<view>{{InfoList.orderbill_addtime | changTime}}</view>
		</view>
		<view>
			<view>备注</view>
			<view>{{InfoList.orderbill_handle}}</view>
		</view>
		<view>
			<view>订单号</view>
			<view>{{InfoList.orderbill_order_sn}}</view>
		</view>
		<view class="btn">
			<text @tap="ToDetail(InfoList.orderbill_id)">查看该笔订单</text>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
	
		},
		data() {
			return {
				orderbill_id:'',
				type:'',
				InfoList:{},
				//用户类型
				usertype:''
			}
		},
		onLoad(option) {
			this.orderbill_id = option.orderbill_id;
			this.type = option.type;
			this.usertype = option.user_type;
			this.GetDepositInfo();
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
			GetDepositInfo(){
				this.$api.SellDepositInfo({
					orderbill_id:this.orderbill_id,
					type:this.type
				}).then((res) => {
					// console.log(res)
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
			ToDetail(order_id){
				uni.navigateTo({
					url: '/pages/order/orderDetails?order_id=' + order_id+'&usertype='+this.usertype
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order_accodetail{
		padding: 20upx 30upx;
		view {
			height: 50upx;
			display: flex;
			justify-content: space-between;
			color: #585858;
			font-size: 28upx;
			color: #797979;
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
				color: #4DD283;
			}
		}
		.btn{
			height: 65upx;
			width: 100%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			margin-top: 30upx;
			text {
				width: 180upx;
				height: 62upx;
				background-color: #febf66;
				box-shadow: 0upx 6upx 21upx 3upx rgba(224, 156, 28, 0.25);
				border-radius: 10upx;
				font-size: 25upx;
				color: #ffffff;
				text-align: center;
				line-height: 62upx;
			}
		}
	}
</style>
