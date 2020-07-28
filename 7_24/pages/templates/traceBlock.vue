<template>
	<view>
		<uni-collapse accordion="true">
		    <uni-collapse-item class="titleColor" title="订单信息" open="true">
		        <view>
		            <uni-list>
		            	<view class="cu-form-group margin-top">
		            		<view class="title">客户姓名</view>
		            		<input v-model="info.order_contact" disabled="true"></input>
		            	</view>
		            	
		            	<view class="cu-form-group">
		            		<view class="title">联系地址</view>
		            		<input v-model="info.order_address" disabled="true" ></input>
		            	</view>
						
						<view class="cu-form-group">
							<view class="title">户型图</view>
						</view>							
						<view class="cu-form-group" v-for="i in imgPath.length" :key='i'>
							<image :src="imgPath[i]"></image>
						</view>
						
		            </uni-list>
		        </view>
		    </uni-collapse-item>
		    <uni-collapse-item title="施工过程">
		        <view class="collapseContent" v-for="i in desc.length" :key="i">
		            <view>{{desc[i]}}</view>
					<view v-for="j in descImg[i].length" :key="j">
						<image :src="descImg[i][j]"></image>
					</view>
		        </view>
		    </uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	import helper from "../../common/help.js"
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	export default {
	    components: {uniCollapse,uniCollapseItem},
		data() {
			return {
				orderId: '',
				desc: [],
				descImg: [], // 施工报告图片地址
				info: '',
				imgPath: [] // 用户户型图地址
				
			}
		},
		onLoad(option) {
			var that = this
			that.info = JSON.parse(option.info)
			that.orderId = info.order_id
			console.log('施工报告请求...', that.orderId)
			
			var imgUrls = info.order_modelf.split('@')
			for(var i=0;i<imgUrls.length-1;i++){
				that.imgPath.push(helper.url + '/' + imgUrls[i])
			}
			
			uni.request({
				method: 'POST',
				url: helper.url + '/api/report/show_report_info',
				header:{
					'Content-Type': 'application/x-www-form-urlencoded',
					'Cookie':'JSESSIONID='+helper.sessionId
				},
				data:{
					'order_id': that.orderId
				},
				success(res) {
					console.log(res)
					if(res.statusCode == 200){
						var resData = res.data.data
						for(var i=0; i<resData.length;i++){
							var imgs = []
							that.desc.push(resData[i][0])
							for(var j=1; j<resData[i].length;j++){
								imgs.push(helper.url +'/' + resData[i][j])
							}
							that.descImg.push(imgs)
						}
					}
				}
			})
			
			console.log('完成...')
		},
		methods:{
			
		}
	}
</script>

<style>
	.titleColor{
		background-color: #007AFF;
		color: #414141;
	}
	.collapseContent{
		padding: 10rpx 30rpx;
	}
	.collapseContent image{
		margin-top: 10rpx;
	}
</style>
