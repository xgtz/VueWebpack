<template>
    <div>
        <div>介绍页</div>
        <button @click="handleRouter">跳转到user</button>
    </div>
</template>
<script>
    export default {
        methods:{
            handleRouter(){
                this.$router.push('/user/123');
            }
        }
    }
</script>