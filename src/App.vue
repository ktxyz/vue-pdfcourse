<template>
  <div class="navbar">
    <section class="brand">
      <h1>BHP Solutions</h1>
    </section>
    <section class="controls">
      <button v-if="isFullscreen == false" v-on:click="runToggleFullscreen()">
        [ ]
      </button>
      <button v-if="isFullscreen == true" v-on:click="runToggleFullscreen()">
        _X_
      </button>
    </section>
  </div>
  <div class="viewContainer">
    <section class="beginCourse" v-if="currentView == 0">
      <button v-on:click="currentView = 1">Rozpocznij kurs</button>
    </section>
    <PDFSlides v-if="currentView == 1"></PDFSlides>
  </div>
</template>

<script lang="ts">
import toggleFullscreen from 'toggle-fullscreen'

import PDFSlides from './components/PDFSlides.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'PDFCourse',
  components: {
    PDFSlides,
  },

  data() {
    return {
      isFullscreen: false,

      currentView: 0,
    }
  },

  methods: {
    runToggleFullscreen() {
      this.isFullscreen = !this.isFullscreen

      const element = document.getElementById('PDFCourse') as Element
      toggleFullscreen(element)
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

  background: rgba(35, 54, 95, 0.829);
  color: white;
  font-size: 1.2rem;

  font-weight: 700;
}

button:hover {
  cursor: pointer;
  background: rgba(35, 54, 95, 0.753);
}

button:active {
  background: rgb(35, 54, 95);
}

#PDFCourse {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  width: 720px;
  max-width: 100vw;
  min-height: 100vh;

  margin: auto;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 4em 1fr;
  gap: 0px 0px;
  grid-template-areas:
    '.'
    '.';

  .navbar {
    color: white;
    background: rgb(35, 54, 95);

    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 4em;
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
  }
}
</style>
