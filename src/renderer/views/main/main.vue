<template>
  <div>
    <div id="title">
      <Title :label="titleLabel"/>
    </div>
    <div id="container">
      <edit @set-file-path="setFilePath"></edit>
    </div>
  </div>
</template>

<script>
  import Title from '@/components/Title/title'
  import Edit from '@/views/mark-down/edit'
  export default {
    name: 'main',
    components: { Title, Edit },
    data () {
      return {
        titleLabel: '空白文档'
      }
    },
    methods: {
      setFilePath (path) {
        console.log('path')
        if (path) {
          this.titleLabel = path
        } else {
          this.titleLabel = '空白文档'
        }
      }
    }
  }
</script>

<style scoped>

</style>