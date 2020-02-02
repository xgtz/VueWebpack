<template>
    <div>
     
        <p>
            <img src="../static/images/image.png" style="width: 200px;">
        </p>
        <p>
            <img :src="imgUrl" style="width: 200px;">
        </p>

        <router-view></router-view>
    </div>
</template>
<script>
    
    import vTitle from './components/title.vue';
    import vButton from './components/button.vue';
    import $ from '../libs/util';
    
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
                imgUrl:require("../static/images/image.png")
            }
        },
        mounted(){
            /* ------------------- xhr 插件执行 
            this.$ajax({
                url:'http://127.0.0.1:4001/Home/Samples',
                type:'post',
                data:{name:'张三',age:5},
                success:function(resText,resXml){
                    console.log('resText:'+resText);
                    console.log('rexXml:'+resXml);
                },
                error:function(err){
                    console.log(err);
                }
            })
            ----------*/
            
            /** axios 发送get请求 
            $.ajax.get('/Home/Samples2')
            .then(function(response){
                console.log(response.result[0]);
            })
            .catch(function(error){
                console.log(error);
            })

            */

           /*
           var params =  "name=张三&age=5";
           var objParams={
               name:'张三',
               age:5
           }
            $.ajax.post('/Home/Samples',JSON.stringify(objParams))
            .then(function(response){
                console.log(response.result[0]);
            })
            .catch(function(error){
                console.log(error);
            })

            */
          
       

           
        }
    }
</script>

<style scoped>
    div{
        color:#f60;
        font-size:24px;
    }
</style>