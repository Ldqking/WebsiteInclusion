<template>
    <el-dialog
      :model-value="visible"
      :title="store.isEditing?'编辑网址':'新加网址'"
      width="30%"
      center
      @close="handleCancel"
    >
      <div class="add_main">
        <el-input class="add_url" id="add_url" v-model="result.urlInput" @change="handleUrlChange" placeholder="请填写待收入网址地址" clearable />
        <el-input class="add_name" v-model="result.nameInput" placeholder="请填写待收入网址名称" clearable />
        <div class="add_icon"> 
            <img :src="result?.icon || defaultIcon" @error="imgError($event)" alt="icon" />  
            <el-button @click="getIcon(result.urlInput)">获取网站图标</el-button> 
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleSubmit">
            添加
          </el-button>
        </span>
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
            urlInput: '',
            nameInput: '',
            icon: ''
        })

        const ctx = getCurrentInstance()?.appContext.config.globalProperties;
        const reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
        const handleUrlChange = ((e)=> {
            console.log(e,'输入框改变');
            if (!reg.test(e)) {
                ctx.$message.error('当前输入不是一个网址')
                result.urlInput = ''
                document.getElementById('add_url')?.focus()
            } else {
                console.log('是一个网址');
            }
        })
        const baseUrl = 'https://favicon.cccyun.cc/'
        const getIcon = ((url)=> {
            if (!url) return
            result.icon = baseUrl + url
            console.log(result);
            
        })
        // 图片加载失败处理
        const imgError = (e) => {
            e.srcElement.src = defaultIcon
            e.srcElement.onerror=null;
        } 

        watchEffect(() => {
            if (props.visible) {
                editInit()
            } else {
                store.$state.isEditing = false
                result.nameInput = ''
                result.urlInput = ''
                result.icon = ''
            }
        })

        function editInit() {
            if (!store.isEditing) return
            let catalogue = store.catalogue.filter((e)=>{
               return e.id === store.isEditId
            })
            let list = catalogue[0].URLS?.filter((u)=> {
                return u.id === store.isEditUrlId
            })
            result.nameInput = list[0].name
            result.urlInput = list[0].url
            result.icon = list[0].icon
        }
        const handleCancel = () => emit('cancel');
        const handleSubmit = () =>{
            if (!result.urlInput) {
                ctx.$message.warning('请输入网址') 
                return
            }
            if (!result.nameInput) {
                ctx.$message.warning('请输入网址名字')
                return
            }
            emit('ok', result)
        }
        return { store, result, defaultIcon, handleUrlChange, getIcon, imgError, handleCancel, handleSubmit }
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
        img {
            width: 65px;
            height: 65px;
        }
     }
  }
  </style>
  