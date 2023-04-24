<template>
    <div class="url_list" @mouseenter="editShow = true" @mouseleave="editShow = false">
       <div class="list_head">
            <span>
                <i :class="['iconfont', `icon-${list.icon}`]" />
                <span>{{ list.name }}</span>
                <MyEdit :id="list.id" :is="'tab'" />
            </span>
            <span class="head_edit animate__animated animate__backInRight" v-show="editShow">
                <el-button :title="isEditId !== list.id?'点击编辑':'点击退出'" @click="handleEdit(list.id)" type="primary" :icon="isEditId!==list.id?Edit : Expand" circle />
            </span>
        </div>
        <el-divider />
        <div class="list_main">
            <div class="list_mian_info" v-for="(item, j) in list.URLS" :key="item.id" v-show="!store.$state.isSeach || (store.$state.isSeach&&store.judgeUrlIsShow(i, j))">
                <MyUrlItem :item="item" :id="list.id" :index="j"></MyUrlItem>
            </div>
            <div class="list_mian_info">
                <MyUrlItem :id="list.id"></MyUrlItem>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import MyEdit from './MyEdit.vue'
import { useStore } from '../store';
import {
  Delete,
  Edit,
  Expand,
} from '@element-plus/icons-vue'
import MyUrlItem from "./MyUrlItem.vue";

// defineProps['list']
export default {
    props: {
        list: Object,
        i: Number
    },
    components: {
        MyUrlItem,
        MyEdit
    },
    setup(list) {

        const editShow = ref(false)
        const isEditId = computed(()=>{
            return store.$state.isEditId
        })
        const handleEdit = ((e)=>{
            if (store.$state.isEditId && store.$state.isEditId === e) {
                store.$state.isEditId = ''
                return
            } 
            store.$state.isEditId = e
        })
        // 数据解构赋值导致失去响应性
        const { name, icon, URLS ,id} = list.list
        const store = useStore()
        // console.log(name,icon,URLS);
        return {
            name, icon, URLS,id, store, Delete, Edit, Expand,isEditId, editShow, handleEdit
        }
    }
}

</script>

<style lang="scss" scoped>
 .url_list {
    padding: 20px 5px;
    color: #fff;
    // opacity: 1;
    .list_head {
      .head_edit {
        right: 0px;
        position: absolute;
        margin-top: -4px;
      }
    }
    .list_main {
        display: flex;
        flex-wrap: wrap;
    }
    .list_mian_info {
        display: inline-block;
        margin: 0px 20px 20px 20px;
    }
}
</style>