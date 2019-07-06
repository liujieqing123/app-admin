<template>
	<view class=" OrderDetails">
		<view class="content">
			<view class="header">订单详情</view>
			<view class="title">
				<view class="OrderNumber">
					<text class="name">订单号：</text>
					<text class="number">{{order_list.order_sn}}</text>
				</view>
				<view class="state">{{order_list.order_state}}</view>
			</view>
			<!-- 商品详情 -->
			<view class="GoodsDetails">
				<view class="GoodsTitle">商品详情</view>
				<!-- 东方百泰店铺一 -->
				<view class="GoodsInfo" v-if="goods_show">
					<view class="ShopNames">
						<view class="logo">
							<image :src="order_list.extend_order_goods.dfbt.avatar" />
						</view>
						<view class="Sname">{{order_list.extend_order_goods.dfbt.shop_name}}</view>
					</view>
					<view class="Info" v-for="(goodsItem,index) in order_list.extend_order_goods.dfbt.goods" :key='index'>
						<view class="photo">
							<image :src="goodsItem.goods_image" />
						</view>
						<view class="InfoDetails">
							<view class="top">
								<text class="gname">{{goodsItem.goods_name}}</text>
								<text>￥{{goodsItem.goods_price}}</text>
							</view>
							<view class="bottom">
								<text>型号:{{goodsItem.goods_model}}</text>
								<text>x{{goodsItem.goods_num}}</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 店铺二 -->
				<view class="GoodsInfo" v-if="shopGoods_show">
					<view class="ShopNames">
						<view class="logo">
							<image :src="order_list.extend_order_goods.dealer.avatar" />
						</view>
						<view class="Sname">{{order_list.extend_order_goods.dealer.shop_name}}</view>
					</view>
					<view class="Info" v-for="(ditem,index1) in order_list.extend_order_goods.dealer.goods" :key='index1'>
						<view class="photo">
							<image :src="ditem.goods_image" />
						</view>
						<view class="InfoDetails">
							<view class="top">
								<text class="gname">{{ditem.goods_name}}</text>
								<text>￥{{ditem.goods_price}}</text>
							</view>
							<view class="bottom">
								<text></text>
								<text>x{{ditem.goods_num}}</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 合计 -->
				<view class="total">
					<text class="TotalTitle">合计：</text>
					<text class="TotalNum">￥{{order_list.order_amount}}</text>
				</view>
			</view>
			<!-- 买家信息 -->
			<view class="CommonInfo" v-if="usertype == 2">
				<view class="CommonTitle">买家信息</view>
				<view class="CommonDetail">
					<text>姓名：</text>
					<text>{{buy_info.reciver_name}}</text>
				</view>
				<view class="CommonDetail">
					<text>联系电话：</text>
					<text>{{buy_info.mob_phone}}</text>
				</view>
				<view class="CommonDetail">
					<text>接收信息电话：</text>
					<text>{{buy_info.tel_phone}}</text>
				</view>
				<view class="CommonDetail siteItem">
					<text class='text1'>地址：</text>
					<view class='text2'>
						<view>{{buy_info.address}}</view>
					</view>
				</view>
			</view>
			<!-- 用户备注 -->
			<view class="UserNote" v-if="usertype == 2">
				<text class="NoteTitle">用户备注：</text>
				<text class="Note">{{order_list.order_message}}</text>
			</view>
			<!-- 经销商用户归属 -->
			<view class="UserNote" v-if="usertype == 2">
				<text class="NoteTitle">订单归属：</text>
				<text class="Note">{{order_list.order_stuff}}</text>
			</view>
			<!-- 代理商用户归属 -->
			<view class="UserNote" v-if="usertype == 1">
				<text class="NoteTitle">订单归属：</text>
				<text class="Note">{{order_list.order_release}}</text>
			</view>
			<!-- 经销商其他订单金额 -->
			<!-- 其他订单金额 -->
			<view class="CommonInfo" v-if="usertype == 2 && order_list.order_type == 1">
				<view class="CommonTitle">订单金额</view>
				<view class="CommonDetail">
					<text>总额：</text>
					<text>￥{{order_list.order_amount}}</text>
				</view>
				<view class="CommonDetail">
					<text>使用优惠劵：</text>
					<text>-￥{{order_list.voucher_price}}</text>
				</view>
				<view class="CommonDetail">
					<text>订单优惠：</text>
					<text>-￥{{order_list.voucher_price}}</text>
				</view>
				<view class="CommonDetail">
					<text>实付：</text>
					<text class="net">￥{{order_list.pd_amount}}</text>
				</view>
				<view class="CommonDetail" v-if="order_list.order_state == '已付款' && usertype == 2">
					<view class="Completed">已支付完成</view>
				</view>
			</view>
			<!-- 代理商订单总额-->
			<view class="UserNote" v-if="usertype == 1 && order_list.order_type == 1">
				<text class="NoteTitle">订单总额：</text>
				<text class="Note">{{order_list.order_amount}}</text>
			</view>

			<!-- 代理商订单获得分成-->
			<view class="UserNote" v-if="order_list.order_state == '已付款' && usertype == 1">
				<text class="NoteTitle">获得分成：</text>
				<text class="Note">{{order_list.order_seller_money}}</text>
			</view>

			<!-- 预售订单金额 -->
			<view class="CommonInfo" v-if="order_list.order_type == 2">
				<view class="CommonTitle">订单金额</view>
				<view class="CommonDetail">
					<text>订金(已支付)：</text>
					<text>￥{{aorderstages.stages_price}}</text>
				</view>
				<view class="CommonDetail" v-if="order_list.order_state == '已付款' && order_list.order_type == 2">
					<text>尾款(已支付)：</text>
					<text>￥{{borderstages.stages_price}}</text>
				</view>
				<view class="CommonDetail" v-if="(order_list.order_state == '待付款' && order_list.order_type == 2)|| (order_list.order_state == '已取消' && order_list.order_type == 2)">
					<text>尾款<text class="Unpaid">(未支付)</text>：</text>
					<text>￥{{borderstages.stages_price}}</text>
				</view>
				<!-- 经销商实付 -->
				<view class="CommonDetail" v-if="usertype == 2">
					<text>实付：</text>
					<text class="net">￥{{order_list.pd_amount}}</text>
				</view>
				<!-- 代理商总额 -->
				<view class="CommonDetail" v-if="usertype == 1">
					<text>总额：</text>
					<text class="net">￥{{order_list.pd_amount}}</text>
				</view>
				<view class="CommonDetail" v-if="order_list.order_state == '已付款' && usertype == 2">
					<view class="Completed">已支付完成</view>
				</view>
			</view>
			<!-- 订单创建时间 -->
			<view class="CreatTime" v-if="order_list.order_state == '待付款' && order_list.order_type == 1">
				<text class="TimeTitle">订单创建时间：</text>
				<text class="TimeDetail">{{order_list.add_time | changTime}}</text>
			</view>
			<!-- 其他订单信息 -->
			<view class="CommonInfo" v-if="order_list.order_state == '已付款' && order_list.order_type == 1">
				<view class="CommonTitle">订单信息</view>
				<view class="CommonDetail" v-if="usertype == 2">
					<text>支付方式：</text>
					<text>{{order_list.payment_code}}</text>
				</view>
				<view class="CommonDetail">
					<text>订单创建时间：</text>
					<text>{{order_list.add_time | changTime}}</text>
				</view>
				<view class="CommonDetail">
					<text>订单支付时间:</text>
					<text>{{order_list.payment_time | changTime}}</text>
				</view>
				<view class="CommonDetail">
					<text>订单完成时间:</text>
					<text>{{order_list.payment_time | changTime}}</text>
				</view>
			</view>

			<!-- 待支付尾款预售订单信息 -->
			<view class="CommonInfo" v-if="order_list.order_state == '待付款' && order_list.order_type == 2">
				<view class="CommonTitle">订单信息</view>
				<view class="CommonDetail" v-if="usertype == 2">
					<text>订金支付方式：</text>
					<text>{{order_list.payment_code}}</text>
				</view>
				<view class="CommonDetail">
					<text>订单创建时间：</text>
					<text>{{order_list.add_time | changTime}}</text>
				</view>
				<view class="CommonDetail">
					<text>订金支付时间:</text>
					<text>{{aorderstages.pay_time | changTime}}</text>
				</view>
			</view>

			<!-- 已完成预售订单信息 -->
			<view class="CommonInfo" v-if="order_list.order_state == '已付款' && order_list.order_type == 2">
				<view class="CommonTitle">订单信息</view>
				<view class="CommonDetail" v-if="usertype == 2">
					<text>订金支付方式：</text>
					<text>{{order_list.payment_code}}</text>
				</view>
				<view class="CommonDetail" v-if="usertype == 2">
					<text>尾款支付方式：</text>
					<text>{{order_list.payment_code}}</text>
				</view>
				<view class="CommonDetail">
					<text>订单创建时间：</text>
					<text>{{order_list.add_time | changTime}}</text>
				</view>
				<view class="CommonDetail">
					<text>订金支付时间:</text>
					<text>{{aorderstages.pay_time | changTime}}</text>
				</view>
				<view class="CommonDetail">
					<text>尾款支付时间:</text>
					<text>{{borderstages.pay_time | changTime}}</text>
				</view>
				<view class="CommonDetail">
					<text>订单完成时间:</text>
					<text>{{order_list.payment_time | changTime}}</text>
				</view>
			</view>

			<!-- 取消订单的原因 -->
			<!-- 正常订单 -->
			<view class="UserNote" v-if="usertype == 2 && order_list.order_state == '已取消' && order_list.order_type == 1">
				<text class="NoteTitle">取消原因：</text>
				<text class="Reason">订单未支付</text>
			</view>
			<!-- 预售订单 -->
			<view class="UserNote" v-if="usertype == 2 && order_list.order_state == '已取消' && order_list.order_type == 2">
				<text class="NoteTitle">取消原因：</text>
				<text class="Reason">订单未支付尾款</text>
			</view>

			<!-- 已取消订单的信息 -->
			<view class="CommonInfo" v-if="order_list.order_state == '已取消'">
				<view class="CommonTitle">订单信息</view>
				<view class="CommonDetail" v-if="order_list.order_state == '已取消' && order_list.order_type == 2">
					<text>订金支付方式：</text>
					<text>{{order_list.payment_code}}</text>
				</view>
				<view class="CommonDetail">
					<text>订单创建时间：</text>
					<text>{{order_list.add_time | changTime}}</text>
				</view>
				<view class="CommonDetail">
					<text>订单取消时间:</text>
					<text>{{order_list.cancel_time | changTime}}</text>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//订单总信息列表
				order_list: {},
				//东方百泰信息
				//  dfbt_list:{},
				//其他经销商店铺信息
				//  dealer_list:{},
				//买家信息
				buy_info: {},
				//订单店铺信息
				extend_order_goods: {},
				// 类型
				//  dfbtType:'',
				//  dealerType:'',
				// 用户类型
				usertype: '',
				order_id: '',
				goods_show: false,
				shopGoods_show: false,
				//预售订单的 orderstages 数组数据
				aorderstages: '',
				borderstages: ''
			}
		},
		onLoad(option) {
			this.order_id = option.order_id;
			this.usertype = option.usertype;
			//发起请求
			this.getData();
		},
		filters: {
			// 时间过滤器
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
			getData() {
				this.$api.OrderInfo({
					order_id: this.order_id,
				}).then((res) => {
					console.log(res)
					if (res.data.errcode == 0) {
						this.goods_show = Boolean(res.data.data.extend_order_goods.dfbt);
						this.shopGoods_show = Boolean(res.data.data.extend_order_goods.dealer);
						this.order_list = res.data.data;
						this.buy_info = res.data.data.address;
						if (res.data.data.order_type == 2) {
							this.aorderstages = res.data.data.orderstages[0];
							this.borderstages = res.data.data.orderstages[1];
						}
					} else {
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

	.OrderDetails {
		padding: 0upx 30upx 50upx 31upx;
		background: #F1F1F1;

		.content {
			.header {
				font-size: 40upx;
				color: #333333;
				font-weight: 600;
				padding-top: 25upx;
				letter-spacing: 5upx;
			}

			.title {
				width: 637upx;
				height: 90upx;
				background-color: #ffffff;
				border-radius: 10upx;
				margin-top: 39upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0upx 26upx 0upx 27upx;
				letter-spacing: 5upx;

				.name {
					font-size: 32upx;
					color: #333333;
					font-weight: 600;
				}

				.number {
					font-size: 28upx;
					color: #333333;
				}

				.state {
					font-size: 28upx;
					color: #f37518;
				}
			}

			// 商品详情
			.GoodsDetails {
				background: #ffffff;
				border-radius: 10upx;
				margin-top: 32upx;
				padding: 28upx 28upx 0upx 26upx;

				.GoodsTitle {
					font-size: 32upx;
					color: #333333;
					font-weight: 600;
					letter-spacing: 5upx;
				}

				.GoodsInfo {
					margin-top: 49upx;
					padding-bottom: 46upx;
					border-bottom: 1upx solid #ccc;

					.ShopNames {
						display: flex;
						justify-content: start;
						margin-bottom: 21upx;
						font-weight: 600;

						.logo {
							width: 40upx;
							height: 42upx;
							line-height: 42upx;

							image {
								width: 40upx;
								height: 42upx;
							}
						}

						.Sname {
							font-size: 30upx;
							color: #333333;
						}
					}

					.Info {
						display: flex;
						justify-content: start;
						margin-top: 37upx;

						.photo {
							width: 127upx;
							height: 127upx;
							border-radius: 10upx;
							border: 1px solid #f1f1f1;
							image {
								width: 127upx;
								height: 127upx;
								border-radius: 10upx;
							}
						}

						.InfoDetails {
							width: 483upx;
							height: 127upx;
							display: flex;
							justify-content: space-between;
							flex-direction: column;
							padding-left: 25upx;

							.top {
								font-size: 28upx;
								color: #333333;
								display: flex;
								justify-content: space-between;

								.gname {
									width: 300upx;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
								}
							}

							.bottom {
								font-size: 24upx;
								color: #999999;
								display: flex;
								justify-content: space-between;
							}
						}
					}
				}

				.total {
					width: 635upx;
					height: 131upx;
					display: flex;
					justify-content: flex-end;
					align-items: center;

					.TotalTitle {
						font-size: 28upx;
						color: #666666;
					}

					.TotalNum {
						font-size: 36upx;
						color: #fe3f31;
						font-weight: 600;
					}
				}
			}

			// 买家信息 // 订单金额
			.CommonInfo {
				background: #ffffff;
				margin-top: 30upx;
				border-radius: 10upx;
				padding: 28upx 31upx 50upx 27upx;

				.CommonTitle {
					font-size: 32upx;
					color: #333333;
					font-weight: 600;
					margin-bottom: 29upx;
					letter-spacing: 5upx;
				}

				.CommonDetail {
					font-size: 28upx;
					color: #666666;
					display: flex;
					justify-content: space-between;
					margin-top: 21upx;

					.net {
						font-size: 30upx;
						color: #fe3f31;
					}

					.Unpaid {
						font-size: 30upx;
						color: #f37518;
					}

					.Completed {
						font-size: 25upx;
						color: red;
					}
				}

				.siteItem {
					display: flex;

					.text1 {
						width: 15%;
					}

					.text2 {
						width: 85%;

						view {
							max-width: 100%;
							float: right;
							word-wrap: break-word;
							word-break: normal;
						}
					}
				}
			}

			// 用户备注
			.UserNote {
				padding: 29upx 0upx 29upx 26upx;
				background: #ffffff;
				margin-top: 30upx;
				border-radius: 10upx;

				.NoteTitle {
					font-size: 32upx;
					color: #333333;
					font-weight: 600;
					letter-spacing: 5upx;
				}

				.Note {
					font-size: 28upx;
					color: #666666;
				}

				.Reason {
					font-size: 28upx;
					color: red;
				}
			}

			//订单创建时间
			.CreatTime {
				padding: 29upx 28upx 30upx 26upx;
				background: #ffffff;
				margin-top: 30upx;
				border-radius: 10upx;
				display: flex;
				justify-content: space-between;

				.TimeTitle {
					font-size: 32upx;
					color: #333333;
					font-weight: 600;
					letter-spacing: 5upx;
				}

				.TimeDetail {
					font-size: 28upx;
					color: #666666;
				}
			}

		}
	}
</style>
