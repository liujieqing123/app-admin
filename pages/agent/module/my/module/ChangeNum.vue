<template>
	<view class="ChangeNum">
		<view class="list">
			<view class="number">
				<input placeholder="请输入手机号" v-model="phone_num" type='number' maxlength="11" />
			</view>
		</view>
		<view class="list">
			<view class="verify">
				<input placeholder="请输入验证码" v-model="captcha_num" />
			</view>
			<view class="getverify">
				<text v-if="show" @click="getCode">获取验证码</text>
				<text v-if="!show" class="count">重新发送 ({{count}}s)</text>
			</view>
		</view>
		<button @tap="subt">提交</button>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				//手机号码
				phone_num: '',
				//验证码
				captcha_num: '',
				//获取验证码
				show: true,
				count: '',
				timer: null,
				
			}
		},
		onLoad() {

		},
		methods: {
			//提交
			subt() {
				if(this.phone_num == '') {
					uni.showToast({
						title: '请填写手机号码',
						icon: 'none',
						mask: true
					});
					return 
				}
				if(this.captcha_num == '') {
					uni.showToast({
						title: '请填写验证码',
						icon: 'none',
						mask: true
					});
					return 
				}
				let pNum = /^[1][1,3,5,6,7,8,9][0-9]{9}$/;
				if(!(pNum.test(this.phone_num))) {
					uni.showToast({
						title: '请填写正确的手机号码',
						icon: 'none',
						mask: true
					});
					return 
				}
				this.$api.EditPhone({
					phone:this.phone_num,
					smscode:this.captcha_num
				}).then((res)=>{
					console.log(res.data)
					if(res.data.errcode == 0){
						// 提示
						uni.showToast({
							title: '修改成功,请重新登录', //修改成功
							icon: 'success',
							mask: true
						});
						uni.clearStorage();
						// 跳转到登录页重新登录
						setTimeout(function() {
							uni.redirectTo({
								url: "../../../../index/login"
							})
						},1300)
						this.phone_num = '';
						this.captcha_num = '';
					}
					if(res.data.errcode == 10023) {
						uni.showToast({
							title: '手机号已存在', 
							icon: 'none',
							mask: true
						});
						this.captcha_num = '';
					}
				}).catch((err)=>{
					uni.showToast({
						title: '修改失败', //修改失败
						icon: 'success',
						mask: true
					});
				})
			},
			//验证码
			getCode() {
				if(this.phone_num == '') {
					uni.showToast({
						title: '请填写手机号码',
						icon: 'none',
						mask: true
					});
					return 
				}
				let pNum = /^[1][1,3,5,6,7,8,9][0-9]{9}$/;
				if(!(pNum.test(this.phone_num))) {
					uni.showToast({
						title: '请填写正确的手机号码',
						icon: 'none',
						mask: true
					});
					return 
				}
					this.$api.ChangeSendMessage({
						phone: this.phone_num
					}).then((res) => {
						console.log('request success', res)
						if (res.data.errcode == 0) {
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
						} else {
							uni.showToast({
								title: res.data.msg,
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
		}
	}
</script>

<style lang="scss" scoped>
	.ChangeNum {
		padding: 77upx 62upx 0upx 59upx;

		.list {
			height: 90upx;
			display: flex;
			justify-content: space-between;

			.number {
				width: 604upx;
				height: 68upx;
				border: solid 2upx #cbcaca;
				padding-left: 25upx;
				font-size: 15upx;

				input {
					width: 604upx;
					height: 68upx;
					letter-spacing: 5upx;
				}
			}

			.verify {
				width: 374upx;
				height: 68upx;
				border: solid 2upx #cbcaca;
				font-size: 15upx;
				padding-left: 25upx;

				input {
					width: 374upx;
					height: 68upx;
					letter-spacing: 5upx;
				}
			}

			.getverify {
				width: 210upx;
				height: 68upx;
				border: solid 2upx #febf66;
				font-size: 25upx;
				color: #febf66;
				text-align: center;
				line-height: 68upx;
				letter-spacing: 5upx;
			}
		}

		button {
			width: 632upx;
			height: 88upx;
			background-color: #febf66;
			box-shadow: 0px 6px 21px 3px rgba(224, 156, 28, 0.25);
			border-radius: 39px;
			margin-top: 111upx;
			letter-spacing: 15upx;
		}
	}
</style>
