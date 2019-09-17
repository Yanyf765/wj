<template>
    <div class="footer">
      <div style="border-top: 1px #1F1F1F solid">
        <p class="alt" style="color:#999; line-height:0">&copy; 版权所有：Evan-Nightly &nbsp;
          <span>技术支持：</span>
          <a href="###" target="_blank" style="color:#999;">Evan & MMK</a></p>
      </div>
    </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
    font-family: '微软雅黑', Arial, Helvetica, sans-serif;
  }
  body {
    font-size: 12px;
  }
  .footer{
    background-color: #2b2e33;
  }
  div {
    font-size: 12px;
  }

  span {
    font-size: 12px;
  }
  .footer .alt{
    overflow: hidden;
    padding: 20px 0;
    width: 1160px;
    margin: auto;
  }
</style>
