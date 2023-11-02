<script setup lang="ts">
import { Issue } from 'src/issues/interfaces';
import IssueCard from './IssueCard.vue';
interface Props{
  issues: Issue[];
}

const { issues } = defineProps<Props>()
</script>
<template>
  <div class="row">
    <IssueCard v-for="issue of issues" :issue="issue" :key="issue.id"/>
  </div>
</template>
<style scoped lang="scss"></style>
