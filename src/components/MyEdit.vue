<template>
    <div
     :class="['m_edit', 'animate__animated', 'animate__fadeInDown']"
     v-show="store.$state.isEditId === id || id.split('.')[0] === store.$state.isEditId">
        <el-icon title="编辑" @click.stop="handleEdit"><EditPen /></el-icon>
        <el-popconfirm
            width="220"
            confirm-button-text="OK"
            cancel-button-text="No, Thanks"
            icon-color="#626AEF"
            :title="is==='tab'?'标签下的网址将全部删除，确认删除吗?':'确认删除该网址吗？'"
            @confirm="handleDelete"
        >
            <template #reference>
                <el-icon title="删除"><Delete /></el-icon>
            </template>
        </el-popconfirm>
        <!-- <el-icon title="删除" @click.stop="handleDelete"><Delete /></el-icon> -->
    </div>
</template>
  
<script>
// import MyAddUrl from './MyAddUrl.vue';
// import MyAddTag from './MyAddTag.vue';
import { useStore } from '../store';
import { ref, watchEffect } from 'vue';
  export default {
    props: {
        id:String,
        is: String
    },
    components: {
    },
    emits: [],
    setup(props) {
        const store = useStore()
        const handleEdit=(()=>{
            console.log('编辑', props);
            store.$state.isEditing = true
            if (props.is === 'tab') {
                store.$state.addTagVisible = true
            } else {
                store.$state.isEditUrlId = props.id
                store.$state.addVisible = true
            }
        })
        const handleDelete=(()=>{
            console.log('删除', props);
            store.delete(props)
        })
        // const updateShow = (()=>{
        //     console.log('更新url');
        // })
        // const updateTagShow = (()=>{
        //     console.log('更新tab');
        // })
        return { handleEdit, handleDelete, store }
    }
  }
  </script>
  <style scoped lang="scss">
  .m_edit {
    color: white;
    display: inline-block;
    vertical-align: middle;
    font-size: 13px;
    .el-icon{
        margin-left: 10px;
        cursor: pointer;
    }
    .el-icon:hover {
            color: #409eff
        }
  }
//   .move {
//     transform: translateY(-52px);
//     z-index: -1;
//   }
  .item_edit {
    position: absolute;
    background: grey;
    right: 0px;
    border-bottom-left-radius: 9px;
    // border-top-left-radius: 12px;
    opacity: 0.5;
    display: flex;
    flex-direction: column;
    top: 0px;
    // transition: all .5s ease;
    // z-index: -1;
    .el-icon {
        margin: 5px;
    }
  }
//   .move[class='item_edit'] {
//     transform: translateY(52px);
//     z-index: 0;
//   }
  </style>
  