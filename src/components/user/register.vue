<!--  -->
<template>
<div>
  <div id="login_header">
			<img class="logo_img" alt="" src="../../assets/img/logo.gif" >
		</div>

			<div class="login_banner">

				<div id="l_content">
					<span class="login_word">Register</span>
				</div>

				<div id="content">
					<div class="login_form">
						<div class="login_box">
							<div class="tit">
								<h1>register atguigu vip</h1>
								<span class="errorMsg"></span>
							</div>
							<div class="form">
								<form action="userService" method="post">
									<label>用户昵称:</label>
									<input class="itxt" type="text" placeholder="input username"
										   autocomplete="off" tabindex="1" v-model="username" id="username" />
									<br />
									<br />
									<label>输入密码:</label>
									<input class="itxt" type="password" placeholder="input password"
										   autocomplete="off" tabindex="1" v-model="password" id="password" />
									<br />
									<br />
									<label>确认密码:</label>
									<input class="itxt" type="password" placeholder="verify password"
										   autocomplete="off" tabindex="1" v-model="repwd" id="repwd" />
									<br />
									<br />
									<label>电子邮箱:</label>
									<input class="itxt" type="text" placeholder="input email"

										   autocomplete="off" tabindex="1" v-model="email" id="email" />
									<br />
									<br />
									<label>验证码:</label>
									<input class="itxt" type="text" v-model="code" style="width: 120px;" id="code" value="abcde"/>
									<img alt="" src="../../assets/img/code.jpg" style="float: right; margin-right: 40px">
									<br />
									<br />
									<input type="button" value="submit" id="sub_btn" @click="register()"/>
								</form>
							</div>

						</div>
					</div>
				</div>
			</div>
		<div id="bottom">
			<span>
				atguigu BookStore.Copyright &copy;2015
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
	username:"admin",
	password:"123123",
	repwd:"123123",
	email:"123@123.com",
	code:"abcde"
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
	register(){
		if(this.password != this.repwd){
			this.$message("密码不一致");
			this.password = "";
			this.repwd = "";
			return;
		}
		let self = this;
		this.$axios({
			method: 'post',
			// url: '/contact/chatServlet',
			url: '/BookStore/userService',
			data: {
				"action":"register",
				"username":self.username,
				"password":self.password,
				"email":self.email,
				"code":self.code
			}
		})
		.then((result) => {
			console.log(result.data);
			this.$message(result.data.info);
			if(result.data.state == 1){
				this.$router.push("/register_success");
			}
		}).catch((err) => {
			
		});
	}
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

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
.login_form{
			height:420px;
			margin-top: 25px;
		}
</style>