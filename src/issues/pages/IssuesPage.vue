<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import { useRoute } from 'vue-router';
import IssueCard from '../components/issue-list/IssueCard.vue';
import useIssue from '../composables/useIssue';

const route = useRoute();
const { id } = route.params;

const { data, isLoading, comments, commentsIsLoading } = useIssue(+id);
</script>
<template>
  <router-link class="text-white" to="/"> Go Back</router-link>
  <!-- Header -->
  <LoaderSpinner
    v-if="isLoading"
    color="white"
    :thickness="1"
    :show-text="false"
    size="1.5rem"
  />
  <IssueCard v-else-if="data" :issue="data" />
  <p v-else>Issue with ID {{ id }} not found</p>

  <!-- Comentarios -->
  <LoaderSpinner
    v-if="commentsIsLoading"
    :thickness="1"
    size="1.5rem"
    :show-text="false"
  />

  <div v-else-if="comments" class="column">
    <div class="text-h3 q-mb-md">Comments ({{ comments.length }})</div>
    <IssueCard v-for="comment of comments" :key="comment.id" :issue="comment" />
  </div>
</template>
<style scoped lang="scss"></style>
