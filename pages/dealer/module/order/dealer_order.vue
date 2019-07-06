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
								<image :src="item.extend_order_goods.dfbt.avatar" v-if='Boolean(item.extend_order_goods.dfbt.avatar)' />
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
						<view class="final_payment" v-if='item.orderstages[0].stages_state == 2' :class='{earnest:item.orderstages[0].stages_state == 2}'>
							<view class="first_stage">阶段一：已付订金</view>
							<view class="first_price">￥{{item.orderstages[0].stages_price}}</view>
						</view>
						<view class="final_payment" v-if='item.orderstages[0].stages_state == 1'>
							<view class="first_stage">阶段一：未支付订金</view>
							<view class="first_price">￥{{item.orderstages[0].stages_price}}</view>
						</view>
						<view class="final_payment" v-if="item.orderstages[1].stages_state == 2" :class='{earnest:item.orderstages[1].stages_state == 2}'>
							<view class="second_stage">阶段二：已支付尾款</view>
							<view class="second_price">￥{{item.orderstages[1].stages_price}}</view>
						</view>
						<view class="final_payment" v-if="item.orderstages[1].stages_state == 1">
							<view class="second_stage">阶段二：未支付尾款</view>
							<view class="second_price">￥{{item.orderstages[1].stages_price}}</view>
						</view>
						<view class="final_payment" v-if='item.orderstages[1].stages_state == 1'>
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
					<!-- 控制按钮的显隐 -->
					<!-- 待付款按钮 -->
					<view class="dbottom" v-if="cur_id == 10 ? true: false">
						<button @tap="Change(item.order_id)">修改价格</button>
						<button @tap="ViewDetails(item.order_id,usertype)">查看详情</button>
						<button @tap="cancellationo_rder(item.order_id)">取消订单</button>
					</view>
					<!-- 预售订单按钮 -->
					<view class="dbottom" v-if="cur_id == 2 ? true: false">
						<button @tap="PayTail(item.order_sn,item.order_type,item.orderstages[1].stages_price,item.orderstages[1].pay_sn)" v-if='item.orderstages[1].stages_state == 1'>支付尾款</button>
						<button @tap="ViewDetails(item.order_id,usertype)">查看详情</button>
						<button @tap="cancellationo_rder(item.order_id)">取消订单</button>
					</view>
					<!-- 已取消的按钮 -->
					<view class="ebottom" v-if="cur_id == 0 ? true: false">
						<button @tap="ViewDetails(item.order_id,usertype)">查看详情</button>
						<button @tap="Delete_order(item.order_id)">删除</button>
					</view>
					<!-- 已完成的按钮 -->
					<view class="fbottom" v-if="cur_id == 20 ? true: false">
						<view class="DeliveryStatus">{{item.order_state}}</view>
						<button @tap="ViewDetails(item.order_id,usertype)">查看详情</button>
					</view>
					<!-- 订单标识 -->
					<view class='index_num'>{{index*1+1}}</view>
				</view>
				<view class='load_text' @tap='clickLoad' v-if='load_show'>加载更多</view>
				<view class='hint_text' v-if='bottom_show'>已经到底部了</view>
				<view class='hint_text' v-if='order_list.length == 0' @tap='clickLoad'>没有订单</view>
			</view>
		</view>
			
		<!--  二维码付款遮罩层 -->
		<view class="mak" v-if="mask_show">
			<view class="QRcode">
				<view class="icon">
					<text class="iconfont icon-guanbi6" @tap="CloseQRcode()"></text>
				</view>
				<view class="photo">
					<tki-qrcode ref="qrcode" :val="val" :size="size" :icon="icon" :onval="onval" :loadMake="loadMake" @result="qrR" />
				</view>
				<view class='payment_text'>扫码支付金额：<text>￥{{stages_price}}</text></view>
			</view>
		</view>
		<!-- 组件 -->
		<ChangePrice v-if="ishow" @close="CloseChan" @Confirm="ConfirmChange"></ChangePrice>
	</view>
</template>

