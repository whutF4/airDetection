<template>
	<view class="container">
		<view class="cu-form-group">
			<view class="title">操作简短描述说明</view>
		</view>
		<view class="cu-form-group">
			<textarea v-model="describe" placeholder="简短说明描述......" maxlength="-1" auto-height></textarea>
		</view>
		
		<view class="cu-bar bg-white margin-top">
			<view class="action">图片上传</view>
			<view class="action">{{imgList.length}}/{{limitNum}}</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
				 <image :src="imgList[index]" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage" v-if="imgList.length<limitNum">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
		</view>
		
		
		
		<view class="nextStep">
			<button type="primary" @click="nextStep">下一步</button>
		</view>
		<view class="end">
			<button type="warn" @click="endStep">结束</button>
		</view>
		
	</view>
</template>

<script>
	import helper from "../../common/help.js"
	import uImg from '@/components/zhtx-uploadImg/zhtx-uploadImg.vue'
	let toast= msg=>{
	    uni.showToast({
	        title: msg,
	        icon:'none'
	    });
	}
	export default{
		components:{uImg},
		data() {
			return {
				processId: '',
				describe: '',
				msg:'',
				limitNum:6, //最多上传图片数量
				uploadFileUrl: helper.url+'/api/operator/add_report_pic', //替换成你的后端接收文件地址
				name:'file', //上传的名字
				header: {// 如果需要header，请上传
					'Content-Type': "multipart/form-data",
					'Cookie':'JSESSIONID='+helper.sessionId
				},
				uImgList: [],
				imgList:[]
			}
			
		},
		onLoad(option) {
			this.processId = option.processId
		},
		methods:{
			uploadSuccess(res) {
				console.log('进入上传返回值阶段...')
			    if(res.statusCode == 200) {
			        //上传成功的回调处理
					console.log(res.data.data)
			        toast('上传成功')
			    }else{
					console.log(res)
			        toast('上传失败')
			    }
			},
			ChooseImage() {
				uni.chooseImage({
					count: this.limitNum, //默认9
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
			nextStep(){
				var that = this
				if(that.describe && that.imgList.length){
					console.log('processId:', that.processId)
					console.log('desc:', that.describe)
					uni.request({
						method: 'POST',
						url: helper.url + '/api/report/add_report_describes',
						header:{
							'Content-Type': 'application/x-www-form-urlencoded',
							'Cookie':'JSESSIONID='+helper.sessionId
						},
						data:{
							'process_id': that.processId,
							'describes': that.describe
						},
						success(res) {
							console.log(res)
							that.describe = ''
						}
					})
					var tempCount = 0
					var lenImg = that.imgList.length
					for(var i=0; i<lenImg;i++){
						toast('图片上传中...')
						var imgUrl = that.imgList[i]
						uni.uploadFile({
							url: helper.url+'/api/report/add_report_pic',
							header: {  
								'Content-Type': "multipart/form-data",
								'Cookie':'JSESSIONID='+helper.sessionId
							},  
							filePath:imgUrl,
							name:'file',
							formData:{
								'process_id': that.processId
							},
							success(res) {
								if(res.statusCode == 200){
									console.log('图片上传成功！')
									tempCount = tempCount + 1
									console.log(tempCount, lenImg)
									if(tempCount == lenImg){
										console.log('进入结束接口')
										uni.request({
											method: 'POST',
											url: helper.url + '/api/report/report_pic_upload_close',
											header:{
												'Content-Type': 'application/x-www-form-urlencoded',
												'Cookie':'JSESSIONID='+helper.sessionId
											},
											data:{
												'process_id': that.processId
											},
											success(res) {
												console.log(res)
											}
										})
									}
								}else{
									console.log(res)
								}
									
							}
						})
					}
					that.imgList = []
					tempCount = 0
				}
			},
			
			endStep(){
				var that = this
				if((that.describe == '' && that.imgList.length != 0) || (that.describe != '' && that.imgList.length == 0)){
					toast('描述和图片要一致！')
					return;
				}else if(that.describe && that.imgList.length){
					that.nextStep()
				}
				uni.navigateTo({
					url:'module?processId=' + that.processId
				})
			}
			
		}
		
	}
</script>

<style>
	.nextStep{
		width: 20%;
		margin: 5% 5% 5% 75%;
	}
</style>