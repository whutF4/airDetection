<template>
	<view>
		<view class="order" v-for="(info, index) in orderLists" :key='index'>
			<view @click="detail(index)">
				<view class="headPart">
					<view>订单编号 {{info.order_id}}</view>
					<view class="orderStatus" v-if="info.order_state">完成</view>
					<view class="orderStatus" v-else>未完成</view>
				</view>
				<view class="imgComments">
					<view class="orderImg">
						<image src="../../static/zhongjian2.jpg" mode="widthFix"></image>
					</view>
					<view class="commentDetail">
						<view>{{info.order_contact}}</view>
						<view>{{info.order_address}}</view>
						<view v-if="info.order_class === '1'">家居</view>
						<view v-else-if="info.order_class === '2'">车辆</view>
						<view v-else-if="info.order_class === '3'">工装</view>
						<view v-else>其它</view>
						<view>{{info.order_time}}</view>
					</view>
					
				</view>
			</view>
			<view class="footPart">
				<button type="primary" size="mini" @click="look(index)">查看</button>
				<button type="warn" size="mini" @click="download(index)">下载</button>
			</view>
			
		</view>
		
	</view>
</template>

<script>

	import helper from "../../common/help.js"
	export default {
		data() {
			return {
				processId: '',
				orderId: '',
				orderLists: [
					{
						order_id:"123456",
						order_state:"完成",
						order_address:"北京市东城区",
						order_class:"2",
						order_contact:"小明",
						order_time:"2020-05-14",
						order_descripe:"三室两厅",
						order_file:""
						
					}	
				]
			}
		},
		onLoad(option){
			console.log('allOrderSessionId:'+helper.sessionId)
			console.log('列表加载？')
			var that = this
			uni.request({
				// url: helper.url+'/api/operator/wx_show_orders',
				url: '',
				method: 'GET',
				header :{
					'Content-Type': 'application/json',
					// 'Content-Type': "multipart/form-data",
					// 'Content-Type': 'application/x-www-form-urlencoded',
					'Cookie':'JSESSIONID='+helper.sessionId
				},
				success(res) {
					console.log(res.data)
					// that.orderLists = res.data
					

				}
			})
			
		},
		methods: {
			detail(index){
				var that = this
				var info = JSON.stringify(that.orderLists[index])
				uni.navigateTo({
					url:'detailOrder?info=' + info, 
				})
			},
			look(index){
				var that = this
				console.log('orderId:', that.orderLists[index].order_id)
				that.orderfile = that.orderLists[index].orderfile
				uni.openDocument({
					filePath:that.orderfile,
					success: function(res) {
						console.log('打开文档成功')
					},
					fail: function(res) {
						console.log(res);
					},
				})							
			},
			download(index){
				var that = this
				console.log('orderId:', that.orderLists[index].order_id)
				that.orderfile = that.orderLists[index].orderfile
				uni.downloadFile({
					url: url,
					header: {
						
					},
					success: function(res) {
						var filePath = res.tempFilePath;
						console.log(filePath);
					},
					fail: function(res) {
						console.log('文件下载失败');
					},
				})
				
			}
		}
	}
</script>

<style>
	.box{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	.order{
		margin-top: 20rpx;
		padding: 0 20rpx;
		background-color: #ffffff;
		
	}
	.headPart{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 20rpx 0;
		border-bottom: 2rpx solid #d1d8e6;
	}
	.headPart .orderStatus{
		color: #fea900;
	}
	.imgComments{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		padding: 20rpx 0;
		border-bottom: 2rpx solid #d1d8e6;
	}
	.imgComments .orderImg{
		width: 30%;		
		margin-right: 20rpx;
	}
	.imgComments .commentDetail{
		border-bottom: 2rpx solid #d1d8e6;
	}
	.footPart{
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		padding: 20rpx 0;
		margin-left: 50%;
	}

</style>
