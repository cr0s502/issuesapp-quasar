<script setup lang="ts">
import { Issue, State } from 'src/issues/interfaces/issues';
import { timeSince } from 'src/shared/helpers';
import { ref } from 'vue';
import VueMarkdown from 'vue-markdown-render';
import type { Options } from 'markdown-it';
import useIssue from '../../composables/useIssue';

interface Props {
  issue: Issue;
}

const options = ref<Options>({
  html: true,
  linkify: true,
  typographer: true,
});

const { issue } = defineProps<Props>();

const { setIssueCacheData } = useIssue(issue.number, {
  autoload: false,
});
</script>
<template>
  <q-card
    @mouseenter="setIssueCacheData(issue)"
    class="text-black col-12 q-mb-md"
    flat
    bordered
  >
    <!-- <q-card @mouseenter="prefetchIssue(issue.number)" class="text-black col-12 q-mb-md" flat bordered > -->
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img :src="issue.user.avatar_url" alt="User Avatar" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>
          <router-link :to="`/issue/${issue.number}`">{{
            issue.title
          }}</router-link>
        </q-item-label>
        <q-item-label caption>
          {{ timeSince(issue.created_at) }} ago
        </q-item-label>
      </q-item-section>

      <q-item-section>
        <q-item-label class="row items-center justify-end">
          <q-item-label class="q-mr-md">
            <q-icon name="question_answer" />
            {{ issue.comments }}
          </q-item-label>
          <q-chip
            v-if="issue.state === State.Closed"
            color="positive"
            text-color="white"
            icon="check"
          >
            Closed
          </q-chip>
          <q-chip v-else color="negative" text-color="white" icon="bug_report">
            Open
          </q-chip>
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-item-section class="q-pa-md markdown">
      <vue-markdown :source="issue.body || ''" :options="options" />
    </q-item-section>

    <q-separator />

    <q-item-section class="q-pa-xs q-gutter-xs">
      <div>
        <q-chip
          v-for="label in issue.labels"
          :key="label.id"
          :style="{ color: `#${label.color}` }"
          outline
        >
          {{ label.name }}
        </q-chip>
      </div>
    </q-item-section>
  </q-card>
</template>
<style lang="scss">
.markdown {
  img {
    width: 550px;
  }

  a {
    img {
      width: 200px;
    }
  }
}
</style>
