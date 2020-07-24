<template>
	<view>
		<swiper class="screen-swiper round-dot" autoplay=1 duration="500" interval="2000" current="0">
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
			<image mode="aspectFill" src="http://www.ccic.com/ccic/resource/cms/2018/05/img_pc_site/2018052723340798399.png" role="img"></image>
			</swiper-item>
			<swiper-item style="position: absolute; width: 100%; height: 100%; transform: translate(500%, 0px) translateZ(0px);">
			<image mode="aspectFill"src="http://www.ccic.com/ccic/resource/cms/2019/06/img_pc_site/2019061310592888128.png"role="img"></image>
			</swiper-item>
		</swiper>
		<view class="page_login">
			<!-- 头部logo -->
			<!-- <view class="head">
				<view class="head_bg">
					<view class="head_inner_bg">
						<image style="width: 100px;height: 100px;" :mode="scaleToFill" :src="userImageurl"  />
					</view>
				</view>
			</view> -->
			<!-- form -->
			<view class="form">
				<view class="input">
					<input type="text" v-model="phoneNo" placeholder="请输入手机号" />
					<view class="img">
						<image @tap="delUser" class="img_del" :src="imgInfo.icon_del" />
					</view>
				</view>
				<view class="code">
					<input type="text" :value="code" placeholder="请输入验证码" />
					<button style="height:52px;" class="get11">获取验证码</button>
				</view>
				<view class="input">
					<input :type="pwdType" :value="userpwd" @input="inputPwd" placeholder="请输入密码">
					<view class="img" @tap="switchPwd">
						<image class="img_pwd_switch" :src="imgInfo.icon_pwd_switch" />
					</view>
				</view>
			</view>
			<!-- 登录提交 -->
			<button class="submit"  @tap="modifyPwd">修改密码</button>
			<van-dialog id="van-dialog" />
		</view>
	</view>
</template>

<script>
	import helper from '../../common/help.js'
	import Dialog from '../../wxcomponents/vant-weapp/dialog/dialog'
	export default {
		data() {
			const isUni = typeof(uni) !== 'undefined'
			return {
				phoneNo: '',
				userpwd: '',
				code: '',
				pwdType: 'password',
				userImageurl:helper.userImageurl,
				imgInfo: {
					head: '/static/head.png',
					icon_del: '/static/delete.png',
					icon_pwd_switch: '/static/icon_pwd_switch.png'
				}
			};
		},
		methods: {
			delUser() {
				this.phoneNo = ''
			},
			switchPwd() {
				this.pwdType = this.pwdType === 'text' ? 'password' : 'text'
			},
			inputPwd(e) {
				this.userpwd = e.target.value
			},
			modifyPwd() {
				var phone=this.phoneNo;	
				//保存的密码	
				var pass=this.userpwd;	
				if(!(/^1[3456789]\d{9}$/.test(phone))){
					
					Dialog.alert({
					  title: '提示',
					  message: '用户手机号输入格式错误'
					}).then(() => {
					  // on close
					});
					console.log("号码有误！")
				}else{
					var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,12}$/; //密码必须包含大小写字母及数字,且为六到十二位
					if(!(reg.test(pass))){
						Dialog.alert({
						title: '提示',
						message: '用户密码输入格式错误(密码必须为六到十二位，且包含大小写字母及数字)'
						}).then(() => {
					  // on close
						});
						console.log("密码有误！")
					}
					else{
						console.log('user_phone:' + this.phone + ',pwd:' + this.pwd)
						uni.request({
							url:'',
							headers	:{
								'Content-Type': 'application/json',
								// 'Content-Type': "multipart/form-data",
							},
							data:JSON.stringify({'user_phone':phone, 'user_pwd': pass}),
							method:'POST',
							success() {
								console.log('传参成功！')
								uni.reLaunch({
									url:'../login/login'
								})
							}
						})
						
					}
				}
			}
		},
	}
</script>

/* <!-- <style>
	page {
		height: auto;
		min-height: 100%;
		background-color: #f5f6f8;
	}
</style> --> */

<style lang="scss" scoped>
	$logo-padding: 60px;
	$form-border-color: rgba(214, 214, 214, 1);
	page {
		height: auto;
		min-height: 100%;
		background-color: #f5f6f8;
	}
	.page_login {
		padding: 10px;
	}

	.head {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: $logo-padding;
		padding-bottom: $logo-padding;

		.head_bg {
			border: 1px solid #fbecf1;
			border-radius: 60px;
			width: 120px;
			height: 120px;
			display: flex;
			align-items: center;
			justify-content: center;

			.head_inner_bg {
				border-radius: 50px;
				width: 100px;
				height: 100px;
				display: flex;
				background-color: #ffffff;
				align-items: flex-end;
				justify-content: center;
				overflow: hidden;
			}
		}
	}

	.form {
		display: flex;
		margin: 20px;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.code {
			width: 102%;
			min-height: 50px;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			input {
				outline: none;
				height: 50px;
				border: 1px solid $form-border-color;
				border-radius: 5px;
				padding-left: 10px;
				margin-right: 20px;

				&:focus {
					outline: none;
				}
			}
		}

		.input {
			width: 100%;
			min-height: 50px;
			margin: 10px;
			display: flex;
			padding: 3px;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			border: 1px solid $form-border-color;
			border-radius: 5px;

			input {
				outline: none;
				margin-left: 10px;
				height: 40px;
				width: 100%;

				&:focus {
					outline: none;
				}
			}

			.img {
				min-width: 40px;
				min-height: 40px;
				margin: 5px;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.img_del {
				width: 21px;
				height: 21px;
			}

			.img_pwd_switch {
				width: 28px;
				height: 12px;
			}

		}
	}
	.get11{
		color: #2986de;
		border: 1px solid #2986de;
		&:active{
		    background: fade(#2986de,8%);
		}
	}
	.submit {
		margin-top: 30px;
		margin-left: 20px;
		margin-right: 20px;
		color: #2986de;
		border: 1px solid #2986de;
		&:active{
		    background: fade(#2986de,8%);
		}
	}
</style>
