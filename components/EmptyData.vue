<template>
  <div
    class="flex flex-col items-center justify-center p-4 h-[340px] text-gray-400 text-center"
    :class="className"
  >
    <div class="mb-6 flex justify-center">
      <AppIcon
        icon="fa6-solid:truck"
        :iconClass="`${classIcon} text-6xl text-[#E8E8E8]`"
        v-if="type == 'shipping'"
      />
      <img
        src="~/assets/images/emptyuser.png"
        v-else-if="type == 'user'"
        :class="classIcon"
      />
      <img
        src="/images/campaign.png"
        v-else-if="type == 'campaign'"
        :class="classIcon"
      />
      <img
        src="/images/settlements.svg"
        v-else-if="type == 'settlements'"
        :class="classIcon"
      />
      <img
        src="/images/transaction.svg"
        v-else-if="type == 'transaction'"
        :class="classIcon"
      />
      <img
        src="/images/notfound.svg"
        v-else-if="type == 'notfound'"
        :class="classIcon"
      />
      <img
        src="/images/active.svg"
        v-else-if="type == 'active'"
        :class="classIcon"
      />
      <img src="~/assets/images/empty.svg" v-else :class="classIcon" />
    </div>
    <p :class="titleClass" class="text-base text-[#98A2B3] font-medium mb-1">
      {{ title || "No data available" }}
    </p>
    <p
      v-if="subtext"
      class="text-sm text-[#475467] max-w-[352px] mx-auto text-center"
    >
      {{ subtext }}
    </p>
    <AppButton
      @click="emits('btnFunction')"
      v-if="btnText"
      :text="btnText"
      btnClass="!py-[10px] bg-primary-500 text-white mt-3 !rounded-lg"
      :icon="btnIcon"
    />
  </div>
</template>
<script setup>
defineProps([
  "title",
  "subtext",
  "btnText",
  "url",
  "type",
  "btnIcon",
  "className",
  "classIcon",
  "titleClass",
]);
const emits = defineEmits(["btnFunction"]);
</script>
