<template>
	<view class="content">
		<button type="primary" @click="toload">单击开始登陆</button>
		<button type="primary" @click="tousercenter">进入用户中心</button>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {
			
		},
		onReady() {
			// uni.showLoading({
			//     title: '正在进入中...',
			// 	// image:"../../static/loadingshow.jpg"
			// });
			
			// setTimeout(function () {
			//     uni.hideLoading();
			// 	uni.reLaunch({
			// 		url:"../login/login"
			// 	})
			// }, 1000);
			// console.log("页面加载完成")
			// console.log(helper.userImageurl)
		},
		methods: {
			toload(){
				uni.navigateTo({
				    url: '../login/login'
				})
			},
			tousercenter(){
				uni.navigateTo({
				    url: '../user-center/user_center'
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #f5f6f8;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
