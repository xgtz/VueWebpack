<template>
    <div>
        <v-title title="Vue组件化"></v-title>
        <v-button @click="handleClick">点击按钮</v-button>
        <p>
            <img src="./images/image.png" style="width: 200px;">
        </p>
        <p>
            <img :src="imgUrl" style="width: 200px;">
        </p>
    </div>
</template>
<script>
    import vTitle from './title.vue';
    import vButton from './button.vue';
    

    export default {
        components:{
            vTitle,
            vButton
        },
        methods:{
            handleClick(e){
                console.log(e);
            }
        },
        data (){
            return {
                name:'Vue.js',
                imgUrl:require("./images/image.png")
            }
        }
    }
</script>

<style scoped>
    div{
        color:#f60;
        font-size:24px;
    }
</style>