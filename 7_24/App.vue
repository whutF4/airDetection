<script>
	import helper from 'common/help.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			
		},
		onShow: function() {
			console.log('App Show')
			uni.login({
				provider: 'weixin',
				success: function (loginRes) {
					console.log(loginRes);
					// 获取用户信息
					helper.code=loginRes.code,
					// wx.getUserInfo({
					// 	success: function (userInfo) {
					// 		console.log(userInfo.userInfo)
					// 		const imageurl=userInfo.userInfo.avatarUrl							
					// 		helper.userImageurl=imageurl
					// 		console.log(helper.userImageurl)
							wx.request({
								// url: helper.url+"/api/user/login_by_code",
								url: '',
								method: 'POST',
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								data: {
									'code':loginRes.code,
								},
								success:function(res) {
									console.log(res)
									const status = res.data.status
									if(status==200){
										console.log("已登录")
										const sessionid = res.data.msg
										helper.sessionId = sessionid
										uni.reLaunch({
											url:'pages/templates/orderSubmit'
										})
									}else{
										console.log("尚未登录")
										uni.reLaunch({
											url:'pages/login/login'
										})
									}									
								}
							})
						// },
					// 	fail() {
					// 		console.log("授权失败")
					// 	}
					// })
				}
			});			
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	/*每个页面公共css */
</style>
