<!--  -->
<template>
<div>
  <div id="header">
			<img class="logo_img" alt="" src="../../assets/img/logo.gif" >
			<span class="wel_word">图书管理系统</span>
			<div>
				<router-link to="/book_manager">图书管理</router-link>
				<router-link to="/order_manager">订单管理</router-link>
				<router-link to="/">返回首页</router-link>
			</div>
	</div>
	
	<div ><!--id="main"-->
		<el-table size="mini" border style="width: 90%" height="400" highlight-current-row 
			:data="bookList.slice((currentPage - 1) * sizePage, currentPage * sizePage)">
			<el-table-column type="index"></el-table-column>
			<el-table-column v-for="v in columns" :key="v.id" :prop="v.field" :label="v.title" >
					<template slot-scope="scope">
							<span v-if="scope.row.isSet">
									<el-input size="mini" placeholder="请输入内容" v-model="selectedRow[v.field]">
									</el-input>
							</span>
							<span v-else>{{scope.row[v.field]}}</span>
					</template>
			</el-table-column>
			<el-table-column label="操作" width="100">
					<template slot-scope="scope">
							<span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;" @click="updateBook(scope.row,scope.$index + sizePage * (currentPage - 1),false)">
									{{scope.row.isSet?'保存':"修改"}}
							</span>
							<span v-if="!scope.row.isSet" @click="deleteBook(scope.$index + sizePage * (currentPage - 1))" class="el-tag el-tag--danger el-tag--mini" style="cursor: pointer;">
									删除
							</span>
							<span v-if="scope.row.isSet" class="el-tag  el-tag--mini" style="cursor: pointer;" @click="updateBook(scope.row,scope.$index + sizePage * (currentPage - 1),true)">
									取消
							</span>
					</template>
			</el-table-column>
	</el-table>
	<el-pagination
		@size-change="handleSizeChange"  
		@current-change="handleCurrentChange"
		:current-page="currentPage"
		:page-size="sizePage"
		layout="prev, pager, next, jumper"
		:total="totalPages"
		background>
	</el-pagination>
		
		<el-button round @click="gotoAdd()">添加图书</el-button>
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
	bookList:[],
	selectedRow:{},
	columns: [
			{ field: "name", title: "书名"},
			{ field: "price", title: "价格"},
			{ field: "author", title: "作者"},
			{ field: "sales", title: "销量"},
			{ field: "stock", title: "库存"}
	],
	totalPages:0,
	sizePage:4,
	currentPage:1
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
	handleSizeChange(size){this.sizePage = size},

	handleCurrentChange(index){this.currentPage = index},

	updateBook(row, index, isCancel){
		//点击修改 判断是否已经保存所有操作
		for (let i = 0; i < this.bookList.length; i++) {
				if (this.bookList[i].isSet && i != index) {
						this.$message.warning("请先保存当前编辑项");
						return;
				}
		}
		//是否是取消操作
		if (isCancel) {
				// if (!app.master_user.selconsole.log(this.selectedRow.isSet);.id) app.master_user.data.splice(index, 1);
				row.isSet = false;
				this.$set(this.bookList, index, row);
				return ;
		}
		// console.log('index:',index,'isSet:',this.selectedRow.isSet,'isCancel:',isCancel);
		//提交数据
		if (row.isSet) {
			let data = this.selectedRow;
			// console.log(this.selectedRow);
			// console.log(data);
			let info = "";
			this.$axios({
				method:'post',
				url:'/BookStore/manager',
				data:{
					'action':'updateBook',
					'id':data.id,
					"name":data.name,
					"author":data.author,
					"price":data.price,
					"sales":data.sales,
					"stock":data.stock
				}
			})
			.then((result) => {
				
				// console.log(data);
				info = result.data.info;
				// for (let k in data) row[k] = data[k];
				this.$message({
					type: 'success',
					message: info
				});
				this.$router.go(0);
			}).catch((err) => {
				console.log(err);
				this.$message(info);
			});
			
			//然后这边重新读取表格数据
			row.isSet = false;
			this.$set(this.bookList, index, row);
			console.log(index)
			this.selectedRow = {};
			// console.log(this.bookList[index].isSet);
		} 
		else {
			row.isSet = true;
			this.selectedRow = JSON.parse(JSON.stringify(row));
			this.$set(this.bookList, index, row);
		}
	},

	gotoAdd(){
		this.$router.push("/book_edit");
	},

	deleteBook(index){
		this.$confirm('此操作将永久删除该书籍, 是否继续?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		})
		.then(() => {
			this.$message({
				type: 'success',
				message: '删除成功!'
			});
			console.log(index);
			let book = this.bookList[index];
			console.log(book);
			this.$axios({
				method:'post',
				url:'/BookStore/manager',
				data:{
					"action":"deleteBook",
					"id":book.id,
					"name":book.name,
					"author":book.author,
					"price":book.price,
					"sales":book.sales,
					"stock":book.stock
				}
			})
			.then((result) => {
				console.log(result.data.info);
				this.$router.go(0);
				// this.bookList.splice(index, 1);
			}).catch((err) => {
				console.log(err);
			});
		})
		.catch((err) => {
			console.log(err);
			this.$message({
				type: 'info',
				message: '已取消删除'
			});          
		});
	}
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
	this.$axios({
		method:'post',
		url:'/BookStore/manager',
		data:{
			action:'getAll'
		}
	})
	.then((result) => {
		this.bookList = result.data;
		this.totalPages = this.bookList.length;
		this.bookList.forEach(element => {
			element.isSet = false;
		});
		console.log(this.bookList);
		console.log("数据加载完成");
	}).catch((err) => {
		console.log(err);
	});
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

	// this.$axios({
	// 	method:'post',
	// 	url:'/BookStore/manager',
	// 	data:{
	// 		"action":'getNumOfBooks'
	// 	}
	// })
	// .then((result) => {
	// 	this.totalPages = result.data.num;
	// 	console.log(this.totalPages);
	// }).catch((err) => {
	// 	console.log(err)
	// });
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

</style>