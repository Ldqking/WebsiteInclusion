<template>
  <aside id="tabs-container">
      <div id="logo-container">
          {{ navInfos.navName || '网站管理' }}
      </div>
      <ul id="tabs">
          <li class="tab tab-search" @click="handleSearch">
            <el-icon class="m_icon"><Search /></el-icon>
            <span>快速搜索</span>
          </li>
          <!-- <li class="tab tab-save" @click="handleSaveConfigAlert(true)">
              <i class="fas fa-share-square tab-icon"></i>
              <span>保存配置</span>
          </li>
          <li class="tab tab-import" @click="handleImportConfigAlert(true)">
              <i class="fas fa-cog tab-icon"></i>
              <span>导入配置</span>
          </li> -->
          <!-- <br> -->
          <li v-for="(item, index) in navInfos.catalogue" 
              :key="index"
              class="tab"
              @click="toJump(item.id)">
                <span class="li-container">
                  <i :class="['iconfont', `icon-${item.icon}`]" />
                  <span>{{ item.name }}</span>
                </span>
          </li>
          <li class="tab add-tab" @click="showNewAddTab">
            <el-icon><Plus /></el-icon>
          </li>
      </ul>
  </aside>
</template>

<script setup>
// import { reactive } from "vue";
import { useStore } from "../store";

const store = useStore()

const navInfos = store.$state

function handleSearch() {
  console.log('搜索');
  store.$state.isSeach = !store.$state.isSeach
  if (!store.$state.isSeach) {
    store.$state.keyWards = ''
  }
}
function toJump(id) {
  console.log('跳转', id);
  const content = document.getElementById('m_main')
    const el = document.getElementById(`${id}`)
    let start = content.scrollTop
    let end = el.offsetTop - 80
    let each = start > end ? -1 * Math.abs(start - end) / 20 : Math.abs(start - end) / 20
    let count = 0
    let scroll = () => {
        if(count < 20) {
            content.scrollTop += each
            count ++
            window.requestAnimationFrame(scroll);
        }
    }
    scroll()
}
function showNewAddTab() {
  console.log('添加');
  store.$state.addTagVisible = true
}
</script>

<style scoped lang="scss">
#tabs-container{
    width: 200px;
    height: 100vh;
    float: left;
    background-color: rgb(44, 42, 42);
}
#logo-container{
    height: 79px;
    color: rgb(185, 164, 164);
    text-align: center;
    line-height: 80px;
    border-bottom: 1px solid rgb(68, 67, 67);
}
#tabs{
    height: calc(100% - 80px);
    overflow: auto;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
}
#tabs::-webkit-scrollbar{
    display: none;
    width: 0 !important;
}

.tab{
    cursor: pointer;
    height: 50px;
    color: rgb(185, 164, 164);
    line-height: 50px;
    position: relative;
}
.to-id{
    display: block;
    height: 100%;
    color: rgb(134, 125, 125);
}
.tab-search{
    margin-top: 20px;
    text-align: center;
}
.tab-import, .tab-save{
    text-align: center;
}
.tab:hover .to-id, .tab:hover{
    color: white !important;
}
.li-container{
    display: inline-block;
    width: 100%;
    text-align: center;
    /* padding-left: 90px; */
}
.tab-icon{
    margin: 0 15px 0 -30px;
}
.add-tab{
    text-align: center;
}
.tab-angle-right{
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    right: 0;
}
</style>