<template>
	<view>
		<view class="cu-form-group box margin-top">
			<uni-steps :options="[{title: '设备选择'}, {title: '检测结果填写'}, {title: '快递信息'}]" :active="1"></uni-steps>
		</view>
		<view><button type="primary" @click="next">下一步</button></view>
		
		<view :class="{'timeCountdown':countdown1}">
			<view class="cu-form-group margin-top">
				<view class="title">倒计时时间</view>
				<input placeholder="小时" v-model="time"></input>
				<button type="warn" size="mini" @click="startTimeCountdown">计时开始</button>
			</view>
		</view>
		
		<view>
			<span>{{hour}}时</span><span>{{minute}}分</span><span>{{second}}秒</span>
		</view>
		
		<view :class="{'timeCountdown':countdown2}">
			<view class="cu-bar tabbar bg-white shadow foot">
				<uni-countdown color="#FFFFFF" background-color="#00B26A" border-color="#00B26A" :show-day="false" :hour="hour" :minute="minute" :second="minute"></uni-countdown>
			</view>
		</view>
		
	</view>
</template>

<script>
	import helper from "../../common/help.js"
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	import uniCountdown from '@/components/uni-countdown/uni-countdown.vue'
	export default {
		components: {
			uniSteps,
			uniCountdown
		},
		data() {
			return {
				processId: '112',
				orderInfo: [
					
				],
				time: '',
				hour: '',
				minute: '',
				second: '',
				countdown1: false, //样式隐藏
				countdown2: true //样式隐藏
				
			}
		},
		onLoad(option) {
			console.log('processId: ', option.processId)
			this.processId = option.processId
		},
		methods: {
			next(){
				var that = this
				uni.navigateTo({
					// url: 'stock?processId=' + this.processId + '&hour=' + this.hour + '&minute=' + this.minute + '&second=' + this.second
					url: 'stock?processId=' + that.processId
				})
			},
			TimeChange(e) {
				this.time = e.detail.value
			},
			startTimeCountdown(){
				var that = this
				// 接口参数		processId
				that.hour = that.time
				that.minute = '00',
				that.second = '00',
				that.countdown1 = true
				that.countdown2 = false
				console.log('输入倒计时长：', that.time)
				// 总共计时毫秒数
				var totleMilliSeconds = that.time * 60 *60 * 1000
				setInterval(function(){
					var innerTotleMilliSeconds = totleMilliSeconds
					var innerHour = parseInt(innerTotleMilliSeconds/(60*60*1000))
					innerTotleMilliSeconds %= (60*60*1000)
					var innerMinute = parseInt(innerTotleMilliSeconds/(60*1000))
					innerTotleMilliSeconds %= (60*1000)
					var innerSecond = parseInt(innerTotleMilliSeconds/1000)
					totleMilliSeconds -= 500
					that.hour = innerHour
					that.minute = innerMinute
					that.second = innerSecond
					// console.log('计时？totleMilliSeconds:', totleMilliSeconds)
					
				}, 500)
				uni.request({
					method: 'POST',
					// 倒计时开始接口
					url: helper.url+'/api/operator/start_detection',
					header :{
						'Content-Type': 'application/json',
						// 'Content-Type': "multipart/form-data",
						// 'Content-Type': 'application/x-www-form-urlencoded',
						'Cookie':'JSESSIONID='+helper.sessionId
					},
					data: {
						'process_id': that.processId,
						'pro_counttime': that.time
					},
					success(res) {
						console.log('计时开始！',res)
					}
				})
			}
			
		}
	}
</script>

<style>
	.timeCountdown{
		display: none;

	}
</style>
