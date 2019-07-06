<template>
	<view class="attestation">
		<view class="content">
			<view class="name">
				<input class="shop" placeholder="请输入商铺名称" v-model="oldInfo.shop_name" />
			</view>
			<view class="legalperson">
				<input placeholder="请输入企业法人" v-model="oldInfo.company_name" />
			</view>
			<view class="number">
				{{oldInfo.phone}}
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
						<image :src="oldInfo.business_license"/>
					</view>
					<view class="box_title">上传营业执照</view>
				</view>
				<view class="uplosd_list">
					<view class="frame" type="primary" :loading="loading" :disabled="disabled" @click="upload" id="idcard_just">
						<image :src="oldInfo.idcard_just"/>
					</view>
					<view class="box_title">上传法人手持身份证正面</view>
				</view>
				<view class="uplosd_list">
					<view class="frame" type="primary" :loading="loading" :disabled="disabled" @click="upload" id="idcard_back">
						<image :src="oldInfo.idcard_back"/>
					</view>
					<view class="box_title">上传法人手持身份证反面</view>
				</view>
			</view>
			<button @tap="changInfo">修改认证</button>
		</view>
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				//原来认证的信息
				oldInfo: {},
				//经销商电话号码
				dealer_phone: '',
				// 图片上传
				loading: false,
				disabled: false,
				//营业执照
				business_license: '',
				//身份证正面
				idcard_just: '',
				//身份证反面
				idcard_back: '',
				//省市区选择
				//模态框状态
				showFlag: false,

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
		props: {
			//选择省市区的
			//载入的标签数据
			addressd: Array
		},
		onLoad(option) {
			this.getSiteData();
			this.getInfo();
			_self = this;
			//获取传过来的id和电话号码
			this.dealer_phone = option.dealer_phone;
		},
		onReady() {
			_self = this;
		},
		methods: {
			// 获取认证信息
			getInfo() {
				this.$api.DealerMyAuth({}).then((res) => {
					if(res.data.errcode == 0) {
						this.province_name = res.data.data.areainfo.split(' ')[0]
						this.city_name = res.data.data.areainfo.split(' ')[1]
						this.area_name = res.data.data.areainfo.split(' ')[2]
						this.province_id = res.data.data.provinceid;
						this.city_id = res.data.data.cityid;
						this.area_id = res.data.data.areaid;
						this.oldInfo = res.data.data;
					}
				}).catch((err) => {
					console.log('request fail', err);
				})
			},
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
				uni.chooseImage({	//选择图片
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						const tempFilePaths = res.tempFilePaths;
						const uploadTask = uni.uploadFile({		//上传图片
							url: 'https://xt.dfbtds.com/api_app/Dealer/uploadFile',
							filePath: tempFilePaths[0],
							header:{"Authorization": uni.getStorageSync('token')},
							name: name,
							formData: {
								name: name,
							},
							success: function(uploadFileRes) {
								console.log(uploadFileRes);
								var data = JSON.parse(uploadFileRes.data)	//转为json对象
								switch (name) {
									case "business_license":
										_self.oldInfo.business_license = data.data.business_license	//把新上传的地址放到原本获取到的数据里面
										break;
									case "idcard_just":
										_self.oldInfo.idcard_just = data.data.idcard_just;
										break;
									case "idcard_back":
										_self.oldInfo.idcard_back = data.data.idcard_back;
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
			// 点击修改
			changInfo() {
				if(this.oldInfo.shop_name === "") {
					uni.showToast({
						title: '请输入商铺名称',
						icon: 'none',
						duration: 1500
					});
					return
				}
				if(this.oldInfo.company_name === "") {
					uni.showToast({
						title: '请输入企业法人',
						icon: 'none',
						duration: 1500
					});
					return
				}
				if(this.province_id === "") {
					uni.showToast({
						title: '选择所在区域',
						icon: 'none',
						duration: 1500
					});
					return
				}
				this.ChangeAttestation();
			},
			//修改认证
			ChangeAttestation(){
				//发起请求(修改认证)
				_self.$api.EditMyAuth({
					shop_name:_self.oldInfo.shop_name, 
					company_name:_self.oldInfo.company_name,
					provinceid:_self.province_id,
					cityid:_self.city_id,
					areaid:_self.area_id,
					business_license:_self.oldInfo.business_license,
					idcard_just:_self.oldInfo.idcard_just,
					idcard_back:_self.oldInfo.idcard_back,
				}).then((res) => {
					if(res.data.errcode == 0){
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							mask: true
						});
					}else{
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							mask: true
						});
					}
					console.log(res)
				}).catch((err) => {
					console.log('request fail', err);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.attestation {
		padding: 0upx 55upx 0upx 55upx;

		.content {
			padding-top: 83upx;
			padding-bottom: 83upx;
			letter-spacing: 5upx;

			.name {
				width: 630upx;
				height: 60upx;
				margin-bottom: 58upx;

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
				margin-bottom: 58upx;

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
				margin-bottom: 58upx;
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
				.uplosd_list{
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
						background-position: 50%;	//背景图居中
						display: flex;
						justify-content: center;
						align-items: center;
						image{
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

			button {
				width: 632upx;
				height: 88upx;
				background-color: #febf66;
				box-shadow: 0upx 6upx 21upx 3upx rgba(224, 156, 28, 0.25);
				border-radius: 39upx;
				font-size: 36upx;
				color: #333333;
				margin-top: 150upx;
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
				z-index: 999999;
			}
			
			.addList view {
				height: 70upx;
				line-height: 70upx;
				z-index: 999999;
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
				z-index: 1110;
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

	}
</style>
