<template>
    <div>
        <div>{{ $route.params.id }}</div>
        <router-link to="/index" > 返回首页index </router-link>
    </div>
</template>
<script>
    export default{
        mounted(){
            console.log(this.$route.params.id);
        }
    }
</script>