<template>
	<view class="reg">
		<view class="content">
			<view class="title">注册</view>
			<view class="number">
				<input placeholder="请输入手机号" v-model="phone_num" type='number' maxlength="11"/>
			</view>
			<view class="password">
				<input type="password" placeholder="请输入密码" v-model="password_num" />
			</view>
			<view class="security">
				<input placeholder="请输入验证码" v-model="captcha_num"/>
				<view class="code">
					<text v-if="show" @click="getCode">获取验证码</text>
					<text v-if="!show" class="count">重新发送 ({{count}}s)</text>
				</view>
			</view>
			<view class="invitation">
				<input placeholder="请输入邀请码" v-model="seller_code"/>
			</view>
			<button @click="clickReg" class="reg_btn">注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone_num: '',
				password_num: '',
				captcha_num: '',
				seller_code:'',
 				//获取验证码
				show: true,
				count: '',
				timer: null,
			}
		},
		onLoad() {


		},
		methods: {
			// 获取验证码
			getCodeNum() {			
				this.$api.RegMsg({
					phone: this.phone_num
				}).then((res) => {
					console.log('request success', res.data)
					if(res.data.errcode == 0) {
						// 倒计时
						const TIME_COUNT = 60;
						if (!this.timer) {
							this.count = TIME_COUNT;
							this.show = false;
							this.timer = setInterval(() => {
								if (this.count > 0 && this.count <= TIME_COUNT) {
									this.count--;
								} else {
									this.show = true;
									clearInterval(this.timer);
									this.timer = null;
								}
							}, 1000)
						}
					}else{
						uni.showToast({
							title: '获取失败',
							icon: 'none',
							mask: true
						});
					}
				}).catch((err) => {
					uni.showToast({
						title: '请求异常',
						icon: 'none',
						mask: true
					});
				})
			},
			// 注册
			ToApprove: function() {
				this.$api.Reg({
					phone: this.phone_num,
					password: this.password_num,
					smscode: this.captcha_num,
					seller_code: this.seller_code
				}).then((res) => {
					console.log('request success', res.data)
					if (res.data.errcode == 0) {
						uni.showToast({
							title: '注册成功，请重新登录', 
							icon: 'success',
							duration: 2500
						});
						try {
							uni.setStorageSync('phone', this.phone_num);
							uni.setStorageSync('phone_num', this.password_num);
						} catch (e) {
							
						}
							//跳转登录页
							setTimeout(function() {
								uni.navigateTo({
									url: '/pages/index/login'
								})
							},2800)					
					}else{		
						uni.showToast({
							title: res.data.msg, 
							icon: 'none',
							mask: true
						});
					}
				
				}).catch((err) => {
					uni.showToast({
							title: '请求失败', 
							icon: 'none',
							mask: true
						});
				})
			},
			// 点击获取验证码
			getCode() {
				if(this.phone_num == '') {
					uni.showToast({
						title: '请输入手机号',
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
				
				this.getCodeNum();
			},
			// 点击注册
			clickReg() {
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
				if(this.captcha_num == '') {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none',
						mask: true
					});
					return
				}
				if(this.seller_code == '') {
					uni.showToast({
						title: '请输入邀请码',
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
				this.ToApprove();
			},
		}
	}
</script>

<style lang="scss" scoped>
	.reg {
		position: relative;
		padding: 0upx 59upx 0upx 54upx;

		.content {
			margin-top: 110upx;

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
					background: none;
				}
			}

			.invitation {
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

			.reg_btn {
				width: 632upx;
				height: 88upx;
				background-color: #febf66;
				box-shadow: 0upx 6upx 21upx 3upx rgba(224, 156, 28, 0.25);
				border-radius: 39upx;
				font-size: 36upx;
				color: #333333;
				margin-top: 96upx;
			}

		}
	}
</style>
