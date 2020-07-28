<template>
	<view class="page_login">
		<uni-swiper-dot :info="info" :current="current" field="content" mode="nav" >
			<swiper class="swiper-box" autoplay=1 duration="500" interval="2000" @change="change">
				<swiper-item v-for="(item ,index) in info" :key="index">
						<image mode="aspectFill" :src="item.images" class="swiper-item"></image>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<!-- <swiper class="screen-swiper round-dot" autoplay=1 duration="500" interval="2000" current="0">
					<swiper-item style="position: absolute; width: 100%; height: 100%; transform: translate(700%, 0px) translateZ(0px);">
					<image mode="aspectFill" src="http://www.ccic.com/ccic/resource/cms/2018/05/img_pc_site/2018053114114060944.jpg" role="img"></image>
					</swiper-item>
					<swiper-item style="position: absolute; width: 100%; height: 100%; transform: translate(100%, 0px) translateZ(0px);">
					<image mode="aspectFill" src="http://www.ccic.com/ccic/resource/cms/2018/05/img_pc_site/2018053114114468313.jpg" role="img"></image>
					</swiper-item>
					<swiper-item style="position: absolute; width: 100%; height: 100%; transform: translate(200%, 0px) translateZ(0px);">
					<image mode="aspectFill" src="http://www.ccic.com/ccic/resource/cms/2018/05/img_pc_site/2018053114190979161.jpg" role="img"></image>
					</swiper-item>
					<swiper-item style="position: absolute; width: 100%; height: 100%; transform: translate(300%, 0px) translateZ(0px);">
					<image mode="aspectFill" src="http://www.ccic.com/ccic/resource/cms/2019/08/img_pc_site/2019080116102029148.jpg" role="img"></image>
					</swiper-item>
					<swiper-item style="position: absolute; width: 100%; height: 100%; transform: translate(400%, 0px) translateZ(0px);">
					<image  src="http://www.ccic.com/ccic/resource/cms/2018/05/img_pc_site/2018052723340798399.png" role="img"></image>
					</swiper-item>
					<swiper-item style="position: absolute; width: 100%; height: 100%; transform: translate(500%, 0px) translateZ(0px);">
					<image src="http://www.ccic.com/ccic/resource/cms/2019/06/img_pc_site/2019061310592888128.png"role="img"></image>
					</swiper-item>
				</swiper> -->
		<view class="login_form">
			<view class="input11">
					<image style="width:27px;height: 27px;"  :src="imgInfo.icon_user" />
					<!-- <input type="text" v-model="username" placeholder="请输入用户手机号"> -->
					<view class="input11_1">请选择登录身份</view>
					<view class="input11_2">
						<picker @change="PickerChange" :value="model" :range="picker">
							<view class="picker">
								{{model>-1?picker[model]:'未选择'}}
							</view>
						</picker>
					</view>
					<image style="width:20px;height: 20px;"  :src="imgInfo.to" />
			</view>
			<view class="line" />
			<view class="input">
				<view class="img">
					<image style="width:27px;height: 27px;"  :src="imgInfo.icon_user" />
				</view>
				<!-- <input type="text" v-model="username" placeholder="请输入用户手机号"> -->
				<input  placeholder="请输入用户手机号" color="" maxlength="11" v-model="username" type="number" @blur="checkTel()"></input>
				<view class="img">
					<image @tap="delUser" class="img_del" :src="imgInfo.icon_del" />
				</view>
			</view>
			<view class="line" />
			<view class="input">
				<view class="img">
					<image style="width:20px;height: 25px;" :src="imgInfo.icon_pwd" />
				</view>
				<input :type="pwdType" :value="userpwd" @blur="inputPwd" placeholder="请输入密码">			
				<view class="img" @tap="switchPwd">
					<image class="img_pwd_switch" :src="imgInfo.icon_pwd_switch" />
				</view>
			</view>
		</view>
		<!-- 登录提交 -->
		<button class="submit" plain="true" @tap="login">登     录</button>
		<view >
			<view class="quick_login_line">
				<view class="line" />
				<text class="text">快速登录</text>
				<view class="line" />
			</view>
			<view class="opts">
				<text @tap="goReg" class="text">立即注册</text>
				<text @tap="findPwd" class="text">忘记密码？</text>
			</view>
		</view>
		<!-- <view class="quick_login_list">
			<image @tap="thirdLogin('qq')" class="item" :src="imgInfo.qq" />
			<image @tap="thirdLogin('wechat')" class="item" :src="imgInfo.wechat" />
			<van-button icon="https://img.yzcdn.cn/vant/logo.png" type="info">11</van-button>
			<image @tap="thirdLogin('weibo')" class="item" :src="imgInfo.weibo" />
		</view> -->
		<!-- <button type="primary" @click="wxsq">微信授权</button> -->
		<van-dialog id="van-dialog" />
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
			const isUni = typeof(uni) !== 'undefined'
			return {
				phoneNum:"",
				username: '',
				userpwd: '',
				pwdType: 'password',
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
				picker: ['用户', '操作员'],
				model:-1,
				current: 0,
				imgInfo: {
					head: isUni ? '/static/head.png' : require('./images/head.png'),
					icon_user: isUni ? '/static/icon_user.png' : require('./images/icon_user.png'),
					icon_del: '/static/icon_del.png',
					to:'/static/user/to.png',
					icon_pwd: isUni ? '/static/icon_pwd.png' : require('./images/icon_pwd.png'),
					icon_pwd_switch: isUni ? '/static/icon_pwd_switch.png' : require('./images/icon_pwd_switch.png'),
					qq: isUni ? '/static/qq.png' : require('./images/qq.png'),
					wechat: isUni ? '/static/wechat.png' : require('./images/wechat.png'),
					weibo: isUni ? '/static/weibo.png' : require('./images/weibo.png')
				}
			}
		},
		
		onReady() {
			
		},
		methods: {
			inputUsername(e) {
				this.username = e.target.value
			},
			inputPwd(e) {
				this.userpwd = e.target.value
				
			},
			delUser() {
				
				this.username = ''
				
			},
			switchPwd() {
				this.pwdType = this.pwdType === 'text' ? 'password' : 'text'
			},
			PickerChange(e) {
				this.model = e.detail.value
				if(this.model==0){
					this.textarea="用户"
				}
				if(this.model==1){
					this.textarea="操作员"
				}
			},
			login() {	
				// accout为页面获取的登录信息
				var that = this
				helper.phoneNum=this.username;
				var name=this.username;	
				//保存的密码	
				var pass=this.userpwd;	
				if(!(/^1[3456789]\d{9}$/.test(name))){
					
					Dialog.alert({
					  title: '提示',
					  message: '用户手机号输入格式错误'
					}).then(() => {
					  // on close
					});
					console.log("号码有误！")
				}else{
					var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,12}$/; //密码必须包含大小写字母及数字,且为六到十二位
					// if(!(reg.test(pass))){
					// 	Dialog.alert({
					// 	title: '提示',
					// 	message: '用户密码输入格式错误(密码必须为六到十二位，且包含大小写字母及数字)'
					// 	}).then(() => {
					//   // on close
					// 	});
					// 	console.log("密码有误！")
					// }
					// else{
						if(this.model==1){
							wx.request({
								// url:helper.url+'/api/user/wx_login_user',
								url:helper.url+'/api/operator/wx_login_operator',
								method:'POST',
								headers	:{
									// 'Content-Type': 'application/json',
									// 'Content-Type': "multipart/form-data",
									'content-type': 'application/x-www-form-urlencoded'
								},
								data:{
									'op_phone':that.username,
									'op_pwd': that.userpwd,
									// "user_id":helper.code,
									"op_id":helper.code,
								},
								
								success(res) {
									console.log('参数传递后...')
									console.log(res)
									const status = res.data.status
									// 用户
									// const sessionid = res.data.msg
									// 操作员
									const sessionid = res.data.data
									helper.sessionId = sessionid
									console.log(sessionid)
									if(status==200){
										uni.reLaunch({
											// url:'/pages/templates/orderSubmit',
											url:'/pages/operator/order_lists'
										})
									}else{
										Dialog.alert({
										   title: '提示',
										   message: '密码错误'
										}).then(() => {
										  // on close
										});
									}						
								},
								fail(){
									console.log("传参失败")
								}
							})							
						}else{
							wx.request({
								url:helper.url+'/api/user/wx_login_user',
								// url:helper.url+'/api/operator/wx_login_operator',
								method:'POST',
								headers	:{
									// 'Content-Type': 'application/json',
									// 'Content-Type': "multipart/form-data",
									'content-type': 'application/x-www-form-urlencoded'
								},
								data:{
									'user_phone':that.username,
									'user_pwd': that.userpwd,
									"user_id":helper.code,
								},
								
								success(res) {
									console.log('传参成功！')
									console.log(res)
									const status = res.data.status
									// 用户
									const sessionid = res.data.msg
									// 操作员
									// const sessionid = res.data.data
									helper.sessionId = sessionid
									console.log(sessionid)
									if(status==200){
										uni.reLaunch({
											url:'/pages/templates/orderSubmit',
											// url:'/pages/operator/order_lists'
										})
									}else{
										Dialog.alert({
										   title: '提示',
										   message: '密码错误'
										}).then(() => {
										  // on close
										});
									}						
								},
								fail(){
									console.log("传参失败")
								}
							})	
						}
						
					// }
						// uni.reLaunch({
						// 	url:'/pages/templates/orderSubmit',
						// })
					// }
				}
			},
			findPwd() {
				// uni.navigateTo({
				// 	url:'/pages/find-pwd/find-pwd'
				// })
				Dialog.alert({
				   title: '提示',
				   message: '请联系客服找回密码'
				}).then(() => {
				  // on close
				});
			},
			goReg() {
				uni.navigateTo({
					url:'../reg-pwd/reg-pwd'
				})
			},
			// thirdLogin(type) {
			// 	console.log(type)
			// },
			checkTel(){
				var that = this
			},
			change(e) {
			    this.current = e.detail.current;
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	$logo-padding: 60px;
	$form-border-color: rgba(214, 214, 214, 1);
	$text-color: #B6B6B6;
	page {
		height: auto;
		min-height: 100%;
		background-color: #f5f6f8;
	}
	.page_login {
		// padding: 10px;
	}


	.login_form {
		display: flex;
		// margin: 40px;
		margin-top: 60px;
		margin-left: 20px;
		margin-right: 20px;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: 1px solid $form-border-color;
		border-radius: 10px;

		.line {
			width: 100%;
			height: 1px;
			background-color: $form-border-color;
		}

		.input {
			font-size: 30rpx;
			width: 100%;
			max-height: 60px;
			display: flex;
			padding: 3px;
			flex-direction: row;
			align-items: center;
			justify-content: center;

			.img {
				min-width: 40px;
				min-height: 40px;
				margin: 5px;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.img_del {
				width: 25px;
				height: 25px;
			}

			.img_pwd_switch {
				width: 28px;
				height: 12px;
			}

			input {
				outline: none;
				height: 30px;
				width: 100%;

				&:focus {
					outline: none;
				}
			}
		}
	}

	.submit {
		margin-top: 70px;
		margin-left: 40px;
		margin-right: 40px;
		// color: #2986de;
		// background-color: rgba(252, 44, 93, 1.0);
		// -webkit-tap-highlight-color: rgba(252, 44, 93, 1.0);

		// &:active {
		// 	color: #B6B6B6;
		// 	background-color: rgba(252, 44, 93, 0.8);
		// }
		// background: #f2f2f3;
		color: #468dd3;
		border: 1px solid #468dd3;
		&:active{
		    background: fade(#3772bf,8%);
		}
	}
	.input11{
		// height: 300px;
		color: #838383;
		margin-left: 25px;
		font-size: 30rpx;
		width: 100%;
		height: 60px;
		display: flex;
		padding: 3px;
		flex-direction: row;
		align-items: center;
		// justify-content: center;
		.input11_1{
			margin-left: 10px;
		}
		.input11_2{
			margin-left: 33%;
		}
	}
	.opts {
		margin-top: 5px;
		margin-left: 25px;
		margin-right: 25px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		.text {
			font-size: 28rpx;
			color: rgba(200, 200, 200, 1);
			margin-bottom: 10%;
		}
	}

	.quick_login_line {
		margin-top: 100px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		.line {
			height: 1px;
			width: 38%;
			background-color: rgba(211, 211, 213, 1);
		}

		.text {
			font-size: 28rpx;
			color: rgba(200, 200, 200, 1);
			margin: 2px;
		}
	}
	.linebotton{
		width: 100%;
		  padding: 20rpx 0;
		  // background-color: yellow;
		  position: fixed;
		  bottom: 30rpx;
		  left: 0;
		  z-index:99 ;
	}

	// .quick_login_list {
	// 	margin-top: 30px;
	// 	display: flex;
	// 	flex-direction: row;
	// 	align-items: center;
	// 	justify-content: center;

	// 	.item {
	// 		width: 50px;
	// 		height: 50px;
	// 		margin: 20px;
	// 	}
	// }
	.swiper-box{width: 750upx;height: 380upx;}
	.swiper-item{width: 750upx;height: 380upx;}
</style>
