<template>
	<view class="withdraw">
		<view>
			<view class="withdraw_title">姓名</view>
			<view class="name">
				<input placeholder="请输入您的姓名" v-model="name"/>
			</view>
		</view>
		<view>
			<view class="withdraw_title">电话</view>
			<view class="phone">
				<input placeholder="请输入您的手机号" v-model="phone" type='number' maxlength="11"/>
			</view>
		</view>
		<view>
			<view class="withdraw_title">提现金额</view>
			<view class="money">
				<input :placeholder="'可提现金额为'+monydata" type='number' v-model="money"/>
			</view>
		</view>
		<view>
			<view class="withdraw_title">提现方式</view>
			<view class="check">
				<radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
						<view class="but">
							<radio class="radio_input" :value="item.value" :checked="index === current" />
						</view>
						<view class="expl">{{item.name}}</view>
					</label>
				</radio-group>
			</view>
		</view>
		<view v-if="current==0">
			<view class="withdraw_title">微信号</view>
			<view class="wechat_number">
				<input placeholder="请输入您的微信号" v-model="WechatNum"/>
			</view>
		</view>
		<view v-if="current==1">
			<view class="withdraw_title">开户银行</view>
			<view class="opening_bank">
				<input placeholder="请输入开户银行" v-model="opening_bank"/>
			</view>
		</view>
		<view v-if="current==1">
			<view class="withdraw_title">银行卡号</view>
			<view class="card_numbers">
				<input placeholder="请输入银行卡号" type='number' v-model="card_num"/>
			</view>
		</view>
		<button @tap="sbmit">提交</button>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				//单选按钮
				items: [{
						value: '2',
						name: '提现到微信',
					},
					{
						value: '1',
						name: '提现到银行卡',
					}
				],
				current: 0,
				//姓名
				name:'',
				// 电话
				phone:'',
				// 提现金额
				money:'',
				// 提现类型
				type:2,
				// 微信号
				WechatNum:'',
				// 开户行
				opening_bank:'',
				//银行卡号
				card_num:'',
				// 可提现金额
				monydata:'',
				
			}
		},
		onLoad(option) {
			this.getMony()
		},
		methods: {
			//单选按钮
			radioChange: function(evt) {
				var value = evt.detail.value; //声明一个变量用来放点击点选按钮的内容
				// console.log(value);
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				};
				this.type = evt.detail.value;
			},
			
			//点击提交，发起请求
			sbmit(){
				//发起请求(提现)
				this.$api.DealerDepositpost({
					pdc_amount:this.money,
					pdc_method:this.type,
					pdc_phone:this.phone,
					pdc_bank_name:this.opening_bank,
					pdc_bank_no:this.card_num,
					pdc_bank_user:this.name,
					pdc_wxnumber:this.WechatNum
					
				}).then((res)=>{
					console.log(res)
					if(res.data.errcode == 0){
						uni.showToast({
							title: '提现请求已提交',
							icon: 'none',
							mask: true
						});
						this.name =''
						this.phone =''
						this.money =''
						this.WechatNum =''
						this.type =2
						this.opening_bank =''
						this.card_num =''
						this.getMony()
					}else{
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							mask: true
						});
					}
					
				}).catch((err)=>{
					console.log('request fail', err);
				})
			},
			//发起请求,获取可提现金额
			getMony(){
				//发起请求(提现)
				this.$api.DealerDepositget({
					pdc_amount:this.money,
					pdc_method:this.type,
					pdc_phone:this.phone,
					pdc_bank_name:this.opening_bank,
					pdc_bank_no:this.card_num,
					pdc_bank_user:this.name,
					pdc_wxnumber:this.WechatNum
					
				}).then((res)=>{
					this.monydata = res.data.data
				}).catch((err)=>{
					console.log('request fail', err);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.withdraw {
		height: 100%;
		padding: 0upx 30upx;

		view {
			width: 100%;
			height: 90upx;
			border-bottom: 1px solid #EAE7E7;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.withdraw_title {
				width: 200upx;
				height: 100%;
				font-size: 27upx;
				line-height: 90upx;
				letter-spacing: 3upx;
				font-weight: 600;
			}

			input {
				width: 500upx;
				font-size: 27upx;
				line-height: 90upx;
			}
			.check {
				// margin-top: 60upx;
				radio-group {
					display: flex;
					justify-content: space-between;
					label {
						width: 270upx;
						height: 90upx;
						line-height: 90upx;
						.but {
							width: 50upx;
							height: 50upx;
							margin-right: 10upx;
							display: inline-block;
							border: none;
						}
						
						.expl {
							width: 200upx;
							height: 50upx;
							font-size: 27upx;
							color: black;
							line-height: 50upx;
							display: inline-block;
							border: none;
						}
					}
				}
			}
		}

		button {
			width: 632upx;
			height: 88upx;
			background-color: #febf66;
			box-shadow: 0upx 6upx 21upx 3upx rgba(224, 156, 28, 0.25);
			border-radius: 39upx;
			letter-spacing: 5upx;
			margin-top: 150upx;
		}
	}
</style>
