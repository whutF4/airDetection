<template>
	<uni-list>
		<view class="cu-form-group margin-top">
			<view class="title">客户姓名</view>
			<input v-model="orderContact" disabled="true"></input>
		</view>
		
		<view class="cu-form-group">
			<view class="title">联系电话</view>
			<input v-model="orderPhone" disabled="true" ></input>
		</view>
		
		<view class="cu-form-group">
			<view class="title">联系地址</view>
			<input v-model="orderAddress" disabled="true" ></input>
		</view>
		
		<view class="cu-form-group">
			<view class="title">检测类型</view>
			<input v-model="orderClass" disabled="true" ></input>
		</view>
		
		<view class="cu-form-group">
			<view class="title">户型面积</view>
			<input v-model="orderScope" disabled="true" ></input>
		</view>
		
		<view class="cu-form-group">
			<view class="title">户型描述</view>
			<input v-model="orderDescripe" disabled="true" ></input>
		</view>
		
		<view class="cu-form-group">
			<view class="title">户型图</view>
		</view>
			
		<view class="cu-form-group" v-for="i in imgPath.length" :key='i'>
			<image :src="imgPath[i]"></image>
		</view>
		
		<view class="cu-form-group">
			<view class="title">特殊污染材料</view>
			<input v-model="specialPollution" disabled="true" ></input>
		</view>
		
		<view class="cu-form-group">
			<view class="title">约定日期</view>
			<input v-model="date" disabled="true" ></input>
		</view>
		
		<view class="cu-form-group">
			<view class="title">约定时间</view>
			<input v-model="time" disabled="true" ></input>
		</view>
		
		<view class="cu-form-group">
			<view class="title">是否需要检测报告</view>
			<input v-model="moreMoney" disabled="true" ></input>
		</view>
		
		<view class="cu-form-group">
			<view class="title">其它说明</view>
			<!-- <textarea v-model="orderOther" disabled="true" ></textarea> -->
			<textarea v-model="orderOther" ></textarea>
		</view>
	</uni-list>
</template>

<script>
	import helper from "../../common/help.js"
	export default {
		data() {
			return {
				orderContact: '',
				orderPhone: '',
				orderAddress: '',
				orderClass: '',
				orderScope: '',
				orderDescripe: '',
				imgPath: [],
				specialPollution: '',
				date: '',
				time: '',
				moreMoney: '是',
				orderOther: '。。。'
			}
		},
		onLoad(option){
			var that = this
			var info = JSON.parse(option.info)
			console.log(info)
			that.orderContact = info.order_contact
			that.orderPhone = info.order_phone
			that.orderAddress = info.order_address
			that.orderClass = info.order_class
			that.orderScope = info.order_scope
			that.orderDescripe = info.order_descripe
			// that.imgPath = helper.url + '/' + info.orderModelf
			that.specialPollution = info.order_pollution
			that.date = info.order_createtime.split(' ')[0]
			that.time = info.order_createtime.split(' ')[1]
			// that.moreMoney = info.orderReport 后台未获取
			that.moreMoney = info.order_report
			that.orderOther = info.order_others
			console.log('imgpath', info.order_modelf)
			var imgUrls = info.order_modelf.split('@')
			for(var i=0;i<imgUrls.length-1;i++){
				
				that.imgPath.push(helper.url + '/' + imgUrls[i])
			}
			
			
			
		},
		methods: {
			
		}
	}
</script>

<style>
</style>
