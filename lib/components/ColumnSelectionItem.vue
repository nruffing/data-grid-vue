<template>
  <label class="dgv-toggle-container">
    <span class="dgv-toggle">
      <input
        type="checkbox"
        v-model="shown"
        :name="column.field.fieldName"
        autocomplete="off"
      />
      <span class="dgv-toggle-slider"></span>
    </span>
    <span class="dgv-column-selection-label">{{ formattedTitle }}</span>
  </label>
</template>

<script lang="ts" setup>
import { ref, type PropType, watch, defineEmits } from 'vue'
import { useColumn } from '../composables/Column'
import type { Column } from '../DataGridVue'

const props = defineProps({
  column: {
    type: Object as PropType<Column>,
    required: true,
  },
})

const emit = defineEmits(['hidden-updated'])

const { formattedTitle } = useColumn(props.column)

const shown = ref(!props.column.hidden)
watch(shown, newValue => emit('hidden-updated', !newValue))
</script>
