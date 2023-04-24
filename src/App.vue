<template>
  <div id="m_box">
    <MyNav />
    <div id="m_main">
      <MySeach v-show="store.$state.isSeach" />
      <div :id="itemList.id" v-for="(itemList, index) in urlList" :key="itemList.id" v-show="!store.$state.isSeach ||(store.$state.isSeach && store.judgeTabIsShow(index))">
        <MyUrlList :i="index" :list="itemList"></MyUrlList>
      </div>
    </div>
    <MyAddUrl :visible="store.$state.addVisible" @ok="addShow" @cancel="cancelShow"></MyAddUrl>
    <MyAddTag :visible="store.$state.addTagVisible" @ok="addTagShow" @cancel="cancelTagShow"></MyAddTag>
  </div>
</template>

<script setup>
// 组件
import MyNav from "./components/MyNav.vue";
import MyAddUrl from "./components/MyAddUrl.vue"
import MyAddTag from "./components/MyAddTag.vue"
import MyUrlList from "./components/MyUrlList.vue";
import MySeach from "./components/MySeach.vue";
// api
import { useStore } from "./store/index";
// import { compare } from "./utils/index";
// import { ElMessage } from 'element-plus'
import { computed, getCurrentInstance, onMounted, watchEffect } from "vue";
import {storeToRefs} from 'pinia'
// import  initTest  from "./hooks/useInit.js"

// pinia使用
const store = useStore()

// ele组件调试
const ctx = getCurrentInstance()?.appContext.config.globalProperties;

const addShow = ((e)=> {
    console.log(e)
    if (store.isEditing) {
      store.editUrl(e)
      ctx.$message.success('编辑成功')
      store.isEditing = false
    } else {
      store.update(e)
      ctx.$message.success('添加成功')
    }
    // store.update(e)
    // ctx.$message.success('添加成功')
    store.$state.addVisible = false
})
const cancelShow = (()=>{
    store.$state.addVisible = false
})

const addTagShow = ((e)=> {
    console.log(e)
    if (store.isEditing) {
      console.log('提交编辑', store.isEditId);
      store.editTag(e)
      ctx.$message.success('修改标签成功')
      store.$state.isEditing = false
    } else {
      store.updateTag(e)
      ctx.$message.success('添加标签成功')
    }
    // store.updateTag(e)
    // ctx.$message.success('添加标签成功')
    store.$state.addTagVisible = false
})
const cancelTagShow = (()=>{
    store.$state.addTagVisible = false
})

function init() {
    // 判断用户是否时第一次进入该网页
    if(window.localStorage.isSet === 'true') {
      console.log('-------------22222--------------------');
        store.init(JSON.parse(window.localStorage.navInfos))
    } 
    // 自动设置默认信息
    else {
      console.log('-------------1111-------------------');
        let obj = {
        navName: "Website Inclusion",
        catalogue : [
            {id:'1' , name: "常用网站", icon: "apps-line", URLS: [
              {id:'1.1' , url: 'http://www.baidu.com', icon: 'http://www.baidu.com/favicon.ico', name: '百度'},
              {id:'1.3', url: 'https://juejin.im/', icon: 'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web//static/favicons/favicon-32x32.png', name: '掘金'},
              {id:'1.4', url: 'https://gitee.com/', icon: 'https://gitee.com/assets/favicon.ico', name: '码云'},
            ]},
            {id:'2' , name: "实用工具", icon: "app-store-line", URLS: []},
            {id:'3' , name: "娱乐影视", icon: "angularjs-line", URLS: []}
        ]
        }
        window.localStorage.navInfos = JSON.stringify(obj)
        window.localStorage.isSet = 'true'
        store.init(obj)
    }
  }

  onMounted(()=> {
    init()
  })
  const urlList = computed(() => {
    // console.log(store.catalogue, store.$state.catalogue, store.$state.catalogue === store.catalogue);
    return store.catalogue
  })
</script>

<style lang="scss" scoped>
#m_main {
  width: calc(100% - 200px);
  margin-left: 200px;
  height: 100%;
  background-size: 100% 100%;
  background-image: url(./assets/img/wallpaper1.jpg) ;
  overflow: auto;
  overflow-x: hidden;
}
</style>
