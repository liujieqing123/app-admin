<template>
	<view class="shipaddress">
		<!-- 暂无地址 -->
		<view v-if="Nshow" class="NoData">
			<image src="../../static/images/t10.png"/>
			<view class="title">暂无数据</view>
		</view>
		<!-- 有地址的列表 -->
		<view v-if="Hshow" class="HaveData">
			<view class="address_info" v-for="(item,index) in addrlist" :key="index">
				<view class="info">
					<view class="title">
						<text class="name">{{item.address_realname}}</text>
						<text class="number">{{item.address_mob_phone}}</text>
					</view>
					<view class="address">{{item.address_detail}}</view>
				</view>
				<view class="iconfont icon-shanchu1" @tap="delet(item.address_id)"></view>
			</view>
		</view>
		<view class='load_text' @tap='clickLoad' v-if='load_show'>加载更多</view>
		<view class='hint_text' v-if='bottom_show'>已经到底部了</view>
	</view>
</template>

<script>
	var _self;
	export default {
		components: {
			
		},
		data() {
			return {
				dshow:false,
				addrlist:[],
				//点击选项的地址id
				address_id:'',
				//无数据显示
				Nshow:false,
				// 有数据显示
				Hshow:false,
				//显示加载更多
				load_show:false,
				//显示已到底部
				bottom_show:false,
				//加载页数
				page_index:'',
				last_page:''
				
			}
		},
		onLoad(option) {
			_self=this;
			//发起请求(列表信息)
			this.MyAddressInfo();
		},
		methods: {
			//发起请求(列表信息)
			MyAddressInfo(){
				//发起请求(列表信息)
				this.$api.MyAddress({
					page:this.page_index,
					nums:10
				}).then((res)=>{
					if(res.data.errcode == 0){
						if(res.data.data.data.length == 0){
							_self.Nshow = true;
							_self.Hshow = false;
						}else{
							_self.Nshow = false;
							_self.Hshow = true;
							_self.load_show = true;
							_self.last_page = res.data.data.last_page;
							let arr = res.data.data.data;
							for (let i = 0; i < arr.length; i++) {
								_self.addrlist.push(arr[i])
							}
							if (_self.addrlist.length == res.data.data.total) {
								_self.load_show = false;
								_self.bottom_show = true;
							}
							if (res.data.data.data.length == 0) {
								_self.load_show = false;
								_self.bottom_show = false;
							}
							console.log(_self.addrlist)
						}
					}	
				}).catch((err)=>{
					uni.showToast({
						title: err,
						icon: 'none',
						duration: 2000
					});
				})
			},
			// 点击加载更多
			clickLoad() {
				this.page_index++;
				if (this.page_index > this.last_page) {
					return
				}
				this.MyAddressInfo()
			},
			//点击删除，传点击选项的地址id
			delet(address_id) {
				_self = this;
				// 模态框
				uni.showModal({
					title: '提示',
					content: '确定删除该地址吗？',
					confirmColor: '#febf66',
					success: function(res) {
						if (res.confirm) {
							_self.ConfirmDele(address_id);
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});
			},
			//删除地址
			ConfirmDele(address_id){
				this.dshow = false;
				//发起请求(删除)
				this.$api.DelMyAddress({
					address_id:address_id
				}).then((res)=>{
					console.log(res)
					//信息提示，删除成功
					uni.showToast({
						title: res.data.msg,
						icon: 'none',
						mask: true
					});
					//重新发起请求(列表信息)，实时刷新
					this.addrlist = [];
					this.page_index = 1;
					_self.MyAddressInfo();
					
				}).catch((err)=>{
					console.log('request fail', err);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	uni-page-body{
		width: 100%;
		height: 100%;
		background: #F1F1F1;
	}
	.shipaddress{
		background: #F1F1F1;
		padding: 35upx 30upx 30upx 30upx;
		//无数据
		.NoData {
			padding-top: 216upx;
			text-align: center;
		
			image {
				width: 353upx;
				height: 292upx;
			}
		
			.title {
				font-size: 48upx;
				color: #febf66;
				margin-top: 24upx;
				letter-spacing: 8upx;
			}
		
			.explain {
				font-size: 24upx;
				color: #999999;
				margin-top: 50upx;
				letter-spacing: 3upx;
			}
		}
		//有数据
		.HaveData{
			.address_info{
				padding: 20upx 32upx 30upx 31upx;
				background: #fff;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20upx;
				border-radius: 10upx;
				.info{
					width: 482upx;
					.title{
						display: flex;
						justify-content: space-between;
						margin-bottom: 19upx;
						.name{
							font-size: 30upx;
							color: #333333;
							font-weight: 600;
						}
						.number{
							font-size: 24upx;
							color: #999999;
						}
					}
					.address{
						font-size: 24upx;
						color: #666666;
					}
				}
				.icon-shanchu1{
					font-size: 40upx;
					color: #cccccc;
				}
			}
		}
		.load_text {
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
</style>
