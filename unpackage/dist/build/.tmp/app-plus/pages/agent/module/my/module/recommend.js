(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/agent/module/my/module/recommend"],{"23c3":function(t,e,n){},"23fe":function(t,e,n){"use strict";var a=n("23c3"),o=n.n(a);o.a},3774:function(t,e,n){"use strict";n.r(e);var a=n("d33c"),o=n("e278");for(var u in o)"default"!==u&&function(t){n.d(e,t,function(){return o[t]})}(u);n("23fe");var i=n("2877"),r=Object(i["a"])(o["default"],a["a"],a["b"],!1,null,"3fb27976",null);e["default"]=r.exports},"8faa":function(t,e,n){"use strict";(function(t){var n;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{list:""}},onLoad:function(){this.getData()},methods:{getData:function(){n=this,this.$api.MyInvitation({}).then(function(t){console.log(t," at pages\\agent\\module\\my\\module\\recommend.vue:46"),n.list=t.data.data}).catch(function(t){console.log("request fail",t," at pages\\agent\\module\\my\\module\\recommend.vue:49")})},ShopDetails:function(e){console.log(e," at pages\\agent\\module\\my\\module\\recommend.vue:54"),t.navigateTo({url:"/pages/dealer_other/ShopDetails?id="+e})}}};e.default=a}).call(this,n("6e42")["default"])},d33c:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=(t._self._c,t.list.map(function(e,n){var a=Boolean(e.avatar);return{$orig:t.__get_orig(e),m0:a}}));t.$mp.data=Object.assign({},{$root:{l0:n}})},o=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return o})},e278:function(t,e,n){"use strict";n.r(e);var a=n("8faa"),o=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,function(){return a[t]})}(u);e["default"]=o.a}},[["a67d","common/runtime","common/vendor"]]]);