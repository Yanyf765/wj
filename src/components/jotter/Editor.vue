<template>
  <div class="main">
    <mavon-editor v-model="value" style="width: 100%;height: 100%;position: fixed" ref="md" @imgAdd="imgAdd" @imgDel="imgDel" fontSize="20px"></mavon-editor>
  </div>
</template>

<script>
export default {
  name: 'Editor',
  data () {
    return {
      value: ''
    }
  },
  methods: {
    imgAdd: function () {
      console.log('imgAdd')
    },
    imgDel: function () {
      console.log('imgDel')
    }
  }
}
</script>

<style scoped>

</style>
