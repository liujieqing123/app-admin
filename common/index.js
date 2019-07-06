import http from './interface'

//刷新access_token
let RefreshToken_url = 'Login/refreshToken';
// 注册
let reg_url = 'Dealer/dealerReg';
// 注册发送短信验证码
let sendMsg_url = 'Dealer/sendMsg';
// 忘记密码
let forgetPwd_url = 'Login/forgetPwd';
// 忘记密码发送验证码
let sendMessage_url = 'Login/sendMessage';
// 登录
let login_url = 'Login/login';
// 登录发送短信验证码
let loginSendMsg_url = 'Login/sendMsg';
//选择省市区
let getAreaList_url = 'Dealer/getAreaList';
//经销商提交认证
let dealerAuth_url = 'Dealer/dealerAuth';
//代理商订单列表
let getSellerOrderList_url = 'Order/getSellerOrderList';
//代理商的旗下经销商
let myDealers_url = 'Seller/myDealers';
//代理商的旗下经销商的详情
let dealerInfo_url = 'Seller/dealerInfo';
//代理商我的信息
let sellerInfo_url = 'Myseller/sellerInfo';
//代理商修改手机号码
let editPhone_url = 'Myseller/editPhone';
//代理商修改手机号码-发送短信
let sellerMes_url = 'Myseller/sendMessage';
//代理商我的推荐
let myInvitation_url = 'Myseller/myInvitation';
//代理商我的二维码
let sellerQrcode_url = 'Myseller/sellerCode';
//代理商我的财产可提现、待提现金额
let sellerMoney_url = 'Myseller/sellerMoney';
//代理商我的提现
let sellerDeposit_url = 'Myseller/sellerDeposit';
//代理商联系我们
let sellerCallMe_url = 'Myseller/callMe';
//代理商首页今日收入、当月收入
let sellerIncome_url = 'Seller/sellerIncome';
//代理商首页昨日销量、今日销量、本月销量
let sellerIndex_url = 'Seller/index';
//代理商我的财产提现列表
let sellerMoneyLog_url = 'Myseller/depositList';
//代理商账目明细支出收入列表
let SellDepositList_url = 'Myseller/depositList';
//代理商账目明细支出收入详情
let SellDepositInfo_url = 'Myseller/depositInfo';


// 经销商首页昨日销量、今日销量、本月销量
let dealerIndex_url = 'Dealer/index';
//经销商我的信息
let dealer_url = 'Mydealer/dealerInfo';
//经销商我的财产(提取、待结算)
let dealerMoney_url = 'Mydealer/dealerMoney';
//经销商我的提现
let dealerDeposit_url = 'MyDealer/dealerDeposit';
//经销商我的财产提现列表
let myMoneyLog_url = 'MyDealer/depositList';
//账目明细支出收入列表
let DepositList_url = 'MyDealer/depositList';
//账目明细支出收入详情
let DepositInfo_url = 'Mydealer/depositInfo';
//经销商修改手机号
let dealerEditPhone_url = 'Mydealer/editPhone';
//经销商修改手机号-发送短信验证
let dealerSendMessage_url = 'Mydealer/sendMessage';
//经销商我的发货地址
let myAddress_url = 'Mydealer/myAddress';
//经销商我的发货地址-删除
let delMyAddress_url = 'Mydealer/delMyAddress';
// 经销商我的认证
let myAuth_url = 'Mydealer/myAuth';
//经销商我的修改认证
let editMyAuth_url = 'Mydealer/editMyAuth';
//经销商我的员工列表
let myStuff_url = 'Mydealer/myStuff';
//经销商我的员工添加
let addStuff_url = 'Mydealer/addStuff';
//经销商我的员工删除
let delStuff_url = 'Mydealer/delStuff';
//经销商我的员工编辑
let editStuff_url = 'Mydealer/editStuff';
//经销商联系我们
let dealerCallMe_url = 'Mydealer/callMe';
//经销商订单列表
let getOrderList_url = 'Order/getOrderList';
//经销商订单详情
let orderInfo_url = 'Order/orderInfo';
// 经销商预售订单列表
let presellOrderList_url = 'Order/presellOrderList';
//经销商待付款订单取消
let calcelOrder_url = 'Order/calcelOrder';
//经销商待付款修改价格
let editPrice_url = 'Order/editPrice';
//经销商已取消订单删除
let delOrder_url = 'Order/delOrder';
//经销商预售订单支付尾款
let deltoPayr_url = 'Order/toPay';
//经销商预售订单是否支付尾款
let delisPay_url = 'Order/isPay';
//经销商预售取消支付尾款
let updateOrder_url = 'Order/updateOrder';
//检查经销商是否提交支付保证金
let checkBond_url = 'Buy/checkBond';
//经销商支付保证金
let toBond_url = 'Buy/toBond';
//检查经销商是否支付保证金
let checkIsPay_url = 'Buy/checkIsPay';
// 取消支付保证金
let cancelBond_url = 'Buy/cancelBond';
//经销商商品列表
let dealerGoodsList_url = 'Goods/dealerGoodsList';
//经销商商品发布 
let addGoods_url = 'Goods/addGoods';
// 上下架 
let isShelves_url = 'Goods/isShelves';
// 删除商品 
let delGoods_url = 'Goods/delGoods';
// 编辑商品
let editGoods_url = 'Goods/editGoods';




