<template>
	<view>
		<uni-swiper-dot :info="info" :current="current" field="content" mode="nav" >
			<swiper class="swiper-box" autoplay=1 duration="500" interval="2000" @change="change">
				<swiper-item v-for="(item ,index) in info" :key="index">
						<image mode="aspectFill" :src="item.images" class="swiper-item"></image>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="page_reg">
			<input style="height: 30px;" maxlength="11" class="phone" type="text" placeholder="请输入注册手机号" v-model="phone" />
			<text class="tip">我们将向您的手机发送验证短信</text>
			<van-dialog id="van-dialog" />
		<view >
			
		</view style="width: 100%;">	
			<button class="submit"  @tap="nextPage">下一步</button>
		</view>
	</view>
</template>

<script>
	import uniSwiperDot from "../../components/uni-ui/uni-swiper-dot/uni-swiper-dot.vue";
	import helper from '../../common/help.js'
	import Dialog from '../../wxcomponents/vant-weapp/dialog/dialog'
	export default {
		components: {
			uniSwiperDot,
		},
		data() {
			return {
				phone: '',
				userImageurl:helper.userImageurl,
				info: [{
				    content: '国内第一，世界知名的检查认证机构',
					images:'/static/zhongjian2.jpg'
				}, {
				    content: '检验鉴定，创造更值得信赖的世界',
					images:'/static/zhongjian1.jpg'
				},{
					content: '测试，创造更值得信赖的世界',
					images:'/static/zhongjian4.jpg'
				},{
					content: '认证，创造更值得信赖的世界',
					images:'/static/zhongjian3.jpg'
				}],
				current: 0,
			};
		},
		methods: {
			change(e) {
			    this.current = e.detail.current;
			},
			nextPage() {				
				var that = this
				// 判断手机号格式
				if(!(/^1[3456789]\d{9}$/.test(this.phone))){
					Dialog.alert({
					   title: '提示',
					   message: '用户手机号输入格式错误'
					}).then(() => {
					  // on close
					});
					// console.log("号码有误！")
				}else{
					uni.request({
						url:helper.url+'/api/user/register/check_phone',
						headers :{
							'content-type': 'application/x-www-form-urlencoded'
						},
						data:{
							user_phone: this.phone
						},
						method:'GET',
						success(res) {
							console.log(res)
							const status = res.data.status
							if(status==200){
								uni.navigateTo({
									url:'/pages/reg-pwd/reg-pwd?phone=' + that.phone
								})
							}else{
								Dialog.alert({
								   title: '提示',
								   message: '您输入的手机号已被注册过，请检查'
								}).then(() => {
								  // on close
								});
								console.log("号码已被注册")
							}							
						},
						fail() {
							console.log("传参失败")
						}
					});
					// uni.navigateTo({
					// 	url:'/pages/reg-pwd/reg-pwd?phone=' + that.phone
					// })
				}
			}
		},
	}
</script>


<style lang="scss" scoped>
	$logo-padding: 60px;
	page {
		background-color: #f5f6f8;
	}
	$text-color: #B6B6B6;
	$form-border-color: rgba(214, 214, 214, 1);
	
	.page_reg {
		margin-left: 10px;
		margin-right: 10px;
		margin-top: 100px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	// .page_reg {
	// 	width: 90%;
	// 	height: 100%;
	// 	display: flex;
	// 	flex-direction: column;
	// 	align-items: center;
	// 	justify-content: center;
	// }
	.phone {
		height: 40px;
		width: 100%;
		border-bottom: 1px solid $form-border-color;
	}
	
	
	.submit {
		width: 100%;
		margin-top: 20px;
		background: #f2f2f3;
		color: #3772bf;
		border: 1px solid #3772bf;
		&:active{
		    background: fade(#3772bf,8%);
		}
	}
	
	.tip {
		margin-top: 10px;
		font-size: 13px;
		color: $text-color;
	}
	.swiper-box{width: 750upx;height: 380upx;}
	.swiper-item{width: 750upx;height: 380upx;}
</style>
