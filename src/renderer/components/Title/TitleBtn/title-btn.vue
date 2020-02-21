<template>
	<div class="title-btn" @click="click">
		<img v-if="type === 'max' && !isMax" id="maxLogo" src="~@/assets/title/max.png" alt="electron-vue">
		<img v-if="type === 'max' && isMax" id="maxLogo" src="~@/assets/title/unmax.png" alt="electron-vue">
		<img v-if="type === 'min'" id="minLogo" src="~@/assets/title/min.png" alt="electron-vue">
		<img v-if="type === 'close'" id="closeLogo" src="~@/assets/title/close.png" alt="electron-vue">
	</div>
</template>

<script>
	const style = {
		min: {
			backgroundColor: 'red',
			right: '100px'
		},
		max: {
			// backgroundColor: 'yellow',
			backgroundImage: '~@/assets/title/max.png',
			right: '60px'
		},
		close: {
			backgroundColor: 'black',
			right: '20px'
		}
	}
	export default {
		name: 'title-btn',
		props: ['type'],
		data () {
			return {
				isMax: false
			}
		},
		computed: {
			style () {
				return style[this.type]
			}
		},
		methods: {
			click () {
				console.log(this.type)
				switch (this.type) {
					case 'max':
						if (!this.isMax) {
							this.$electron.ipcRenderer.send('max')
							this.isMax = true
						} else {
							this.$electron.ipcRenderer.send('unmax')
							this.isMax = false
						}
						break;
					case 'min':
						this.$electron.ipcRenderer.send('min')
						break;
					case 'close':
						this.$electron.ipcRenderer.send('close')
						break;
				}

			}
		}
	}
</script>

<style>
 .title-btn {
	 /*position: absolute;*/
	 width: 16px;
	 height: 16px;
	 top: 0;
	 bottom: 0;
	 margin-left: 10px;
	 /*margin: auto 0;*/
	 margin-top: auto;
	 margin-bottom: auto;
	 -webkit-app-region: no-drag;
 }
</style>
