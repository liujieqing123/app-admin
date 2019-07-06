<template>
	<view class="goods">

		<!-- 尚未开通页面 -->
		<view class=" NotOpened" v-if="Nshow">
			<view class="function_photo">
				<image src="../../static/images/notopen.png" />
			</view>
			<view class="hint">您尚未开通此功能</view>
			<view class="way">提交{{dealer_bond}}元保证金马上开通此功能即可发布自己的商品</view>
			<button @tap="Payment">立即支付开通</button>
		</view>
		<!-- 管理员关闭了功能的页面 -->
		<view class=" NotOpened close_page" v-if="close_page_show">
			<text class='hint_text'>您的商品管理功能已被平台管理员关闭,请联系您的代理商或者平台管理员恢复此功能,联系方式可在我的里面查看</text>
		</view>
		
		<!-- 遮罩层 -->
		<view class="mak" v-if="mask_show">
			<view class="QRcode">
				<view class="icon">
					<text class="iconfont icon-guanbi6" @tap="CloseQRcode"></text>
				</view>
				<view class="QRphoto">
					<tki-qrcode ref="qrcode" :val="val" :size="size" :icon="icon" :onval="onval" :loadMake="loadMake" @result="qrR" />
				</view>
				<view class='payment_text'>扫码支付金额：<text>￥{{dealer_bond}}</text></view>
			</view>
		</view>
		<!-- 二维码付款 -->
		
		<!-- 已开通页面 -->
		<view class="opened" v-if="Oshow">
			<view class="header">
				<!-- 搜索 -->
				<view class="serach">
					<view class="content" :style="{'border-radius':radius+'px'}">
						<view class="content-box" :class="{'center':mode === 2}">
							<text class="iconfont icon-fangdajing"></text>
							<input class="input" :class="{'center':!active && mode === 2}" :focus="isFocus" placeholder="请输入搜索内容" v-model="inputVal"
							 @focus="focus" @blur="blur" />
							<text class="iconfont icon-guanbi5 clear" @click="clear" v-if='inputVal != ""'></text>
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
					<view @tap="curId(1)" :class="{'cur':cur_id===1}">在售商品</view>
					<view @tap="curId(2)" :class="{'cur':cur_id===2}">下架商品</view>
					<view @tap="curId(20)" :class="{'cur':cur_id===20}">发布商品</view>
					<view @tap="curId(3)" :class="{'cur':cur_id===3}" class="audit">
						<text>未通过</text>
					</view>

				</view>
				<!-- 排序 -->
				<view class="sort" v-if='cur_id!=20'>
					<!-- 按价格排序 -->
					<view class="at_rates" @tap="SortRates">
						<view>按价格排序</view>
						<view class="icon">
							<view>
								<text class="iconfont icon-shengxu icon_text" :class="{red: price_index == 2 }"></text>
							</view>
							<view>
								<text class="iconfont icon-jiangxu icon_text" :class="{red: price_index == 1}"></text>
							</view>
						</view>
					</view>
					<view class="at_sales" @tap="SortSales">
						<view>按销量排序</view>
						<view class="icon">
							<view>
								<text class="iconfont icon-shengxu icon_text" :class="{red: salesVol_index == 4 }"></text>
							</view>
							<view>
								<text class="iconfont icon-jiangxu icon_text" :class="{red: salesVol_index == 3 }"></text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 商品信息 -->
			<view class="OrderInfo">
				<view v-if="cur_id!=20">
					<view class="order_goods">
						<view class='all_text'>共{{goods_list.length}}件商品</view>
						<view class="goods_info" v-for="item in goods_list" :key="item.up_time">
							<!-- 时间显隐 -->
							<!-- 上架时间 -->
							<view class="time" v-if="cur_id===1|| cur_id===3">
								<view v-if='cur_id===3'>审核时间</view>
								<view v-else>上架时间</view>
								<view>
									<text>{{item.up_time | changTime}}</text>
								</view>
							</view>
							<!-- 下架时间 -->
							<view class="time" v-if="cur_id===2">
								<view>下架时间</view>
								<view>
									<text>{{item.down_time | changTime}}</text>
								</view>
							</view>

							<view class="details">
								<view class="photo">
									<image :src="item.goods_images"/>
								</view>
								<view class="goods_details">
									<view class="goods_name">{{item.goods_total_name}}</view>
									<view class="goods_explain">
										<text>价格：￥{{item.goods_price}}</text>
									</view>
									<view class="goods_explain">
										<text>销量：{{item.goods_volume}}</text>
									</view>
								</view>
								<!-- 按钮显隐 -->
								<!-- 在售 -->
								<view class="other" v-if="cur_id===1">
									<button @tap="ChangeSold(item.goods_id,2)">下架</button>
									<button @tap="ToEdit(item.goods_id)">编辑</button>
								</view>
								<!-- 下架 -->
								<view class="btn" v-if="cur_id===2">
									<button @tap="ChangeSold(item.goods_id,1)">上架</button>
									<button @tap="ToEdit(item.goods_id)">编辑</button>
									<button @tap="ChangeDelete(item.goods_id)">删除</button>
								</view>
								<!-- 待审核 -->
								<view class="btn" v-if="cur_id===3">
									<button @tap="ChangeDelete(item.goods_id)">删除</button>
								</view>
							</view>
							<view class='hint_text' v-if='cur_id===3'>不通过原因：{{item.close_describle}}</view>
						</view>
						<view class='loading_text' v-if='loading_show' @tap='clickLoad'>加载更多</view>
						<view class='hint_text' v-if='bottom_show' @tap='clickLoad'>已经到底部了</view>
						<view class='hint_text' v-if='load_text_show' @tap='clickLoad'>加载中...</view>
						<view class='hint_text' v-if='goods_list.length == 0' @tap='clickLoad'>没有商品</view>
					</view>
				</view>
				<!-- 发布商品 -->
				<view v-if="cur_id===20" class="release">
					<view class="edit">
						<!-- 标题 -->
						<view class="Info">
							<view class="title">标题：</view>
							<view class="inpt">
								<input placeholder="请输入标题" v-model="rgoods_title" />
							</view>
						</view>
						<!-- 商品封面图 -->
						<view class="Info">
							<view class="title">商品封面图：</view>
							<view class="upload_cover">
								<view class="frame" type="primary" :loading="loading" :disabled="disabled" @tap="chooseImage(-1,'goods_image')">
									<image :src="cover_imgUrl" v-if='img_show' />
									<!-- <text v-else>上传中...</text> -->
									<text v-if='uploading_show'>上传中...</text>
									<text class='success_state' v-if='success_show'>成功</text>
								</view>
							</view>
						</view>
						<!-- 商品描述 -->
						<view class="Info">
							<view class="title">商品描述：</view>
							<view class="multi">
								<textarea placeholder="请输入商品描述" maxlength="-1" v-model="rgoods_describe"></textarea>
							</view>
						</view>
						<!-- 商品价格 -->
						<view class="Info">
							<view class="title">价格：</view>
							<view class="inpt">
								<input type='number' placeholder="请输入价格" v-model="rgoods_price" />
							</view>
						</view>
						<!-- 商品图片 -->
						<view class="Info">
							<view class="title">商品图片：</view>
							<view class="upload_cover">
								<view class="frame" type="primary" :loading="loading" :disabled="disabled" @click="chooseImage(img_index,'goods_slides')"
								 v-for='(imgItem,img_index) in imgArr' :key='imgItem.id'>
									<image :src="imgItem.img_url" />
								</view>
							</view>
						</view>
						<!-- 商品水印 -->
						<view class="Info">
							<view class="title">添加水印：</view>
							<radio-group @change="radioChange">
								<label class="uni-list-cell uni-list-cell-pd" v-for="(butItem, index) in items" :key="butItem.value">
									<view class="but">
										<radio :value="butItem.value" :checked="index === current" />
									</view>
									<view class="expl">{{butItem.name}}</view>
								</label>
							</radio-group>
						</view>
						<!-- 提交 -->
						<button @tap='releaseGoods' class='but_item'>发布</button>
					</view>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
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
		},
		components: {
			tkiQrcode
		},
		onHide() {
			console.log('页面显示')
		},
		data() {
			return {
				//未开通页面
				Nshow: false,
				close_page_show: true,
				//已开通页面
				Oshow: true,
				//搜索
				active: false,
				inputVal: '',
				searchName: '取消',
				isDelShow: false,
				isFocus: false,
				cur_id: 1,
				// 商品状态
				goods_status: 1,
				// 上下架状态
				is_shelves: 1,

				// 排序索引
				rank_index: 0,
				// 价格索引
				price_index: 3,
				// 销量索引
				salesVol_index: 5,

				// 商品页数
				goods_page: 1,
				// 商品列表
				goods_list: [],
				// 总页数
				goodsPage_all: '',
				// 加载更多按钮
				loading_show: false,
				// 到底部的文字
				bottom_show: false,
				// 加载中
				load_text_show: false,

				//发布商品
				items: [{
						value: '1',
						name: '是'
					},
					{
						value: '0',
						name: '否'
					}
				],
				current: 0,
				//商品标题
				rgoods_title: '',
				// 封面图路径
				cover_imgUrl: '',
				//商品描述
				rgoods_describe: '',
				// 商品价格
				rgoods_price: '',
				// 图片上传
				loading: false,
				disabled: false,
				// 商品图路径
				imgArr: [{
						id: 0,
						img_url: ''
					},
					{
						id: 1,
						img_url: ''
					},
					{
						id: 2,
						img_url: ''
					},
					{
						id: 3,
						img_url: ''
					},
					{
						id: 4,
						img_url: ''
					}
				],

				// 图片显示
				img_show: true,
				// 上传中
				uploading_show: false,
				// 上传成功
				success_show: false,
				//水印按钮类型
				type: '1',
				// 需交的保证金金额
				dealer_bond:'',
				// 模态框显示
				mask_show: false,
				// 二维码
				val: '',
				size: 350,
				icon: '',
				onval: true,
				loadMake: true,
				// 支付保证金单号
				pay_sn:'',
			}
		},
		mounted(){
			
		},
		created() {
			_self = this;
			this.CheckBond();
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
			//请求检查商家是否已交保证金
			CheckBond(){
				this.$api.CheckBond({
					
				}).then((res) => {
					console.log(res.data)
					if(res.data.errcode == 0){
						if(res.data.data. is_goods === 1) {
							this.Oshow = true;
							this.Nshow = false;
							this.close_page_show = false;
							//发起列表数据请求
							this.DealerGoodsList();
						}else {
							this.Oshow = false;
							this.Nshow = false;
							this.close_page_show = true;
						}
						
					}else if(res.data.errcode == 10010){
						this.Nshow = true;
						this.Oshow = false;
						this.close_page_show = false;
						this.dealer_bond = res.data.dealer_bond;
					}
				}).catch((err) => {
					uni.showToast({
						title: err,
						icon: 'none',
						duration: 2000
					});
				})
			},
			// 获取商品列表
			DealerGoodsList() {
				this.load_text_show = true;
				this.loading_show = false;
				//发起请求(列表数据)
				this.$api.DealerGoodsList({
					page: this.goods_page,
					nums: 10,
					goods_status: this.goods_status,
					is_shelves: this.is_shelves,
					goods_total_name: this.inputVal,
					order: this.rank_index
				}).then((res) => {
					console.log(res)
					this.load_text_show = false;
					 if (res.data.errcode == 0) {
						this.loading_show = true;
						let goods_arr = res.data.data.data;
						for (let i = 0; i < goods_arr.length; i++) {
							this.goods_list.push(goods_arr[i])
						}
						this.goodsPage_all = res.data.data.last_page;
						if (this.goods_list.length == res.data.data.total) {
							this.loading_show = false;
							this.bottom_show = true;
						} else {
							this.loading_show = true;
							this.bottom_show = false;
						}
						if (goods_arr.length == 0) {
							this.bottom_show = false;
						}
					} else {
						uni.showToast({
							title: '请求失败',
							icon: 'none',
							duration: 2000
						});
					}
				}).catch((err) => {
					this.load_text_show = false;
					uni.showToast({
						title: err,
						icon: 'none',
						duration: 2000
					});
				})
			},
			// 加载更多订单
			clickLoad() {
				this.goods_page++;
				if (this.goods_page > this.goods_page) {
					return
				}
				this.DealerGoodsList();
			},
			// 点击支付保证金,弹出支付窗口
			Payment(){
				this.mask_show = true;
				// 请求二维码
				this.getQRcode();
			},
			// 关闭二维码模态框,取消支付
			CloseQRcode() {
				this.mask_show = false;
				// 请求取消支付接口
				this.cancelPay();
			},
			// 获取支付二维码
			getQRcode(){
				let _self = this;
				_self.$api.ToBond({}).then((res) => {
					console.log(res)
					if (res.data.errcode == 1) {
						console.log(res)
						_self.val = res.data.code_url;
						_self.pay_sn = res.data.pay_sn;
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
			getState(){
				let _self = this;
				_self.$api.CheckIsPay({
					pay_sn:this.pay_sn,
				}).then((res) => {
					console.log(res.data)
					if (res.data.errcode == 0) {
						console.log('支付成功')
						this.onval = false;
						this.mask_show = false;
						this.Oshow = true;
						this.Nshow = false;
						this.close_page_show = false;
					}
					if (res.data.errcode == 30023) {
						console.log('未支付');
						if(_self.mask_show == true){
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
			// 取消支付保证金
			cancelPay(){
				let _self = this;
				_self.$api.CancelBond({
					pay_sn:this.pay_sn,
				}).then((res) => {
					if (res.data.errcode == 0) {
						console.log(res)
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
			qrR(){
				
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
			// 清空搜索框
			clear() {
				this.goods_list = [];
				this.inputVal = '';
				this.goods_page = 1;
				this.price_index = 3;
				this.salesVol_index = 5;
				this.DealerGoodsList();
			},
			getFocus() {
				this.isFocus = true;
			},
			search() {
				if (this.inputVal == '') {
					return
				};
				this.goods_list = [];
				this.goods_page = 1;
				this.price_index = 3;
				this.salesVol_index = 5;
				this.DealerGoodsList();
			},
			//按价格排序
			SortRates() {
				this.salesVol_index = 5;
				this.price_index--;
				this.rank_index = this.price_index;
				if (this.price_index <= 0) {
					this.rank_index = 2;
					this.price_index = 2;
				}
				this.goods_list = [];
				this.goods_page = 1;
				this.DealerGoodsList();
			},
			//按销量排序
			SortSales() {
				this.price_index = 3;
				this.salesVol_index--;
				this.rank_index = this.salesVol_index;
				if (this.salesVol_index <= 2) {
					this.rank_index = 4;
					this.salesVol_index = 4;
				}
				this.goods_list = [];
				this.goods_page = 1;
				this.DealerGoodsList();
			},
			//选项卡切换
			curId(str) {
				_self = this;
				_self.goods_list = [];
				_self.inputVal = '';
				_self.goods_page = 1;
				_self.price_index = 3;
				_self.salesVol_index = 5;
				_self.cur_id = str; //点击改变cur_id的值
				if (_self.cur_id == 1 || _self.cur_id == 2) {
					_self.is_shelves = str;
					_self.goods_status = 1;
				} else if (_self.cur_id == 3) {
					_self.goods_status = 2;
					_self.is_shelves = 0;
				}
				if (str == 20) {
					return
				}
				this.DealerGoodsList();
			},
			// 点击上下架
			ChangeSold(id, state) {
				// _self.Sshow = true;
				let text = '';
				if (state == 1) {
					text = '是否上架该商品？'
				}
				if (state == 2) {
					text = '是否下架该商品？'
				}
				let self = this;
				uni.showModal({
					title: '提示',
					content: text,
					confirmColor: '#febf66',
					success: function(res) {
						if (res.confirm) {
							self.isShelves(id, state);
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});
			},
			//点击编辑
			ToEdit(id) {
				let self = this;
				uni.showModal({
					title: '提示',
					content: '确定编辑该商品吗？',
					confirmColor: '#febf66',
					success: function(res) {
						if (res.confirm) {
							// uni.navigateTo({
							// 	url: '../dealer/module/shopGoods/module/edit?goodsId=' + id
							// })
							uni.redirectTo({
								url: '../dealer/module/shopGoods/module/edit?goodsId=' + id
							})
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});
			},
			// 点击删除
			ChangeDelete(id) {
				// _self.Dshow = true;
				let self = this;
				// 模态框
				uni.showModal({
					title: '提示',
					content: '确定删除该商品吗？',
					confirmColor: '#febf66',
					success: function(res) {
						if (res.confirm) {
							self.delGoods(id);
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});
			},
			//发布商品的单选按钮
			radioChange: function(evt) {
				this.type = evt.detail.value; //声明一个变量用来放点击点选按钮的内容
				// console.log(value);
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			//选择图片
			chooseImage: async function(index, name) {
				let self = this;
				uni.chooseImage({
					sourceType: ['album', 'camera '],
					sizeType: ['original', 'compressed'],
					count: 1,
					success: (res) => {
						self.img_show = false;
						self.uploading_show = true;
						// 上传图片
						const uploadTask = uni.uploadFile({
							url: 'https://xt.dfbtds.com/api_app/Goods/uploadFile',
							filePath: res.tempFilePaths[0],
							header: {
								"Authorization": uni.getStorageSync('token')
							},
							name: name,
							formData: {
								name: name,
							},
							success: function(res) {
								let res_data = JSON.parse(res.data)
								if (index == '-1') {
									if (res_data.errcode == 0) {
										self.img_show = true;
										self.uploading_show = false;
										self.success_show = true;
										self.cover_imgUrl = 'https://xt.dfbtds.com/'+ res_data.data.goods_image;
										console.log(res_data.data.goods_image);
									} else {
										console.log('上传失败')
										self.success_show = false;
									}
								} else {
									if (res_data.errcode == 0) {
										for (let k = 0; k < self.imgArr.length; k++) {
											if (self.imgArr[k].id == index) {
												self.imgArr[k].img_url = 'https://xt.dfbtds.com/'+ res_data.data.goods_slides
											}
										}
									} else {
										console.log('上传失败')
									}
								}
							},
							fail: function() {
								self.img_show = true;
								self.success_show = false;
							}
						});
					}
				})
			},
			// 添加商品
			addGoods() {
				let img_arr = [];
				for (let j = 0; j < this.imgArr.length; j++) {
					img_arr.push(this.imgArr[j].img_url)
				}
				// console.log(img_arr);
				this.$api.addGoods({
					goods_total_name: this.rgoods_title,
					goods_images: this.cover_imgUrl,
					goods_describe: this.rgoods_describe,
					goods_price: this.rgoods_price,
					goods_slides: img_arr,
					is_water: this.type
				}).then((res) => {
					// console.log(res)
					if (res.data.errcode == 0) {
						uni.showToast({
							title: '商品发布成功',
							icon: 'success',
							duration: 2000
						});
						this.rgoods_title = '';
						this.cover_imgUrl = '';
						this.rgoods_describe = '';
						this.rgoods_price = '';
						this.imgArr = [{
								id: 0,
								img_url: ''
							},
							{
								id: 1,
								img_url: ''
							},
							{
								id: 2,
								img_url: ''
							},
							{
								id: 3,
								img_url: ''
							},
							{
								id: 4,
								img_url: ''
							}
						];
						this.success_show = false;
						this.uploading_show = false;
					}else if(res.data.errcode == 40243){
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 2000
						});
					}else {
						uni.showToast({
							title: '发布失败',
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
			// 发布商品
			releaseGoods() {
				if (this.rgoods_title == '') {
					uni.showToast({
						title: '请填写商品标题',
						icon: 'none',
						duration: 2000
					});
					return
				}
				if (this.cover_imgUrl == '') {
					uni.showToast({
						title: '请上传商品封面图',
						icon: 'none',
						duration: 2000
					});
					return
				}
				if (this.rgoods_describe == '') {
					uni.showToast({
						title: '请填写商品描述',
						icon: 'none',
						duration: 2000
					});
					return
				}
				if (this.rgoods_price == '') {
					uni.showToast({
						title: '请填写商品价格',
						icon: 'none',
						duration: 2000
					});
					return
				}
				if (this.imgArr[0].img_url == '') {
					uni.showToast({
						title: '请上传商品图片',
						icon: 'none',
						duration: 2000
					});
					return
				}
				uni.showToast({
					title: '发布中...',
					icon: 'none',
					duration: 1300
				});
				//调用添加商品的接口
				this.addGoods()
			},
			// 上下架商品
			isShelves(id, state) {
				this.$api.isShelves({
					is_shelves: state,
					goods_id: id
				}).then((res) => {
					// console.log(res)
					if (res.data.errcode == 0) {
						let hint = '';
						if (state == 1) {
							hint = '商品已上架'
						}
						if (state == 2) {
							hint = '商品已下架'
						}
						uni.showToast({
							title: hint,
							icon: 'success',
							duration: 2000
						});
						this.goods_list = [];
						this.goods_page = 1;
						this.price_index = 3;
						this.salesVol_index = 5;
						this.DealerGoodsList();
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
			},
			// 删除商品
			delGoods(id) {
				this.$api.delGoods({
					goods_id: id
				}).then((res) => {
					if (res.data.errcode == 0) {
						uni.showToast({
							title: '商品删除成功！',
							icon: 'success',
							duration: 2000
						});
						this.goods_list = [];
						this.goods_page = 1;
						this.price_index = 3;
						this.salesVol_index = 5;
						this.DealerGoodsList();
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
	.goods {
		height: 100vh;
		background: #F1F1F1;

		//尚未开通
		.NotOpened {
			padding-top: 200upx;

			.function_photo {
				width: 353upx;
				height: 275upx;
				margin: 0upx 198upx 0upx 199upx;

				image {
					width: 353upx;
					height: 275upx;
				}
			}

			.hint {
				font-size: 30upx;
				font-weight: 600;
				color: #febf66;
				text-align: center;
				margin-top: 43upx;
				letter-spacing: 7upx;
			}

			.way {
				width: 470upx;
				height: 63upx;
				font-size: 24upx;
				color: #999999;
				margin: 251upx 0upx 0upx 139upx;
				letter-spacing: 8upx;
			}

			button {
				width: 632upx;
				height: 88upx;
				background-color: #febf66;
				box-shadow: 0upx 6upx 21upx 3upx rgba(224, 156, 28, 0.25);
				border-radius: 39upx;
				font-size: 36upx;
				color: #333333;
				margin-top: 74upx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			
		}
		.close_page {
			height: 100%;
			background: #fff;
			.hint_text {
				display: block;
				width: 80%;
				font-size: 25upx;
				color: #999;
				margin: 0 auto;
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

		//已开通
		//搜索
		.opened {
			padding-top: 310upx;
			.header {
				position: fixed;
				top: 0upx;
				left: 0upx;
				z-index: 99;
				padding-top: 50upx;
				background: white;

				.serach {
					display: flex;
					width: 100%;
					// border-bottom: 1px #f5f5f5 solid;
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

							.iconguanbi {
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
									width: auto;
									color: grey;
								}
							}

							.clear {
								font-size: 38upx;
								margin-right: 2upx;
								color: #333;
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
					width: 750upx;
					height: 110upx;
					background: white;
					display: flex;
					justify-content: space-around;
					align-items: center;

					view {
						width: 187.5upx;
						height: 52upx;
						font-size: 30upx;
						color: #666666;
						line-height: 52upx;
						text-align: center;
					}

					.audit {
						display: flex;
						justify-content: center;
						align-items: center;

						.sign {
							width: 28upx;
							height: 28upx;
							background-color: #ff5e5e;
							font-size: 20upx;
							color: #ffffff;
							text-align: center;
							line-height: 28upx;
							border-radius: 50%;
							margin-left: 10upx;
						}
					}

					.cur {
						width: 250upx;
						height: 52upx;
						font-size: 40upx;
						color: #febf66;
						font-weight: 600;
					}
				}

				//排序
				.sort {
					display: flex;
					justify-self: flex-start;
					padding: 0upx 0upx 30upx 31upx;
					background: #ffffff;
					border-bottom: 1px solid #eee;

					.at_rates {
						display: flex;
						justify-self: flex-start;
						font-size: 24upx;
						color: #666666;
						width: 180upx;

						.icon {
							view {
								width: 20upx;
								height: 20upx;
								line-height: 15upx;

								.icon_text {
									font-size: 13upx;
									color: #999;
								}

								.red {
									color: #F56C6C;
								}
							}

							.gray {
								color: #ccc;
							}
						}
					}

					.at_sales {
						display: flex;
						justify-self: flex-start;
						font-size: 24upx;
						color: #666666;
						width: 180upx;

						.icon {
							view {
								width: 20upx;
								height: 20upx;
								line-height: 15upx;

								text {
									font-size: 13upx;
								}
							}

							.red {
								color: #F56C6C;
							}

							.gray {
								color: #ccc;
							}
						}
					}

				}
			}

			//商品信息
			.OrderInfo {
				background: #F1F1F1;
				.order_goods {
					padding: 30upx 30upx 170upx 30upx;
					.all_text {
						font-size: 16upx;
						color: #333;
						margin-bottom: 10upx;
					}

					.goods_info {
						padding: 20upx 30upx 30upx;
						background: #ffffff;
						border-radius: 10px;
						margin-bottom: 20upx;

						.time {
							display: flex;
							justify-content: space-between;

							view {
								font-size: 24upx;
								color: #999999;

								text {
									margin-left: 20upx;
								}
							}
						}

						.details {
							display: flex;
							justify-content: space-between;
							margin-top: 49upx;

							.photo {
								width: 135upx;
								height: 140upx;
								border-radius: 10upx;
								// background-repeat: no-repeat !important;
								// background-position: center !important;
								// background-size: contain !important;
								image{
									width: 135upx;
									height: 140upx;
									border-radius: 10upx;
								}
							}

							.goods_details {
								width: 350upx;
								height: 135upx;
								display: flex;
								justify-content: space-between;
								flex-direction: column;
								padding-right: 20upx;

								.goods_name {
									font-size: 28upx;
									color: #333333;
									display: -webkit-box;
									-webkit-box-orient: vertical;
									-webkit-line-clamp: 2;
									overflow: hidden;
								}

								.goods_explain {
									display: flex;
									justify-content: space-between;
									font-size: 24upx;
									color: #666666;
								}
							}

							.btn {
								width: 107upx;
								height: 135upx;
								display: flex;
								justify-content: space-between;
								flex-direction: column;

								button {
									width: 104upx;
									height: 40upx;
									border-radius: 20upx;
									border: solid 2upx #febf66;
									font-size: 24upx;
									color: #febf66;
									line-height: 38upx;
									padding: 0;
								}
							}

							.other {
								width: 107upx;
								height: 135upx;
								display: flex;
								justify-content: flex-end;
								flex-direction: column;

								button {
									width: 104upx;
									height: 40upx;
									border-radius: 20upx;
									border: solid 2upx #febf66;
									font-size: 24upx;
									color: #febf66;
									line-height: 38upx;
									padding: 0;
									margin-top: 8upx;
								}
							}
						}

						.hint_text {
							font-size: 12upx;
							color: #F56C6C;
							text-align: left;
							margin-top: 15upx;
						}
					}

					.loading_text {
						border: 1px solid #febf66;
						border-radius: 10upx;
						font-size: 12upx;
						color: #febf66;
						text-align: center;
						padding: 7upx 0;
						margin-top: 40upx;
						margin-bottom: 30upx;
					}

					.hint_text {
						color: #999;
						font-size: 12upx;
						text-align: center;
					}
				}

				.release {
					.edit {
						padding: 0upx 30upx 224upx 30upx;
						background: #F1F1F1;

						.Info {
							margin-top: 50upx;

							.title {
								font-size: 28upx;
								color: #333333;
								margin-bottom: 29upx;
							}

							.inpt {
								width: 690upx;
								height: 76upx;
								border-radius: 10upx;
								border: solid 2upx #cecece;

								input {
									width: 660upx;
									height: 78upx;
									border-radius: 10upx;
									font-size: 28upx;
									color: #999999;
									line-height: 78upx;
									padding-left: 30upx;
								}
							}

							.upload_cover {
								display: flex;
								justify-content: flex-start;
								flex-wrap: wrap;

								.frame {
									width: 190upx;
									height: 190upx;
									border: dashed 2upx #febf66;
									background-image: url('~@/static/images/canmo.png');
									background-size: 55upx 45upx;
									background-repeat: no-repeat;
									background-position: 50%; //背景图居中
									display: flex;
									justify-content: center;
									align-items: center;
									margin-right: 30upx;
									margin-bottom: 20upx;
									position: relative;

									image {
										width: 190upx;
										height: 190upx;
									}

									text {
										font-size: 10upx;
										color: #666;
									}

									.success_state {
										position: absolute;
										top: 1upx;
										right: 7upx;

									}
								}
							}

							.multi {
								width: 690upx;
								height: 212upx;
								border-radius: 10upx;
								border: solid 2upx #cecece;

								textarea {
									width: 651upx;
									height: 212upx;
									font-size: 28upx;
									color: #999999;
									padding: 27upx 10upx 0upx 29upx;
									box-sizing: border-box;
								}
							}

							radio-group {
								padding-left: 40upx;
								display: flex;
								justify-content: flex-start;

								label {
									margin-right: 200upx;
									display: flex;
									justify-content: flex-start;
								}
							}
						}

						button {
							width: 632upx;
							height: 88upx;
							background-color: #febf66;
							box-shadow: 0upx 6upx 21upx 3upx rgba(224, 156, 28, 0.25);
							border-radius: 39upx;
							margin-top: 86upx;
							display: flex;
							align-items: center;
							justify-content: center;
							font-size: 30upx;
							letter-spacing: 5upx;
						}
					}
				}
			}
		}



	}
</style>
