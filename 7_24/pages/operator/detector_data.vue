<template>
	<view>
		<view class="margin-top">
			<uni-steps :options="[{title: '设备选择'}, {title: '检测结果'}, {title: '快递信息'}]" :active="1"></uni-steps>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">PM1.0数据</view>
			<input placeholder="请输入PM1.0粒子数密度" v-model="pm1" type="digit"></input>
			<text class=' text-brown'>(ug/m³)</text>
		</view>
		<view class="cu-form-group ">
			<view class="title">0.3um粒子数个数</view>
			<input  placeholder="请输入数值" v-model="pm1_03" type="digit"></input>
			<text class=' text-brown'>(个)</text> 
		</view>
		<view class="cu-form-group ">
			<view class="title">2.5um粒子数个数</view>
			<input  placeholder="请输入数值" v-model="pm1_25" type="digit"></input>
			<text class=' text-brown'>(个)</text> 
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">PM2.5数据</view>
			<input placeholder="请输入PM2.5粒子数密度" v-model="pm25" type="digit"></input>
			<text class=' text-brown'>(ug/m³)</text>
		</view>
		<view class="cu-form-group ">
			<view class="title">0.5um粒子数个数</view>
			<input  placeholder="请输入数值" v-model="pm25_05" type="digit"></input>
			<text class=' text-brown'>(个)</text> 
		</view>
		<view class="cu-form-group ">
			<view class="title">5.0um粒子数个数</view>
			<input  placeholder="请输入数值" v-model="pm25_50" type="digit"></input>
			<text class=' text-brown'>(个)</text> 
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">PM10数据</view>
			<input placeholder="请输入PM10粒子数密度" v-model="pm10" type="digit"></input>
			<text class=' text-brown'>(ug/m³)</text>
		</view>
		<view class="cu-form-group ">
			<view class="title">1.0um粒子数个数</view>
			<input  placeholder="请输入数值" v-model="pm10_1" type="digit"></input>
			<text class=' text-brown'>(个)</text> 
		</view>
		<view class="cu-form-group ">
			<view class="title">10um粒子数个数</view>
			<input  placeholder="请输入数值" v-model="pm10_10" type="digit"></input>
			<text class=' text-brown'>(个)</text> 
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">甲醛（HCHO）</view>
			<input placeholder="请输入甲醛密度" v-model="HCHO" type="digit"></input>
			<text class=' text-brown'>(mg/m³)</text>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">TVOC</view>
			<input placeholder="请输入TVOC密度" v-model="TVOC" type="digit"></input>
			<text class=' text-brown'>(mg/m³)</text>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">CO₂</view>
			<input placeholder="请输入CO₂浓度" v-model="CO2" type="digit"></input>
			<text class=' text-brown'>(ppm)</text>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">温度</view>
			<input placeholder="请输入温度" v-model="tem" type="digit"></input>
			<text class=' text-brown'>(℃)</text>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">相对湿度</view>
			<input placeholder="请输入相对湿度RH" v-model="RH" type="digit"></input>
			<text class=' text-brown'>(%)</text>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn round line-cyan lg" @click="upload">{{submitData}}</button>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/help.js'
	export default {
		data() {
			return {
				processId: '',
				submitData: '提交',
				moreMoney: '',
				endUrl: 'module?processId=',
				pm1:"",
				pm1_03:"",
				pm1_25:"",
				pm25:"",
				pm25_05:"",
				pm25_50:"",
				pm10:"",
				pm10_1:"",
				pm10_10:"",
				HCHO:"",
				TVOC:"",
				CO2:"",
				tem:"",
				RH:""
				
			}
		},
		methods: {
			upload(){
				var that = this
				wx.request({
					url:  helper.url + "/api/operator/upload_detection_data",//后端接口地址，需要改成自己的接口地址
					header:{
						'Content-Type': 'application/json',
						'Cookie':'JSESSIONID='+helper.sessionId
					},
					data: {
						'process_id': that.processId,
						"pm1_0":this.pm1,
						"um0_3":this.pm1_03,
						"um2_5":this.pm1_25,
						"pm2_5":this.pm25,
						"um0_5":this.pm25_05,
						"um5_0":this.pm25_50,
						"pm10":this.pm10,
						"um1_0":this.pm10_1,
						"um10":this.pm10_10,
						"hcho":this.HCHO,
						"tvoc":this.TVOC,
						"co2":this.CO2,
						"temp":this.tem,
						"rh":this.RH,
					},
					method: 'POST',
					success: function (res) {//后端返回数据
						console.log(res)
						uni.navigateTo({
							url: that.endUrl + that.processId
						})
					},
				})
			}
		},
	
		onLoad(option) {
			console.log('processId: ', option.processId)
			var that = this
			that.processId = option.processId
			that.moreMoney = option.moreMoney
			console.log('detector data onload: ', that.moreMoney)
			if(that.moreMoney==0){
				that.endUrl = 'order_lists?that.processId='
			}
			
		}
	}
</script>

<style>
	.button1{
		margin-top: 40rpx;
		display: flex;
		/* flex-direction: row; */
		/* align-items: center; */
	}
	.padding{
		margin-bottom: 20rpx;
	}
</style>
