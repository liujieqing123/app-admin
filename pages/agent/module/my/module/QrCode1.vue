<template>
	<view class="qrcode">
		<view class="content">
			<tki-qrcode ref="qrcode" :val="val" :size="size" :icon="icon" :onval="onval" :loadMake="loadMake" @result="qrR"
			 :show="false" />
			<view class="wrapper"><canvas style="height: 100%;width: 100%;" canvas-id="firstCanvas"></canvas></view>
		</view>
		<button @tap="saveToAlbum">保存到相册分享</button>
		<!-- <img :src="qr_path" alt="" v-if='imgShow'> -->
	</view>
</template>

<script>
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue" // 生成二维码的组件
	export default {
		components: {
			tkiQrcode
		},
		data() {
			return {
				QrcodeList: '',
				//邀请码
				seller_code: '',
				// 二维码
				val: '',
				size: 350,
				icon: '',
				onval: true,
				loadMake: true,
				cover: '/static/images/t12.png',
				tempFilePath: '',

				// imgShow: false,
			}
		},
		onLoad(option) {
			this.getQrCode();
		},
		methods: {
			//获取二维码和邀请码的请求
			getQrCode() {
				let _self = this;
				_self.$api.MyQrcode({

				}).then((res) => {
					if (res.data.errcode == 0) {
						_self.val = res.data.data.download_url;
						_self.seller_code = res.data.data.seller_code;
					} else {
						uni.showToast({
							title: '请求失败',
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
			qrR(path) {
				console.log(path)
				// this.imgShow = true;
				let that = this;
				this.qr_path = path;
				let system_info = uni.getSystemInfoSync(); //获取手机系统信息
				let ctx = uni.createCanvasContext('firstCanvas'); //在画布上绘制被填充的文本

				// context.drawImage(url,0,0,314,419)
				// 获取图片信息
				// uni.getImageInfo({
				// 	src: that.cover,
				// 	success(res) {
				// 		ctx.drawImage(that.cover, 0, 0, uni.upx2px(632), uni.upx2px(687)); 
				// 		let linearGrad = ctx.createLinearGradient(0, 0, 800, 0);
				// 		linearGrad.addColorStop('0.25', '#8b00d2');
				// 		linearGrad.addColorStop('0.5', '#003fb3');
				// 		linearGrad.addColorStop('0.75', '#ff3ef0');
				// 		ctx.fillStyle = '#FFFFFF';
				// 		ctx.fillRect(uni.upx2px(500), uni.upx2px(790), uni.upx2px(200), uni.upx2px(210));
				// 		ctx.drawImage(path, uni.upx2px(140), uni.upx2px(80), uni.upx2px(350), uni.upx2px(350)); 
				// 		ctx.setFontSize(20);
				// 		ctx.setFillStyle('#333');
				// 		ctx.fillText('邀请码', uni.upx2px(250), uni.upx2px(560));
				// 		ctx.setFontSize(30);
				// 		ctx.setFillStyle('red');
				// 		ctx.fillText(that.seller_code, uni.upx2px(215), uni.upx2px(640));
				// 		ctx.draw(false, () => {
				// 			uni.canvasToTempFilePath({
				// 				x: 0,
				// 				y: 0,
				// 				width: uni.upx2px(632),
				// 				height: uni.upx2px(687),
				// 				destWidth: uni.upx2px(632),
				// 				destHeight: uni.upx2px(687),
				// 				canvasId: 'firstCanvas',
				// 				success: function(res) {
				// 					console.log(res);
				// 					that.tempFilePath = res.tempFilePath;
				// 				},
				// 				fail(e) {
				// 					console.log(e);
				// 					uni.showToast({
				// 						title: '生成海报失败',
				// 						icon: 'none'
				// 					});
				// 				}
				// 			});
				// 		});
				// 	},
				// 	fail(error) {
				// 		console.log(error);
				// 	}
				// });
			},
			//点击保存图片到本地相册
			saveToAlbum() {
				uni.saveImageToPhotosAlbum({
					filePath: this.tempFilePath,
					success: function() {
						console.log('save success');
						uni.showToast({
							title: '保存成功!',
							icon: 'none'
						});
					}
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
	.qrcode {
		width: 100%;
		height: 100vh;
		background-image: url('~@/static/images/t13.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		.content {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			.wrapper {
				width: 633upx;
				height: 687upx;
				display: flex;
				justify-content: center;
				align-items: center;
			}

		}

		button {
			width: 632upx;
			height: 88upx;
			background-color: #febf66;
			box-shadow: 0upx 6upx 21upx 3upx rgba(224, 156, 28, 0.25);
			border-radius: 39upx;
			font-size: 36upx;
			color: #333333;
			letter-spacing: 5upx;
			margin-top: 120upx;
		}
	}
</style>
