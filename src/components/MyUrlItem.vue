<template>
    <div class="url_main" v-if="item">
        <a class="url_item" :href="item?.url" target="_blank">
            <img class="item_img" :src="item?.icon || defaultIcon" @error="imgError($event)"/>
            <div class="item_name">{{ item?.name }}</div>
        </a>
        <MyEdit class="item_edit" :id="item.id" :is="'url'"></MyEdit>
    </div>
    <div v-else class="url_item url_main">
        <el-icon @click="addUrl(id)"><Plus /></el-icon>
    </div>
</template>

<script>
import { computed, ref, getCurrentInstance } from 'vue'
// defineProps(['item'])
import defaultIcon from '../assets/img/icon01.png'
import MyAddUrl from './MyAddUrl.vue'
import MyEdit from './MyEdit.vue';
import { useStore } from "../store/index";
export default {
    props: {
        item: Object,
        id: String
    },
    components: {
        MyAddUrl,
        MyEdit
    },
    setup() {
        // 图片加载失败处理
        const imgError = (e) => {
            e.srcElement.src = defaultIcon
            e.srcElement.onerror=null;
        } 
        const store = useStore()
        // 添加网址弹窗
        // let addVisible = ref(false)
        // const ctx = getCurrentInstance()?.appContext.config.globalProperties;
        // const addShow = (()=> {
        //     ctx.$message.success('添加成功')
        // })
        // const cancelShow = (()=>{
        //     addVisible = false
        // })
        const addUrl = ((e)=> {
            // console.log('添加网址', e)
            store.$state.addVisible = true
            store.$state.operationID = e
            console.log('添加网址', store.$state, e)
        })
        return {
           defaultIcon, imgError, addUrl
        }
    }
}
 
</script>

<style scoped lang="scss">
.url_main {
    position: relative;
    &:hover {
        transform: translate(0,10px);
        box-shadow: 0 5px 15px #e5e5e5;
    }
}
.url_item {
    width: 100px;
    height: 100px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 5px 5px 20px grey;
    display: flex;
    flex-direction: column;
    color: black;
    align-items: center;
    .item_img {
        width:45px;
        height: 45px;
        margin-top: 10px;
    }
    .item_name {
        margin-top: 10px;
    }
    i {
        font-size: 22px;
        margin: auto;
        cursor: pointer;
    }
}
</style>