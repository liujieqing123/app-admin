<template>
	<view class="login">
		<view class="logo">
			<image src="/static/images/_20190321115927.png" mode='widthFix'/>
		</view>
		<view class="content">
			<view class="title">登录</view>
			<view class="number">
				<input placeholder="请输入手机号" v-model="phone_num" type='number' maxlength="11" id="ipt1" />
			</view>
			<view class="password">
				<input type="password" placeholder="请输入密码" v-model="password_num" id="ipt2" />
			</view>
			<view class="check">
				<radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
						<view class="but">
							<radio :value="item.value" :checked="index === current" />
						</view>
						<view class="expl">{{item.name}}</view>
					</label>
				</radio-group>
			</view>
			<button @click="clickLogin" class="active" v-if='ischeck'>登录</button>
			<button class="active" v-else>登录中...</button>
			<view class="other">
				<view class="reg" @click="ToReg">经销商注册</view>
				<view class="gotpassw" @click="forget">忘记密码</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				//单选按钮
				items: [{
						value: '2',
						name: '经销商登录',
					},
					{
						value: '1',
						name: '管理员登录',
					}
				],
				current: 0,
				//电话号码
				phone_num: '13138502310',
				// 密码
				password_num: '123456',
				// 验证码
				captcha_num: '',
				// 按钮类型
				type: '2',
				// input不为空的开关
				ischeck: true,
				//获取验证码
				show: true,
				count: '',
				timer: null,
				test: '',

			}
		},
		onReady() {
			if(uni.getStorageSync('type')) {
				if(uni.getStorageSync('type') == 2) {
					uni.redirectTo({
						url: "../dealer/dealer"
					})
				}
				if(uni.getStorageSync('type') == 1) {
					uni.redirectTo({
						url: "../agent/agent"
					})
				}
			}
		},
		onLoad(option) {
			_self = this;
		},
		onShow() {
			if(uni.getStorageSync('phone')) {
				this.phone_num = uni.getStorageSync('phone');
				this.password_num = uni.getStorageSync('phone_num');
			}
		},
		methods: {
			//跳转注册页
			ToReg: function() {
				uni.navigateTo({
					url: './reg'
				})
			},
			//跳转忘记密码页
			forget: function() {
				uni.navigateTo({
					url: './forgetpassword'
				})
			},
			//登录
			login: function() {
				let self = this;
				self.ischeck = false;
				self.$api.Login({
					phone: self.phone_num,
					password: self.password_num,
					type: self.type
				}).then((res) => {
					self.ischeck = true;
					console.log('request success', res.data.data)
					if (res.data.errcode == 0) {		
							// 页面跳转
							if (self.type == 2) {
								if (res.data.data.is_auth == 1) { //通过
									uni.showToast({
										title: '登录成功！',
										icon: 'none',
										duration: 1300
									});
									// 保存token、type、phone
									try {
										uni.setStorageSync('token', res.data.data.access_token);
										uni.setStorageSync('refresh_token', res.data.data.refresh_token);
										uni.setStorageSync('type', res.data.data.type);
										uni.setStorageSync('token_verify', this.password_num);
									} catch (e) {
										
									}
									try {
                      uni.removeStorageSync('phone');
                      uni.removeStorageSync('phone_num');
                  } catch (e) {
                      // error
									}
									this.phone_num = '';
									this.password_num = '';
									//跳到经销商首页
									setTimeout(function() {
										uni.redirectTo({
											url: "../dealer/dealer?curId=0"
										})
									},1300)
									
								} else if (res.data.data.is_auth == 2) { //审核不通过
									// 跳转到认证页面
									setTimeout(function() {
										uni.redirectTo({
											url: "./hint?checkState=0"
										})
									},500)
									
								} else if (res.data.data.is_auth == 3) { //待审核
									setTimeout(function() {
										uni.redirectTo({
											url: "./hint?checkState=1"
										})
									},500)
								} else { //未认证
									uni.showToast({
										title: '您还未提交认证，请先认证',
										icon: 'none',
										duration: 1300
									});
									try {
										uni.setStorageSync('token', res.data.data.access_token);
										uni.setStorageSync('phone', res.data.data.phone);
									} catch (e) {
										// error
									}
									// 跳转到认证页面
									setTimeout(function() {
										uni.redirectTo({
											url: "./approve"
										})
									},1300)
									
								}

							} else if (self.type == 1) {
								uni.showToast({
									title: '登录成功！',
									icon: 'none',
									duration: 1300
								});
								// 保存token、type、phone
								try {
									uni.setStorageSync('token', res.data.data.access_token);
									uni.setStorageSync('refresh_token', res.data.data.refresh_token);
									uni.setStorageSync('type', res.data.data.type);
									uni.setStorageSync('token_verify', this.password_num);
								} catch (e) {
									// error
								}
								this.phone_num = '';
								this.password_num = '';
								// 跳转到代理商首页
								setTimeout(function() {
									uni.redirectTo({
										url: "../agent/agent"
									})
								},1300)
							
							}

					} else { //否则输出相应的错误提示
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							mask: true
						});
					}

				}).catch((err) => {
					this.ischeck = true;
					uni.showToast({
						title: '请求异常',
						icon: 'none',
						mask: true
					});
				})

			},
			// 点击登录
			clickLogin() {
				if(this.phone_num == '') {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none',
						mask: true
					});
					return
				}
				if(this.password_num == '') {
					uni.showToast({
						title: '请输入密码',
						icon: 'none',
						mask: true
					});
					return
				}
				let pNum = /^[1][1,2,3,4,5,6,7,8,9][0-9]{9}$/;
				if(!(pNum.test(this.phone_num))) {
					uni.showToast({
						title: '请输入正确的手机号码',
						icon: 'none',
						mask: true
					});
					return
				}
				let dfh = /^.{6,}$/;
				if(!(dfh.test(this.password_num))) {
					uni.showToast({
						title: '密码不可少于6位',
						icon: 'none',
						mask: true
					});
					return
				}

				this.login();
			},
			//单选按钮
			radioChange: function(evt) {
				var value = evt.detail.value; //声明一个变量用来放点击点选按钮的内容
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				};
				this.type = evt.detail.value;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.login {
		position: relative;
		padding: 0upx 59upx 0upx 54upx;

		.logo {
			width: 193upx;
			height: 43upx;

			image {
				width: 193upx;
				height: 43upx;
			}
		}

		.content {
			margin-top: 106upx;

			.title {
				font-size: 54upx;
				color: #333333;
			}

			.number {
				width: 631upx;
				height: 60upx;
				margin-top: 110upx;

				input {
					width: 631upx;
					height: 60upx;
					border-bottom: 1upx solid #999999;
					font-size: 32upx;
					color: #999999;

				}
			}

			.password {
				width: 631upx;
				height: 60upx;
				margin-top: 55upx;

				input {
					width: 631upx;
					height: 60upx;
					border-bottom: 1upx solid #999999;
					font-size: 32upx;
					color: #999999;
				}
			}

			.security {
				width: 631upx;
				height: 68upx;
				margin-top: 55upx;
				display: flex;
				justify-content: space-between;

				input {
					width: 376upx;
					height: 68upx;
					border-bottom: 1upx solid #999999;
					font-size: 32upx;
					color: #999999;
				}

				.code {
					width: 233upx;
					height: 68upx;
					border-radius: 34upx;
					border: solid 2upx #febf66;
					font-size: 28upx;
					color: #febf66;
					text-align: center;
					line-height: 68upx;
				}
			}

			.check {
				margin-top: 60upx;

				radio-group {
					display: flex;
					justify-content: space-between;

					label {
						width: 300upx;

						.but {
							width: 50upx;
							margin-right: 10upx;
							display: inline-block;
						}

						.expl {
							width: 200upx;
							height: 50upx;
							font-size: 32upx;
							color: #999999;
							line-height: 50upx;
							display: inline-block;
						}
					}
				}
			}

			button {
				width: 632upx;
				height: 88upx;
				background-color: #cecece;
				border-radius: 39upx;
				font-size: 36upx;
				color: #333333;
				margin-top: 55upx;
			}
			.active {
				background-color: #febf66;
				box-shadow: 0px 6px 21px 3px rgba(224, 156, 28, 0.25);
			}
			.other {
				width: 632upx;
				height: 30upx;
				display: flex;
				justify-content: space-between;
				margin-top: 49upx;

				view {
					font-size: 24upx;
					color: #febf66;
				}
			}
		}
	}
</style>
