<template name="components">
	<view>
		<scroll-view scroll-y class="page">
			
			<view class="cu-card">
				<view class="cu-item bg-img shadow-blur" :style="[{backgroundImage:'url('+item.img+')'}]" @tap="toChild" :data-url="item.url"
				 v-for="(item,index) in processList" :key="index">
					<image src="/static/中检图标.jpg" mode="scaleToFill" border="0" class="all_orders_6"></image>
					<view class="cardTitle">
						{{item.title}}
						<view style="color: #0081FF;"> {{item.state}}</view>
					</view>					
				</view>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
		<!-- <button class="submit" plain="true" @tap="next">下一步</button> -->
	</view>
</template>

<script>
	import helper from "../../common/help.js"
	export default {
		name: "components",
		data() {
			return {
				processId: '',
				processUrls: [
					'stock?processId=',
					'workReport?processId=',
					'detector_data?processId=',
					'express_data?processId='
				],
				processList: [{
						title: '设备申请',
						state:"未完成",
						img: 'https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg',
						url: ''
					},
					{
						title: '施工现场',
						state:'未完成',
						img: 'https://image.weilanwl.com/color2.0/plugin/wdh2236.jpg',
						url: ''
					},
					{
						title: '数据检测',
						state:'未完成',
						img: 'https://image.weilanwl.com/color2.0/plugin/qpct2148.jpg',
						url: ''
					},
					{
						title: '空气取样',
						state:'未完成',
						img: 'https://image.weilanwl.com/color2.0/plugin/qpczdh2307.jpg',
						url: ''
					}
				]
			}
		},
		onLoad(option) {
			var that = this
			that.processId = option.processId
			for(var i=0;i<that.processList.length;i++){
				that.processList[i].url = that.processUrls[i] + that.processId
			}
			// 根据 processId 获取订单状态
			uni.request({
				url: helper.url+'/api/operator/get_one_infoByProcessId',
				method: 'POST',
				header :{
					// 'Content-Type': 'application/json',
					// 'Content-Type': "multipart/form-data",
					'Content-Type': 'application/x-www-form-urlencoded',
					'Cookie':'JSESSIONID='+helper.sessionId
				},
				data: {
					'process_id': that.processId
				},
				success(res) {
					if(res.statusCode == 200){
						// process 状态：
						// 20 初始化  21 设备申请  22 现场施工  23 空气检测  24 空气取样
						var currentState = res.data.data.pro_state[1]
						console.log('statecode:', currentState)
						console.log('state:', res)
						for(var i=0;i<currentState;i++){
							that.processList[i].state = "已完成"
							that.processList[i].url = ''
						}
					}
				}
			})
		},
		methods: {
			toChild(e) {
				uni.reLaunch({
					url: e.currentTarget.dataset.url
				})
			},
		},
	}
</script>

<style>
	.page {
		height: 100vh;
	}

	.cardTitle {
		color: #fff;
		padding: 90upx 60upx;
		font-size: 40upx;
		font-weight: 300;
		transform: skew(-10deg, 0deg);
		position: relative;
		text-shadow: 0px 0px 6upx rgba(0, 0, 0, 0.3)
	}

	.cardTitle::before {
		content: "";
		position: absolute;
		width: 60upx;
		height: 6upx;
		border-radius: 20upx;
		background-color: #fff;
		display: block;
		top: 60upx;
		left: 50upx;
		transform: skew(10deg, 0deg);
	}

	.cardTitle::after {
		content: "";
		position: absolute;
		width: 140upx;
		border-radius: 6upx;
		height: 24upx;
		background-color: #fff;
		display: block;
		bottom: 76upx;
		left: 90upx;
		transform: skew(10deg, 0deg);
		opacity: 0.1;
	}
	.all_orders_6{
		white-space:normal;
		width:115upx;
		height:90upx;
		padding:0upx;
		margin-top:0upx;
		margin-left:80%;
		float:left;
		text-align:left; 
		border-radius:0upx;
		font-size:8upx; 
		line-height:111upx;}
</style>
