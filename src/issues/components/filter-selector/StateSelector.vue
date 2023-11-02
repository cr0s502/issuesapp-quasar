<script setup lang="ts">
import { ref } from 'vue';
import { useIssuesStore } from 'src/stores/issues';

interface Options {
  label: string;
  value: string;
}

const issuesStore = useIssuesStore();



const options = ref<Options[]>([
    {label: 'All', value: ''},
    {label: 'Open', value: 'open'},
    {label: 'Closed', value: 'closed'}
])

</script>
<template>
  <q-btn-toggle
  v-model="issuesStore.state"
  toggle-color="primary"
  flat
  :options="options"
/>
</template>
<style scoped lang="scss"></style>
