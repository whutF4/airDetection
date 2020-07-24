<template>
	<view>
		<view class="header">
			<view class="bg">
				<view class="box">
					<view class="box-hd">
						<view class="avator">
							<img :src="userimage">
						</view>
						<view class="phone-number">{{phoneNum}}</view>
					</view>
					<view class="box-bd">
						<view class="item" @click="information">
							<view class="icon"><img src="../../static/user/message.png"></view>
							<view class="text">我的通知</view>
						</view>
						<view class="item" @click="toordersubmit1">
							<view class="icon"><img src="../../static/user/favorite.png"></view>
							<view class="text">新建订单</view>
						</view>
						<view class="item" @click="service">
							<view class="icon"><img src="../../static/user/service.png"></view>
							<view class="text">我的客服</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="list-content">
			<!-- <view class="list">
				<view class="li noborder" >
					<view class="icon"><image src="../../static/user/card.png"></image></view>
					<view class="text">我的名片</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
			</view> -->
			<view class="list">
				<!-- <view class="li " @click="changeSkin">
					<view class="icon"><image src="../../static/user/skin.png"></image></view>
					<view class="text">主题切换</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view> -->
				<view class="li " @click="historyorder">
					<view class="icon"><image src="../../static/user/help.png"></image></view>
					<view class="text">历史订单</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
				<view class="li " @click="report">
					<view class="icon"><image src="../../static/user/opinion.png"></image></view>
					<view class="text">检验报告</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
				<view class="li " >
					<view class="icon"><image src="../../static/user/about.png"></image></view>
					<view class="text">关于我们</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
				
			</view>
		</view>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view bindtap="__e" class="action" data-cur="basics" @click="toordersubmit">
				<view class="cuIcon-cu-image">
					<image src="/static/tabbar/basics.png" role="img"></image>
				</view>
				<view class="text-gray">订单填写</view>
			</view>
			<view bindtap="__e" class="action" data-cur="component" @click="toallorder">
				<view class="cuIcon-cu-image">
					<image src="/static/tabbar/component.png" role="img"></image>
				</view>
				<view class="text-gray">全部订单</view>
			</view>
			<view bindtap="__e" class="action" data-cur="basics" @click="tousercenter">
				<view class="cuIcon-cu-image">
					<image src="/static/tabbar/about_cur.png" role="img"></image>
				</view>
				<view class="text-green">个人中心</view>
			</view>
		</view>
		<van-dialog id="van-dialog" />
	</view>
</template>
<script>
	import helper from '../../common/help.js'
	import Dialog from '../../wxcomponents/vant-weapp/dialog/dialog'
	export default {
		data() {
			return {
				phoneNum:helper.phoneNum,
				userimage:helper.userImageurl,
			};
		},
		onLoad() {
			console.log(helper.userImageurl)
		},
		methods: {
			changeSkin(){
				uni.navigateTo({
						url: '../skin-change/skin-change'
				});
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
			toordersubmit1(){
				uni.navigateTo({
						url: '../templates/orderSubmit'
				});
			},
			service(){
				Dialog.alert({
				   title: '提示',
				   message: '如需联系客服，请拨打客服热线：\n18800001111'
				}).then(() => {
				  // on close
				});
			},
			information(){
				Dialog.alert({
					title: '温馨提示',
					message:'您有新生成的检验报告单哦\n请点击检验报告查看',
				})
			},
			historyorder(){
				uni.navigateTo({
						url: '../templates/allOrder'
				});
			},
			report(){
				uni.navigateTo({
					url:'../report/report'
				});
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color:#f1f1f1;
	font-size: 30upx;
}
.header{
	background: #fff;
	height: 390upx;
	padding-bottom: 110upx;
	.bg{
		width: 100%;
		height:200upx;
		padding-top:100upx;
		background-color:#8c82ff;
	}
}
.box{
	width: 650upx;
	height: 280upx;
	border-radius: 20upx;
	margin: 0 auto;
	background: #fff;
	box-shadow: 0 5upx 20upx 0upx rgba(0, 0, 150, .2); 
	.box-hd{
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		.avator{
			width: 160upx;
			height: 160upx;
			background: #fff;
			border: 5upx solid #fff;
			border-radius: 50%;
			margin-top: -80upx;
			overflow: hidden;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.phone-number{
			width: 100%;
			text-align: center;
		}
	}
	.box-bd{
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: center;
		.item{
			flex: 1 1 auto;
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: center;
			border-right: 1px solid #f1f1f1;
			margin: 15upx 0;
			&:last-child{
				border: none;
			}
			.icon{
				width: 60upx;
				height: 60upx;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.text{
				width: 100%;
				text-align: center;
				margin-top: 10upx;
			}
		}
	}
}
.list-content{
	background: #fff;
}
.list{
	width:100%;
	border-bottom:15upx solid  #f1f1f1;
	background: #fff;
	&:last-child{
		border: none;
	}
	.li{
		width:92%;
		height:130upx;
		padding:0 4%;
		border-bottom:1px solid rgb(243,243,243);
		display:flex;
		align-items:center;
	&.noborder{
		border-bottom:0
		}
		.icon{
			flex-shrink:0;
			width:50upx;
			height:50upx;
			image{
				width:50upx;
				height:50upx;
			}
		}
		.text{
			padding-left:20upx;
			width:100%;
			color:#666;
		}
		.to{
			flex-shrink:0;
			width:40upx;
			height:40upx;
		}
	}
}
</style>
