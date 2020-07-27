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
				<button type="primary" size="mini" @click="downLoadFile(index)">下载报告</button>
				<button type="warn" size="mini" @click="traceInfo(index)">溯源</button>
			</view>	
		</view>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view bindtap="__e" class="action" data-cur="basics" @click="toordersubmit">
				<view class="cuIcon-cu-image">
					<image src="/static/tabbar/basics.png" role="img"></image>
				</view>
				<view class="text-gray">订单填写</view>
			</view>
			<view bindtap="__e" class="action" data-cur="component" @click="toallorder">
				<view class="cuIcon-cu-image">
					<image src="/static/tabbar/component_cur.png" role="img"></image>
				</view>
				<view class="text-green">全部订单</view>
			</view>
			<view bindtap="__e" class="action" data-cur="basics" @click="tousercenter">
				<view class="cuIcon-cu-image">
					<image src="/static/tabbar/about.png" role="img"></image>
				</view>
				<view class="text-gray">个人中心</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	let toast= msg=>{
	    uni.showToast({
	        title: msg,
	        icon:'none'
	    });
	}
	import helper from "../../common/help.js"
	export default {
		data() {
			return {
				processId: '',
				orderId: '',
				orderLists: [
					
				],
				filePath: ''
				
			}
		},
		onLoad(option){
			console.log('allOrderSessionId:'+helper.sessionId)
			var that = this
			uni.request({
				url: helper.url+'/api/order/show_my_orders',
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
					for(var i=0; i<that.orderLists.length;i++){
						that.orderLists[i].order_time = res.data[i].order_time.split(' ')[0]
					}
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
			toordersubmit(){
				uni.redirectTo({
						url: '../templates/orderSubmit'
				});
			},
			toallorder(){
				uni.redirectTo({
						url: '../templates/allOrder'
				});
			},
			tousercenter(){
				uni.redirectTo({
						url: '../user-center/user_center'
				});
			},
			downLoadFile(index){
				var that = this
				const downLoadTask = uni.downloadFile({
					url: helper.url + '/' + 'filePath',
					header: {
						'Content-Type': "multipart/form-data",
						'Cookie':'JSESSIONID='+helper.sessionId
					}, 
					success(res) {
						if(res.statusCode == 200){
							uni.saveFile({
								tempFilePath: res.tempFilePath,
								success(e) {
									that.filePath = e.savedFilePath
									toast('文件下载成功！')
								}
							})
						}
					}
				})
			},
			traceInfo(index){
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

