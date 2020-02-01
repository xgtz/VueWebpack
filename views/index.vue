<template>
    <div>
        <div>首页</div>
        <router-link to="/about">跳转到about</router-link>
        {{ count }}
        <button @click="handleIncrement">+1</button>
        <button @click="handleDecrease">-1</button>
        <button @click="handleActionIncrement">action+1</button>
        <div>
            <div>{{ list }} </div>
            <div>{{ listCount }} </div>
        </div>
    </div>
</template>
<script>
    export default{
        computed:{
            count(){
                return this.$store.state.count;
            },
            list(){
                return this.$store.getters.filteredList;
            },
            listCount(){
                return this.$store.getters.filteredListCount;
            }
        },
        methods:{
            handleIncrement(){
                this.$store.commit({
                    type:'increment',
                    count:1
                })
            },
            handleDecrease(){
                this.$store.commit({
                    type:'increment',
                    count:-1
                })
            },
            handleActionIncrement(){
                this.$store.dispatch('increment',{
                    type:'increment',
                    count:1
                }).then(()=>{
                    console.log(this.$store.state.count);
                })
            }
        }
    }
</script>
