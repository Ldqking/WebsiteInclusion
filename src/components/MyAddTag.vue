<template>
    <el-dialog
      :model-value="visible"
      :title="store.isEditing?'编辑标签':'新加标签'"
      width="30%"
      center
      @close="handleCancel"
    >
      <div class="add_main">
        <el-input class="add_Tag" id="add_Tag" maxlength="6" v-model="result.tagInput" placeholder="请填写新标签名称" clearable />
        <div class="add_icon" @click="iconVisible = true"> 
            <span>选择标签图标：</span>
            <span class="add_icon_info f-center"><i :class="['iconfont', `icon-${result.icon}`]" /></span>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleSubmit">
            确定
          </el-button>
        </span>
      </template>
      <template>
        <el-dialog
            :model-value="iconVisible"
            title="选择标签图标"
            width="40%"
            center
            :show-close="false"
            :close-on-click-modal="false"
            append-to-body
        >
            <div class="icon_main">
                <el-radio-group v-model="iconRadio" v-for="item in iconList" :key="item.id">
                    <el-radio :label="item.icon" size="large" ><i :class="['iconfont', `icon-${item.icon}`]" /></el-radio>
                </el-radio-group>
            </div>
            <template #footer>
                <span class="dialog-footer">
                <el-button type="primary" @click="iconVisible = false">
                    添加
                </el-button>
                </span>
            </template>
        </el-dialog>
      </template>
    </el-dialog>
  </template>
  
  <script>
import { reactive, getCurrentInstance, ref, onMounted, watchEffect } from 'vue';
import defaultIcon from '../assets/img/icon01.png'
import { useStore } from '../store';
// import { getFavicon } from '../utils/index'
  export default {
    props: {
        visible: {
            type: Boolean
        },
    },
    emits: ['cancel', 'ok'],
    setup(props, { emit }) {
        const store = useStore()
        const result = reactive({
            tagInput: '',
            icon: 'archive-line'
        })

        let iconVisible = ref(false)
        const iconRadio = ref('archive-line')
        const iconList = [
            {
                id: 1,
                icon: 'at-line'
            },
            {
                id: 2,
                icon: 'article-line'
            },
            {
                id: 3,
                icon: 'attachment-line'
            },
            {
                id: 4,
                icon: 'attachment-2'
            },
            {
                id: 5,
                icon: 'award-line'
            },
            {
                id: 6,
                icon: 'auction-line'
            },
            {
                id: 7,
                icon: 'apple-line'
            },
            {
                id: 8,
                icon: 'anticlockwise-line'
            },
            {
                id: 9,
                icon: 'angularjs-line'
            },
            {
                id: 10,
                icon: 'apps-line'
            },
            {
                id: 11,
                icon: 'apps-2-line'
            },
            {
                id: 12,
                icon: 'archive-line'
            },
            {
                id: 13,
                icon: 'advertisement-line'
            },
            {
                id: 14,
                icon: 'app-store-line'
            },
            {
                id: 15,
                icon: 'archive-drawer-line'
            },
            {
                id: 16,
                icon: 'aspect-ratio-line'
            },
            {
                id: 17,
                icon: 'artboard-2-line'
            },
            {
                id: 18,
                icon: 'asterisk'
            },
            {
                id: 19,
                icon: 'at-fill'
            },
            {
                id: 20,
                icon: 'artboard-line'
            }
        ]
        watchEffect(() => {
            result.icon = iconRadio
            if (props.visible) {
                editInit()
            } else {
                store.$state.isEditing = false
                result.tagInput = ''
                result.icon = 'archive-line'
            }
        })

        function editInit() {
            if (!store.isEditing) return
            console.log(props,store, store.catalogue);
            let catalogue = store.catalogue.filter((e)=>{
               return e.id === store.isEditId
            })
            console.log(catalogue, '编辑tag');
            result.tagInput = catalogue[0]?.name
            result.icon = catalogue[0]?.icon
        }

        const ctx = getCurrentInstance()?.appContext.config.globalProperties;
        const handleCancel = () => emit('cancel');
        const handleSubmit = () =>{
            console.log(result, !result.tagInput);
            if (!result.tagInput) {
                ctx.$message.warning('请输入标签名字') 
                return
            }
            emit('ok', result)
        }
        return { result, iconList, iconVisible, iconRadio, store,
               handleCancel, handleSubmit 
            }
    }
  }
  </script>
  <style scoped lang="scss">
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
  .add_main {
     .add_name{
        margin: 10px 0;
     }
     .add_icon {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-top: 15px;
        .add_icon_info {
            border: 1.4px solid #dcdfe6;
            width: 50px;
            height: 50px;
            border-radius: 5px;
            margin-right: 10px;
            i {
                font-size: 30px;
                margin-right: 0px;
                cursor: pointer;
            }
        }
     }
  }
  .icon_main{
    padding: 0px 10px;
  }
  .el-radio-group {
    margin-right: 21px;
    &:nth-child(4n) {
        margin-right: 0px;
    }
    i {
        font-size: 22px;
    }
  }
  </style>
  