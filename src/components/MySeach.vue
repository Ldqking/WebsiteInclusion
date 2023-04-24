<template>
    <div class="m_seach f-center">
        <el-input
            v-model="seachVal"
            class="w-50 m-2"
            size="large"
            placeholder="请输入搜索关键字"
            @input="handleInput"
            :suffix-icon="Search"
        />
        <el-icon @click="store.$state.isSeach = false"><CloseBold /></el-icon>
    </div>
</template>
  
<script>
import { Search } from '@element-plus/icons-vue'
import { useStore } from '../store';
import { ref, watchEffect, getCurrentInstance } from 'vue';
  export default {
    props: {
    },
    emits: [],
    setup() {
        const store = useStore()
        const seachVal = ref('')
        const internalInstance = getCurrentInstance()
        const handleInput = ((e)=> {
            console.log(e);
            store.$state.keyWards = seachVal

            // 操作数据后更新视图
            internalInstance.ctx.$forceUpdate();
        })

        watchEffect(() => {
            if (!store.$state.isSeach) {
                store.$state.keyWards = ''
            }
        })
        return { seachVal, store, Search, handleInput }
    }
  }
  </script>
  <style scoped lang="scss">
  .m_seach {
    padding: 20px 30px;
    .el-icon {
        margin-left: 16px;
        font-size: 22px;
        cursor: pointer;
    }
  }
  </style>
  