<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useLabels from '../../composables/useLabels';
const { data, isLoading, toggleLabel, selectedLabels } = useLabels();

</script>
<template>
  <div class="q-mt-md">
    <LoaderSpinner
    v-show="isLoading"
    size="50px"
    :thickness="1"
    :show-text="false"
  />
  <q-chip
    v-for="label in data"
    :key="label.id"
    :style="{ color: `#${label.color}`}"
    :outline="!selectedLabels.includes(label.name)"
    clickable
    @click.prevent="toggleLabel(label.name)"
  >
    {{ label.name }}
  </q-chip>
  </div>
</template>
<style scoped lang="scss"></style>
