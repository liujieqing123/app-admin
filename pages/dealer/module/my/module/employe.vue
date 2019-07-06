<template>
	<view class="employe">
		<view class="em_header">
			<view class="header_left" @tap="ToBack">
				<text class="iconfont icon-fanhui"></text>
				<text class="em_tile">我的员工</text>
			</view>
			<view class="add" @click="clickadd">添加</view>
		</view>
		<!-- 暂无员工 -->
		<view v-if="Nshow" class="NoData">
			<image src="../../static/images/t10.png" />
			<view class="title">暂无员工</view>
			<view class="explain">请按右上方的“添加”按钮进行添加</view>
		</view>
		<!-- 员工列表 -->
		<view v-if="Hshow" class="HaveData">
			<view class="personnel" v-for="(item,index) in listInfo" :key="index">
				<view class="icon">
					<text class="iconfont icon-bianji4" @tap="compile(item.stuff_id,item.stuff_name,item.stuff_phone,item.stuff_password,item.stuff_position,item.ratio)"></text>
					<text class="iconfont icon-shanchu1" @tap="delet(item.stuff_id)"></text>
				</view>
				<view class="title">
					<text>{{item.stuff_name}}</text>
					<text>{{item.stuff_phone}}</text>
				</view>
				<view class="info">
					<text>职位：{{item.stuff_position}}</text>
					<text>提成比例：{{item.ratio}}%</text>
				</view>
				<view class="info">
					<text>账号：{{item.stuff_phone}}</text>
					<!-- <view @tap="DisplayPass(index)">密码：
						<input class="passInpt" type='text' :value="item.stuff_password" disabled="disabled" v-if='ischeck'/>
						<input class="passInpt" type='password' :value="item.stuff_password" disabled="disabled" v-else/>
					</view> -->
					<view>密码：<input class="passInpt" :type="ischeck == false? 'password' : ''" :value="item.stuff_password" disabled="disabled"
						 @tap="DisplayPass" /></view>
				</view>
				<view class="info">
					<text>销量：{{item.stuff_volume}}</text>
					<view>获得分成：<input class="diviInpt" :type="ischack == false? 'password' : ''" :value="item.share_money" disabled="disabled"
						 @tap="DisplayDivi" /></view>
				</view>
			</view>
		</view>
		<neilModal class="win" v-if="ishow" @close="CloseNei" :stuffid="stuff_id" :stuffname="stuff_name" :stuffphone="stuff_phone"
		 :stuffpassword="stuff_password" :stuffposition="stuff_position" :ratio="stuff_ratio"></neilModal>
		<addEmployees class="win" v-if="ashow" @close="CloseAdd"></addEmployees>
	</view>
</template>

