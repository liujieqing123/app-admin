<template>
	<view class="changePrice">
		<view class="info">
			<view class="delect">
				<text class="iconfont icon-guanbi2" @tap="CloseChan"></text>
			</view>
			<view class="title">修改订单价格</view>
			<view class="inpu">
				<input placeholder="请输入修改后的价格" v-model="changePrice"/>
			</view>
			<button @tap="ConfirmChange(changePrice)">确认修改</button>
		</view>
		<view class="mak"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//input中输入的价格
				changePrice:''
			}
		},
		onLoad() {

		},
		methods: {
			//关闭弹窗
			CloseChan() {
				this.$emit('close')
			},
			//确认并关闭弹窗，也可以传参，第二个参数就是要传递的参数
			ConfirmChange(changePrice){
				this.$emit('Confirm',changePrice)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.changePrice {
		width: 100%;
		height: 100%;

		.info {
			width: 592upx;
			height: 496upx;
			background-color: white;
			border-radius: 20upx;
			z-index: 99999;
			position: fixed;
			top: 329upx;
			left: 79upx;
			.delect {
				display: flex;
				justify-content: flex-end;
				margin: 30upx 30upx 0upx 0upx;

				.icon-guanbi2 {
					font-size: 44upx;
					color: #cecece;
				}
			}

			.title {
				font-size: 32upx;
				color: #333333;
				margin-top: 40upx;
				text-align: center;
				letter-spacing: 5upx;
			}

			.inpu {
				padding-left: 97upx;
				margin-top: 63upx;
				letter-spacing: 5upx;
				input {
					width: 399upx;
					height: 68upx;
					border: solid 2upx #cecece;
					font-size: 28upx;
					color: #999999;
					text-align: center;
					line-height: 68upx;
				}
			}
			button {
				width: 214upx;
				height: 68upx;
				background-color: #febf66;
				box-shadow: 0upx 6upx 21upx 3upx rgba(224, 156, 28, 0.25);
				border-radius: 34upx;
				font-size: 36upx;
				color: #ffffff;
				line-height: 68upx;
				margin-top: 58upx;
				letter-spacing: 5upx;
				padding: 0upx;
			}
		}
		.mak {
			width: 100%;
			height: 100%;
			background: #A8A8A8;
			position: fixed;
			top: 0;
			left: 0;
			opacity: 0.4;
		}
	}
</style>
