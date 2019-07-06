<template>
	<view class="edit">
		<!-- 编辑商品 -->
		<view class='go_back' @tap='goBack'>返回</view>
		<view class="Info">
			<view class="title">标题：</view>
			<view class="inpt">
				<input placeholder="请输入标题" v-model='goods_info.goods_total_name' />
			</view>
		</view>
		<!-- 商品封面图 -->
		<view class="Info">
			<view class="title">商品封面图：</view>
			<view class="upload_cover">
				<view class="frame" type="primary" :loading="loading" :disabled="disabled" @tap="chooseImage(-1,'goods_image')">
					<image :src="goods_info.goods_images" />
				</view>
			</view>
		</view>
		<view class="Info">
			<view class="title">商品描述：</view>
			<view class="multi">
				<textarea placeholder="请输入商品描述" maxlength="-1" v-model='goods_info.goods_describe'></textarea>
			</view>
		</view>
		<view class="Info">
			<view class="title">价格：</view>
			<view class="inpt">
				<input type='number' placeholder="请输入价格" v-model='goods_info.goods_price' />
			</view>
		</view>
		<!-- 商品图片 -->
		<view class="Info">
			<view class="title">商品图片：</view>
			<view class="upload_cover">
				<view class="frame" type="primary" :loading="loading" :disabled="disabled" @click="chooseImage(img_index,'goods_slides')"
				 v-for='(imgItem,img_index) in imgArr' :key='img_index'>
					<image :src="imgItem.img_url" />
				</view>
			</view>
		</view>
		<view class="Info">
			<view class="title">添加水印：</view>
			<radio-group @change="radioChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
					<view class="but">
						<radio :value="item.value" :checked="index === current" />
					</view>
					<view class="expl">{{item.name}}</view>
				</label>
			</radio-group>
		</view>
		<button @tap='releaseGoods'>提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [{
						value: '1',
						name: '是'
					},
					{
						value: '0',
						name: '否'
					}
				],
				current: 0,
				loading: false,
				disabled: false,
				goods_id: '',
				goods_info: {},
				// 水印类型
				type:'1',
				imgArr: [{
						id: 0,
						img_url: ''
					},
					{
						id: 1,
						img_url: ''
					},
					{
						id: 2,
						img_url: ''
					},
					{
						id: 3,
						img_url: ''
					},
					{
						id: 4,
						img_url: ''
					}
				],
			}
		},
		onLoad(option) {
			this.goods_id = option.goodsId;
			// 获取编辑商品数据
			this.getData();
		},
		methods: {
			// 返回
			goBack() {
				// uni.navigateBack({
				// 		delta: 1
				// });
				uni.redirectTo({
					url: '/pages/dealer/dealer?curId=2'
				})
			},
			// 获取编辑商品数据
			getData() {
				this.$api.getEditGoods({
					goods_id: this.goods_id,
				}).then((res) => {
					console.log(res.data.data)
					if (res.data.errcode == 0) {
						this.goods_info = res.data.data;
						for (let k = 0; k < res.data.data.goods_slides.length; k++) {
							if (k == this.imgArr[k].id) {
								this.imgArr[k].img_url = res.data.data.goods_slides[k]
							}
						}
					} else {
						uni.showToast({
							title: '请求失败',
							icon: 'none',
							duration: 2000
						});
					}
				}).catch((err) => {
					this.load_text_show = false;
					uni.showToast({
						title: err,
						icon: 'none',
						duration: 2000
					});
				})
			},
			//选择图片
			chooseImage: async function(index, name) {
				let self = this;
				uni.chooseImage({
					sourceType: ['album', 'camera '],
					sizeType: ['original', 'compressed'],
					count: 1,
					success: (res) => {
						// 上传图片
						const uploadTask = uni.uploadFile({
							url: 'https://xt.dfbtds.com/api_app/Goods/uploadFile',
							header:{"Authorization": uni.getStorageSync('token')},
							filePath: res.tempFilePaths[0],
							name: name,
							formData: {
								name: name,
							},
							success: function(res) {
								let res_data = JSON.parse(res.data)
								if (index == '-1') {
									if (res_data.errcode == 0) {
										self.goods_info.goods_images = 'https://xt.dfbtds.com/'+res_data.data.goods_image;
										console.log(self.goods_info.goods_images)
									} else {
										console.log('上传失败')
									}
								} else {
									if (res_data.errcode == 0) {
										for (let k = 0; k < self.imgArr.length; k++) {
											if (self.imgArr[k].id == index) {
												self.imgArr[k].img_url = 'https://xt.dfbtds.com/'+res_data.data.goods_slides
											}
										}
									} else {
										console.log('上传失败')
									}
								}
							},
							fail: function(err) {
								console.log(err)
							}
						});
					}
				})
			},
			// 点击提交
			releaseGoods() {
				if (this.goods_info.goods_total_name == '') {
					uni.showToast({
						title: '请填写商品标题',
						icon: 'none',
						duration: 2000
					});
					return
				}
				if (this.goods_info.goods_images == '') {
					uni.showToast({
						title: '请上传商品封面图',
						icon: 'none',
						duration: 2000
					});
					return
				}
				if (this.goods_info.goods_describe == '') {
					uni.showToast({
						title: '请填写商品描述',
						icon: 'none',
						duration: 2000
					});
					return
				}
				if (this.goods_info.goods_price == '') {
					uni.showToast({
						title: '请填写商品价格',
						icon: 'none',
						duration: 2000
					});
					return
				}
				if (this.imgArr[0].img_url == '') {
					uni.showToast({
						title: '请上传商品图片',
						icon: 'none',
						duration: 2000
					});
					return
				}
				uni.showToast({
					title: '提交中...',
					icon: 'none',
					duration: 1300
				});
				// 请求提交商品接口
				this.addGoods()
			},
			// 提交编辑的商品
			addGoods() {
				let img_arr = [];
				for (let j = 0; j < this.imgArr.length; j++) {
					img_arr.push(this.imgArr[j].img_url)
				}
				this.$api.editGoods({
					goods_id: this.goods_id,
					goods_total_name: this.goods_info.goods_total_name,
					goods_images: this.goods_info.goods_images,
					goods_describe: this.goods_info.goods_describe,
					goods_price: this.goods_info.goods_price,
					goods_slides: img_arr,
					is_water: this.type
				}).then((res) => {
					console.log(res)
					if (res.data.errcode == 0) {
						uni.showToast({
							title: '商品编辑成功',
							icon: 'success',
							duration: 2000
						});

					} else {
						uni.showToast({
							title: '提交失败',
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
			//选择按钮
			radioChange: function(evt) {
				this.type = evt.detail.value; //声明一个变量用来放点击点选按钮的内容
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.edit {
		padding: 0upx 30upx 0upx 30upx;
		.go_back {
			width: 100upx;
			height: 50upx;
			border: 1px solid #999;
			border-radius: 8upx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 30upx;
			color: #666;
			margin-top: 30upx;
		}
		.Info {
			margin-top: 50upx;

			.title {
				font-size: 28upx;
				color: #333333;
				margin-bottom: 29upx;
			}

			.inpt {
				width: 690upx;
				height: 76upx;
				border-radius: 10upx;
				border: solid 2upx #cecece;

				input {
					width: 660upx;
					height: 78upx;
					border-radius: 10upx;
					font-size: 28upx;
					color: #999999;
					line-height: 78upx;
					padding: 0 10upx;
					box-sizing: border-box;
				}
			}

			.upload_cover {
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;

				.frame {
					width: 190upx;
					height: 190upx;
					border: dashed 2upx #febf66;
					background-image: url('~@/static/images/canmo.png');
					background-size: 55upx 45upx;
					background-repeat: no-repeat;
					background-position: 50%; //背景图居中
					display: flex;
					justify-content: center;
					align-items: center;
					margin-right: 30upx;
					margin-bottom: 20upx;
					position: relative;

					image {
						width: 190upx;
						height: 190upx;
					}

					text {
						font-size: 10upx;
						color: #666;
					}

					.success_state {
						position: absolute;
						top: 1upx;
						right: 7upx;
					}
				}
			}

			.multi {
				width: 690upx;
				height: 310upx;
				border-radius: 10upx;
				border: solid 2upx #cecece;

				textarea {
					width: 100%;
					height: 100%;
					font-size: 28upx;
					color: #999999;
					padding: 10upx;
					box-sizing: border-box;
				}
			}

			.upload {
				display: flex;
				justify-content: space-between;

				.photo {
					width: 190upx;
					height: 189upx;
					border: dashed 2upx #febf66;
					text-align: center;
					line-height: 189upx;

					text {
						font-size: 45upx;
						color: #febf66;
					}
				}
			}

			radio-group {
				padding-left: 40upx;
				display: flex;
				justify-content: flex-start;

				label {
					margin-right: 200upx;
					display: flex;
					justify-content: flex-start;
				}
			}
		}

		button {
			width: 632upx;
			height: 88upx;
			line-height: 88upx;
			background-color: #febf66;
			box-shadow: 0upx 6upx 21upx 3upx rgba(224, 156, 28, 0.25);
			border-radius: 39upx;
			margin-top: 86upx;
			margin-bottom: 224upx;
		}


	}
</style>