<script>
	import neilModal from './NeilModa.vue';
	import addEmployees from './AddEmployees.vue';
	var _self;
	export default {
		components: {
			neilModal,
			addEmployees
		},
		data() {
			return {
				Nshow: false,
				Hshow: true,
				ishow: false,
				ashow: false,
				listInfo: {},
				//点击时相应选项的id
				stuff_id: '',
				stuff_name: '',
				stuff_phone: '',
				stuff_password: '',
				stuff_position: '',
				stuff_ratio: '',
				//显隐
				ischeck: false,
				ischack: false

			}
		},
		onLoad(option) {
			_self = this;
			//发起请求(员工信息)
			this.MyStuff();
		},
		methods: {
			//发起请求(员工信息)
			MyStuff() {
				_self.$api.MyStuff({

				}).then((res) => {
					if (res.data.data.length == 0) {
						this.Nshow = true;
						this.Hshow = false;
					} else {
						this.Nshow = false;
						this.Hshow = true;
						_self.listInfo = res.data.data;
						console.log(_self.listInfo)
					}
				}).catch((err) => {
					console.log('request fail', err);
				})
			},
			// 控制密码显隐
			DisplayPass() {
				this.ischeck = !this.ischeck;
			},
			// 控制分成显隐
			DisplayDivi() {
				this.ischack = !this.ischack;
			},
			//点击弹出编辑弹窗并把相应选项的值存起来传到组件
			compile(stuff_id, stuff_name, stuff_phone, stuff_password, stuff_position, ratio) {
				_self.ishow = true;
				_self.stuff_id = stuff_id;
				_self.stuff_name = stuff_name;
				_self.stuff_phone = stuff_phone;
				_self.stuff_password = stuff_password;
				_self.stuff_position = stuff_position;
				_self.stuff_ratio = ratio;
			},
			//点击弹出删除弹窗
			delet(stuff_id) {
				_self = this;
				// 模态框
				uni.showModal({
					title: '提示',
					content: '确定删除该员工吗？',
					confirmColor: '#febf66',
					success: function(res) {
						if (res.confirm) {
							_self.ConfirmDele(stuff_id);
						} else if (res.cancel) {
							
						}
					}
				});
			},
			//请求删除接口
			ConfirmDele(stuff_id) {
				_self = this;
				// 发起请求
				this.$api.DelStuff({
					stuff_id: stuff_id
				}).then((res) => {
					console.log(res)
					_self.dshow = false;
					uni.showToast({
						title: res.data.msg,
						icon: 'none',
						mask: true
					});
					//重新发起请求(员工信息)，实时刷新
					_self.MyStuff();

				}).catch((err) => {
					console.log('request fail', err);
				})
			},
			//点击弹出添加弹窗
			clickadd: function() {
				_self.ashow = true;
			},
			//取消或者保存时关闭编辑弹窗
			CloseNei: function() {
				_self.ishow = false;
				//实时刷新页面
				this.MyStuff();
			},
			//关闭添加弹窗
			CloseAdd() {
				_self.ashow = false;
				//重新发起请求(员工信息)，实时刷新
				_self.MyStuff();
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
	.employe {
		width: 100%;
		height: 100vh;
		position: relative;
		background: #F1F1F1;
		.em_header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 120upx;
			padding: 0upx 30upx 0upx 30upx;
			.header_left{
				width: 170upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 32upx;
				letter-spacing: 2upx;
				color: #333333;
				.iconfont{
					height: 22upx;
					line-height: 22upx;
					font-size: 32upx;
				}
			}
			.add {
				width: 88upx;
				height: 48upx;
				border-radius: 10upx;
				border: solid 2upx #febf66;
				font-size: 28upx;
				color: #febf66;
				text-align: center;
				line-height: 48upx;
				z-index: 48485;
			
			}
		}
		.NoData {
			padding-top: 216upx;
			text-align: center;
			background: #F1F1F1;
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

		.HaveData {
			// height: 100upx;
			background: #F1F1F1;
			padding: 48upx 30upx 30upx 30upx;

			.personnel {
				width: 630upx;
				height: 348upx;
				background-color: #ffffff;
				border-radius: 10px;
				padding: 14upx 30upx 0upx 30upx;
				margin-bottom: 15px;

				view {
					display: flex;
					justify-content: space-between;
				}

				.icon {
					margin-bottom: 32upx;

					.iconfont {
						color: #cfcdcd;
					}
				}

				.title {
					font-size: 30upx;
					color: #ffa461;
					margin-bottom: 32upx;
				}

				.info {
					margin-bottom: 23upx;
					letter-spacing: 3upx;

					text {
						font-size: 28upx;
						color: #666666;
					}

					view {
						font-size: 28upx;
						color: #666666;
						height: 40upx;
						line-height: 50upx;

						.passInpt {
							width: 120upx;
							font-size: 28upx;
							color: #666666;
						}

						.diviInpt {
							width: 90upx;
							font-size: 28upx;
							color: #666666;
						}
					}
				}
			}
		}

		.win {
			position: absolute;
			top: 0;
			left: 0;
		}
	}
</style>