//刷新access_token
export const RefreshToken = (data) => {
	return http.request({
		url: RefreshToken_url,
		data,
	})
}

// 注册
export const Reg = (data) => {
	return http.request({
		url: reg_url,
		method: 'POST', 
		data,
	})
}

// 注册发送短信验证码
export const RegMsg = (data) => {
	return http.request({
		url:sendMsg_url,
		method: 'POST',
		data,
	})
}

// 忘记密码
export const ForgetPwd = (data) => {
	return http.request({
		url: forgetPwd_url,
		method: 'POST',
		data,
	})
}

// 忘记密码发送验证码
export const LoSendMes = (data) => {
	return http.request({
		url: sendMessage_url,
		method: 'POST',
		data,
	})
}

// 登录
export const Login = (data) => {
	return http.request({
		url: login_url,
		method: 'POST',
		data,
	})
}

// 登录发送短信验证码
export const LoginMsg = (data) => {
	return http.request({
		url: loginSendMsg_url,
		method: 'POST',
		data,
	})
}

//选择省市区
export const AreaList = (data) => {
	return http.request({
		url: getAreaList_url,
		data,
	})
}

//经销商提交认证
export const DealerAuth = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: dealerAuth_url,
		method: 'POST',
		data,
	})
}

//代理商订单列表
export const GetSellerOrderList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: getSellerOrderList_url,
		method: 'GET',
		data,
	})
}

//代理商的旗下经销商
export const MyDealers = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: myDealers_url,
		method: 'GET',
		data,
	})
}

//代理商的旗下经销商的详情
export const DealerInfo = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: dealerInfo_url,
		method: 'GET',
		data,
	})
}

//代理商我的信息
export const SellerInfo = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: sellerInfo_url,
		method: 'GET',
		data,
	})
}

//代理商修改手机号码
export const EditPhone = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: editPhone_url,
		method: 'POST',
		data,
	})
}

//代理商修改手机号码-发送短信
export const ChangeSendMessage = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: sellerMes_url,
		method: 'POST',
		data,
	})
}

//代理商我的推荐
export const MyInvitation = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: myInvitation_url,
		method: 'GET',
		data,
	})
}

//代理商我的二维码
export const MyQrcode = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: sellerQrcode_url,
		method: 'GET',
		data,
	})
}


//代理商我的财产可提现、待提现金额
export const SellerMoney = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: sellerMoney_url,
		method: 'GET',
		data,
	})
}

//代理商我的提现(POST)
export const SellerDepositpost = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: sellerDeposit_url,
		method: 'POST',
		data,
	})
}

//代理商我的提现(GET)
export const SellerDepositget = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: sellerDeposit_url,
		method: 'GET',
		data,
	})
}

//代理商联系我们
export const SellerCallMe = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: sellerCallMe_url,
		method: 'GET',
		data,
	})
}

//代理商首页今日收入、当月收入
export const SellerIncome = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: sellerIncome_url,
		method: 'POST',
		data,
	})
}

// 经销商首页昨日销量、今日销量、本月销量
export const DealerIndex = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: dealerIndex_url,
		data,
	})
}

//代理商首页昨日销量、今日销量、本月销量
export const AgentIndex = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: sellerIndex_url,
		method: 'GET',
		data,
	})
}

//代理商我的财产提现列表
export const SellerMoneyLog = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: sellerMoneyLog_url,
		method: 'GET',
		data,
	})
}

//代理商账目明细支出收入列表
export const SellDepositList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: SellDepositList_url,
		method: 'GET',
		data,
	})
}

//代理商账目明细支出收入详情
export const SellDepositInfo = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: SellDepositInfo_url,
		method: 'GET',
		data,
	})
}

//经销商我的信息
export const MyDealerInfo = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: dealer_url,
		method: 'GET',
		data,
	})
}

//经销商我的财产(提取、待结算)
export const DealerMoney = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: dealerMoney_url,
		method: 'GET',
		data,
	})
}

//经销商我的提现(POST)
export const DealerDepositpost = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: dealerDeposit_url,
		method: 'POST',
		data,
	})
}

//经销商我的提现(GET)
export const DealerDepositget = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: dealerDeposit_url,
		method: 'GET',
		data,
	})
}

//经销商我的财产提现列表
export const MyMoneyLog = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: myMoneyLog_url,
		method: 'GET',
		data,
	})
}

//账目明细支出收入列表
export const DepositList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: DepositList_url,
		method: 'GET',
		data,
	})
}

//账目明细支出收入详情
export const DepositInfo = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: DepositInfo_url,
		method: 'GET',
		data,
	})
}

//经销商修改手机号
export const DealerEditPhone = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: dealerEditPhone_url,
		method: 'POST',
		data,
	})
}

