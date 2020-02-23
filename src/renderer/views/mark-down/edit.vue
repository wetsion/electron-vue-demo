<template>
  <div id="editorDiv">
		<mavon-editor v-model="markdownText" :toolbars="toolbarConfig" :style="editorStyle" @save="save"/>
	</div>
</template>

<script>
  import { saveMdFilePath } from '@/utils/storerage'

  const fs = require('fs')
  export default {
    name: 'edit',
    data () {
      return {
        markdownText: '',
        sourceFilePath: undefined,
        toolbarConfig: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: false, // 全屏编辑
          readmodel: false, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true
        }
      }
    },
    computed: {
      editorStyle () {
        console.log(window.innerHeight)
        return {
            height: '530px'
        }
      }
    },
    mounted () {
      const editorDiv = document.getElementById('editorDiv')

      // editorDiv.ondragstart = (event) => {
      // 	event.preventDefault()
      // 	const file = event.dataTransfer.files
      // 	const path = file[0].path
      // 	ipcRenderer.send('ondragstart', '/path/to/item')
      // }

      editorDiv.addEventListener('drop', (event) => {
        event.preventDefault()
        const file = event.dataTransfer.files
        const path = file[0].path
        console.log('drag file:', path)
        this.openMd(path)
      })

      editorDiv.addEventListener('dragover', (event) => {
        event.preventDefault()
      })

      // 渲染器监听主进程点击保存文件后发送的事件
      this.$electron.ipcRenderer.on('main-process-save', () => {
        this.save()
      })

      // 渲染器监听主进程点击另存为后发送的事件
      this.$electron.ipcRenderer.on('main-process-save-to-another', (event, data) => {
        console.log(data)
        this.saveAnother(data)
      })

      // 渲染器监听主进程打开文件后发送的事件
      this.$electron.ipcRenderer.on('main-process-open-file', (event, data) => {
        console.log(data)
        this.openMd(data[0])
      })
    },
    methods: {
      /**
       * 保存
       */
      save () {
        if (this.sourceFilePath) {
          // 如果是已经打开的文档，直接保存
          this.saveMd(this.sourceFilePath)
        } else {
          // 如果是空白文档，先选择存储地址,然后后续按照「另存为」方式
          this.$electron.ipcRenderer.send('render-process-open-file')
        }
      },
      /**
       * 另存为
       */
      saveAnother (path) {
        console.log('save another:', path)
        if (this.sourceFilePath) {
          // 如果已经是打开的文件，则直接另存为
          this.saveMd(path)
        } else {
          // 如果是空白文件，另存时则保存并打开文件
          this.sourceFilePath = path
          this.saveMd(path)
          this.openMd(path)
        }
      },
      saveMd (path) {
        fs.writeFileSync(path, this.markdownText)
        this.$message.success('保存成功！')
      },
      openMd (path) {
        this.sourceFilePath = path
        const content = fs.readFileSync(path)
        const cttStr = content.toString()
        console.log(cttStr)
        this.markdownText = cttStr
        // this.$electron.ipcRenderer.send('ondragstart', path)
        // 告知主界面文件路径
        this.$emit('set-file-path', this.sourceFilePath)
      }
    }
  }
</script>

<style scoped>

</style>
