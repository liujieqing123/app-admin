<template>
	<view class="qrcode">
			<tki-qrcode ref="qrcode" :val="val" :size="size" :icon="icon" :onval="onval" :loadMake="loadMake" @result="qrR"
			 :show="false" />
			 <view class='canvas_module'>
				<canvas canvas-id="myCanvas" style="width:100%;height:100%;background:#fff;borderRadius:8px;" />
			 </view>
		<button @click='but1'>点击</button>

		<!-- <img :src="img_url" alt=""> -->
	</view>
</template>

<script>
import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	export default {
components: {
			tkiQrcode
		},
		data() {
			return {
				img_url: '',
				val: '',
				size: 350,
				icon: '',
				onval: true,
				loadMake: true,
			}
		},
		onLoad(option) {
			// uni.createCanvasContext('myCanvas');
			this.getQrCode()
		},
		mounted() {
			// this.but1()
		},
		methods: {
			getQrCode() {
				let _self = this;
				_self.$api.MyQrcode({}).then((res) => {
					if (res.data.errcode == 0) {
						_self.val = res.data.data.download_url;
						// _self.seller_code = res.data.data.seller_code;
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
				// console.log(path)
				this.img_url = path;
				this.but1()
			},
			but() {
				var url = "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2365173552,1600985734&fm=26&gp=0.jpg"; //图片路径
				const context = uni.createCanvasContext('myCanvas');//创建画布 id为html片段定义
				
				context.drawImage(url,0,0,314,419) //drawImage(图片路径，起点x，起点y，绘制宽，绘制高)
				//draw（false:不需要重新绘制） 需要在回调后保存图片 否则为空白
				context.draw(false,()=>{
					//canvasToTempFilePath：将画布导出为图片并返回路径
					uni.canvasToTempFilePath({
						fileType:'jpg',//降低质量 提升保存速度
						quality:Number(0.5), //降低质量 提升保存速度
						canvasId:'myCanvas',
						success: (res) => {
							console.log(res.tempFilePath);
							//saveImageToPhotosAlbum保存图片到本地相册
							uni.saveImageToPhotosAlbum({
								filePath:res.tempFilePath,
								success: () => {
									uni.hideToast();
									// clearTimeout(timer);
									this.showToast('保存成功')
								}
							})
						}
					})
				})
			},
			but1() {
				const ctx = uni.createCanvasContext('myCanvas');
				let url = "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2365173552,1600985734&fm=26&gp=0.jpg";
				console.log(this.img_url)
				ctx.drawImage(this.img_url, 100, 20, 150, 150)
				ctx.draw()
				// uni.chooseImage({
				// 	success: function(res){
				// 		ctx.drawImage(res.tempFilePaths[0], 0, 0, 150, 100)
				// 		ctx.draw()
				// 	}
				// })

				// uni.canvasToTempFilePath({
				// 	x: 100,
				// 	y: 200,
				// 	width: 50,
				// 	height: 50,
				// 	destWidth: 100,
				// 	destHeight: 100,
				// 	canvasId: 'myCanvas',
				// 	success: function(res) {
				// 		console.log(res.tempFilePath)
				// 		this.img_url = res.tempFilePath
				// 	} 
				// })
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
		.canvas_module {
			width: 350px;
			height: 420px;
			// background: #fff;
			margin: 0 auto;
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