//经销商修改手机号-发送短信验证
export const DealerSendMessage = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: dealerSendMessage_url,
		method: 'POST',
		data,
	})
}

//经销商我的发货地址
export const MyAddress = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: myAddress_url,
		method: 'GET',
		data,
	})
}

//经销商我的发货地址-删除
export const DelMyAddress = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: delMyAddress_url,
		method: 'POST',
		data,
	})
}

// 经销商我的认证
export const DealerMyAuth = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: myAuth_url,
		method: 'GET',
		data,
	})
}

//经销商我的修改认证
export const EditMyAuth = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: editMyAuth_url,
		method: 'POST',
		data,
	})
}

//经销商我的员工列表
export const MyStuff = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: myStuff_url,
		method: 'GET',
		data,
	})
}

//经销商我的员工添加
export const AddStuff = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: addStuff_url,
		method: 'POST',
		data,
	})
}

//经销商我的员工删除
export const DelStuff = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: delStuff_url,
		method: 'POST',
		data,
	})
}

//经销商我的员工编辑
export const EditStuff = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: editStuff_url,
		method: 'POST',
		data,
	})
}

//经销商联系我们
export const DealerCallMe = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: dealerCallMe_url,
		method: 'GET',
		data,
	})
}

//经销商订单列表
export const GetOrderList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: getOrderList_url,
		method: 'GET',
		data,
	})
}

//经销商订单详情
export const OrderInfo = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: orderInfo_url,
		method: 'GET',
		data,
	})
}

//经销商预售订单列表
export const PresellOrderList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: presellOrderList_url,
		method: 'GET',
		data,
	})
}

//经销商待付款订单取消
export const CalcelOrder = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: calcelOrder_url,
		method: 'POST',
		data,
	})
}

//经销商待付款修改价格
export const EditPrice = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: editPrice_url,
		method: 'POST',
		data,
	})
}

//经销商已取消订单删除
export const DelOrder = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: delOrder_url,
		method: 'POST',
		data,
	})
}

//经销商预售订单支付尾款
export const DeltoPayr = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: deltoPayr_url,
		method: 'GET',
		data,
	})
}

//经销商预售订单是否支付尾款
export const DelisPay = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: delisPay_url,
		method: 'GET',
		data,
	})
}

//经销商预售取消支付尾款
export const UpdateOrder = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: updateOrder_url,
		method: 'GET',
		data,
	})
}

//检查经销商是否提交保证金
export const CheckBond = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: checkBond_url,
		method: 'GET',
		data,
	})
}

//经销商支付保证金
export const ToBond = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: toBond_url,
		method: 'GET',
		data,
	})
}

//检查经销商是否支付保证金
export const CheckIsPay = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: checkIsPay_url,
		method: 'GET',
		data,
	})
}


//经销商取消支付保证金
export const CancelBond = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: cancelBond_url,
		method: 'POST',
		data,
	})
}

//经销商商品列表
export const DealerGoodsList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: dealerGoodsList_url,
		method: 'GET',
		data,
	})
}

//经销商商品发布
export const addGoods = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: addGoods_url,
		method: 'post',
		data,
	})
}

// 上下架 
export const isShelves = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: isShelves_url,
		data,
	})
}

// 删除商品 
export const delGoods = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: delGoods_url,
		method:'post',
		data,
	})
}

// 获取编辑商品数据 
export const getEditGoods = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: editGoods_url,
		data,
	})
}

// 提交编辑商品数据 
export const editGoods = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			"Authorization": uni.getStorageSync('token')
		}
	}
	return http.request({
		url: editGoods_url,
		method:'post',
		data,
	})
}



// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
	RefreshToken,
	Reg,
	RegMsg,
	ForgetPwd,
	LoSendMes,
	Login,
	LoginMsg,
	AreaList,
	DealerAuth,
	GetSellerOrderList,
	MyDealers,
	DealerInfo,
	SellerInfo,
	EditPhone,
	ChangeSendMessage,
	MyInvitation,
	MyQrcode,
	SellerMoney,
	SellerDepositpost,
	SellerDepositget,
	SellerCallMe,
	SellerIncome,
	AgentIndex,
	SellerMoneyLog,
	SellDepositList,
	SellDepositInfo,
	//经销商
	MyDealerInfo,
	DealerMoney,
	DealerDepositpost,
	DealerDepositget,
	MyMoneyLog,
	DepositList,
	DepositInfo,
	DealerEditPhone,
	DealerSendMessage,
	MyAddress,
	DelMyAddress,
	DealerMyAuth,
	EditMyAuth,
	MyStuff,
	AddStuff,
	DelStuff,
	EditStuff,
	DealerCallMe,
	GetOrderList,
	OrderInfo,
	PresellOrderList,
	CalcelOrder,
	EditPrice,
	DelOrder,
	DeltoPayr,
	DelisPay,
	UpdateOrder,
	CheckBond,
	ToBond,
	CheckIsPay,
	CancelBond,
	//经销商商品
	DealerGoodsList,
	//经销商首页
	DealerIndex,
	addGoods,
	isShelves,
	delGoods,
	getEditGoods,
	editGoods,
}
