<template>
  <div class="dgv-filter-operator-select">
    <span
      v-if="operators.length > 1"
      v-for="operator in operators"
      :key="operator"
      tabindex="0"
      class="dgv-filter-operator-item"
      :class="{
        'dgv-selected-filter-operator': operator === modelValue,
      }"
      :title="getTitle(operator)"
      @click="onClick(operator)"
      @keydown.enter="onClick(operator)"
      @keydown.space="onClick(operator)"
    >
      <Icon :name="`operator-${getOperatorName(operator)}`" />
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { FilterOperator } from '../Filter'
import Formatter from '../Formatter'
import Icon from './Icon.vue'

/** @group Components */
export default defineComponent({
  name: 'FilterOperatorSelect',
  components: {
    Icon,
  },
  props: {
    operators: {
      type: Array<FilterOperator>,
      required: true,
    },
    modelValue: {
      type: Number,
    },
  },
  methods: {
    getOperatorName(operator: FilterOperator): string {
      return FilterOperator[operator]
    },
    getTitle(operator: FilterOperator): string {
      return Formatter.fromCamelCase(FilterOperator[operator])
    },
    onClick(operator: FilterOperator) {
      if (operator === this.modelValue) {
        return
      }
      this.$emit('update:modelValue', operator)
    },
  },
})
</script>
