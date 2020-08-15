<template>
	<view>
		<view class="order">
			<view  class="inorder" v-for="(info, index) in orderLists" :key='index'>
				<view @click="detail(index)">
					<view class="headPart">
						<view>订单编号 {{info.order_id}}</view>
						<view class="orderStatus2" v-if="info.order_state==2">完成</view>
						<view class="orderStatus" v-else-if="info.order_state==1">处理中</view>
						<view class="orderStatus" v-else-if="info.order_state==0">未处理</view>
					</view>
					<view class="imgComments">
						<view class="orderImg">
							<!-- mode="widthFix" 加载时图片会闪动 -->
							<!-- <image :src="orderimgs[index]" mode="widthFix"></image> -->
							<image :src="orderImgs[index]"></image>
						</view>
						<view class="commentDetail">
							<view class="detailList">{{info.order_contact}}</view>
							<view class="detailList">{{info.order_address}}</view>
							<view class="detailList" v-if="info.order_class === '1'">家居</view>
							<view class="detailList" v-else-if="info.order_class === '2'">车辆</view>
							<view class="detailList" v-else-if="info.order_class === '3'">工装</view>
							<view class="detailList" v-else>其它</view>
							<view class="detailList">{{info.order_time}}</view>
						</view>
						
					</view>
				</view>		
				<view class="footPart">
					<button type="primary" size="mini" @click="downLoadFile(index)" :disabled="info.order_state==2?false:true">查看报告</button>
					<button type="warn" size="mini" @click="traceInfo(index)">溯源</button>
				</view>	
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
				orderLists: [
					
				],
				orderImgs: [], // 存储订单列表中第一张户型图地址
				filePath: '',
				downLoadFileOfTrace: false
				
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
						// that.orderLists[i].order_time = res.data[i].order_time.split(' ')[0]
						that.orderImgs.push(helper.url + '/' + that.orderLists[i].order_modelf.split('@')[0])
						console.log(that.orderImgs[i])
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
				console.log('pdf: order:', that.orderLists[index].order_id)
				uni.request({
					method: 'POST',
					url: helper.url + '/api/report/get_report',
					header:{
						'Content-Type': 'application/x-www-form-urlencoded',
						'Cookie':'JSESSIONID='+helper.sessionId
					},
					data:{
						'order_id': that.orderLists[index].order_id
					},
					success(res) {
						console.log("PDF:", res)
						var filePath = res.data.data
						
						uni.downloadFile({
						  url: helper.url + '/' + filePath,
						  success: function (res) {
						    var filePath = res.tempFilePath;
						    uni.openDocument({
						      filePath: filePath,
						      success: function (res) {
						        console.log('打开文档成功');
						      }
						    });
							// uni.saveFile({
							// 	tempFilePath: res.tempFilePath,
							// 	success(e) {
							// 		that.filePath = e.savedFilePath
							// 		toast('文件下载成功！')
							// 	}
							// })
						  }
						});
						// const downLoadTask = uni.downloadFile({
						// 	url: helper.url + '/' + filePath,
						// 	header: {
						// 		'Content-Type': "multipart/form-data",
						// 		'Cookie':'JSESSIONID='+helper.sessionId
						// 	}, 
						// 	success(res) {
						// 		console.log("内部res:",res)
						// 		// if(res.statusCode == 200){
						// 		// 	console.log("进入")
									
						// 		// 	uni.saveFile({
						// 		// 		tempFilePath: res.tempFilePath,
						// 		// 		success(e) {
						// 		// 			that.filePath = e.savedFilePath
						// 		// 			toast('文件下载成功！')
						// 		// 		}
						// 		// 	})
						// 		// }
								
						// 	}
							
						// })
					}
				})
				
			},
			traceInfo(index){
				var that = this
				var info = JSON.stringify(that.orderLists[index])
				// console.log('orderId:', that.orderLists[index].order_id)
				// that.orderId = that.orderLists[index].order_id
				uni.navigateTo({
					url: 'traceBlock?info=' + info
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
		/* margin-top: 10rpx; */
		margin-bottom: calc(100upx + env(safe-area-inset-bottom) / 2);
		/* padding: 0 20rpx;
		background-color: #ffffff; */
		
	}
	.inorder{
		margin-top: 10rpx;
		/* margin-bottom: calc(100upx + env(safe-area-inset-bottom) / 2); */
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
	.headPart .orderStatus2{
		color: #39B54A;
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
	.imgComments .orderImg image{
		width: 250rpx;
		height: 200rpx;
	}
	.imgComments .commentDetail{
		border-bottom: 2rpx solid #d1d8e6;
	}
	.imgComments .commentDetail .detailList{
		font-size: 30rpx;
		line-height: 48rpx;
	}
	.footPart{
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		padding: 20rpx 0;
		margin-left: 50%;
	}

</style>

