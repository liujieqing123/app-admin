<template>
	<view class="approve">
		<view class="content">
			<view class="title">经销商认证</view>
			<view class="name">
				<input placeholder="请输入商店名称" v-model="shop_name" />
			</view>
			<view class="legalperson">
				<input placeholder="请输入企业法人" v-model="company_name" />
			</view>
			<view class="number">
				{{phone}}
			</view>

			<!-- 选择省市区 -->
			<view class="select" @tap="showAddress">
				{{province_name}} - {{city_name}} - {{area_name}}
			</view>
			<!-- 选择地址模态框 -->
			<view class="jm-modal" :class="showFlag==true?'show1':''">
				<view class="dialog">
					<view class="showBox">
						<view class="content">选择地址</view>
						<!-- 关闭按钮 -->
						<view class="action" @tap="hideAddress">确定</view>
					</view>
					<view class="choice">
						已选： {{province_name}} - {{city_name}} - {{area_name}}
					</view>
					<!-- 省份列表 -->
					<view class="addList">
						<view v-for="(provinceItem,province_index) in site_data" :key='provinceItem.area_id' :class="{check:province_index == active_province}" @tap="selectItem(0,province_index,provinceItem)">
							{{provinceItem.area_name}}
						</view>
					</view>
					<!-- 城市列表 -->
					<view class="addList">
						<view v-for="(cityItem,city_index) in city_all" :key='cityItem.area_id' :class="{check:city_index == active_city}" @tap="selectItem(1,city_index,cityItem)">
							{{cityItem.area_name}}
						</view>
					</view>
					<!-- 地区列表 -->
					<view class="addList">
						<view v-for="(areaItem,area_index) in area_all" :key='areaItem.area_id' :class="{check:area_index == active_area}" @tap="selectItem(2,area_index,areaItem)">
							{{areaItem.area_name}}
						</view>
					</view>
				</view>
			</view>
			<!-- 图片上传 -->
			<view class="upload">
				<view class="uplosd_list">
					<view class="frame" type="primary" :loading="loading" :disabled="disabled" @click="upload" id="business_license">
						<image :src="business_license_address"/>
					</view>
					<view class="box_title">上传营业执照</view>
				</view>
				<view class="uplosd_list">
					<view class="frame" type="primary" :loading="loading" :disabled="disabled" @click="upload" id="idcard_just">
						<image :src="idcard_just_address"/>
					</view>
					<view class="box_title">上传法人手持身份证正面</view>
				</view>
				<view class="uplosd_list">
					<view class="frame" type="primary" :loading="loading" :disabled="disabled" @click="upload" id="idcard_back">
						<image :src="idcard_back_address"/>
					</view>
					<view class="box_title">上传法人手持身份证反面</view>
				</view>
			</view>
			<button @tap="clickSubmit" class="subm">提交认证</button>
		</view>

		<!-- 已提交认证弹窗 -->
		<view class='hint_item' v-if='hint_show'>
			<view class='hint_content'>
				<view class='hint_title'>提示</view>
				<view class='hint_text'>
					<text>您的商铺认证已提交，我们将会尽快处理！请留意手机信息接收的认证结果！</text>
					<text>认证通过后才能正常登录！</text>
				</view>
				<view class='hint_but'>
					<view @tap='backLogin'>返回登录页</view>
				</view>
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
				//经销商电话号码
				phone: '',
				//店铺名称
				shop_name: '',
				//企业法人
				company_name: '',
				//省市区选择
				//模态框状态
				showFlag: false,
				// 图片上传
				loading: false,
				disabled: false,
				//营业执照
				business_license: '',
				//身份证正面
				idcard_just: '',
				//身份证反面
				idcard_back: '',
				//营业执照地址
				business_license_address: '',
				//身份证正面地址
				idcard_just_address: '',
				//身份证反面地址
				idcard_back_address: '',
				hint_show: false,
				// 地址数据
				active_province: -1,
				province_name:'请选择省',
				province_id:'',
				city_all:[],
				active_city: -1,
				city_name:'市',
				city_id:'',
				area_all:[],
				active_area: -1,
				area_name:'区',
				area_id:'',
				site_data:[],
			}
		},
		onLoad() {
			_self = this;
			//获取缓存的数据
			_self.phone = uni.getStorageSync('phone');
			this.getSiteData();
		},
		onReady() {
			_self = this;
		},
		methods: {
			// 获取城市数据
			getSiteData() {
				let self = this;
				self.$api.AreaList({}).then(function(res) {
					// console.log(res.data.data)
					if(res.data.errcode == 0) {
						self.site_data = res.data.data;
					}
				}).catch(function(err) {
					console.log('request fail', err);
				})
			},
			//打开模态框
			showAddress() {
				// 呼出模态框
				this.showFlag = true;
			},
			// 点击确定省市区
			hideAddress() {
				if(this.active_province == -1) {
					uni.showToast({
						title: '请选择所在省份',
						icon: 'none',
						duration: 1500
					});
					return
				}
				if(this.active_city == -1) {
					uni.showToast({
						title: '请选择所在城市',
						icon: 'none',
						duration: 1500
					});
					return
				}
				if(this.active_area == -1) {
					uni.showToast({
						title: '请选择所在区',
						icon: 'none',
						duration: 1500
					});
					return
				}
				// 关闭模态框
				this.showFlag = null;
			},
			// 选择省市区
			selectItem(itemIndex,index,obj) {
				if(itemIndex == 0) {
					this.active_province = index;			
					this.province_name = obj.area_name;
					this.province_id = obj.area_id;

					this.active_city = -1;
					this.city_name = '请选择市';
					this.city_id = '';

					this.area_all = [];
					this.active_area =  -1;
					this.area_name = '请选择区';
					this.area_id = '';

					this.city_all = this.site_data[index].city;
				}
				if(itemIndex == 1) {
					this.active_city = index;			
					this.city_name = obj.area_name;
					this.city_id = obj.area_id;
					this.active_area =  -1;
					this.area_name = '请选择区';
					this.area_id = '';
					this.area_all = this.site_data[this.active_province].city[index].area;
				}
				if(itemIndex == 2) {
					this.active_area = index;			
					this.area_name = obj.area_name;
					this.area_id = obj.area_id;
				}
			},
			//图片上传
			upload: function(e) {
				var name = e.currentTarget.id;
				_self = this;
				uni.chooseImage({ //选择图片
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						const tempFilePaths = res.tempFilePaths;
						const uploadTask = uni.uploadFile({ //上传图片
							url: 'https://xt.dfbtds.com/api_app/Dealer/uploadFile',
							header:{"Authorization": uni.getStorageSync('token')},
							filePath: tempFilePaths[0],
							name: name,
							formData: {
								name: name,
							},
							success: function(uploadFileRes) {
								console.log(uploadFileRes);
								var data = JSON.parse(uploadFileRes.data) //转为json对象
								switch (name) {
									case "business_license":
										_self.business_license_address = data.data.business_license
										break;
									case "idcard_just":
										_self.idcard_just_address = data.data.idcard_just;
										break;
									case "idcard_back":
										_self.idcard_back_address = data.data.idcard_back;
										break;
									default:
										break;
								}
							}
						});
					},
					error: function(e) {
						console.log(e);
					}
				});
			},
			// 点击提交认证
			clickSubmit() {
				if(this.shop_name == '') {
					uni.showToast({
						title: '请输入您的商铺名称',
						icon: 'none',
						mask: true
					});
					return
				}
				if(this.company_name == '') {
					uni.showToast({
						title: '请输入企业法人',
						icon: 'none',
						mask: true
					});
					return
				}
				if(this.province_id == '') {
					uni.showToast({
						title: '请选择所在地区',
						icon: 'none',
						mask: true
					});
					return
				}
				if(this.business_license_address == '') {
					uni.showToast({
						title: '请上传营业执照',
						icon: 'none',
						mask: true
					});
					return
				}
				if(this.idcard_just_address == '') {
					uni.showToast({
						title: '请上传身份证正面',
						icon: 'none',
						mask: true
					});
					return
				}
				if(this.idcard_back_address == '') {
					uni.showToast({
						title: '请上传身份证反面',
						icon: 'none',
						mask: true
					});
					return
				}
				let self = this;
				uni.showModal({
					title: '提示',
					content: '已确定信息正确？点击确定提交认证',
					confirmColor: '#febf66',
					success: function (res) {
							if (res.confirm) {
								self.ToDealerIndex();
							} else if (res.cancel) {
									
							}
					}
				});
			},
			// 返回登录页
			backLogin() {
				// uni.clearStorage();
				//跳转到登录页
				uni.reLaunch({
					url: './login'
				});
			},
			//提交认证
			ToDealerIndex() {
				_self = this;
				uni.showLoading({
            title: '提交中...'
        });
				//发起请求
				this.$api.DealerAuth({
					shop_name: this.shop_name,
					company_name: this.company_name,
					provinceid: this.province_id,
					cityid: this.city_id,
					areaid: this.area_id,
					business_license: this.business_license_address,
					idcard_just: this.idcard_just_address,
					idcard_back: this.idcard_back_address
				}).then((res) => {
					uni.hideLoading();
					if (res.data.errcode == 0) {
						this.hint_show = true;
					} else if (res.data.errcode == 10040) { //调用刷新token的接口
						this.$api.RefreshToken({}).then((res) => {
							// console.log(res)
							if (res.data.errcode != 0) {
								uni.showToast({
									title: res.data.msg,
									icon: 'none',
									mask: true
								});
								//跳转到登录页
								uni.reLaunch({
									url: './login'
								});
							} else {
								// 保存新的token
								try {
									uni.setStorageSync('token', res.data.data.access_token);
									uni.setStorageSync('refresh_token', res.data.data.refresh_token);
									uni.setStorageSync('id', res.data.data.id);
									uni.setStorageSync('phone', res.data.data.phone);
								} catch (e) {
									// error
								}
								_self.ToDealerIndex()
							}
						}).catch((err) => {
							console.log('request fail', err);
						})
					} else { //输出相应的错误提示
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							mask: true
						});
						//跳转到经销商首页
						uni.reLaunch({
							url: './login'
						});

					}
				}).catch((err) => {
					uni.hideLoading();
					console.log('request fail1', err);
				})
			},
		},

	}
