<template>
	<view class="order">
		<view class='head_style'>
			<!-- 搜索 -->
			<view class="serach">
				<view class="content" :style="{'border-radius':radius+'px'}">
					<view class="content-box" :class="{'center':mode === 2}">
						<text class="iconfont icon-fangdajing"></text>
						<input class="input" :class="{'center':!active && mode === 2}" :focus="isFocus" placeholder="请输入搜索内容" v-model="inputVal"
						 @focus="focus" @blur="blur" />
						<!-- <view v-if="!active && mode === 2" class="input sub" @click="getFocus">请输入搜索内容</view> -->
						<text v-if="isDelShow" class="iconfont icon-guanbi2" @click="clear"></text>
					</view>
					<view v-show="(active&&show&&button === 'inside')||(isDelShow && button === 'inside')" class="serachBtn" @click="search">
						搜索
					</view>
				</view>
				<view v-if="button === 'outside'" class="button" :class="{'active':show||active}" @click="search">
					<view class="button-item">{{!show?searchName:'搜索'}}</view>
				</view>
			</view>

			<!-- tab -->
			<view class="tab">
				<view class="title" @tap="curId(10)" :class="{'cur':cur_id===10}">待付款</view>
				<view class="title" @tap="curId(2)" :class="{'cur':cur_id===2}">预售订单</view>
				<view class="title" @tap="curId(20)" :class="{'cur':cur_id===20}">已付款</view>
				<view class="title" @tap="curId(0)" :class="{'cur':cur_id===0}">已取消</view>
			</view>
		</view>

		<!-- 订单信息 -->
		<view class="OrderInfo">
			<view>
				<!-- 搜索到0条结果 -->
				<view class="empty" v-if="isShow">{{noth}}</view>
				<!-- 订单信息 -->
				<view class="Info" v-for="(item,index) in order_list" :key="index">
					<view class="order_title">
						<view class="title_left">
							<text class="OrderNum">订单号：</text>
							<text class="number">{{item.order_sn}}</text>
						</view>
						<view class="presell" v-if='item.order_type == 2'>预售</view>
					</view>

					<!-- 东方百泰店 -->
					<view class="GoodsInfo" v-if="item.extend_order_goods.dfbt">
						<view class="ShopNames">
							<view class="logo">
								<image :src="item.extend_order_goods.dfbt.avatar" v-if='Boolean(item.extend_order_goods.dfbt.avatar)'/>
							</view>
							<view class="Sname" v-if='Boolean(item.extend_order_goods.dfbt.shop_name)'>{{item.extend_order_goods.dfbt.shop_name}}</view>
						</view>
						<view class="InfoDetails" v-for="(gitem,index1) in item.extend_order_goods.dfbt.goods" :key="index1">
							<view class="top">
								<text class='goods_name'>{{index1*1+1}}、{{gitem.goods_name}}</text>
								<text>￥{{gitem.goods_price}} x{{gitem.goods_num}}</text>
							</view>
						</view>
					</view>
					<!-- 经销商店铺 -->
					<view class="GoodsInfo" v-if="item.extend_order_goods.dealer">
						<view class="ShopNames">
							<view class="logo">
								<image :src="item.extend_order_goods.dealer.avatar" v-if='Boolean(item.extend_order_goods.dealer.avatar)' />
							</view>
							<view class="Sname">{{item.extend_order_goods.dealer.shop_name}}</view>
						</view>
						<view class="InfoDetails" v-for="(ditem,index2) in item.extend_order_goods.dealer.goods" :key="index2">
							<view class="top">
								<text>{{ditem.goods_name}}</text>
								<text>￥{{ditem.goods_price}}</text>
							</view>
							<view class="bottom">x{{ditem.goods_num}}</view>
						</view>
					</view>
					<!-- 预售订单定金和尾款 -->
					<view class="Payment" v-if='item.order_type == 2'>
						<view class="earnest">
							<view class="first_stage">阶段一：已付定金</view>
							<view class="first_price">￥{{item.orderstages[0].stages_price}}</view>
						</view>
						<view class="final_payment" v-if="cur_id == 20 && item.order_type == 2">
							<view class="second_stage">阶段二：已支付尾款</view>
							<view class="second_price">￥{{item.orderstages[1].stages_price}}</view>
						</view>
						<view class="final_payment" v-if="(cur_id == 2 && item.order_type == 2) || (cur_id == 0 && item.order_type == 2)">
							<view class="second_stage">阶段二：待付尾款</view>
							<view class="second_price">￥{{item.orderstages[1].stages_price}}</view>
						</view>
						<view class="final_payment" v-if='cur_id == 2'>
							<view class="payment_time">{{pay_start_time}} 开始支付尾款</view>
						</view>
					</view>

					<!-- 总价 -->
					<view class="OrderPrice">
						<view class="Common">
							<text class="CommonTitle">订单总价：</text>
							<text class="CommonNum">￥{{item.order_amount}}</text>
						</view>
						<view class="Common" v-if="cur_id == 10 ? true: false">
							<text class="CommonTitle">提交时间：</text>
							<text class="CommonTitle">{{item.add_time | changTime}}</text>
						</view>
						<view class="Common" v-if="cur_id == 20 ? true: false">
							<text class="CommonTitle">付款时间：</text>
							<text class="CommonTitle">{{item.payment_time | changTime}}</text>
						</view>
						<view class="Common" v-if="cur_id == 0 ? true: false">
							<text class="CommonTitle">取消时间：</text>
							<text class="CommonTitle">{{item.cancel_time | changTime}}</text>
						</view>
					</view>
					<!-- 已完成的按钮 -->
					<view class="fbottom">
						<view class="DeliveryStatus" v-if="cur_id == 10 ? true: false || cur_id == 2 ? true: false"></view>
						<view class="DeliveryStatus" v-if="(cur_id == 0 ? true: false) && (item.order_type == 1)">取消原因:未支付</view>
						<view class="DeliveryStatus" v-if="(cur_id == 0 ? true: false) && (item.order_type == 2)">取消原因:未支付尾款</view>
						<view class="DeliveryStatus" v-if="cur_id == 20 ? true: false">{{item.order_state}}</view>
						<button @tap="ViewDetails(item.order_id,usertype)">查看详情</button>
					</view>
				</view>
				<view class='load_text' @tap='clickLoad' v-if='load_show'>加载更多</view>
				<view class='hint_text' v-if='bottom_show'>已经到底部了</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import ChangePrice from '../order/ChangePrice.vue';
	var _self;
	export default {
		props: {
			mode: {
				value: Number,
				default: 1
			},
			button: {
				value: String,
				default: 'outside'
			},
			show: {
				value: Boolean,
				default: true
			},
			radius: {
				value: String,
				default: 60
			},
			//接收angent.vue传过来的参数usertype
			usertype: {
				value: String,
				default: 0
			}
		},
		components: {
			
		},
		data() {
			return {
				//搜索
				active: false,
				inputVal: '',
				searchName: '取消',
				isDelShow: false,
				isFocus: false,
				cur_id: 10,
				//订单信息数据
				order_list: [],
				//点击的相应订单id
				order_id: '',
				//搜索到0条结果
				noth: '',
				//控制0条结果的搜索样式
				isShow: false,
				// 加载页数
				page_index: 1,
				last_page: '',
				load_show: false,
				bottom_show: false,
				order_state: 10,
				order_type: 1,
				//开始支付尾款时间
				pay_start_time:''
			}
		},
		mounted() {
			this.GetOrderList();
		},
		onLoad() {

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
			//发起请求(订单列表)
			GetOrderList() {
				//发起请求(列表数据)
				this.$api.GetSellerOrderList({
					page: this.page_index, // 第几页
					nums: 10, //每页显示多少条
					order_state: this.order_state, // 订单状态：0:已取消 10:未付款 20:已付款 30:已发货 40:已收货
					order_type: this.order_type,
					order_sn: '' // 搜索订单号
				}).then((res) => {
					console.log(res.data.data)
					if (res.data.errcode == 0) {
						this.load_show = true;
						this.last_page = res.data.data.last_page;
						let arr = res.data.data.data;
						for (let i = 0; i < arr.length; i++) {
							this.order_list.push(arr[i])
							//处理开始支付尾款pay_start_time的时间格式
							if (this.order_list[i].order_type == 2) {
								let pay_start_time = this.order_list[i].orderstages.pay_start_time;
								let d = new Date(pay_start_time); //rd为时间戳
								let YMDHMS = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() +
									":" + d.getSeconds();
								this.pay_start_time = YMDHMS;
							}
						}

						if (this.order_list.length == res.data.data.total) {
							this.load_show = false;
							this.bottom_show = true;
						}
						if (res.data.data.data.length == 0) {
							this.load_show = false;
							this.bottom_show = false;
						}
					}
				}).catch((err) => {
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
				this.GetOrderList()
			},
			//搜索
			focus() {
				this.active = true;
			},
			blur() {
				this.isFocus = false;
				if (!this.inputVal) {
					this.active = false;
				}
			},
			clear() {
				this.inputVal = '';
				this.active = false;
				this.$emit('search', '');
			},
			getFocus() {
				this.isFocus = true;
			},
			search() {
				this.$emit('search', this.inputVal);
				this.$api.GetOrderList({
					order_state: this.cur_id,
					order_sn: this.inputVal
				}).then((res) => {
					this.order_list = res.data.data.data;
					this.isShow = false; //搜索到结果就隐藏'搜索到0条结果'的样式
					console.log(this.order_list);
					if (res.data.data.total == 0) { //如果搜索不到结果，就渲染'搜索到0条结果'的样式
						this.noth = '搜索到0条结果';
						this.isShow = true;
					}
				}).catch((err) => {
					console.log('request fail', err);
				})
			},
			//选项卡切换
			curId(str) {
				_self = this;
				_self.cur_id = str; //点击改变cur_id的值
				_self.order_list = [];
				_self.page_index = 1;
				if (_self.cur_id == 10) {
					_self.order_state = str;
					_self.order_type = 1;
				} else if (_self.cur_id == 20) {
					_self.order_type =100;
					_self.order_state = 20;
				} else if (_self.cur_id == 0) {
					_self.order_state = str;
					_self.order_type = '';
				} else if (_self.cur_id == 2) {
					_self.order_type = 2;
					_self.order_state = 10;
				}
				_self.GetOrderList(); //改变cur_id值后请求数据
			},
			//查看详情
			ViewDetails(order_id,usertype) {
				uni.navigateTo({
					url: '../order/orderDetails?order_id=' + order_id+'&usertype='+usertype
				})
			},
		},
		watch: {
			inputVal(newVal) {
				if (newVal) {
					this.searchName = '搜索';
					this.isDelShow = true;
				} else {
					this.searchName = '取消';
					this.isDelShow = false;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order {
		width: 100%;
		height: 100vh;
		background: #F1F1F1;
		padding: 245upx 0upx 120upx 0upx;

		.head_style {
			width: 100%;
			position: fixed;
			top: 0upx;
			left: 0;
			background: #fff;
			padding-top: 55upx;
			box-sizing: border-box;
			z-index: 9999;

			//搜索
			.serach {
				display: flex;
				width: 100%;
				box-sizing: border-box;
				padding: 15upx;
				font-size: $uni-font-size-base;
				background: #fff;

				.content {
					display: flex;
					align-items: center;
					width: 598upx;
					height: 58upx;
					// border: 1px #ccc solid;
					background-color: #efefef;
					// background: #fff;
					overflow: hidden;
					transition: all 0.2s linear;
					border-radius: 30px;

					.content-box {
						width: 100%;
						display: flex;
						align-items: center;

						&.center {
							justify-content: center;
						}

						.iconfont {
							padding: 0 15upx;

							&.iconfont-del {
								font-size: 38upx;
							}
						}

						.icon-guanbi2 {
							color: #ccc;
						}

						.iconfangdajing {
							font-size: 40upx;
						}

						.input {
							width: 100%;
							max-width: 100%;
							line-height: 60upx;
							height: 60upx;
							transition: all 0.2s linear;

							&.center {
								width: 200upx;
							}

							&.sub {
								// position: absolute;
								width: auto;
								color: grey;
							}
						}
					}

					.serachBtn {
						height: 100%;
						flex-shrink: 0;
						padding: 0 30upx;
						background: $uni-color-success;
						line-height: 60upx;
						color: #fff;
						border-left: 1px #ccc solid;
						transition: all 0.3s;
					}
				}

				.button {
					display: flex;
					align-items: center;
					justify-content: center;
					position: relative;
					flex-shrink: 0;
					width: 0;
					transition: all 0.2s linear;
					white-space: nowrap;
					overflow: hidden;

					&.active {
						padding-left: 15upx;
						width: 100upx;
					}
				}
			}

			//tab
			.tab {
				height: 110upx;
				background: white;
				letter-spacing: 5upx;
				border-bottom: 1px solid #eee;
				display: flex;
				justify-content: space-around;

				.title {
					height: 110upx;
					line-height: 110upx;
					// margin-right: 50upx;
					font-size: 30upx;
					color: #666666;
				}

				.cur {
					font-size: 40upx;
					font-weight: 600;
					color: #febf66;
				}
			}
		}

		//订单信息
		.OrderInfo {
			padding: 30upx 30upx 130upx 30upx;
			background: #F1F1F1;
			.Info {
				background: #ffffff;
				border-radius: 10upx;
				// padding: 10upx 21upx 50upx 21upx;
				padding: 20upx;
				margin-bottom: 20upx;

				.order_title {
					display: flex;
					justify-content: space-between;
					align-items: center;
					// background: #369;

					.title_left {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						letter-spacing: 5upx;
						border-bottom: 1px solid #eee;
						padding-bottom: 8upx;

						.OrderNum {
							font-size: 28upx;
							color: #666;
							font-weight: 600;
						}

						.number {
							font-size: 28upx;
							color: #333333;
						}
					}

					.presell {
						font-size: 28upx;
						color: #fc2b3f;
					}
				}

				.GoodsInfo {
					margin-top: 10upx;

					// padding-bottom: 10upx;
					// border-bottom: 1upx solid #e5e5e5;
					.ShopNames {
						display: flex;
						justify-content: start;
						align-items: center;
						margin-bottom: 10upx;
						font-weight: 600;

						.logo {
							width: 30upx;
							height: 30upx;
							line-height: 30upx;
							margin-right: 10upx;

							image {
								width: 30upx;
								height: 30upx;
							}
						}

						.Sname {
							font-size: 30upx;
							color: #333333;
						}
					}

					.InfoDetails {
						// height: 74upx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						// margin-top: 29upx;
						// background: #f00;
						padding-bottom: 10upx;

						.top {
							font-size: 30upx;
							color: #333333;
							display: flex;
							justify-content: space-between;

							// background: #397;
							.goods_name {
								width: 65%;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
						}

						.bottom {
							width: 28upx;
							font-size: 24upx;
							color: #999999;
							padding-left: 621upx;
						}
					}
				}

				.Payment {
					border-top: 1px dashed #eee;
					border-bottom: 1px dashed #eee;
					display: flex;
					justify-content: space-between;
					flex-direction: column;
					padding: 8upx 0;

					view {
						display: flex;
						justify-content: space-between;
						font-size: 16upx;
						color: #666;
						padding: 2upx 0;
					}

					.earnest {
						view {
							color: #fc7c28;
						}
					}

				}

				.OrderPrice {
					margin-top: 30upx;

					.Common {
						display: flex;
						justify-content: space-between;
						margin-top: 8upx;

						.CommonTitle {
							font-size: 25upx;
							color: #999999;
						}

						.CommonNum {
							font-size: 32upx;
							color: #fe3f31;
							font-weight: 600;
						}
					}

				}
				.fbottom {
					display: flex;
					margin-top: 26upx;
					justify-content: space-between;
					align-items: center;
					button {
						width: 184upx;
						height: 58upx;
						border-radius: 29upx;
						border: solid 2upx #febf66;
						font-size: 28upx;
						color: #febf66;
						line-height: 58upx;
						margin: 0;
						background: #fff;
					}
					.DeliveryStatus{
						font-size: 25upx;
						color: red;
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
	}
</style>
