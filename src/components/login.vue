<template>
    <div>
        <div>登录页</div>
        <button @click="handleRouter">登录</button>
    </div>
</template>
<script>
    export default{
        mounted(){
            
        },
        methods:{
            handleRouter(){
                localStorage["token"]="111";
                this.$router.push('/index');
            }
        },
        
    }
</script>
<style scoped>
    .login_box{
        width: 280px;
        position: fixed;
        left: 39%;
        top: 200px;
        border: 1px solid skyblue;
        border-radius: 15px;
        padding: 38px 60px 5px 25px;
        text-align: center;
    }
</style>