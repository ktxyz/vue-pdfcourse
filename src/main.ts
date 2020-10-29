import { createApp } from 'vue'
import PDFCourse from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(PDFCourse)
app.use(VueAxios, axios)
app.mount('#PDFCourse')
