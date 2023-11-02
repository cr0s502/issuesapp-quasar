<script setup lang="ts">
interface Props {
  color?: string;
  size?: string;
  thickness?: number;
  showText?: boolean;
}

const { color, size, thickness, showText } = withDefaults(defineProps<Props>(), {
  color: 'primary',
  size: '3rem',
  thickness: 2,
  showText: true,
});
</script>
<template>
  <div class="column items-center">
    <q-spinner :color="color" :size="size" :thickness="thickness" />
    <span class="1-mt-sm" v-show="showText"> Loading </span>
  </div>
</template>
<style scoped lang="scss"></style>
