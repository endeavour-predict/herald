<template>
  <nhs-header show-nav show-search>
    <nhs-header-item href="https://www.nhs.uk/conditions"> Header Item 1 </nhs-header-item>
    <nhs-header-item href="https://www.nhs.uk/live-well/"> Header Item 2 </nhs-header-item>
    <nhs-header-item href="https://www.nhs.uk/news/"> Header Item 3 </nhs-header-item>
    <nhs-header-item href="https://www.nhs.uk/service-search"> Header Item 4 </nhs-header-item>
  </nhs-header>

  <nhs-body>
    <nhs-main>
      <nhs-select
        id="select"
        label="Select label"
        hint="Select hint. For some reason the label for this isn't customisable like the others."
        v-model="selectModel"
      >
        <option v-for="item in selectItems" :key="item.value">
          {{ item.label }}
        </option>
      </nhs-select>

      <nhs-radios
          label="Radio label"
          hint="Radio hint."
          heading-size="s"
          :items="radioItems"
          v-model="radioModel"
          :rules="radioRules"
      >
        <template #item-conditional="{ item }">
          <nhs-input v-if="item.conditionalProps"
              :label="item.conditionalProps.label"
              class="nhsuk-u-width-two-thirds"
              v-model="radioInputModels[item.value]"
          ></nhs-input>
        </template>
      </nhs-radios>

      <nhs-checkboxes
          :items="checkboxItems"
          v-model="checkboxModel"
          label="Checkbox label"
          hint="Checkbox hint. Almost identical to radio."
          heading-size="s"
          id="contact"
          page-heading
      >
      </nhs-checkboxes>

      <nhs-details text="Details list for further information?">
        <p>Extra details for questions that might be confusing.</p>
        <p>List:</p>
        <ul>
          <li>Thing one</li>
          <li>Thing two</li>
          <li>Thing three</li>
        </ul>
      </nhs-details>

      <nhs-form v-model="formValid" @submit="onSubmitInput()" @reset="onResetInput()">
        <nhs-input
            label="Form label"
            hint="Form hint. Form can be validated using provided rules."
            :rules="formRules"
            v-model="formModel"
        >
        </nhs-input>
        <nhs-row>
          <nhs-col :span="33">
            <nhs-button type="submit">Validate</nhs-button>
          </nhs-col>
          <nhs-col :span="33">
            <nhs-button type="reset">Reset</nhs-button>
          </nhs-col>
        </nhs-row>
      </nhs-form>

      <nhs-form @submit="onSubmitGroupInput()" @reset="onResetGroupInput()" v-model="inputGroupValid">
        <nhs-input-group
            label="Group input label"
            hint="DOB input e.g. 31 3 1980"
            :items="inputGroupItems"
            v-model="inputGroupModel"
        >
          <template #hint="{ hint }">
            <a>{{ hint }}</a>
          </template>

          <template #error="{ error }">
            {{ error }}
          </template>

          <template #item-label="{ item }">
            {{ item.label }}
          </template>
        </nhs-input-group>
        <nhs-row>
          <nhs-col :span="33">
            <nhs-button type="submit">Validate</nhs-button>
          </nhs-col>
          <nhs-col :span="33">
            <nhs-button type="reset">Reset</nhs-button>
          </nhs-col>
        </nhs-row>
      </nhs-form>

      <nhs-button @click="clickHandler('primary')"> Primary Button </nhs-button>
      <nhs-button color="secondary" @click="clickHandler('secondary')"> Secondary Button </nhs-button>
      <nhs-button color="reverse" @click="clickHandler('reverse')"> Reverse Button </nhs-button>
      <nhs-warning-callout heading="Important">
        <p>This is an example warning. <span v-if="clicked"> You clicked a {{ buttonValue }} button. </span>  </p>
      </nhs-warning-callout>
    </nhs-main>
  </nhs-body>
  <nhs-footer>
    <nhs-footer-item href="https://www.nhs.uk/Pages/nhs-sites.aspx">
      Accessibility statement
    </nhs-footer-item>
    <nhs-footer-item href="https://www.nhs.uk/about-us"> Contact us </nhs-footer-item>
    <nhs-footer-item href="https://www.nhs.uk/contact-us/"> Cookies </nhs-footer-item>
    <nhs-footer-item href="https://www.nhs.uk/about-us/sitemap/"> Privacy policy </nhs-footer-item>
    <nhs-footer-item href="https://www.nhs.uk/our-policies/">
      Terms and conditions
    </nhs-footer-item>
  </nhs-footer>
</template>

<script setup lang="ts">
import { defineComponent, defineProps, ref } from 'vue';

const clicked = ref(false);
const buttonValue = ref('');

const selectModel = ref('');
const selectItems = ref([
  {
    label: 'Dropdown Option 1',
    value: 1
  },
  {
    label: 'Dropdown Option 2',
    value: 2
  },
  {
    label: 'Dropdown Option 3',
    value: 3
  }
]);

const radioModel = ref('')
const radioItems = ref([
  {
    label: 'Radio Option 1',
    value: 1
  },
  {
    label: 'Radio Option 2 (validation test)',
    value: 2
  },
  {
    divider: 'or'
  },
  {
    label: 'Radio Option 3 (optional input)',
    conditionalProps: {
      label: 'Optional input'
    },
    conditional: true,
    value: 3
  }
]);
const radioRules = ref([ (v: string) => v != '2' || 'This is for invalid selected values']);
const radioInputModels = ref({
  input: ''
});

const checkboxModel = ref([])
const checkboxItems = ref([
  {
    label: 'Checkbox Option 1',
    value: 1
  },
  {
    label: 'Checkbox Option 2',
    value: 2
  },
  {
    label: 'Checkbox Option 3',
    value: 3
  }
]);

const formRules = ref([(v: string) => !!v || 'Example. Form must have a value.']);
const formModel = ref('');
const formValid = ref(false);

const inputGroupRules = ref([(v: string) => !!v || 'Example. Form must have a value.']);

const inputGroupModel = ref({});
const inputGroupItems = ref([
  {
    label: 'Day',
    width: '2',
    type: 'number',
    rules: [(v: string) => !!v || 'Error message goes here']
  },
  {
    label: 'Month',
    width: '2',
    type: 'number',
    rules: [(v: string) => !!v || 'Error message goes here']
  },
  {
    label: 'Year',
    width: '4',
    type: 'number',
    rules: [(v: string) => !!v || 'Error message goes here']
  }
]);
const inputGroupValid = ref(false);

function clickHandler(msg: string): void {
  clicked.value = true;
  buttonValue.value = msg;
}

function onSubmitInput(): void {
  if (formValid.value) {
    alert('Validated form');
  }
}

function onResetInput(): void {
  formModel.value = '';
}

function onSubmitGroupInput(): void {
  if (inputGroupValid.value) {
    alert('Validated form');
  }
}

function onResetGroupInput(): void {
  inputGroupModel.value = {};
}

</script>

<style scoped>

.nhsuk-button {
  margin-right: 12px;
}


</style>
