<script setup lang="ts">
/**
 * Renders content that is hidden visually but still read by screen readers.
 * Used for live-region announcements and extra context on icon-only controls.
 */
withDefaults(defineProps<{ as?: string }>(), { as: 'span' })
</script>

<template>
  <component :is="as" class="ui-visually-hidden"><slot /></component>
</template>
