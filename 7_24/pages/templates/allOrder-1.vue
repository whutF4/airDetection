<template>
	<view>
		<view class="cu-form-group box margin-top" >
			<view>类型</view>
			<view>下单日期</view>
			<view>状态</view>
		</view>
		
		<view class="cu-form-group box aLink" v-for="(info, index) in orderInfos" :key='index' @click="detail(index)">
			<view>{{info.order_class}}</view>
			<view>{{info.order_time}}</view>
			<view v-if="info.order_state">已完成</view>
			<view v-else>待完成</view>
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
	import helper from "../../common/help.js"
	export default {
		data(){
			return {
				orderInfos: [
					
				]
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
					that.orderInfos = res.data
					for(var i=0; i<that.orderInfos.length;i++){
						that.orderInfos[i].order_time = res.data[i].order_time.split(' ')[0]
					}
				}
			})
			
		},
		methods:{
			detail(index){
				var that = this
				var info = JSON.stringify(that.orderInfos[index])
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
	
</style>
