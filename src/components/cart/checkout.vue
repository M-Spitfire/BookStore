<!--  -->
<template>
<div>
  <div id="header">
			<img class="logo_img" alt="" src="../../assets/img/logo.gif" >
			<span class="wel_word">结算</span>
			<div>
				<span v-if="loginStatus">欢迎<span class="um_span">{{username}}</span>光临尚硅谷书城</span>
        <router-link to="/order">订单</router-link>
        <router-link to="/">注销</router-link>
        <router-link to="/">返回</router-link>
			</div>
	</div>
	
	<div id="main">
		
		<h1>你的订单已结算，订单号为2937474382928484747</h1>
		
	
	</div>
	
	<div id="bottom">
		<span>
			尚硅谷书城.Copyright &copy;2015
		</span>
	</div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
	username:'',
	loginStatus:false
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
	this.$axios({
		method:'post',
		url:'/BookStore/userService',
		data:{
			'action':'getLoginInfo'
		}
	})
	.then((result) => {
		// console.log(result.data);
		this.username = result.data.username;
		this.loginStatus = result.data.loginStatus;
	}).catch((err) => {
		console.log(err);
	});
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
/*// @import url(); 引入公共css类*/
h1 {
		text-align: center;
		margin-top: 200px;
	}
</style>