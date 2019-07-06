<template>
	<view class="detailed_accounts">
		<view class="tab">
			<view @tap="curId(2)" :class="{'cur':cur_id===2}">收入</view>
			<view @tap="curId(1)" :class="{'cur':cur_id===1}">支出</view>
		</view>
		<view class="accounts_info">
			<view v-if="cur_id===2">
				<view class="info_item" v-for="(item,index) in order_list" :key="index">
					<view class="info_left">
						<view class="left_title">{{item.orderbill_remark}}</view>
						<view class="left_time">{{item.orderbill_addtime | changTime}}</view>
					</view>
					<view class="info_right" @tap="OrderDetails(item.orderbill_id,2)">
						<text class="add">+{{item.orderbill_money}}</text>
						<text class="iconfont icon-xiangyou"></text>
					</view>
				</view>
				<view class='hint_text' v-if='order_list.length == 0'>没有数据</view>
				<view class='load_text' @tap='clickLoad' v-if='load_show'>加载更多</view>
				<view class='hint_text' v-if='bottom_show'>已经到底部了</view>
			</view>
			<view v-if="cur_id===1">
				<view class="info_item" v-for="(xitem,index1) in order_list" :key="index1">
					<view class="info_left">
						<view class="left_title">金额提现</view>
						<view class="left_time">{{xitem.pdc_addtime | changTime}}</view>
					</view>
					<view class="info_right" @tap="ShowDetails(xitem.pdc_id,1)">
						<text class="expenditure">-{{xitem.pdc_amount}}</text>
						<text class="iconfont icon-xiangyou"></text>
					</view>
				</view>
				<view class='hint_text' v-if='order_list.length == 0'>没有数据</view>
				<view class='load_text' @tap='clickLoad' v-if='load_show'>加载更多</view>
				<view class='hint_text' v-if='bottom_show'>已经到底部了</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _self;
	export default {
		components: {

		},
		data() {
			return {
				cur_id: 2,
				// 订单页数
				order_page:1,
				//订单列表数据
				order_list:[],
				//加载更多
				load_show:false,
				// 到底部
				bottom_show:false,
				// 最后一页
				last_page:'',
				//用户类型
				usertype:''
			}
		},
		onLoad(option) {
			this.usertype = option.user_type;
			// 发起请求(收入支出详情)
			this.GetDepositInfo();
		},
		filters: {
			changTime(str) {
				let time = new Date(str * 1000);
				let y = time.getFullYear();
				let m = time.getMonth() + 1;
				if (m < 10) {
					m = '0' + m;
				}
				let t = time.getDate();
				if (t < 10) {
					t = '0' + t;
				}
				let h = time.getHours();
				if (h < 10) {
					h = '0' + h;
				}
				let min = time.getMinutes();
				if (min < 10) {
					min = '0' + min;
				}
				let s = time.getSeconds();
				if (s < 10) {
					s = '0' + s;
				}
				let chang_time = y + '-' + m + '-' + t + ' ' + h + ':' + min + ':' + s;
				return chang_time
			}
		},
		methods: {
			// 发起请求(收入支出详情)
			GetDepositInfo(){
				this.$api.DepositList({
					page:this.order_page,
					nums:10,
					state:this.cur_id
				}).then((res) => {
					console.log(res)
					if (res.data.errcode == 0) {
						this.load_show = true;
						this.bottom_show = false;
						this.last_page = res.data.data.last_page;
						let arr = res.data.data.data;
						console.log(arr)
						for (let i = 0; i < arr.length; i++) {
							this.order_list.push(arr[i])
						}
						if (this.order_list.length == res.data.data.total) {
							this.load_show = false;
							this.bottom_show = true;
						}
						if (res.data.data.data.length == 0) {
							this.load_show = false;
							this.bottom_show = false;
						}
					}else {
						uni.showToast({
							title: '请求失败',
							icon: 'none',
							duration: 2000
						});
					}
				}).catch((err) => {
					uni.showToast({
						title: err,
						icon: 'none',
						duration: 2000
					});
				})
			},
			// 加载更多订单
			clickLoad() {
				this.order_page++;
				if (this.order_page > this.last_page) {
					return
				}
				this.GetDepositInfo();
			},

			//选项卡切换
			curId(str) {
				_self = this;
				_self.order_list = [];
				_self.order_page = 1;
				_self.cur_id = str; //点击改变cur_id的值
				this.GetDepositInfo()
			},
			//提现账目详情
			ShowDetails(pdc_id,num){
				uni.navigateTo({
					url:'./WithdrawDetails?pdc_id='+pdc_id+'&type='+num
				})
			},
			//订单账目详情
			OrderDetails(orderbill_id,num){
				uni.navigateTo({
					url:'./OrderAccountDetails?orderbill_id='+orderbill_id+'&type='+num+'&user_type='+this.usertype 
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detailed_accounts {
		width: 100%;
		height: 100%;
		
		//tab
		.tab {
			width: 750upx;
			height: 93upx;
			background: white;
			display: flex;
			justify-content: space-around;
			align-items: center;
			border-bottom: 1upx solid #EBEAEA;
			view {
				// width: 187.5upx;
				height: 93upx;
				font-size: 32upx;
				color: #9aabb8;
				line-height: 93upx;
				text-align: center;
				font-weight: 600;
				letter-spacing: 5upx;
			}
			.cur {
				height: 86upx;
				line-height: 86upx;
				color: black;
				font-weight: 600;
				border-bottom: 7upx solid #febf66;
			}
		}
		.accounts_info{
			padding: 20upx 30upx;
			view{
				width: 100%;
				.info_item{
					width: 100%;
					height: 120upx;
					border-bottom: 1upx solid #ccc;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-right: 20upx;
					.info_left{
						height: 100upx;
						display: flex;
						justify-content: space-around;
						flex-direction: column;
						.left_title{
							color: #585858;
							font-size: 28upx;
						}
						.left_time{
							font-size: 17upx;
							color: #999;
						}
					}
					.info_right{
						font-size: 28upx;
						color: #999;
						font-weight: 600;
						display: flex;
						justify-content: flex-end;
						align-items: center;
						.add{
							color: #59D58B;
						}
						.expenditure{
							color: #FF9191;
						}
					}
				}
				.hint_text {
					text-align: center;
					color: #ccc;
					font-size: 14upx;
					margin-top: 40upx;
				}
				.load_text{
					font-size: 25upx;
					color: #fc7c28;
					text-align: center;
					margin: 20upx 0;
				}
				.hint_text {
					font-size: 18upx;
					color: #666;
					text-align: center;
					margin: 20upx 0;
				}
			}
		}
	}
</style>
