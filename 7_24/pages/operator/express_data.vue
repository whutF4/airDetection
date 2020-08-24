<template>
	<view>
		
		<!-- <view class="margin-top">
			<uni-steps :options="[{title: '设备选择'}, {title: '检测结果'}, {title: '快递信息'}]" :active="2"></uni-steps>
		</view> -->
		<view class="margin-top timeDown">
			<uni-countdown color="#FFFFFF" background-color="#00B26A" border-color="#00B26A" :show-day="false" :hour="hour" :minute="minute" :second="second"></uni-countdown>
		</view>
		<view :class="{'timeCountdown':countdown1}">
			<view class="cu-form-group margin-top">
				<view class="title">倒计时时间</view>
				<input placeholder="小时" v-model="time"></input>
				<button type="warn" size="mini" @click="startTimeCountdown">计时开始</button>
			</view>
		</view>
		
		<view class="cu-form-group margin-top" style="margin-top:30rpx;">
			<view class="title">快递公司</view>
			<input placeholder="请输入快递公司" v-model="firm"></input>
		</view>
		
		<view class="cu-form-group margin-top" >
			<view class="title">快递单号</view>
			<input placeholder="请输入快递单号" v-model="express"></input>
			<button class="cu-btn round line-cyan lg" style="width: 300rpx;" @click="writeOff">点击生成二维码</button>
		</view>
		
		<view class="container">
			<canvas style="width: 686rpx;height: 686rpx;background:#f1f1f1;" canvas-id="qrcode"  />
		</view>
		
		<view class="container">
			<button class="cu-btn round line-cyan lg" style="width: 50%;display: flex;align-items: center;justify-content: center;" @click="confirm">点击提交</button>
		</view>
		
	</view>
</template>

<script>
	import helper from "../../common/help.js"
	const { barcode, qrcode } = require('../../utils/index.js')
	export default {
		data() {
			return {
				processId: '',
				firm:"",
				express:"",
				canvasHidden:false,
				imagePath:"",
				hour: '',
				minute: '',
				second: '',
				time: '',
				countdown1: false, //样式隐藏
				countdown2: true //样式隐藏
			}
		},
		onLoad(option) {
			var that = this
			that.processId = option.processId
			uni.request({
				method: 'POST',
				// 倒计时剩余时间接口
				url: helper.url+'/api/operator/get_count_time',
				header :{
					'Content-Type': 'application/json',
					// 'Content-Type': "multipart/form-data",
					// 'Content-Type': 'application/x-www-form-urlencoded',
					'Cookie':'JSESSIONID='+helper.sessionId
				},
				data: {
					'process_id': that.processId
				},
				success(res) {
					console.log('倒计时请求ok', res.data)
					if(res.data.status==200){
						that.countdown1 = true
						// 后台返回剩余时间
						var totleSeconds = res.data.data
						setInterval(function(){
							var innerTotleSeconds = totleSeconds
							var innerHour = parseInt(innerTotleSeconds/(60*60))
							innerTotleSeconds %= (60*60)
							var innerMinute = parseInt(innerTotleSeconds/(60))
							innerTotleSeconds %= (60)
							var innerSecond = parseInt(innerTotleSeconds)
							totleSeconds -= 1
							that.hour = innerHour
							that.minute = innerMinute
							that.second = innerSecond
						}, 1000)
					}
					
				}
			})
		},
		methods: {
			
			writeOff() {
			
			
				console.log(this.express,'快递单号');
			
				//第一个参数是html页面里面canves的id，第二个参数是要转化的那串数字，后面两个参数分别是图片的宽高
							
				qrcode('qrcode', this.express,686,686);
				/**
				* 获取临时缓存照片路径，存入data中
				*/
				var that = this;
				//把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径。
				wx.canvasToTempFilePath({
					canvasId: 'qrcode',
					success: function (res) {
					  var tempFilePath = res.tempFilePath;
					  // console.log(tempFilePath);
					  this.imagePath=tempFilePath
					  console.log(this.imagePath);
					},
					fail: function (res) {
					  console.log(res);
					}
				});
				let url = this.imagePath;
				console.log("url"+url)
				    //用户需要授权
				wx.getSetting({
				      success: (res) => {
				        if (!res.authSetting['scope.writePhotosAlbum']) {
				          wx.authorize({
				            scope: 'scope.writePhotosAlbum',
				            success:()=> {
				              // 同意授权
							  console.log("同意授权"+url)
				              this.saveImg1(url);
				            },
				            fail: (res) =>{
				              console.log(res);
				            }
				          })
				        }else{
				          // 已经授权了
						  console.log("已经授权"+this.imagePath)
				          this.saveImg1(url);
				        }
				      },
				      fail: (res) =>{
				        console.log(res);
				      }
				    })   

			},
			saveImg1(){
				console.log("将要保存："+this.imagePath)
			  wx.getImageInfo({
			    src: url,
			    success:(res)=> {
			      let path = res.path;
				  console.log(res)
			      wx.saveImageToPhotosAlbum({
			        filePath:path,
			        success:(res)=> { 
			          console.log(res);
			        },
			        fail:(res)=>{
			          console.log(res);
			        }
			      })
			    },
			    fail:(res)=> {
			      console.log(res);
			    }
			  })
			},
			confirm(){
				var that = this
				console.log(that.express, that.firm)
				uni.request({
					url: helper.url + "/api/operator/update_express",
					method: 'POST',
					header:{
						'Content-Type': 'application/json',
						'Cookie':'JSESSIONID='+helper.sessionId
					},
					data: {
						'process_id': that.processId,
						'express_id': that.express,
						'express_name': that.firm
					},
					success: function (res) {//后端返回数据
						console.log(res)
					},
				})
				uni.request({
					method: 'POST',
					url: helper.url + '/api/operator/end_order',
					header:{
						'Content-Type': 'application/x-www-form-urlencoded',
						'Cookie':'JSESSIONID='+helper.sessionId
					},
					data:{
						'process_id': that.processId
					},
					success(res) {
						uni.reLaunch({
							url:"order_lists"
						})
					}
				})
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
	.container {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  width: 100%;
	  height: 100%;
	}
	.timeCountdown{
		display: none;

	}
	.timeDown{
		margin-left: 36%;
	}
</style>
