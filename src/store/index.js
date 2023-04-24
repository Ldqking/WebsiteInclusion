import { defineStore } from 'pinia'
import { compare, updateLocal } from '../utils'
import { ElMessage } from 'element-plus'

export const useStore = defineStore('test', {
    state: () => ({ 
        count: 0,
        isSeach: false,
        keyWards: '',
        isEditId: '', // 正在编辑的组件
        isEditUrlId: '',
        isEditing: false,
        addVisible: false, //添加网址弹窗
        addTagVisible: false, //添加标签弹窗
        operationID: '1',
        navName: 'Website Inclusion',
        catalogue: []
     }),
    getters: {
      double: (state) => state.count * 2,
    },
    actions: {
      add() {
        this.count++
      },
      init(info) {
        const { navName, catalogue } = info
        this.navName = navName
        this.catalogue = catalogue
      },
      update(info) {
        const operationCatalogue = this.catalogue.filter((e) =>e.id === this.operationID)
        const operationUrls = operationCatalogue[0].URLS?.sort(compare(Number('id')))
        const resultObj = {
            id: operationUrls.length !== 0 ? ((Number(operationUrls[operationUrls.length -1]?.id)*10 +1)/10).toString() : `${this.operationID}.1`,
            url: info.urlInput,
            icon: info.icon,
            name: info.nameInput
        }
        this.catalogue.filter((e) =>e.id === this.operationID)[0].URLS.push(resultObj)
        window.localStorage.navInfos = JSON.stringify({
            navName: 'Website Inclusion',
            catalogue: this.catalogue
        })
      },
      editUrl(info) {
        // const operationCatalogue = this.catalogue.filter((e) =>e.id === this.isEditId)
        // let operationUrls = operationCatalogue[0].URLS
        const resultObj = {
            id: this.isEditUrlId,
            url: info.urlInput,
            icon: info.icon,
            name: info.nameInput
        }
        // operationUrls = operationUrls.map(t => {    return t.id === this.isEditUrlId
        //     ? resultObj
        //     : t;
        // });
        this.catalogue.filter((e) =>e.id === this.isEditId)[0].URLS = this.catalogue.filter((e) =>e.id === this.isEditId)[0].URLS.map(t => {    return t.id === this.isEditUrlId
            ? resultObj
            : t;
        });
        window.localStorage.navInfos = JSON.stringify({
            navName: 'Website Inclusion',
            catalogue: this.catalogue
        })
        // console.log(resultObj,operationUrls);
      },
      delete(info) {
        if (info.is === 'tab') {
            const catalogue = this.catalogue.filter((e)=>{
                return e.id !== info.id
            })
            this.catalogue = catalogue
            window.localStorage.navInfos = JSON.stringify({
                navName: 'Website Inclusion',
                catalogue: this.catalogue
            })
        } else {
            const operationCatalogue = this.catalogue.filter((e) =>e.id === this.operationID)
            const operationUrls = operationCatalogue[0].URLS
            const urls = operationUrls.filter((e)=>{
                return e.id !== info.id
            })
            this.catalogue.filter((e) =>e.id === this.operationID)[0].URLS = urls
            window.localStorage.navInfos = JSON.stringify({
                navName: 'Website Inclusion',
                catalogue: this.catalogue
            })
        }
        ElMessage({
            message: '删除成功',
            type: 'success',
          })
      },
      updateTag(info) {
        const catalogue = this.catalogue.sort(compare(Number('id')))
        const tagObj = {
            id: (Number(catalogue[catalogue.length -1].id) + 1).toString(),
            name: info.tagInput,
            icon: info.icon,
            URLS: []
        }
        this.catalogue.push(tagObj)
        window.localStorage.navInfos = JSON.stringify({
            navName: 'Website Inclusion',
            catalogue: this.catalogue
        })
      },
      editTag(info) {
        let catalogue = this.catalogue.filter((e)=> e.id === this.isEditId)
        let urls = catalogue[0].URLS
        const tagObj = {
            id: this.isEditId,
            name: info.tagInput,
            icon: info.icon,
            URLS: urls
        }
        // console.log(catalogue, urls, tagObj, 'eidt');
        // 替换数组中的对象
        this.catalogue = this.catalogue.map(t => {    return t.id === tagObj.id
            ? tagObj
            : t;
        });
        window.localStorage.navInfos = JSON.stringify({
            navName: 'Website Inclusion',
            catalogue: this.catalogue
        })
      },
      judgeTabIsShow(i) {
        const searchWord = this.keyWards
        const URLS = this.catalogue[i]['URLS']
        let length = URLS.length
        for(let j = 0; j < length; j++) {
            if(searchWord == '') return false;
            else if(URLS[j].name?.toLowerCase().indexOf(searchWord?.toLowerCase()) !== -1) return true;
        }
        return false
      },
      judgeUrlIsShow(i, j) {
        const searchWord = this.keyWards
        const url = this.catalogue[i]['URLS'][j]
        if(searchWord == '') return false;
        let matchResult = url.name?.toLowerCase().indexOf(searchWord?.toLowerCase())
        if(matchResult !== -1) return true;
        return false;
      },
    },
    persist: {
        enabled: true, // 开启数据缓存
    }
  })