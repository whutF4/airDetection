<template>
	<view>
		<view class="form1">
		<form>
			<view class="cu-form-group margin-top">
				<!-- <view class="title">客户姓名(必填)</view> -->
				<view class="title"><span class="star">*</span>客户姓名</view>
				<input placeholder="请输入姓名" v-model="orderContact"></input>
			</view>
			
			<view class="cu-form-group">
				<!-- <view class="title">联系电话(必填)</view> -->
				<view class="title"><span class="star">*</span>联系电话</view>
				<input :class="{showMsg: phoneNum}" placeholder="请输入电话" v-model="orderPhone" type="number" maxlength="11"></input>
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>+86</view>
					<view class="cu-tag line-blue">中国大陆</view>
				</view>
			</view>
			
			<view class="cu-form-group">
				<!-- <view class="title">联系地址(必填)</view> -->
				<view class="title"><span class="star">*</span>联系地址</view>
				<input placeholder="请输入地址" v-model="orderAddress"></input>
				<text class='cuIcon-locationfill text-orange'></text>
			</view>
			
			<radio-group class="cu-form-group margin-top" @change="RadioChange">
				<view class="checkBox">
					<radio class='round' :class="checkbox[0].checked?'checked':''" :checked="checkbox[0].checked?true:false" value="1"></radio>
					<view class="title">工装</view>
				</view>
				<view class="checkBox">
					<radio class='round' :class="checkbox[1].checked?'checked':''" :checked="checkbox[1].checked?true:false" value="2"></radio>
					<view class="title">家居</view>
				</view>
				<view class="checkBox">
					<radio class='round' :class="checkbox[2].checked?'checked':''" :checked="checkbox[2].checked?true:false" value="3"></radio>
					<view class="title">车辆</view>
				</view>
				
			</radio-group>
			
			<view class="cu-form-group">
				<!-- <view class="title">户型面积(必填)</view> -->
				<view class="title"><span class="star">*</span>户型面积</view>
				<input placeholder="请输入大小" v-model="orderScope" type="digit"></input>
			</view>
			
			<view class="cu-form-group">
				<view class="title">户型描述</view>
				<input placeholder="请简短描述户型" v-model="orderDescripe"></input>
			</view>
			
			<view class="cu-bar bg-white margin-top">
				<!-- <view class="action">图片上传(必填)</view> -->
				<view class="action"><span class="star">*</span>图片上传</view>
				<view class="action">{{imgList.length}}/{{imgNum}}</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					 <image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<imgNum">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			
			<view class="cu-form-group margin-top">
				<view class="title">特殊污染材料</view>
				<input placeholder="请描述" v-model="specialPollution"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">预定日期</view>
				<picker mode="date" :value="date" :start="date" end="2050-09-01" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">预定时间</view>
				<picker mode="time" :value="time" :start="time" end="17:00" @change="TimeChange">
					<view class="picker">
						{{time}}
					</view>
				</picker>
			</view>
			
			<view class="cu-form-group">
				<view class="title">是否需要检测报告</view>
				<switch @change="SwitchA" :class="moreMoney?'checked':''" :checked="moreMoney?1:0"></switch>
			</view>
			<view class="cu-form-group margin-top">
				<textarea maxlength="-1" :disabled="modalName!=null" v-model="orderOther" placeholder="请输入其它需要的说明"></textarea>
			</view>
			
			<view class="btn margin-top">
				<button type="primary" @click="submit">提交</button>
			</view>
		</form>
		</view>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view bindtap="__e" class="action" data-cur="basics" @click="toordersubmit">
				<view class="cuIcon-cu-image">
					<image src="/static/tabbar/basics_cur.png" role="img"></image>
				</view>
				<view class="text-green">订单填写</view>
			</view>
			<view bindtap="__e" class="action" data-cur="component" @click="toallorder">
				<view class="cuIcon-cu-image">
					<image src="/static/tabbar/component.png" role="img"></image>
				</view>
				<view class="text-gray">全部订单</view>
			</view>
			<view bindtap="__e" class="action" data-cur="basics" @click="tousercenter">
				<view class="cuIcon-cu-image">
					<image src="/static/tabbar/about.png" role="img"></image>
				</view>
				<view class="text-gray">个人中心</view>
			</view>
		</view>
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import helper from "../../common/help.js"
	import Dialog from '../../wxcomponents/vant-weapp/dialog/dialog'
	let toast= msg=>{
	        uni.showToast({
	            title: msg,
	            icon:'none'
	        });
	}
	export default {
		data() {
			return {
				userName: '',
				orderContact: '',
				orderPhone: '',
				phoneNum: false,
				orderAddress: '',
				
				orderScope: '',
				orderDescripe: '',
				
				checkbox: [{
					value: '1',
					checked: false
				}, {
					value: '2',
					checked: true
				}, {
					value: '3',
					checked: false
				}, {
					value: '其它',
					checked: false
				}],
				// orderClass: [],
				// 仅支持单个装修类型
				orderClass: '2',
				orderClassOther: '',
				imgList: [],
				imgPath: '',
				imgNum: 4, //支持用户上传最大图片数量
				specialPollution: '',
				moreMoney: 0,
				time: '',
				date: '',
				orderOther: '',
				modalName: null,
			}
		},
		onLoad(option) {
			this.getDate1();
			// this.userName = option.userName; # 待登录传参
			this.userName = 'test';
		},
		methods: {
			checkTel(){
				var that = this
				if(!(/^1[3456789]\d{9}$/.test(that.orderPhone))){
					console.log("号码有误！")
					that.phoneNum = true
				}else{
					that.phoneNum = false
				}
			},
			RadioChange(e){
				this.orderClass = e.target.value
				console.log('工装类型：' + this.orderClass)
			},
			CheckboxChange(e) {
				var items = this.checkbox
				values = e.detail.value
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].value == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
			},
			CheckboxChange1(e){
				var items = this.checkbox,
				values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
				}
				items[items.length - 1].checked = true;
			},
			ChooseImage() {
				var that = this
				uni.chooseImage({
					count: that.imgNum, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
							console.log('添加图片路径：',res.tempFilePaths)
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '删除',
					content: '确定要删除图片吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			textareaInput(e) {
				this.orderOther = e.detail.value
			},
			SwitchA(e) {
				console.log('moreMoney:' + e.detail.value)
				if(e.detail.value){
					this.moreMoney = 1
				}else{
					this.moreMoney = 0
				}
				
			},
			TimeChange(e) {
				this.time = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			getDate1(){
				var that = this;
				var yy = new Date().getFullYear()
				var MM = new Date().getMonth()+1
				var dd = new Date().getDate()
				var HH = new Date().getHours()
				var mm = new Date().getMinutes()<10? '0'+new Date().getMinutes():new Date().getMinutes()
				var ss = new Date().getSeconds()<10? '0'+new Date().getSeconds():new Date().getSeconds()
				that.time = HH + ':' + mm + ':' + ss
				that.date = yy + '-' + MM + '-' + dd
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
			submit(){
				// uni.navigateTo({
				// 	url:'allOrder',
				// })
				var that = this
				console.log(that.orderContact)
				console.log(that.orderPhone)
				console.log(that.orderAddress)
				// 多选择装修类型
				// var checkBox = that.checkbox
				// for(var i=0; i < checkBox.length; i++){
				// 	if(checkBox[i].checked){
				// 		that.orderClass.push(checkBox[i].value)
				// 	}
				// }
				// if(!checkBox[checkBox.length-1].checked){
				// 	that.orderClassOther = '';
				// }
				console.log('类型：' + that.orderClass)
				console.log('其它类型描述：' + that.orderClassOther)
				console.log(that.imgList)
				console.log(that.specialPollution)
				console.log(that.date)
				console.log(that.time)
				console.log('图片地址：'+that.imgList)
				console.log('检测报告：' + that.moreMoney)
				console.log('其它：' + that.orderOther)
				var imgUrl = ''
				if(that.imgList.length){
					imgUrl = that.imgList[0]
				}
				console.log('sessionId0:' + helper.sessionId)
				var tempCount = 0
				var lenImg = that.imgList.length
				
				if(that.orderContact==""||that.orderPhone==""||that.orderAddress==""||that.orderScope==""||lenImg==0){
					uni.showModal({
					    title: '温馨提示',
					    content: '您还有必填项没有填写哦',
						showCancel:false				   
					});
				}else{
				for(var i=0; i<lenImg;i++){
					toast('图片上传中...')
					var imgUrl = that.imgList[i]
					uni.uploadFile({
						url: helper.url+'/api/order/upload_pictures',
						header: {  
							'Content-Type': "multipart/form-data",
							'Cookie':'JSESSIONID='+helper.sessionId
						},  
						filePath:imgUrl,
						name:'file',
						formData:{
							// 'process_id': that.processId
						},
						success(res) {
							if(res.statusCode == 200){
								var imgPathData = JSON.parse(res.data)
								console.log('全部返回：', res)
								console.log('图片返回：', imgPathData)
								that.imgPath = that.imgPath + imgPathData.data
								console.log('图片上传成功！')
								console.log(that.imgPath)
								tempCount = tempCount + 1
								console.log(tempCount, lenImg)
								if(tempCount == lenImg){
									uni.request({
										method: 'POST',
										url: helper.url+'/api/order/add',
										header :{
											'Content-Type': 'application/json',
											// 'Content-Type': "multipart/form-data",
											// 'Content-Type': 'application/x-www-form-urlencoded',
											'Cookie':'JSESSIONID='+helper.sessionId
										},
										data: {
											'order_contact': that.orderContact,
											'order_phone': that.orderPhone,
											'order_address': that.orderAddress,
											'order_scope': that.orderScope,
											'order_descripe': that.orderDescripe,
											'order_class': that.orderClass,
											// 'orderClass': 2,
											'order_time': that.date + ' ' + that.time,
											'order_pollution': that.specialPollution,
											// 'orderPollution': 1,
											'order_moremoney': that.moreMoney,
											// 'orderReport': 1,
											'order_others': that.orderOther,
											'order_modelf': that.imgPath
										},
										success(res) {
											if(res.data.status==200){
												console.log('表单代码上传成功')
												uni.reLaunch({
													url:'allOrder',
												})
											}
										},
										fail(res) {
											console.log(res)
										}
									})
								}
							}else{
								console.log(res)
							}
								
						}
					})
				}}
				that.imgList = []
				tempCount = 0
			}
			
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	.cu-form-group .title .star, .margin-top .action .star{
		color: #ff0000;
	}
	.cu-form-group .checkBox{
		display: flex;
		flex-direction: row;
	}
	.cu-form-group .checkBox .round{
		margin-right: 5%;
	}
	.showMsg{
		border-bottom:1rpx #ED1C24 solid;
	}
	.form1{
		margin-bottom: calc(100upx + env(safe-area-inset-bottom) / 2);
	}
	.btn{
		margin-bottom: 20%;
	}
	
</style>
