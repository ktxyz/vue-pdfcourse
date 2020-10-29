<template>
  <div class="loading" v-if="isLoading">
    <img src="../assets/loading.gif" alt="" srcset="" />
    <h1>Ładowanie</h1>
  </div>
  <canvas id="PDFSlides"></canvas>
</template>


<script lang="ts">
import { defineComponent } from 'vue'

const pdfjsLib = window['pdfjs-dist/build/pdf']
// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js'

export default defineComponent({
  name: 'PDFSlides',
  props: {
    fileUrl: String,
  },
  data() {
    return {
      isLoading: true,
      currentPage: 1,
      pdfElement: null,
    }
  },
  created() {
    console.log("I'm created now")
    this.loadCourse()
  },
  methods: {
    loadCourse() {
      console.log(this.fileUrl)

      const ref = this
      pdfjsLib.getDocument(this.fileUrl).promise.then(function(pdfDoc_) {
        ref.isLoading = false
        ref.pdfElement = pdfDoc_
        ref.renderCourse()
      })
    },

    renderCourse() {
      console.log('rendering Course')
    },
  },
})
</script>


<style lang="scss">
#PDFSlides {
  position: absolute;
}
.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
