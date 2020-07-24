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
			<!-- <text class="tip">点击获取短信验证码，发送至{{phone}}</text> -->
			<view class="code" >
				<input class='text1' type="text" style="font-size: 30rpx;" v-model='phone' maxlength="11" placeholder="请输入手机号" @blur='checkTel()'/>
				<!-- <button class="submit" >获取验证码</button> -->
				<img class="delphone" @click="switchphone" src="/static/del.png" >
			</view>
			<view class="code">
				<input class='text1' type="text" style="font-size: 30rpx;" value="" placeholder="请输入验证码" />
				<button class="submit" @click="yanzhengma" >{{buttonname}}</button>
			</view>
			<view class="code">
				<input class='text1' :type="pwdType" style="font-size: 30rpx;" v-model="pwd" maxlength="12" placeholder="登录密码" />
				<image  class="hidepwd" @click="switchPwd" :src="imgInfo.icon_pwd_switch" />

			</view>
			<view style="width:100%;">
				<text class="tip">密码必须为六到十二位，且包含大小写字母及数字\n</text>
			</view>
			<view class="serviceloc" style="width: 100%;">
				<label class="checkbox">
					<!-- <checkbox class="round-blue" value="" checked /> -->
					<checkbox class="round blue"value="C"role="checkbox"aria-disabled="false"aria-checked="false">
					</checkbox>
					<text class="protocol_tip">我已阅读并同意</text>
				</label>
				<text class="protocol_tip link">《注册服务协议》</text>
				<button class="back11" @click="back1" >注    册</button>
			</view>
			
			<van-dialog id="van-dialog" />
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
				pwd: '',
				pwdType: 'password',
				phoneNum:false,
				userImageurl:helper.userImageurl,
				buttonname:"获取验证码",
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
				imgInfo: {
					icon_pwd_switch: '/static/icon_pwd_switch.png' ,
					
				}
			};
		},
		onLoad(option) {
			// this.phone = option.phone
		},
		methods:{
			change(e) {
			    this.current = e.detail.current;
			},
			switchphone(){
				this.phone=""
			},
			switchPwd() {
				this.pwdType = this.pwdType === 'text' ? 'password' : 'text'
			},
			checkTel(){
				var that = this
				// 判断手机号格式
				if(!(/^1[3456789]\d{9}$/.test(this.phone))){
					Dialog.alert({
					   title: '提示',
					   message: '用户手机号格式输入错误'
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
								// uni.navigateTo({
								// 	url:'/pages/reg-pwd/reg-pwd?phone=' + that.phone
								// })
								that.phoneNum=true
							}else{
								Dialog.alert({
								   title: '提示',
								   message: '您输入的手机号已被注册过，请检查'
								}).then(() => {
								  // on close
								});
								console.log("号码已被注册")
								that.phoneNum=false
							}							
						},
						fail() {
							console.log("传参失败")
						}
					});
				}
			},
			yanzhengma(){
				
			},
			back1(){
				var pass = this.pwd
				var that = this
				var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,12}$/; //密码必须包含大小写字母及数字,且为六到十二位
				if(!(reg.test(pass))){
					Dialog.alert({
						title: '提示',
						message: '用户密码输入格式错误(密码必须为六到十二位，且包含大小写字母及数字)'
					}).then(() => {
					// on close
					});
					console.log("密码有误！")
					// console.log('user_phone:' + that.phone + ',pwd:' + this.pwd)
				}
				else{
					console.log('userphone:' + this.phone + ',pwd:' + this.pwd)
					uni.request({
						url:helper.url+'/api/user/wx_register',
						method:'POST',
						headers	:{
							'content-type': 'application/x-www-form-urlencoded'
							// 'Content-Type': "multipart/form-data",
						},
						data:{
							'user_phone':this.phone,
							'user_pwd': this.pwd,
							"user_id":helper.code,
						},
						
						success(res) {
							console.log('传参成功！')
							console.log(res)
							uni.reLaunch({
								url:'../login/login'
							})
						}
					})
				}
			}
		}
		
	}
</script>

	
<style lang="scss" scoped>
	page {
		background-color: #f5f6f8;
	}
	$logo-padding: 30px;
	$text-color: #B6B6B6;
	$form-border-color: rgba(214, 214, 214, 1);
	
	.page_reg {
		height: 100%;
		margin: 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.tip {
		// margin-top: 10px;
		font-size: 13px;
		color: $text-color;
	}
	.text1{
		margin-left: 30rpx;
	}
	.code {
		width: 100%;
		min-height: 65px;
		// margin-top: 30px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid $form-border-color;
		.submit {
			background: #f2f2f3;
			color: #3772bf;
			border: 1px solid #3772bf;
			&:active{
			    background: fade(#3772bf,8%);
			}
		}
	}
	.pwd {
		width: 100%;
		margin-top: 10px;
		min-height: 65px;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-bottom: 1px solid $form-border-color;
	}
	.img {
		min-width: 40px;
		min-height: 40px;
		margin: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: row;
	}
	

	
	.img_pwd_switch {
		width: 28px;
		height: 12px;
	}
	.serviceloc{
		margin-top: 30rpx;
	}
	.checkbox{
		margin-top: 100rpx;
	}
	.protocol_tip {
		margin-top: 30rpx;
		font-size: 16px;
		color: $text-color;
	}
	
	.link {
		color: #3a8de8;
	}
	.back11{
		margin-top: 15px;
		background: #f2f2f3;
		color: #3772bf;
		border: 1px solid #3772bf;
		&:active{
		    background: fade(#3772bf,8%);
		}
	}
	.delphone{
		margin-right: 50rpx;
		width: 50rpx;
		height: 50rpx;
	}
	.hidepwd{
		margin-right: 50rpx;
		width: 50rpx;
		height: 30rpx;
	}
	.swiper-box{width: 750upx;height: 380upx;}
	.swiper-item{width: 750upx;height: 380upx;}
</style>
