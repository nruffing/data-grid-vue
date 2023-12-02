<template>
  <div class="dgv-filter-operator-select">
    <!--
      aria-label attribute cannot be used on a span with no valid role attribute.
      https://dequeuniversity.com/rules/axe/4.8/aria-prohibited-attr?application=AxeChrome
      https://www.w3.org/TR/wai-aria-1.1/#role_definitions
      https://dequeuniversity.com/rules/axe/4.8/aria-required-attr?application=AxeChrome
    -->
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
      :aria-label="getTitle(operator)"
      role="radio"
      :aria-checked="operator === modelValue"
      @click="onClick(operator)"
      @keydown.enter="onClick(operator)"
      @keydown.space="onClick(operator)"
    >
      <Icon :name="`operator-${getOperatorName(operator)}`" />
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { FilterOperator } from '../Filter'
import Formatter from '../Formatter'
import Icon from './Icon.vue'

/**
 * @group Components
 * @description The filter operator select control that is displayed when a column
 * is configured with more then one filter operator.
 * @see {@link Column.filterable}
 * @see {@link Column.filterOptions}
 * @see {@link FilterOperator}
 */
export default defineComponent({
  name: 'FilterOperatorSelect',
  components: {
    Icon,
  },
  props: {
    /**
     * @description The {@link FilterOperator} values configured on the {@link Column}.
     */
    operators: {
      type: Array as PropType<FilterOperator[]>,
      required: true,
    },
    /**
     * @description The selected {@link FilterOperator}.
     * @defaultValue FilterOperator.equals
     */
    modelValue: {
      type: Number as PropType<FilterOperator>,
      required: false,
      default: FilterOperator.equals,
    },
  },
  emits: {
    /**
     * @group emits
     * @description Event emitted when the {@link FilterOperator} state has been updated.
     * @param operator The new {@link FilterOperator} state.
     */
    'update:modelValue'(operator: FilterOperator): boolean {
      return true
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
