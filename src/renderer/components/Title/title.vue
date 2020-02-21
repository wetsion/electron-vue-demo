<template>
	<div id="newTitle">
		<div class="left">
			<title-btn type="max"/>
			<title-btn type="min"/>
			<title-btn type="close"/>
		</div>
		<div class="right">
			<span class="name">秋月编辑器-MarkDown神器</span>
		</div>
	</div>
</template>

<script>
	import TitleBtn from './TitleBtn/title-btn'
	export default {
		name: 'title',
		components: { TitleBtn }
	}
</script>

<style>
	#newTitle {
		width: 100%;
		height: 42px;
		background-color: #FFCC99;
		display: flex;
		justify-content: space-between;
		-webkit-app-region: drag;
	}

	.left {
		display: flex;
		-webkit-app-region: drag;
	}

	.right {
		display: flex;
		flex-direction: column;
		justify-content: center;

		/** 文本不能选中 */
		-webkit-user-select: none;
		-webkit-app-region: drag;
	}

	.right > .name {
		margin-right: 20px;
	}
</style>
