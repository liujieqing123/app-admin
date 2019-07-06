<template>
	<view class="forgetpassword">
		<view class="content">
			<view class="title">忘记密码</view>
			<view class="number">
				<input placeholder="请输入手机号" v-model="phone_num" type='number' maxlength="11"/>
			</view>
			<view class="security">
				<input placeholder="请输入验证码" v-model="captcha_num"/>
				<view class="code">
					<text v-if="show" @click="getCode">获取验证码</text>
					<text v-if="!show" class="count">重新发送 ({{count}}s)</text>
				</view>
			</view>
			<view class="password">
				<input type="password" placeholder="请输入新密码" v-model="phone_new"/>
			</view>
			<button @tap="Tologin">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone_num:'',
				captcha_num:'',
				phone_new:'',
				//获取验证码
				show: true,
				count: '',
				timer: null,
			}
		},
		onLoad() {

		},
		methods: {
			Tologin:function(){
				this.$api.ForgetPwd({
					phone:this.phone_num,
					smscode:this.captcha_num,
					newpwd:this.phone_new
				}).then((res)=>{
					console.log('request success', res)
					uni.reLaunch(
					    {url:'/pages/index/login'}
						)
				}).catch((err)=>{
					console.log('request fail', err);
				})
			},
			//验证码
			getCode() {
				//手机号不为空时发送验证码
				if(this.phone != ''){
					this.$api.LoSendMes({
						phone: this.phone_num
					}).then((res) => {
						console.log('request success', res)
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
						this.res = '请求结果 : ' + JSON.stringify(res);
					}).catch((err) => {
						console.log('request fail', err);
					})
				}else if(this.phone_num == '' ){	//手机号为空时提示
					uni.showToast({
						title: '请填写手机号', 
						icon: 'none',
						mask: true
					});
				}				
			},			
		}
	}
</script>

<style lang="scss" scoped>
	.forgetpassword {
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

			button {
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
