<template>
	<view>
		<view class="margin-top">
			<uni-steps :options="[{title: '设备选择'}, {title: '检测结果'}, {title: '快递信息'}]" :active="0"></uni-steps>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">设备名称</view>
			<text class=''>数量选择</text>
		</view>
		<view v-for="(info, index) in equipment" :key='index'>
			<view class="cu-form-group">
				<view class=' text-brown'>{{info.name}}</view>
				<view class="cu-form-group ">
					<view class="numberControl" >
						<view class="reduce" @click="reduce(index, 'eq')">-</view>
						<view class="num">{{info.num}}/{{info.stock}}</view>
						<view class="add" @click="add(index, 'eq')">+</view>
					</view>
				</view>
			</view>
			
		</view>
		
		<!-- <view v-for="(info, index) in equipment" :key='index'>
			<view class="cu-form-group margin-top">
				<view class="title">设备名称</view>
				<text class=' text-brown'>{{info.name}}</text>
			</view>
			<view class="cu-form-group ">
				<view class="title">数量选择</view>
				<view class="numberControl" >
					<view class="reduce" @click="reduce(index)">-</view>
					<view class="num">{{info.num}}/{{info.stock}}</view>
					<view class="add" @click="add(index)">+</view>
				</view>
			</view>
		</view> -->
		
		<view class="cu-form-group margin-top">
			<view class="title">物料名称</view>
			<text class=''>数量选择</text>
		</view>
		
		<view v-for="(info, index) in material" :key='index'>
			
			<view class="cu-form-group">
				<view class=' text-brown'>{{info.name}}</view>
				<view class="cu-form-group ">
					<view class="numberControl" >
						<view class="reduce" @click="reduce(index, 'ma')">-</view>
						<view class="num">{{info.num}}/{{info.stock}}</view>
						<view class="add" @click="add(index, 'ma')">+</view>
					</view>
				</view>
			</view>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn round line-cyan lg" @click="confirm">点击确认</button>
		</view>
		
		<!-- <view class="cu-bar tabbar bg-white shadow foot">
			<uni-countdown color="#FFFFFF" background-color="#00B26A" border-color="#00B26A" :show-day="false" :hour="hour" :minute="minute" :second="second"></uni-countdown>
		</view> -->
	</view>
</template>

<script>
	import helper from "../../common/help.js"
	export default {
		data() {
			return {
				equipment:[
					// {name:"反应器",num:1,stock:14},
					// {name:"充电宝",num:2,stock:17},
					// {name:"热水壶",num:2,stock:40},
				],
				material:[
					// {name:"反应器",num:1,stock:14},
					// {name:"充电宝",num:2,stock:17},
					// {name:"热水壶",num:2,stock:40},
				],
				processId: '',
				hour: '',
				minute: '',
				second: '',
				time: ''
				
			}
		},
		methods: {
			reduce(index, cls){
				if(cls=='eq'){
					if(this.equipment[index].num-1<0)
						this.equipment[index].num = 0
					else
						this.equipment[index].num -= 1
				}else{
					if(this.material[index].num-1<0)
						this.material[index].num = 0
					else
						this.material[index].num -= 1
				}
				
			},
			add(index, cls){
				if(cls=='eq'){
					if(this.equipment[index].num+1>this.equipment[index].stock)
						this.equipment[index].num = this.equipment[index].stock
					else
						this.equipment[index].num += 1
				}else{
					if(this.material[index].num+1>this.material[index].stock)
						this.material[index].num = this.material[index].stock
					else
						this.material[index].num += 1
				}
				
			},
			confirm(){
				var that = this
				console.log('eq:', typeof(that.equipment), that.equipment)
				uni.request({
					method: 'POST',
					url: helper.url+'/api/operator/check_equipment',
					header :{
						'Content-Type': 'application/json',
						// 'Content-Type': "multipart/form-data",
						// 'Content-Type': 'application/x-www-form-urlencoded',
						'Cookie':'JSESSIONID='+helper.sessionId
					},
					data: {
						// 'applyList': JSON.stringify(that.equipment)
						'process_id': that.processId,
						'applyList': that.equipment
					},
					success(res) {
						console.log(res)
					}
				})
				uni.request({
					method: 'POST',
					url: helper.url+'/api/operator/check_material',
					header :{
						'Content-Type': 'application/json',
						// 'Content-Type': "multipart/form-data",
						// 'Content-Type': 'application/x-www-form-urlencoded',
						'Cookie':'JSESSIONID='+helper.sessionId
					},
					data: {
						'process_id': that.processId,
						'applyList': that.material
					},
					success(res) {
						console.log(res)
						uni.navigateTo({
							url:'module?processId=' + that.processId
						})
					}
				})
				
			}
		},
		onLoad(option) {
			var that = this
			console.log('processId: ', option.processId)
			that.processId = option.processId
			uni.request({
				url: helper.url+'/api/operator/wx_show_equipment',
				method: 'GET',
				header :{
					'Content-Type': 'application/json',
					// 'Content-Type': "multipart/form-data",
					// 'Content-Type': 'application/x-www-form-urlencoded',
					'Cookie':'JSESSIONID='+helper.sessionId
				},
				success(res) {
					console.log(res)
					that.equipment = res.data
					for(var i=0; i<that.equipment.length; i++){
						that.equipment[i].num = parseInt(that.equipment[i].num)
						that.equipment[i].stock = parseInt(that.equipment[i].stock)
					}
					
				}
			})
			uni.request({
				url: helper.url+'/api/operator/wx_show_material',
				method: 'GET',
				header :{
					'Content-Type': 'application/json',
					// 'Content-Type': "multipart/form-data",
					// 'Content-Type': 'application/x-www-form-urlencoded',
					'Cookie':'JSESSIONID='+helper.sessionId
				},
				success(res) {
					console.log(res)
					that.material = res.data
					for(var i=0; i<that.material.length; i++){
						that.material[i].num = parseInt(that.material[i].num)
						that.material[i].stock = parseInt(that.material[i].stock)
					}
					
				}
			})
			console.log('stock')
			
			
		}
	}
</script>

<style lang="scss"  scoped>
.numberControl{
	display: flex;
	align-items: center;
	.reduce,.add{
		width: 60upx;
		height: 45upx;
		background-color: #007AFF;
		text-align: center;
		line-height: 45upx;
		font-size: 30upx;
		color: white;
		border-radius: 10upx;
	}
	.num{
		padding: 0 15upx;
	}
}
</style>
