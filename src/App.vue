<template>
  <div class="navbar">
    <section class="brand">
      <h1>BHP Solutions</h1>
    </section>
    <section class="controls">
      <button v-if="currentView == 1 && currentPage == lastPage" v-on:click="showTest()">Przejdź do testu</button>
      <span class="currentPageCount" v-if="currentView == 1"
        >{{ currentPage }} / {{ lastPage }}</span
      >
      <button v-if="isFullscreen == false" v-on:click="runToggleFullscreen()">
        [ ]
      </button>
      <button v-if="isFullscreen == true" v-on:click="runToggleFullscreen()">
        X
      </button>
    </section>
  </div>
  <div class="viewContainer">
    <section class="beginCourse" v-if="currentView == 0">
      <h1 class="courseTitle">Alicja w krainie czarów</h1>
      <button v-on:click="currentView = 1">Rozpocznij kurs</button>
    </section>
    <PDFSlides @pagechange="changePage" fileUrl="szkolenie.pdf" v-if="currentView == 1"></PDFSlides>
    <CourseTest
      v-if="currentView == 2"
      apiURL="get_questions.php"
    ></CourseTest>
  </div>
</template>

<script lang="ts">
import toggleFullscreen from 'toggle-fullscreen'
import PDFSlides from './components/PDFSlides.vue'
import CourseTest from './components/CourseTest.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PDFCourse',
  components: {
    PDFSlides,
    CourseTest,
  },

  data() {
    return {
      isFullscreen: false,

      currentView: 0,

      currentPage: 1,
      lastPage: 0,
    }
  },

  methods: {
    runToggleFullscreen() {
      this.isFullscreen = !this.isFullscreen
      const element = document.getElementById('PDFCourse') as Element
      toggleFullscreen(element)
    },

    showCourse() {
      this.currentView = 1
    },

    changePage(currentPage: number, lastPage: number) {
      this.currentPage = currentPage
      this.lastPage = lastPage
    },

    showTest() {
      this.currentView = 2
    },
  },
})
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}

button {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  outline: none;
  border: none;

  background: rgba(35, 54, 95, 0.932);
  color: white;
  font-size: 1.2rem;
  padding: 0.3rem 0.8rem;

  font-weight: 700;
}

button:hover {
  cursor: pointer;
  background: rgba(35, 54, 95, 0.829);
}

button:active {
  background: rgb(35, 54, 95);
}

.currentPageCount {
  font-size: 1.2rem;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen;
}

#PDFCourse {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  width: 1080px;
  max-width: 100vw;
  min-height: 100vh;

  margin: auto;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 3em 1fr;
  gap: 0px 0px;
  grid-template-areas:
    '.'
    '.';

  .navbar {
    color: white;
    background: rgb(35, 54, 95);

    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 3em;
    gap: 0px 0px;
    grid-template-areas: '. .';

    .brand {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 1rem;
    }

    .controls {
      padding-right: 1rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }

  .viewContainer {
    height: 100%;
    width: 100%;

    display: flex;
    justify-content: center;
    justify-self: center;
    align-content: center;
    align-items: center;

    background: white;

    .beginCourse {
      margin-top: -5rem;
      font-size: 1.3rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .courseTitle {
        text-align: center;
        margin-bottom: 5rem;
      }
    }
  }
}
</style>
