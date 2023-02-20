<template>
  <div class="dgv-filter-operator-select">
    <span 
      v-if="operators.length > 1"
      v-for="operator in operators"
      :key="operator"
      tabindex="0"
      class="dgv-filter-operator-item"
      :class="{
        'dgv-selected-filter-operator': operator === modelValue
      }"
      :title="getTitle(operator)"
    >
      <Icon :name="`operator-${getOperatorName(operator)}`" />
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { FilterOperator } from '@/Filter';
import Formatter from '@/Formatter';
import Icon from './Icon.vue';

export default defineComponent({
  name: "FilterOperatorSelect",
  components: { 
    Icon,
  },
  props: {
    operators: {
      type: Object as PropType<FilterOperator[]>,
      required: true,
    },
    modelValue: {
      type: Object as PropType<FilterOperator>,
    },
  },
  methods: {
    getOperatorName(operator: FilterOperator): string {
      return FilterOperator[operator]
    },
    getTitle(operator: FilterOperator): string {
      return Formatter.fromCamelCase(FilterOperator[operator])
    },
  },
})
</script>
