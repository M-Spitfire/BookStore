<!--  -->
<template>
<div>
  <div id="header">
			<img class="logo_img" alt="" src="../../assets/img/logo.gif" >
			<span class="wel_word">编辑图书</span>
			<div>
        <router-link to="/manager">管理</router-link>
        <router-link to="/order">订单</router-link>
        <router-link to="/">首页</router-link>
			</div>
		</div>
		
		<div id="main">
			<form action="book_manager.html">
				<table>
					<tr>
						<td>名称</td>
						<td>价格</td>
						<td>作者</td>
						<td>销量</td>
						<td>库存</td>
						<td colspan="2">操作</td>
					</tr>		
					<tr>
						<td><input v-model="book_name" type="text" /></td>
						<td><input v-model="book_price" type="text" /></td>
						<td><input v-model="book_author" type="text" /></td>
						<td><input v-model="book_sales" type="text" /></td>
						<td><input v-model="book_stock" type="text" /></td>
						<td><input type="button" value="提交" @click="addBook()"/></td>
					</tr>	
				</table>
			</form>
			
	
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
	book_name:"",
	book_price:0.00,
	book_author:"",
	book_sales:0,
	book_stock:0
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
	addBook(){
		let self = this;
		this.$axios({
			method:'post',
			url:'/BookStore/manager',
			data:{
				"action":"addBook",
				"name":self.book_name,
				"price":self.book_price,
				"author":self.book_author,
				"sales":self.book_sales,
				"stock":self.book_stock
			}
		})
		.then((result) => {
			console.log(result.data);
			this.$message(result.data.info);
			// this.book_name="";
			// this.book_price=0.00;
			// this.book_author="";
			// this.book_sales=0;
			// this.book_stock=0;
		}).catch((err) => {
			console.log(err);
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
h1 {
		text-align: center;
		margin-top: 200px;
	}
	
	h1 a {
		color:red;
	}
	
	input {
		text-align: center;
	}
</style>