(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/dealer/module/order/dealer_order"],{"110e":function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r,a=function(){return o.e("pages/dealer/module/order/ChangePrice").then(o.bind(null,"679e"))},n=function(){return Promise.all([o.e("common/vendor"),o.e("components/tki-qrcode/tki-qrcode")]).then(o.bind(null,"e2f9"))},i={props:{mode:{value:Number,default:1},button:{value:String,default:"outside"},show:{value:Boolean,default:!0},radius:{value:String,default:60},usertype:{value:String,default:0}},components:{ChangePrice:a,tkiQrcode:n},data:function(){return{active:!1,inputVal:"",searchName:"取消",isDelShow:!1,isFocus:!1,cur_id:10,ishow:!1,order_list:[],order_id:"",noth:"",isShow:!1,page_index:1,last_page:"",load_show:!1,bottom_show:!1,order_state:10,order_type:1,codeQR_show:!1,mask_show:!1,val:"",size:350,icon:"",onval:!0,loadMake:!0,stages_price:"",pay_start_time:"",order_sn:"",pay_sn:""}},mounted:function(){this.GetOrderList()},onLoad:function(){},filters:{changTime:function(e){var t=new Date(1e3*e),o=t.getFullYear(),r=t.getMonth()+1;r<10&&(r="0"+r);var a=t.getDate();a<10&&(a="0"+a);var n=t.getHours();n<10&&(n="0"+n);var i=t.getMinutes();i<10&&(i="0"+i);var d=t.getSeconds();d<10&&(d="0"+d);var s=o+"-"+r+"-"+a+" "+n+":"+i+":"+d;return s}},methods:{GetOrderList:function(){var t=this;this.load_show=!1,this.bottom_show=!1,this.$api.GetOrderList({page:this.page_index,nums:10,order_state:this.order_state,order_type:this.order_type,order_sn:""}).then(function(e){if(console.log(e.data.data," at pages\\dealer\\module\\order\\dealer_order.vue:296"),0==e.data.errcode){t.load_show=!0,t.last_page=e.data.data.last_page;for(var o=e.data.data.data,r=0;r<o.length;r++)if(t.order_list.push(o[r]),2==t.order_list[r].order_type){var a=t.order_list[r].orderstages.pay_start_time,n=new Date(a),i=n.getFullYear()+"-"+(n.getMonth()+1)+"-"+n.getDate()+" "+n.getHours()+":"+n.getMinutes()+":"+n.getSeconds();t.pay_start_time=i}t.order_list.length==e.data.data.total?(t.load_show=!1,t.bottom_show=!0):(t.load_show=!0,t.bottom_show=!1),0==e.data.data.data.length&&(t.load_show=!1,t.bottom_show=!1)}}).catch(function(t){e.showToast({title:t,icon:"none",duration:2e3})})},clickLoad:function(){this.page_index++,this.page_index>this.last_page||this.GetOrderList()},focus:function(){this.active=!0},blur:function(){this.isFocus=!1,this.inputVal||(this.active=!1)},clear:function(){this.inputVal="",this.active=!1,this.$emit("search","")},getFocus:function(){this.isFocus=!0},search:function(){var e=this;this.$emit("search",this.inputVal),this.$api.GetOrderList({order_state:this.cur_id,order_sn:this.inputVal}).then(function(t){e.order_list=t.data.data.data,e.isShow=!1,0==t.data.data.total&&(e.noth="搜索到0条结果",e.isShow=!0)}).catch(function(e){console.log("request fail",e," at pages\\dealer\\module\\order\\dealer_order.vue:371")})},curId:function(e){r=this,r.cur_id=e,r.order_list=[],r.page_index=1,10==r.cur_id?(r.order_state=e,r.order_type=1):20==r.cur_id?(r.order_type=100,r.order_state=20):0==r.cur_id?(r.order_state=e,r.order_type=""):2==r.cur_id&&(r.order_type=2,r.order_state=10),r.GetOrderList()},Change:function(e){this.ishow=!0,this.order_id=e},CloseChan:function(){this.ishow=!1},ConfirmChange:function(t){var o=this;this.ishow=!1,this.$api.EditPrice({order_id:this.order_id,order_amount:t}).then(function(t){console.log(t," at pages\\dealer\\module\\order\\dealer_order.vue:412"),e.showToast({title:t.data.msg,icon:"none",mask:!0}),o.order_list=[],o.page_index=1,o.GetOrderList()}).catch(function(e){console.log("request fail",e," at pages\\dealer\\module\\order\\dealer_order.vue:423")})},ViewDetails:function(t,o){e.navigateTo({url:"../order/orderDetails?order_id="+t+"&usertype="+o})},cancellationo_rder:function(t){var o=this;e.showModal({title:"提示",content:"确定取消该订单吗？",confirmColor:"#febf66",success:function(e){e.confirm?(console.log(t," at pages\\dealer\\module\\order\\dealer_order.vue:442"),o.cancelOrder(t)):e.cancel}})},cancelOrder:function(t){var o=this;this.$api.CalcelOrder({order_id:t}).then(function(t){console.log(t," at pages\\dealer\\module\\order\\dealer_order.vue:455"),e.showToast({title:t.data.msg,icon:"none",mask:!0}),o.order_list=[],o.page_index=1,o.GetOrderList()}).catch(function(e){console.log("request fail",e," at pages\\dealer\\module\\order\\dealer_order.vue:466")})},Delete_order:function(t){var o=this;e.showModal({title:"提示",content:"确定删除该订单吗？",confirmColor:"#febf66",success:function(e){e.confirm?(console.log(t," at pages\\dealer\\module\\order\\dealer_order.vue:479"),o.ConfirmDele(t)):e.cancel}})},ConfirmDele:function(t){var o=this;this.$api.DelOrder({order_id:t}).then(function(t){console.log(t," at pages\\dealer\\module\\order\\dealer_order.vue:494"),e.showToast({title:t.data.msg,icon:"none",mask:!0}),o.order_list=[],o.page_index=1,o.GetOrderList()}).catch(function(e){console.log("request fail",e," at pages\\dealer\\module\\order\\dealer_order.vue:505")})},PayTail:function(e,t,o,r){this.order_sn=e,this.stages_price=o,this.pay_sn=r,this.mask_show=!0,this.getQRcode()},CloseQRcode:function(){this.cancellPay(),this.mask_show=!1},getQRcode:function(){var t=this;t.$api.DeltoPayr({order_sn:this.order_sn,order_type:this.order_type,pay_sn:this.pay_sn}).then(function(o){console.log(o," at pages\\dealer\\module\\order\\dealer_order.vue:529"),0==o.data.errcode?(t.val=o.data.code_url,t.getState()):e.showToast({title:"请求失败",icon:"none",duration:2e3})}).catch(function(t){e.showToast({title:"请求异常",icon:"none",duration:2e3})})},getState:function(){var t=this;t.$api.DelisPay({order_sn:this.order_sn,order_type:this.order_type,pay_sn:this.pay_sn}).then(function(o){console.log(o.data," at pages\\dealer\\module\\order\\dealer_order.vue:556"),0==o.data.errcode&&(console.log("支付成功"," at pages\\dealer\\module\\order\\dealer_order.vue:558"),e.redirectTo({url:"./PaySuccess"})),40012==o.data.errcode&&(console.log("未支付"," at pages\\dealer\\module\\order\\dealer_order.vue:564"),1==t.mask_show&&setTimeout(function(){t.getState()},1e3)),30001==o.data.errcode&&console.log("订单取消"," at pages\\dealer\\module\\order\\dealer_order.vue:572")}).catch(function(t){e.showToast({title:"请求异常",icon:"none",duration:2e3})})},cancellPay:function(){var t=this;r.$api.UpdateOrder({order_sn:this.order_sn}).then(function(o){0==o.data.errcode?(t.order_list=[],t.GetOrderList()):e.showToast({title:"请求失败",icon:"none",duration:2e3})}).catch(function(t){e.showToast({title:"请求异常",icon:"none",duration:2e3})})},qrR:function(){}},watch:{inputVal:function(e){e?(this.searchName="搜索",this.isDelShow=!0):(this.searchName="取消",this.isDelShow=!1)}}};t.default=i}).call(this,o("6e42")["default"])},2009:function(e,t,o){"use strict";var r=function(){var e=this,t=e.$createElement,o=(e._self._c,e.order_list.map(function(t,o){var r=Boolean(t.extend_order_goods.dfbt.avatar),a=Boolean(t.extend_order_goods.dfbt.shop_name),n=Boolean(t.extend_order_goods.dealer.avatar),i=e._f("changTime")(t.add_time),d=e._f("changTime")(t.payment_time),s=e._f("changTime")(t.cancel_time);return{$orig:e.__get_orig(t),m0:r,m1:a,m2:n,f0:i,f1:d,f2:s}}));e.$mp.data=Object.assign({},{$root:{l0:o}})},a=[];o.d(t,"a",function(){return r}),o.d(t,"b",function(){return a})},"49b6":function(e,t,o){"use strict";o.r(t);var r=o("110e"),a=o.n(r);for(var n in r)"default"!==n&&function(e){o.d(t,e,function(){return r[e]})}(n);t["default"]=a.a},8297:function(e,t,o){},"8fd6":function(e,t,o){"use strict";var r=o("8297"),a=o.n(r);a.a},eb91:function(e,t,o){"use strict";o.r(t);var r=o("2009"),a=o("49b6");for(var n in a)"default"!==n&&function(e){o.d(t,e,function(){return a[e]})}(n);o("8fd6");var i=o("2877"),d=Object(i["a"])(a["default"],r["a"],r["b"],!1,null,"3acb0c67",null);t["default"]=d.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/dealer/module/order/dealer_order-create-component',
    {
        'pages/dealer/module/order/dealer_order-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("eb91"))
        })
    },
    [['pages/dealer/module/order/dealer_order-create-component']]
]);                
