<template>
	<div>
		<h1>加法计算器</h1>
		<el-form ref="calculatorForm" :model="params" label-width="150px">
			<el-form-item label="参数1" prop="x">
				<el-input-number v-model="params.x"/>
			</el-form-item>
			<el-form-item label="参数2" prop="y">
				<el-input-number v-model="params.y"/>
			</el-form-item>
			<el-form-item label="结果" prop="result">
				<el-input v-model="params.result" readonly/>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">计算</el-button>
				<el-button @click="reset">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'Calculator',
		data () {
			return {
				params: {
					x: 0,
					y: 0,
					result: 0
				}
			}
		},
		methods: {
			onSubmit () {
				this.params.result = this.params.x + this.params.y
			},
			reset () {
				this.$refs['calculatorForm'].resetFields()
			}
		}
	}
</script>

<style scoped>

</style>
