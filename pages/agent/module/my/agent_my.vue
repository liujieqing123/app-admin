<template>
	<view class="Info">
		<view class="content">
			<view class="header">
				<view class="title">
					<view class="HeadPortrait" type="primary" :loading="loading" :disabled="disabled" @click="upload('header_photo')">
						<image :src="SellerInfo.avatar" v-if='Boolean(SellerInfo.avatar)' />
					</view>
					<view class="HeadInfo">
						<view class="name">{{SellerInfo.truename}}</view>
						<view class="num">电话号码：{{SellerInfo.phone}}</view>
					</view>
				</view>
			</view>
			<view class="main">
				<view @click="asset">
					<text>我的财产</text>
					<text class="iconfont icon-xiangyou"></text>
				</view>
				<view @click="tel">
					<text>我的手机号</text>
					<text class="iconfont icon-xiangyou"></text>
				</view>
				<view @tap="Recommend">
					<text>我的推荐</text>
					<text class="iconfont icon-xiangyou"></text>
				</view>
				<view @tap="QRcode">
					<text>我的二维码</text>
					<text class="iconfont icon-xiangyou"></text>
				</view>
				<view @tap="Contact">
					<text>联系我们</text>
					<text class="iconfont icon-xiangyou"></text>
				</view>
			</view>
			<button @tap="logout">退出登录</button>
		</view>

		<!-- 确认密码 -->
		<view class='mask' v-if='mask_show'>
			<view class='pwd_module'>
				<view class='pwd_top'>
					<text>请输入密码</text>
				</view>
				<view class='pwd_center'>
					<view>
						<input type="password" placeholder="请输入密码" v-model='pwd'>
					</view>
				</view>
				<view class='pwd_bottom'>
					<view @tap='openTelPage'>进入</view>
				</view>
			</view>
			<view class='colse iconfont icon-guanbi2' @click.stop='backMask'></view>
		</view>
	</view>
</template>

