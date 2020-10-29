<template>
  <div class="test">
    <h1 style="text-align: center">Szkolenie BHP - test sprawdzający</h1>

    <h3 style="text-align: right" class="testDate">Data: {{ getDate() }}</h3>

    <form class="formData">
      <p>
        <label for="">Imię i Nazwisko</label>
        <input
          type="text"
          name="fullname"
          id="TfullName"
          v-model="testFullname"
        />
      </p>
      <p>
        <label for="">Data urodzenia</label>
        <input
          type="date"
          name="birthdate"
          id="Tbirthdate"
          v-model="testBirthdate"
        />
      </p>
      <p>
        <label for="">Miejsce urodzenia</label>
        <input
          type=" text"
          name="birthplace"
          id="Tbirthplace"
          v-model="testBirthplace"
        />
      </p>
      <p>
        <label for="">Nazwa firmy</label>
        <input
          type=" text"
          name="companyName"
          id="TcompanyName"
          v-model="testCompanyName"
        />
      </p>
      <p>
        <label for="">Tel. kontaktowy</label>
        <input type=" text" name="phone" id="Tphone" v-model="testPhone" />
      </p>
    </form>

    <p>
      Prosimy o wypełnienie testu wybierając prawidłową odpowiedź. Test
      jednokrotnego wyboru.
    </p>

    <form class="formTest">
      <ol>
        <li
          v-for="(question, question_i) in testQuestions"
          v-bind:key="question_i"
        >
          <h5>{{ question[0] }}:</h5>

          <ol>
            <input
              type="radio"
              v-bind:name="question_i + 'A'"
              value="1"
              v-bind:id="question_i + 'A'"
              v-model="questionAnswers[question_i]"
            />
            <label v-bind:for="question_i + 'A'">{{ question[1] }}</label>
            <br />
            <input
              type="radio"
              v-bind:name="question_i + 'B'"
              value="2"
              v-bind:id="question_i + 'B'"
              v-model="questionAnswers[question_i]"
            />
            <label v-bind:for="question_i + 'B'">{{ question[2] }}</label>
            <br />
            <input
              type="radio"
              v-bind:name="question_i + 'C'"
              value="3"
              v-bind:id="question_i + 'C'"
              v-model="questionAnswers[question_i]"
            />
            <label v-bind:for="question_i + 'C'">{{ question[3] }}</label>
          </ol>
        </li>
      </ol>
    </form>

    <h2 style="text-align: center">OŚWIADCZENIE EGAZMINOWANEGO</h2>
    <input
      type="checkbox"
      name="agreement"
      id="agreed"
      v-model="agreement"
      true-value="true"
      false-value="false"
    />
    <label for="agreed"
      >Oświadczam, że zapoznałem się z wszystkimi materiałami szkoleniowymi oraz
      samodzielnie rozwiązałem powyższy test sprawdzający.</label
    >
    <br />
    <br />
    <br />
    <button style="float: right" v-on:click="submitTest()">Zapisz i wyślij</button>
    <br />
    <h3>Dziękujemy</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CourseTest',
  props: {
    apiURL: String,
  },
  data() {
    return {
      testFullname: '',
      testBirthdate: '',
      testBirthplace: '',
      testCompanyName: '',
      testPhone: '',

      testCanStart: false,
      testQuestions: null,
      testHasError: false,

      questionAnswers: [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      agreement: false,
    }
  },
  mounted() {
    this.$http
      .get(this.apiURL as string)
      .then((response) => (this.testQuestions = response.data))
      .catch(() => (this.testHasError = true))
  },
  methods: {
    getDate() {
      return new Date().toLocaleDateString('pl')
    },

    submitTest() {
      if (!this.agreement) {
        alert('Zaznacz oświadczenie!')
        return
      }

      for (let i = 0; i < this.questionAnswers.length; ++i) {
        if (this.questionAnswers[i] == null) {
          alert('Odpowiedź na pytanie #' + (i + 1) + ' nie została udzielona!')
          return
        }
      }

      if (
        !this.testFullname ||
        !this.testBirthdate ||
        !this.testBirthplace ||
        !this.testCompanyName ||
        !this.testPhone
      ) {
        alert('Uzupełnij swoje dane!')
        return
      }

      this.sendData()
    },

    sendData() {
      let answers = ''
      for (let i = 0; i < this.testQuestions.length; ++i) {
        answers +=
          'Pytanie #' + (i + 1) + ' (' + this.testQuestions[i][0] + '):\n'
        answers += '\t'

        if (this.questionAnswers[i] === '1') answers += 'A'
        else if (this.questionAnswers[i] === '2') answers += 'B'
        else answers += 'C'
        answers += ' - ' + this.testQuestions[i][this.questionAnswers[i]] + '\n'
      }

      const data = {
        fullname: this.testFullname,
        birthdate: this.testBirthdate,
        birthplace: this.testBirthplace,
        companyname: this.testCompanyName,
        telephone: this.testPhone,
        answers: answers,
      }

      this.$http
        .post(
          'send_email.php',
          data,
        )
        .then(() =>
          alert('Test został przesłany. Wkrótce się odezwiemy'),
        )
        .catch(() =>
          alert('Wystąpił błąd podczas przesyłania. Skontaktuj się z nami'),
        )
    },
  },
})
</script>

<style lang="scss">
#test {
  margin: 1rem;

  font-size: 1.1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.formTest > ol {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    '. .'
    '. .'
    '. .'
    '. .'
    '. .';
}

.formData > p {
  display: grid;
  grid-template-columns: 150px 150px;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: '. .';

  margin: 0.1rem;
  padding: 0.1rem;
}

@media screen and (max-width: 500px) {
    .formTest > ol {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        gap: 0px 0px;
        grid-template-areas:
            '. '
            '. '
            '. '
            '. '
            '. '
            '. '
            '. '
            '. '
            '. '
            '. ';
    }
}
</style>
