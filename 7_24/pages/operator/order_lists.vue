<template>
	<view>
		<view class="order" v-for="(info, index) in orderLists" :key='index'>
			<view @click="detail(index)">
				<view class="headPart">
					<view>订单编号 {{info.order_id}}</view>
					<view class="orderStatus" v-if="info.order_state=='2'">已完成</view>
					<view class="orderStatus" v-else-if="info.order_state=='1'">处理中</view>
					<view class="orderStatus" v-else>未开始</view>
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
				<button type="primary" size="mini" @click="confirm(index)">确定</button>
				<button type="warn" size="mini" @click="temp(index)">反馈</button>
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
					
				]
				
			}
		},
		onLoad(option){
			console.log('allOrderSessionId:'+helper.sessionId)
			console.log('列表加载？')
			var that = this
			uni.request({
				url: helper.url+'/api/operator/wx_show_orders',
				method: 'GET',
				header :{
					'Content-Type': 'application/json',
					// 'Content-Type': "multipart/form-data",
					// 'Content-Type': 'application/x-www-form-urlencoded',
					'Cookie':'JSESSIONID='+helper.sessionId
				},
				success(res) {
					console.log(res.data)
					that.orderLists = res.data
					// for(var i=0; i<that.orderLists.length;i++){
					// 	// that.orderLists[i].orderTime = res.data[i].orderTime.split(' ')[0]
					// 	that.orderLists[i].order_id = res.data[i].order_id.substring(16, 32)
						
						
					// }
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
			confirm(index){
				var that = this
				console.log('orderId:', that.orderLists[index].order_id)
				that.orderId = that.orderLists[index].order_id
				uni.request({
					url: helper.url+'/api/operator/get_one_infoByOrderId',
					method: 'POST',
					header :{
						'Content-Type': 'application/json',
						// 'Content-Type': "multipart/form-data",
						// 'Content-Type': 'application/x-www-form-urlencoded',
						'Cookie':'JSESSIONID='+helper.sessionId
					},
					data: {
						'order_id': that.orderId
					},
					success(res) {
						console.log('processId:', res.data.data.process_id)
						// that.processId = res.data.data.process_id
						uni.navigateTo({
							url: 'stock?processId=' + res.data.data.process_id
						})
					}
				})
				
			},
			temp(index){
				var that = this
				console.log('orderId:', that.orderLists[index].order_id)
				that.orderId = that.orderLists[index].order_id
				uni.navigateTo({
					url: 'traceBlock?orderId=' + that.orderId
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