<script>
	var _self;
	export default {
		props: ['usertype'], //父组件传过来的登录的用户类型
		data() {
			return {
				SellerInfo: '',
				//头像上传
				loading: false,
				disabled: false,
				//头像
				header_photo: '',
				//头像地址
				header_photo_address: '',
				//联系我们的电话号码
				phone: '',
				mask_show: false,
				pwd: ''
			}
		},
		mounted() {
			//发起请求(我的信息)
			this.getInfo();
			//发起请求(联系我们,获取联系我们的电话号码)
			this.getPhone();
		},
		onLoad() {
			_self = this;
		},
		methods: {
			//发起请求(我的信息)
			getInfo() {
				this.$api.SellerInfo({
					seller_id: this.agentid
				}).then((res) => {
					console.log('request success', res)
					this.SellerInfo = res.data.data;

				}).catch((err) => {
					console.log('request fail', err);
				})
			},
			//发起请求(联系我们,获取联系我们的电话号码)
			getPhone() {
				this.$api.SellerCallMe({}).then((res) => {
					this.phone = res.data.phone
				}).catch((err) => {
					console.log('request fail', err);
				})
			},
			//跳转到我的财产页面
			asset() {
				uni.navigateTo({
					url: '../agent/module/my/module/property?user_type=' + this.usertype
				})
			},
			//跳转到我的手机号页面
			tel: function() {
				this.mask_show = true;
			},
			openTelPage() {
				if(this.pwd == '') {
					uni.showToast({
						title: '请输入密码',
						icon: 'none',
						duration: 1500
					});
					return
				}
				if(this.pwd != uni.getStorageSync('token_verify')) {
					uni.showToast({
						title: '密码不正确，请重新输入',
						icon: 'none',
						duration: 1500
					});
					this.pwd = '';
					return
				}
				uni.navigateTo({
					url: '../agent/module/my/module/ChangeNum'
				})
				this.pwd = '';
				this.mask_show = false;
			},
			backMask () {
				this.pwd = '';
				this.mask_show = false;
			},
			//退出登录跳转到登录页面
			logout() {
				uni.showModal({
					title: '提示',
					content: '是否退出登录？',
					confirmColor: '#febf66',
					success: function(res) {
						if (res.confirm) {
							uni.clearStorage(); //清除缓存
							uni.showToast({
								title: '退出登录成功！',
								icon: 'none',
								duration: 1500
							});
							setTimeout(function() {
								uni.reLaunch({
									url: '../index/login'
								})
							},1500)
							try {
								uni.setStorageSync('pageId', 0);
							} catch (e) {
								// error
							}
						} else if (res.cancel) {

						}
					}
				});
			},
			//跳转到我的二维码页面
			QRcode() {
				uni.navigateTo({
					url: '../agent/module/my/module/QrCode'
				})
			},
			//跳转到我的推荐页面
			Recommend() {
				uni.navigateTo({
					url: '../agent/module/my/module/recommend'
				})
			},
			//头像图片上传
			upload(name) {
				_self = this;
				uni.chooseImage({ //选择图片
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						const tempFilePaths = res.tempFilePaths;
						const uploadTask = uni.uploadFile({ //上传图片
							url: 'https://xt.dfbtds.com/api_app/Myseller/uploadFile',
							filePath: tempFilePaths[0],
							header: {
								"Authorization": uni.getStorageSync('token')
							}, //设置请求头
							name: name,
							formData: {
								name: name,
							},
							success: function(uploadFileRes) {
								console.log(uploadFileRes);
								var data = JSON.parse(uploadFileRes.data); //转为json对象
								_self.header_photo_address = data.data.header_photo;
								console.log(data.data.header_photo)
								//重新发起请求(我的信息)，达到实时刷新
								_self.getInfo();
							}
						});
					},
					error: function(e) {
						console.log(e);
					}
				});
			},

			// 联系我们
			Contact() {
				//调用拨打电话的接口
				uni.makePhoneCall({
					phoneNumber: this.phone,
					success: function(res) {
						console.log(2222)
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	uni-page-body {
		width: 100%;
		height: 100%;
		background: #fff;
	}

	.Info {
		overflow: scroll;

		.content {
			.header {
				width: 100%;
				height: 333upx;
				background: white;
				background-repeat: no-repeat;
				background-image: url('~@/static/images/t7.png');
				background-size: 100% 333upx;
				.title {
					height: 129upx;
					padding-top: 98upx;
					padding-left: 27upx;
					display: flex;
					align-items: center;
					justify-content: flex-start;
					.HeadPortrait {
						width: 136upx;
						height: 136upx;
						overflow: hidden;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 100%;
						margin-right: 17upx;
						background-image: url('~@/static/images/whican.png');
						background-size: 55upx 45upx;
						background-repeat: no-repeat;
						background-position: 50%; //背景图居中
						border: 1px solid #fff;
						image {
							width: 100%;
							height: 100%;
						}
					}
					.HeadInfo {
						height: 91upx;
						margin-top: 15upx;
						.name {
							font-size: 34upx;
							font-weight: 700;
							color: #333333;
							margin-bottom: 15upx;
						}
						.num {
							font-size: 28upx;
							font-weight: normal;
							color: #333333;
						}
					}
				}
			}
			.main {
				margin-top: 15%;
				view {
					display: flex;
					justify-content: space-between;
					margin-top: 3%;
					padding: 0 50upx;
					box-sizing: border-box;
					text {
						font-size: 30upx;
						color: #333333;
					}
					.iconfont {
						color: #cfcdcd;
					}
				}
			}
			button {
				width: 632upx;
				height: 88upx;
				background: #febf66;
				border-radius: 39upx;
				font-size: 36upx;
				color: #333333;
				margin-top: 15%;
				letter-spacing: 5upx;
			}

		}

		.mask {
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			background: rgba(0,0,0,.5);
			display: flex;
			justify-content: center;
			padding-top: 40%;
			box-sizing: border-box;
			z-index: 999;
			.pwd_module {
				width: 500upx;
				height: 300upx;
				border-radius: 8upx;
				background: #fff;
				view {
					width: 100%;
					height: 33.33%;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.pwd_top {
					text {
						font-size: 30upx;
						font-weight: 600;
						color: #333;
					}
				}
				.pwd_center {
					view {
						width: 80%;
						height: 60%;
						border: 1px solid #ccc;
						border-radius: 5upx;
						display: flex;
						align-items: center;
						overflow: hidden;
						input {
							width: 100%;
							font-size: 30upx;
							padding: 0 15upx;
							box-sizing: border-box;
						}
					}
				}
				.pwd_bottom {
					view {
						width: 50%;
						height: 60%;
						background: #febf66;
						color: #fff;
						border-radius: 10upx;
						font-size: 30upx;
					}
				}
			}
			.colse {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: 13%;
				color: #eee;
				font-size: 80upx;
			}
		}

	}
</style>
