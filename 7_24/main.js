import Vue from 'vue'
import App from './App'

import uniPopup from "@/components/uni-popup/uni-popup.vue"
import uniList from "@/components/uni-list/uni-list.vue"
import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
import LbPicker from "@/components/lb-picker/index.vue"
import uniCountdown from "@/components/uni-countdown/uni-countdown.vue"
import cuCustom from './colorui/components/cu-custom.vue'

Vue.component('cu-custom',cuCustom)
Vue.component("uni-popup", uniPopup)
Vue.component("uni-list", uniList)
Vue.component("uni-list-item", uniListItem)
Vue.component("lb-picker", LbPicker)
Vue.component("uni-countdown", uniCountdown)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