<script>
	import ChangePrice from './ChangePrice.vue';
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue" // 生成二维码的组件
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
			//接收dealer.vue传过来的参数usertype
			usertype: {
				value: String,
				default: 0
			}
		},
		components: {
			ChangePrice,
			tkiQrcode
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
				ishow: false,
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
				//加载更多
				load_show: false,
				//已经到底部
				bottom_show: false,
				order_state: 10,
				order_type: 1,
				// 二维码模态框显示
				codeQR_show: false,
				// 遮罩层显示
				mask_show: false,
				// 二维码
				val: '',
				size: 350,
				icon: '',
				onval: true,
				loadMake: true,
				// 未支付的尾款
				stages_price: '',
				//开始支付尾款时间
				pay_start_time:'',
				//支付点击的订单号
				order_sn:'',
				//支付单号
				pay_sn:'',
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
			},
		},
		methods: {
			//发起请求(订单列表)
			GetOrderList() {
				//发起请求(列表数据)
				this.load_show = false;
				this.bottom_show = false;
				this.$api.GetOrderList({
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
						}else{
							this.load_show = true;
							this.bottom_show = false;
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
					_self.order_type = 100;
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
			//弹出修改价格弹窗
			Change(order_id) {
				this.ishow = true;
				this.order_id = order_id;
			},
			//点击修改价格弹窗的关闭按钮，关闭弹窗
			CloseChan() {
				this.ishow = false;
			},
			//点击修改价格弹窗的确认按钮，关闭弹窗，并接收子组件传过来的参数
			ConfirmChange(changePrice) {
				this.ishow = false;
				//发起请求(修改价格)
				this.$api.EditPrice({
					order_id: this.order_id,
					order_amount: changePrice
				}).then((res) => {
					console.log(res.data);
					uni.showToast({
						title: res.data.msg,
						icon: 'none',
						mask: true,
						duration: 2500
					});
					// 实时刷新
					this.order_list = [];
					this.page_index = 1;
					this.GetOrderList();
				}).catch((err) => {
					console.log('request fail', err);
				})
			},
			//查看详情
			ViewDetails(order_id, usertype) {
				uni.navigateTo({
					url: '../order/orderDetails?order_id=' + order_id + '&usertype=' + usertype
				})
			},
			//点击取消订单按钮，弹出取消弹窗
			cancellationo_rder(order_id) {
				let self = this;
				// 模态框
				uni.showModal({
					title: '提示',
					content: '确定取消该订单吗？',
					confirmColor: '#febf66',
					success: function(res) {
						if (res.confirm) {
							console.log(order_id)
							self.cancelOrder(order_id);
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});
			},
			// 取消订单的请求
			cancelOrder(order_id) {
				this.$api.CalcelOrder({
					order_id: order_id,
				}).then((res) => {
					console.log(res);
					uni.showToast({
						title: res.data.msg,
						icon: 'none',
						mask: true
					});
					// 实时刷新
					this.order_list = [];
					this.page_index = 1;
					this.GetOrderList();
				}).catch((err) => {
					console.log('request fail', err);
				})
			},
			//点击显示删除弹窗
			Delete_order(order_id) {
				let self = this;
				// 模态框
				uni.showModal({
					title: '提示',
					content: '确定删除该订单吗？',
					confirmColor: '#febf66',
					success: function(res) {
						if (res.confirm) {
							console.log(order_id)
							self.ConfirmDele(order_id);
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});
			},

			//发起删除请求接口
			ConfirmDele(order_id) {
				//发起请求(删除订单)
				this.$api.DelOrder({
					order_id: order_id,
				}).then((res) => {
					console.log(res);
					uni.showToast({
						title: res.data.msg,
						icon: 'none',
						mask: true
					});
					// 实时刷新
					this.order_list = [];
					this.page_index = 1;
					this.GetOrderList();
				}).catch((err) => {
					console.log('request fail', err);
				})
			},
			// 支付尾款生成二维码
			PayTail(order_sn, order_type, stages_price,pay_sn) {
				this.order_sn = order_sn;
				this.stages_price = stages_price;
				this.pay_sn = pay_sn;
				this.mask_show = true;
				this.getQRcode();
			},
			// 关闭二维码模态框
			CloseQRcode() {
				this.cancellPay();
				this.mask_show = false;
			},
			// 获取支付二维码
			getQRcode() {
				let _self = this;
				_self.$api.DeltoPayr({
					order_sn: this.order_sn,
					order_type: this.order_type,
					pay_sn: this.pay_sn,
				}).then((res) => {
					console.log(res)
					if (res.data.errcode == 0) {
						_self.val = res.data.code_url;
						_self.getState();
					} else {
						uni.showToast({
							title: '请求失败',
							icon: 'none',
							duration: 2000
						});
					}
				}).catch((err) => {
					uni.showToast({
						title: '请求异常',
						icon: 'none',
						duration: 2000
					});
				})
			},
			// 获取支付状态
			getState() {
				let _self = this;
				_self.$api.DelisPay({
					order_sn: this.order_sn,
					order_type: this.order_type,
					pay_sn: this.pay_sn,
				}).then((res) => {
					console.log(res.data)
					if (res.data.errcode == 0) {
						console.log('支付成功')
						uni.redirectTo({
							url: './PaySuccess'
						});
					}
					if (res.data.errcode == 40012) {
						console.log('未支付');
						if(_self.mask_show == true){	//判断弹窗不是关闭状态才循环调用,否则停掉循环
							setTimeout(function() {
								_self.getState();
							}, 1000)
						}
					}
					if (res.data.errcode == 30001) {
						console.log('订单取消');
					}
				}).catch((err) => {
					uni.showToast({
						title: '请求异常',
						icon: 'none',
						duration: 2000
					});
				})
			},
			//取消支付
			cancellPay(){
				_self.$api.UpdateOrder({
					order_sn: this.order_sn,
				}).then((res) => {
					if (res.data.errcode == 0) {
						this.order_list = [];
						this.GetOrderList();
					} else {
						uni.showToast({
							title: '请求失败',
							icon: 'none',
							duration: 2000
						});
					}
				}).catch((err) => {
					uni.showToast({
						title: '请求异常',
						icon: 'none',
						duration: 2000
					});
				})
			},
			qrR() {

			}
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
		padding: 245upx 0upx 0upx 0upx;

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
					background-color: #efefef;
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
				padding: 20upx;
				margin-bottom: 20upx;
				position:relative;
				.order_title {
					display: flex;
					justify-content: space-between;
					align-items: center;
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

				.dbottom {
					display: flex;
					margin-top: 26upx;
					justify-content: flex-end;
					align-items: center;

					button {
						width: 184upx;
						height: 58upx;
						border-radius: 29upx;
						border: solid 2upx #febf66;
						font-size: 28upx;
						color: #febf66;
						line-height: 58upx;
						background: #fff;
					}
				}

				.ebottom {
					display: flex;
					margin-top: 26upx;
					justify-content: flex-end;
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
						margin-left: 49upx;
						background: #fff;
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

					.DeliveryStatus {
						font-size: 25upx;
						color: red;
					}
				}
			}

			.index_num {
				width: 35upx;
				height: 35upx;
				color: #fff;
				background: #febf66;
				// border: 1px solid #333;
				border-radius: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				top: -8upx;
				left: -8upx;
				font-size: 4upx;
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
		// 遮罩层
		.mak {
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,.5);
			position: fixed;
			top: 0;
			left: 0;
			z-index: 9999;
			display: flex;
			justify-content: center;
			align-items: center;
			// 二维码支付
			.QRcode {
				width: 450upx;
				height: 550upx;
				background: white;
				border-radius: 10upx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
				.icon {
					width: 410upx;
					display: flex;
					justify-content: flex-end;

					.iconfont {
						font-size: 40upx;
						color: #ccc;
					}
				}

				.QRphoto {
					width: 380upx;
					height: 370upx;
					display: flex;
					justify-content: center;
				}

				.payment_text {
					font-size: 30upx;

					text {
						font-size: 35upx;
						color: red;
					}
				}
			}
		}
	}
</style>
