<template>
  <view class='hint_page'>
    <image src="/static/images/check.png" mode='widthFix' class='hint_img' v-if='hint_show'/>
    <image src="/static/images/checkNo.png" mode='widthFix' class='hint_img' v-else/>
    <view class='hint_text' v-if='hint_show'>商铺正在审核中，请留意短信通知！</view>
    <view class='hint_text' v-else>您的商铺未通过审核，请重新提交认证。</view>
    <view class='but_item' @tap='goBack' v-if='hint_show'>返回</view>
    <view class='but_item' @tap='openPage' v-else>去重新认证</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        hint_show: true,
      }
    },
    onLoad(option) {
      if(option.checkState == 0) {
        this.hint_show = false;
      }
      if(option.checkState == 1) {
        this.hint_show = true;
      }
    },
    methods: {
      goBack() {
        uni.reLaunch({
          url: "/pages/index/login"
        })
      },
      openPage() {
        uni.reLaunch({
          url: "/pages/index/approve"
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.hint_page {
  padding-top: 100upx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  .hint_img {
    width: 50%;
  }
  .hint_text {
    text-align: center;
    font-size: 32upx;
    color: #888;
    margin-top: 70upx;
  }
  .but_item {
    width: 60%;
    height: 70upx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 33upx;
    margin-top: 120upx;
    border-radius: 50upx;
    background: #FCC066;
  }
}
</style>