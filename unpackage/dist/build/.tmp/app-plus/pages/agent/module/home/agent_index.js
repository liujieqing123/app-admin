(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/agent/module/home/agent_index"],{"2ee7":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},"4ba5":function(t,e,n){"use strict";var a=n("4c47"),i=n.n(a);i.a},"4c47":function(t,e,n){},"539b":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{list:["昨天销量","今日销量","当月销量"],sel:0,seller_list:[],Income_list:{}}},mounted:function(){this.getListData(),this.getIncome()},onLoad:function(){},methods:{getListData:function(){var e=this;this.$api.AgentIndex({}).then(function(t){0===t.data.errcode&&(e.seller_list=t.data.data)}).catch(function(e){t.showToast({title:"请求异常",icon:"none",mask:!0})})},getIncome:function(){var e=this;this.$api.SellerIncome({}).then(function(t){0===t.data.errcode&&(e.Income_list=t.data.data)}).catch(function(e){t.showToast({title:"请求异常",icon:"none",mask:!0})})},seleItem:function(t){this.sel=t}}};e.default=n}).call(this,n("6e42")["default"])},"6e60":function(t,e,n){"use strict";n.r(e);var a=n("2ee7"),i=n("9bee");for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);n("4ba5");var c=n("2877"),u=Object(c["a"])(i["default"],a["a"],a["b"],!1,null,"431d08ec",null);e["default"]=u.exports},"9bee":function(t,e,n){"use strict";n.r(e);var a=n("539b"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e["default"]=i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/agent/module/home/agent_index-create-component',
    {
        'pages/agent/module/home/agent_index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("6e60"))
        })
    },
    [['pages/agent/module/home/agent_index-create-component']]
]);                
