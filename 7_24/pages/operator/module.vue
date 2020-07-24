<template>
	<view>
		<view class="module">
			<view class="moduleSize">
				<image src="../../static/logo.png"></image>
				<view>设备申请</view>
			</view>
			<view class="moduleSize">
				<image src="../../static/logo.png"></image>
				<view>施工现场</view>
				
			</view>
		</view>
		
		<view class="module">
			<view class="moduleSize">
				<image src="../../static/logo.png"></image>
				<view>设备申请</view>
			</view>
			<view class="moduleSize">
				<image src="../../static/logo.png"></image>
				<view>施工现场</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				
			}
		},
		onLoad(option) {
			var that = this
		},
		methods:{
			
		}
	}
</script>

<style>
	.module{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin: 10%;
		
	}
	.moduleSize{
		width: 300rpx;
		height: 300rpx;
		/* border: #007AFF 2rpx solid; */
		text-align: center;
		padding: 5%;
	}
	.moduleSize image{
		width: 80%;
		height: 80%;
	}
</style>
