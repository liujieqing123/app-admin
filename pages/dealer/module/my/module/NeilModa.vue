<template>
	<view class="neilmodal">
		<view class="info">
			<text class="iconfont icon-guanbi2" @tap="CloseNei"></text>
			<view class="title">编辑</view>
			<view class="inpt">
				<view class="tx">姓名</view>
				<input placeholder="请输入姓名" v-model="stuff_name"/>
			</view>
			<view class="inpt">
				<view class="tx">电话</view>
				<input type="number" placeholder="请输入电话号码" maxlength="11" v-model="stuff_phone"/>
				<view class="explain">手机号将作为登录账号</view>
			</view>
			<view class="inpt">
				<view class="tx">密码</view>
				<input type="password" placeholder="请输入密码" v-model="stuff_password"/>
			</view>
			<view class="inpt">
				<view class="tx">职位</view>
				<input placeholder="请输入职位" v-model="stuff_position"/>
			</view>
			<view class="inpt">
				<view class="tx">提成比例</view>
				<input type="number" class="percentage" v-model="stuff_ratio"/>
				<view class="tx">%</view>
			</view>
			<button @tap="Save">保存</button>
		</view>
		<view class="mak"></view>
	</view>
</template>

<script>
	export default {
		props: ['stuffid','stuffname','stuffphone','stuffpassword','stuffposition','ratio'],
		data() {
			return {
				//编辑需要修改传过来的值，用一个变量承接，不然会报错
				stuff_name:this.stuffname,
				stuff_phone:this.stuffphone,
				stuff_password:this.stuffpassword,
				stuff_position:this.stuffposition,
				stuff_ratio:this.ratio
			}
		},
		onLoad() {

		},
		methods: {
			//关闭弹窗
           CloseNei:function(){
			   this.$emit('close');
		   },
		   //保存员工编辑
		   Save(){
			   //发起请求(保存员工编辑)
			   this.$api.EditStuff({
			   	stuff_id: this.stuffid,
			   	stuff_name: this.stuff_name,
			   	stuff_position: this.stuff_position,
			   	stuff_phone: this.stuff_phone,
			   	stuff_password: this.stuff_password,
			   	ratio: this.stuff_ratio,
			   }).then((res) => {
				if(this.stuff_ratio <= 20){
					if(res.data.errcode == 0){
						this.$emit('close');
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							mask: true
						});
					}else{
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							mask: true
						});
					}
				}else{
					uni.showToast({
						title: '提成比例不能超过20%',
						icon: 'none',
						mask: true
					});
				}
			   }).catch((err) => {
			   	console.log('request fail', err);
			   })
		   }
		}
	}
</script>

<style lang="scss" scoped>
	.neilmodal {
		width: 100%;
		height: 1245upx;
		.info {
			position: relative;
			width: 422upx;
			height: 735upx;
			background-color: #ffffff;
			border-radius: 20upx;
			position: fixed;
			top: 239upx;
			left: 79upx;
			z-index: 100;
			padding: 0upx 85upx 0upx 85upx;
			.iconfont {
				font-size: 44upx;
				color: #ccc;
				position: absolute;
				top: 30upx;
				right: 30upx;
			}

			.title {
				font-size: 32upx;
				color: #333333;
				margin: 58upx 0upx 39upx 0upx;
				text-align: center;
				font-weight: 700;
				letter-spacing: 5upx;
			}

			.inpt {
				margin-bottom: 23upx;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				.tx{
					height: 50upx;
					font-size: 28upx;
					color: #333333;
					line-height: 50upx;
					letter-spacing: 5upx;
				}
				input {
					width: 306upx;
					height: 46upx;
					border: 1upx solid #dcdcdc;
					font-size: 28upx;
					margin-left: 18upx;
					padding-left: 18upx;
					letter-spacing: 5upx;
				}
				.explain {
					margin-left: 110upx;
					font-size: 22upx;
					color: #c3c2c2;
					letter-spacing: 5upx;
				}
				.percentage {
					width: 223upx;
					height: 48upx;
					border: solid 1upx #dcdcdc;
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
				text-align: center;
				line-height: 68upx;
				margin-top: 65upx;
				letter-spacing: 5upx;
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
