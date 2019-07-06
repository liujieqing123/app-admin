<template>
	<view class="ShopDetails">
		<view class="header">
			<view class="header_box" @tap="ToBack">
				<text class="iconfont icon-fanhui"></text>
				<text class="header_title">商铺详情</text>
			</view>
		</view>
		<view class="content">
			<!-- 店铺基本情况 -->
			<view class="content1">
				<view class="content1_item">
					<view class="Shop_name">{{list.shop_name}}</view>
					<!-- <view class="Shop_person">
						<text>企业法人：</text>
						<text>{{list.company_name}}</text>
					</view>
					<view class="Shop_person">
						<text>电话：</text>
						<text>{{list.phone}}</text>
					</view>
					<view class="Shop_address">
						<text>地址：</text>
						<text>{{list.areainfo}}</text>
					</view> -->
					<view class="Shop_address">
						<text>注册时间：</text>
						<text>{{list.create_time}}</text>
					</view>
					<!-- <view class="photo">
						<view>
							<view class="picture">
								<image :src="list.business_license" v-if='Boolean(list.business_license)'/>
							</view>
							<view class="title">营业执照</view>
						</view>
						<view>
							<view class="picture">
								<image :src="list.idcard_back" v-if='Boolean(list.idcard_back)'/>
							</view>
							<view class="title">手持身份证正面</view>
						</view>
						<view>
							<view class="picture">
								<image :src="list.idcard_just" v-if='Boolean(list.idcard_just)'/>
							</view>
							<view class="title">手持身份证反面</view>
						</view>
					</view> -->
					<view class="head_portrait">
						<image :src="list.avatar" v-if='Boolean(list.avatar)'/>
					</view>
				</view>
			</view>
			<!-- 销量 -->
			<view class="content2">
				<view class="box one">
					<view class="content2_title">总销量</view>
					<view class="content2_number">{{list.orderCount}}</view>
				</view>
				<view class="box two">
					<view class="content2_title">日销量</view>
					<view class="content2_number">{{list.dayOrderCount}}</view>
				</view>
				<view class="box tree">
					<view class="content2_title">月销量</view>
					<view class="content2_number">{{list.monthOrderCount}}</view>
				</view>
				<view class="box four">
					<view class="content2_title">年销量</view>
					<view class="content2_number">{{list.yearOrderCount}}</view>
				</view>
			</view>
			<!-- 商品列表 -->
			<view class="content3">
				<view class="content3_title">商品列表</view>
				<view class="content3_info" v-for="(item,index) in list.goods_list" :key="index">
					<view class="goods_photo">
						<image :src="item.goods_images"/>
					</view>
					<view class="goods_info">
						<view class="goods_name">{{item.goods_total_name}}</view>
						<view class="goods_details">
							<text>价格：</text>
							<text>￥{{item.goods_price}}</text>
						</view>
						<view class="goods_details">
							<text>销量：</text>
							<text>{{item.goods_volume}}</text>
						</view>
						<view class="goods_details">
							<text>上架时间：</text>
							<text>{{item.up_time | changTime}}</text>
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: {},
				//传过来的经销商id
				id:''
			}
		},
		onLoad(option) {
			this.id = option.id
			// 发起请求
			this.getData();
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
			//请求数据
			getData(){
				this.$api.DealerInfo({
					dealer_id:this.id
				}).then((res) => {
					// console.log('request success', res)
					this.list = res.data.data
					console.log(this.list)
				}).catch((err) => {
					// console.log('request fail', err);
				})
			},
			//点击返回上一级
			ToBack() {
				uni.navigateBack({
					delta: 1
				});
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

	.ShopDetails {
		background: #F1F1F1;
		.header {
			width: 100%;
			height: 203upx;
			background-image: url('~@/static/images/t17.png');
			background-size: 100% 272upx;
			background-repeat: no-repeat;
			padding: 69upx 0upx 0upx 30upx;

			.header_box {
				width: 30%;
				display: flex;
				justify-content: flex-start;

				.iconfont {
					color: #fff;
					font-size: 36upx;
				}

				.header_title {
					color: #fff;
					font-size: 30upx;
					letter-spacing: 3upx;
				}
			}
		}

		.content {
			padding: 0upx 30upx 26upx 30upx;
			position: relative;

			.content1 {
				height: 100upx;
				.content1_item {
					// position: relative;
					width: 660upx;
					// height: 526upx;
					height: auto;
					background-color: #ffffff;
					border-radius: 10upx;
					padding: 30upx 14upx 30upx 14upx;
					position: absolute;
					top: -80upx;
					left: 30upx;

					view {
						display: flex;
						justify-content: flex-start;
						font-size: 24upx;
						margin-bottom: 19upx;
					}

					.Shop_name {
						font-size: 40upx;
						color: #333333;
						font-weight: 600;
					}

					.Shop_person {
						color: #333333;
					}

					.Shop_address {
						color: #999999;

						.time {
							margin-left: 30upx;
						}
					}

					.photo {
						display: flex;
						justify-content: space-between;
						margin-top: 40upx;

						view {
							display: flex;
							justify-content: flex-start;
							flex-direction: column;
							margin: 0upx;

							.picture {
								width: 211upx;
								height: 211upx;
								border-radius: 10upx;
								border: solid 1upx #bfbfbf;
								image{
									width: 208upx;
									height: 208upx;
									border-radius: 10upx;
								}
							}

							.title {
								font-size: 24upx;
								color: #999999;
								text-align: center;
							}
						}
					}

					.head_portrait {
						width: 100upx;
						height: 100upx;
						border-radius: 10upx;
						position: absolute;
						top: -50upx;
						right: 10px;

						image {
							width: 100upx;
							height: 100upx;
							border-radius: 10upx;
						}
					}
				}
			}

			.content2 {
				width: 686upx;
				height: 288upx;
				background-color: #ffffff;
				border-radius: 10upx;
				margin-top: 20upx;
				padding: 51upx 3upx 51upx 4upx;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;

				.box {
					width: 337upx;
					height: 142upx;

					.content2_title {
						font-size: 28upx;
						color: #999999;
						text-align: center;
					}

					.content2_number {
						font-size: 50upx;
						color: #febf66;
						text-align: center;
					}
				}

				.one {
					border-right: 1upx solid #e5e5e5;
					border-bottom: 1upx solid #e5e5e5;
				}

				.two {
					border-bottom: 1upx solid #e5e5e5;
				}

				.tree {
					border-right: 1upx solid #e5e5e5;
					display: flex;
					justify-content: flex-end;
					flex-direction: column;
				}

				.four {
					display: flex;
					justify-content: flex-end;
					flex-direction: column;
				}
			}

			.content3 {
				padding: 20upx 10upx 35upx 14upx;
				background-color: #ffffff;
				border-radius: 10upx;
				margin-top: 20upx;

				.content3_title {
					font-size: 28upx;
					color: #333333;
					font-weight: 600;
				}

				.content3_info {
					display: flex;
					justify-content: space-between;
					padding: 30upx 0upx 30upx 0upx;
					border-bottom: 1upx solid #eeeeee;

					.goods_photo {
						width: 140upx;
						height: 139upx;
						border-radius: 10upx;
						border: 1px solid #f1f1f1;
						image {
							width: 140upx;
							height: 139upx;
							border-radius: 10upx;
						}
					}

					.goods_info {
						width: 507upx;
						padding-right: 10upx;
						box-sizing: border-box;
						.goods_name {
							font-size: 28upx;
							color: #333333;
						}

						.goods_details {
							display: flex;
							justify-content: space-between;
							font-size: 24upx;
							color: #666666;
						}
					}
				}
			}
		}

	}
</style>
