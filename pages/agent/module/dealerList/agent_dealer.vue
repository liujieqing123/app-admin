<template>
	<view class="dealer">
		<view class="header">
			<view class="header_item">
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

				<!-- 排序 -->
				<view class="sort">
					<view class="at_sales" @tap="Sort">
						<view>按销量排序</view>
						<view class="icon">
							<view :class="{red: !pxshow,gray: pxshow}">
								<text class="iconfont icon-shengxu"></text>
							</view>
							<view :class="{red: pxshow,gray: !pxshow}">
								<text class="iconfont icon-jiangxu"></text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 店铺 -->
		<view class="goods">
			<!-- 搜索到0条结果 -->
			<view class="empty" v-if="isShow">{{noth}}</view>
			<!-- 店铺信息 -->
			<view class="goods_info" v-for="(item,index) in dealer_list" :key='index'>
				<view class="details">
					<view class="photo">
						<image :src="item.avatar"/>
					</view>
					<view class="goods_details">
						<view class="goods_name">{{item.shop_name}}</view>
						<view class="goods_explain">
							<text>电话：</text>
							<text>{{item.phone}}</text>
						</view>
						<view class="goods_explain">
							<text>销量：</text>
							<text>{{item.goods_volume}}</text>
						</view>
						<view class="goods_explain">
							<text>注册时间：</text>
							<text class="date">{{item.create_time}}</text>
						</view>
					</view>
					<button @tap="ToShop(item.id)">查看</button>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			//搜索的组件参数
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

		},
		data() {
			return {
				//搜索
				active: false,
				inputVal: '',
				searchName: '取消',
				isDelShow: false,
				isFocus: false,
				//搜索到0条结果
				noth: '',
				//控制0条结果的搜索样式
				isShow: false,
				//待渲染的旗下经销商列表
				dealer_list: '',
				//排序
				pxshow:true,
				order:false
				
			}
		},
		mounted() {
			//发起请求
			this.getDealersList();
		},
		onLoad() {

		},
		methods: {
			// 请求旗下经销商列表
			getDealersList(){
				this.$api.MyDealers({
					shop_name: this.inputVal,
					order:this.order,
				}).then((res) => {
					console.log('request success', res)
					this.dealer_list = res.data.data
					console.log(this.dealer_list)
				}).catch((err) => {
					console.log('request fail', err);
				})
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
					this.$api.MyDealers({
						shop_name: this.inputVal,
						order:this.order,
					}).then((res) => {
						this.dealer_list = res.data.data;
						this.isShow = false; //搜索到结果就隐藏'搜索到0条结果'的样式
						console.log(this.dealer_list);
						if (res.data.data.length == 0) { //如果搜索不到结果，就渲染'搜索到0条结果'的样式
							this.noth = '搜索到0条结果';
							this.isShow = true;
						}
					}).catch((err) => {
						console.log('request fail', err);
					})
			},
			//跳到详情页并传递经销商的id
			ToShop(id) {
				uni.navigateTo({
					url: '../agent/module/dealerList/ShopDetails?id=' + id
				})
			},
			//排序
			Sort(){
				this.pxshow=!this.pxshow;
				this.order = !this.order;
				//发起请求
				this.getDealersList();
			}
			
		},
		//搜索
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
		},
	}
</script>

<style lang="scss" scoped>
	.dealer {
		height: 100vh;
		background: #F1F1F1;
		padding-top: 123upx;
		.header {
			height: 123upx;
			.header_item {
				width: 100%;
				height: 68upx;
				position: fixed;
				top: 0upx;
				left: 0upx;
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

				// 排序
				.sort {
					padding: 42upx 0upx 30upx 31upx;
					background: #ffffff;
					.at_sales {
						display: flex;
						justify-self: flex-start;
						font-size: 24upx;
						color: #666666;
						.icon{
							view {
								width: 20upx;
								height: 20upx;
								line-height: 15upx;
								text{
									font-size: 13upx;
								}
							}
							.red{
								color: red;
							}
							.gray{
								color: #ccc;
							}
						}
					}
				}
			}
		}

		//店铺
		.goods {
			padding: 30upx 30upx 69upx 30upx;

			.empty {
				font-size: 15px;
				text-align: center;
			}

			.goods_info {
				padding: 23upx 0upx 18upx 25upx;
				background: #ffffff;
				border-radius: 10px;
				position: relative;
				margin-bottom: 30upx;

				.details {
					display: flex;
					justify-content: flex-start;

					.photo {
						width: 130upx;
						height: 140upx;
						border-radius: 10upx;

						image {
							width: 135upx;
							height: 140upx;
							border-radius: 10upx;
						}
					}

					.goods_details {
						width: 402upx;
						display: flex;
						justify-content: space-between;
						flex-direction: column;
						margin-left: 18upx;

						.goods_name {
							font-size: 28upx;
							color: #333333;
						}

						.goods_explain {
							display: flex;
							justify-content: flex-start;
							font-size: 24upx;
							color: #666666;

							.date {
								margin-right: 20upx;
							}
						}
					}

					button {
						width: 104upx;
						height: 40upx;
						border-radius: 20upx;
						border: solid 2upx #febf66;
						font-size: 24upx;
						color: #febf66;
						line-height: 38upx;
						padding: 0;
						position: absolute;
						top: 23upx;
						right: 30upx;
					}
				}
			}
		}

	}
</style>