</script>

<style lang="scss" scoped>
	.approve {
		padding: 0upx 55upx 0upx 55upx;
		box-sizing: border-box;

		.content {
			padding-top: 109upx;
			letter-spacing: 5upx;

			.title {
				font-size: 54upx;
				color: #333333;
				margin-bottom: 80upx;
			}

			.name {
				width: 630upx;
				height: 60upx;
				margin-bottom: 42upx;

				input {
					width: 630upx;
					height: 60upx;
					border-bottom: 1upx solid #999999;
					font-size: 32upx;
					color: #999999;
				}
			}

			.legalperson {
				width: 630upx;
				height: 60upx;
				margin-bottom: 42upx;

				input {
					width: 630upx;
					height: 60upx;
					border-bottom: 1upx solid #999999;
					font-size: 32upx;
					color: #999999;
				}
			}

			.number {
				width: 630upx;
				height: 60upx;
				margin-bottom: 42upx;
				border-bottom: 1upx solid #999999;
				font-size: 32upx;
				color: #999999;
			}

			.select {
				width: 630upx;
				height: 60upx;
				margin-bottom: 70upx;
				border-bottom: 1upx solid #999999;
				display: flex;
				justify-content: space-between;
				font-size: 32upx;

				input {
					width: 350upx;
				}

				.select_title {
					.icon31fanhui2 {
						font-size: 40upx;
						color: #cecece;
					}
				}
			}

			.upload {
				display: flex;
				justify-content: space-between;

				.uplosd_list {
					display: flex;
					justify-content: flex-start;
					flex-direction: column;
					align-items: center;

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

						image {
							width: 190upx;
							height: 190upx;
						}
					}

					.box_title {
						font-size: 24upx;
						color: #666666;
						text-align: center;
						margin-top: 19upx;
					}
				}
			}

			.subm {
				width: 632upx;
				height: 88upx;
				background-color: #febf66;
				box-shadow: 0upx 6upx 21upx 3upx rgba(224, 156, 28, 0.25);
				border-radius: 39upx;
				font-size: 36upx;
				color: #333333;
				margin-top: 87upx;
			}

			//省市区的样式
			.choice {
				background-color: #fff;
				padding: 20upx;
				font-size: 28upx;
			}

			.addList {
				height: 570upx;
				box-sizing: border-box;
				overflow-y: scroll;
				width: 31%;
				float: left;
				margin-left: 1%;
				margin-right: 1%;
				padding: 50upx 0;
				font-size: 28upx;
				z-index: 999;
				view {
					overflow: hidden;
				}
			}

			.addList view {
				height: 70upx;
				line-height: 70upx;
				z-index: 999;
			}

			.check {
				color: #fff;
				background-color: #febf66;
			}

			.jm-modal {
				position: fixed;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				z-index: 999;
				opacity: 0;
				outline: 0;
				text-align: center;
				-ms-transform: scale(1.185);
				transform: scale(1.185);
				backface-visibility: hidden;
				perspective: 2000upx;
				background: rgba(0, 0, 0, 0.6);
				transition: all 0.3s ease-in-out 0s;
				pointer-events: none;
			}

			.jm-modal::before {
				content: "\200B";
				display: inline-block;
				height: 100%;
				vertical-align: middle;
			}

			.show1 {
				opacity: 1;
				transition-duration: 0.3s;
				-ms-transform: scale(1);
				transform: scale(1);
				overflow-x: hidden;
				overflow-y: auto;
				pointer-events: auto;
			}

			.dialog {
				position: relative;
				display: inline-block;
				vertical-align: middle;
				margin-left: auto;
				margin-right: auto;
				width: 680upx;
				max-width: 100%;
				height: 700upx;
				background-color: #f8f8f8;
				border-radius: 10upx;
				overflow: hidden;
			}

			.action {
				position: absolute;
				right: 30upx;
				color: #febf66;
				font-size: 33upx;
			}

			.content {
				position: absolute;
				text-align: center;
				width: calc(100% - 340upx);
				left: 0;
				right: 0;
				bottom: 0;
				top: 0;
				margin: auto;
				height: 60upx;
				font-size: 32upx;
				line-height: 60upx;
				cursor: none;
				pointer-events: none;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}

			.showBox {
				background-color: #fff;
				display: flex;
				position: relative;
				align-items: center;
				min-height: 100upx;
				justify-content: space-between;
			}
		}
		.hint_item {
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, .5);
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translateX(-50%) translateY(-50%);
			z-index: 99;
			display: flex;
			align-items: center;
			justify-content: center;
			overflow: hidden;
			transition: all .2s;
			.hint_content {
				width: 80%;
				background: #fff;
				border: 1px solid #eee;
				border-radius: 10upx;
				padding: 20upx;
				box-sizing: border-box;
				.hint_title {
					text-align: center;
					padding-bottom: 20upx;
					color: #febf66;
					// font-weight: 600;
					border-bottom: .5upx solid #eee;
				}
				.hint_text {
					font-size: 30upx;
					display: flex;
					flex-direction: column;
					color: #666;
					padding: 10upx 0;
					text {
						margin-top: 10upx;
					}
				}
				.hint_but {
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 28upx;
					border-top: .5upx solid #eee;
					padding-top: 30upx;
					margin-top: 10upx;
					view {
						// background: #febf66;
						border: 1px solid #febf66;
						border-radius: 10upx;
						padding: 8upx 40upx;
						color: #febf66;
						box-sizing: border-box;
					}
				}
			}
		}
		.hint_style {
			width: 100%;
			height: 100%;
		}
	}
</style>
