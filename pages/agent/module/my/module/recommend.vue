<template>
	<view class="recommend">
		<view class="recommend_goods" v-for="(item,index) in list" :key="index">
			<view class="goods_photo">
				<image :src="item.avatar" v-if='Boolean(item.avatar)'/>
			</view>
			<view class="goods_info">
				<view class="goods_name">{{item.shop_name}}</view>
				<view class="goods_details">
					<text>电话：</text>
					<text>{{item.phone}}</text>
				</view>
				<view class="goods_details">
					<text>销量：</text>
					<text>{{item.goods_volume}}</text>
				</view>
				<view class="goods_details">
					<text>注册时间：</text>
					<text>{{item.create_time}}</text>
				</view>
			</view>
			<button @tap="ShopDetails(item.id)">查看</button>
		</view>
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				list:'',
			}
		},
		onLoad() {
			//发起请求
			this.getData();
		},
		methods: {
			// 请求推荐列表数据
			getData(){
				_self=this;
				this.$api.MyInvitation({
					
				}).then((res)=>{
					console.log(res)
					_self.list = res.data.data;
				}).catch((err)=>{
					console.log('request fail', err);
				})
			},
			//跳转到店铺详情页
			ShopDetails(id){
				console.log(id)
				uni.navigateTo({
					url:'/pages/dealer_other/ShopDetails?id='+id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	uni-page-body {
		width: 100%;
		height: 100%;
		background: #F1F1F1;
	}

	.recommend {
		background: #F1F1F1;
		padding: 10upx 30upx 0upx 30upx;

		.recommend_goods {
			display: flex;
			justify-content: space-between;
			padding: 23upx 30upx 18upx 24upx;
			border-bottom: 1upx solid #eeeeee;
			background-color: #ffffff;
			border-radius: 10upx;
			margin-top: 20upx;
			.goods_photo {
				width: 140upx;
				height: 139upx;
				border-radius: 10upx;
				image {
					width: 140upx;
					height: 139upx;
					border-radius: 10upx;
				}
			}
			.goods_info {
				width: 490upx;
				padding-left: 17upx;
				.goods_name {
					font-size: 28upx;
					color: #333333;
				}

				.goods_details {
					display: flex;
					justify-content: flex-start;
					font-size: 24upx;
					color: #666666;
					.hour {
						margin-left: 20upx;
					}
				}
			}
			button {
				width: 140upx;
				height: 45upx;
				border-radius: 25upx;
				border: solid 2upx #febf66;
				font-size: 24upx;
				color: #febf66;
				text-align: center;
				line-height: 37upx;
				padding: 0upx;
			}
		}
	}
</style>
