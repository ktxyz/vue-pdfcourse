<template>
  <div class="loading" v-if="isLoading">
    <img src="../assets/loading.gif" alt="" srcset="" />
    <h1>Ładowanie</h1>
  </div>

  <canvas id="PDFCanvas"></canvas>
  <div class="pageControl" v-on:keyup.left="changePage(-1)" v-on:keyup.right="changePage(1)">
    <button v-on:click="changePage(-1)">BACK</button>
    <button v-on:click="changePage(1)">NEXT</button>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import { useWindowSize } from 'vue-window-size'

const pdfjsLib = window['pdfjs-dist/build/pdf']
// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc =
  '//mozilla.github.io/pdf.js/build/pdf.worker.js'

export default defineComponent({
  name: 'PDFSlides',
  props: {
    fileUrl: String,
  },
  setup() {
    const { width, height } = useWindowSize()
    return {
      windowWidth: width,
      windowHeight: height,
    }
  },
  data() {
    return {
      isLoading: true,

      currentPage: 1,
      lastPage: 1,
      pdfElement: null,

      canvasWidth: 720,
      canvasHeight: 540,

      pdfNextRenderPage: 0,
      pdfPendingRender: false,
    }
  },

  created() {
    console.log("I'm created now")
    this.loadCourse()
  },

  methods: {
    loadCourse() {
      console.log('loading course from: ' + this.fileUrl)

      const ref = this
      pdfjsLib.getDocument(this.fileUrl).promise.then(function(pdfDoc_) {
        ref.isLoading = false
        ref.lastPage = pdfDoc_.numPages
        ref.lastPage = 2
        ref.$emit('pagechange', ref.currentPage, ref.lastPage)

        ref.pdfElement = pdfDoc_
        ref.renderCourse()
      })
    },

    renderCourse() {
      this.calculateCanvasSize()

      let width = 720
      let height = 540
      this.windowHeight -= 100

      if (this.windowWidth < width) {
        width = this.windowWidth
      }

      if (this.windowHeight < height) {
        height = this.windowHeight
      }

      let scale = 1
      const scaleWidth = width / 720
      const scaleHeight = height / 540
      if (scaleWidth > scaleHeight) {
        scale = scaleHeight
      } else {
        scale = scaleWidth
      }

      console.log('rendering Course')
      const ref = this
      this.pdfElement.getPage(this.currentPage).then(function(pdfPage) {
        const viewport = pdfPage.getViewport({ scale: scale })
        const canvas = document.getElementById('PDFCanvas') as HTMLCanvasElement
        const ctx = canvas.getContext('2d')
        canvas.width = viewport.width
        canvas.height = viewport.height

        // Render PDF page into canvas context
        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        }
        const renderTask = pdfPage.render(renderContext)

        // Wait for rendering to finish
        renderTask.promise.then()
      })
    },

    calculateCanvasSize() {
      if (this.windowWidth < this.windowHeight) {
        this.canvasWidth = this.windowWidth
        this.canvasHeight = (this.windowWidth * (720 / 540))
      } else {
        this.canvasHeight = this.windowHeight
        this.canvasWidth = (this.canvasHeight * (540 / 720))
      }
      return true
    },

    changePage(direction: number) {
      const newCurrentPage = this.currentPage + direction

      if (newCurrentPage <= this.lastPage && newCurrentPage >= 1) {
        this.currentPage = newCurrentPage
        this.$emit('pagechange', this.currentPage, this.lastPage)
        this.renderCourse()
      }
    },
  },
})
</script>


<style lang="scss">
.loading {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: auto;
}

.pageControl {
  opacity: 0;
  width: 100vw;
  height: 90%;
  position: absolute;
  display: flex;
  justify-content: center;

  button {
    display: block;
    width: 100%;
  }
}
</style>
