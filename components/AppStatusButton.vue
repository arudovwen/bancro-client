<template>
  <span
    :class="`px-2 py-[3px] text-xs rounded-[6px] flex gap-x-1 items-center border max-w-max font-semibold ${Stats[status]?.className}`"
  >
    <AppIcon :icon="mini ? icons[status] : 'octicon:dot-fill-24'" />
    <span class=""> {{ Stats[status]?.text }}</span>
  </span>
</template>

<script setup>
import { defineProps } from "vue";
import AppIcon from "@/components/AppIcon";

const props = defineProps(["status", "type", "stattype", "mini"]);
const StatusClass = {
  0: "text-[#F79009] bg-[#FFFAEB] border-[#FEDF89]",
  1: "text-[#067647] bg-[#ECFDF3] border-[#ABEFC6]",
  2: "text-[#175CD3] bg-[#EFF8FF] border-[#B2DDFF]",
  3: "text-[#363F72] bg-transparent border-[#3E4784]",
  4: "text-[#B42318] bg-[#FEF3F2] border-[#FECDCA]",
  5: "text-[#5925DC] bg-[#F4F3FF] border-[#D9D6FE]",
};

const icons = {
  verified: "flowbite:badge-check-outline",
  pendingactivation: "",
  default: "octicon:dot-fill-24",
};

const TextStatusText = {
  pending: {
    text: "Pending",
    className: StatusClass[0],
  },
  pendingactivation: {
    text: "Pending",
    className: StatusClass[0],
  },
  active: {
    text: "Active",
    className: StatusClass[1],
  },
  rejected: {
    text: "Cancelled",
    className: StatusClass[4],
  },
  verified: {
    text: "Verified",
    className: StatusClass[1],
  },
  pendingverification: {
    text: "Pending Verification",
    className: StatusClass[0],
  },
};
const StatusText = {
  0: {
    text: "Pending",
    className: StatusClass[0],
  },
  1: {
    text: "Successful",
    className: StatusClass[1],
  },
  2: {
    text: "Cancelled",
    className: StatusClass[4],
  },
};
const DocumentText = {
  0: {
    text: "Not uploaded",
    className: StatusClass[3],
  },
  1: {
    text: "Verification Pending",
    className: StatusClass[0],
  },
  2: {
    text: "Verified",
    className: StatusClass[1],
  },
  3: {
    text: "Rejected",
    className: StatusClass[4],
  },
};
const TeamStatusText = {
  0: {
    text: "Pending",
    className: StatusClass[0],
  },
  1: {
    text: "Active",
    className: StatusClass[1],
  },
  2: {
    text: "Rejected",
    className: StatusClass[4],
  },
};

const Stats = computed(() => {
  if (props.stattype === "teams") {
    return TeamStatusText;
  }

  if (props.stattype === "document") {
    return DocumentText;
  }
  if (props.stattype === "textstattus") {
    return TextStatusText;
  }

  return StatusText;
});
</script>
