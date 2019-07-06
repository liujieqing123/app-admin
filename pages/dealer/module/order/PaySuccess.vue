<template>
	<view class="release">
		<view class=" NotOpened">
			<view class="photo">
				<image src="../../static/images/success.png"/>
			</view>
			<view class="hint">支付成功</view>
			<button @tap='openHome'>返回首页</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {

		},
		methods: {
			openHome() {
			  uni.redirectTo({
			    url: '../Dealer/dealer'
			  });
			}
		}
	}
</script>

<style lang="scss" scoped="">
	.release {
		.NotOpened {
			padding-top: 254upx;
			.photo {
				width: 353upx;
				height: 275upx;
				margin: 0upx 198upx 0upx 199upx;
				image {
					width: 353upx;
					height: 275upx;
				}
			}
			.hint {
				font-size: 40upx;
				font-weight: 600;
				color: #febf66;
				text-align: center;
				margin-top: 31upx;
			}
			button {
				width: 632upx;
				height: 88upx;
				background-color: #febf66;
				box-shadow: 0upx 6upx 21upx 3upx rgba(224, 156, 28, 0.25);
				border-radius: 39upx;
				font-size: 36upx;
				color: #333333;
				margin-top: 386upx;
			}
		}
	}
</style>
