<template>
<body id="poster" class="container">
    <h3 class="title">天道酬勤</h3>
</body>
</template>

<script>
  export default {
    name: 'AppIndex'
  }
</script>

<style scoped>

  .container {
    border-radius: 30px;
    margin: 10px auto;
    background: #fff;
    box-shadow: 0 0 15px #cac6c6;
    animation:bounce-in-bottom 1.1s both
  }
  @keyframes bounce-in-bottom{0%{transform:translateY(500px);animation-timing-function:ease-in;opacity:0}38%{transform:translateY(0);animation-timing-function:ease-out;opacity:1}55%{transform:translateY(65px);animation-timing-function:ease-in}72%{transform:translateY(0);animation-timing-function:ease-out}81%{transform:translateY(28px);animation-timing-function:ease-in}90%{transform:translateY(0);animation-timing-function:ease-out}95%{transform:translateY(8px);animation-timing-function:ease-in}100%{transform:translateY(0);animation-timing-function:ease-out}}


  #poster {
    background:url("../../assets/touhou_background2.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }

  .title {
    margin: 300px auto;
    font-size: 64px;
    color: #FFFFFF;
  }

</style>

