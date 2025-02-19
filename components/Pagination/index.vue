<template>
  <div
    v-if="totalPages"
    class="text-sm flex !justify-end gap-x-6 items-center relative z-[999] text-[#212B36] py-2"
    :class="wrapperClass"
  >
    <div class="flex gap-x-4">
      <span>Rows per page:</span>
      <span>
        <select
          @change="(e) => perPageChanged(e.target.value)"
          class="outline-none"
        >
          <option class="px-3" :value="n * 10" v-for="n in 5">
            {{ n * 10 }}
          </option>
        </select>
      </span>
    </div>
    <span>
      <span>{{ current }}</span> of <span>{{ totalPages }}</span>
    </span>
    <ul
      class="pagination mx-auto lg:mx-0 ] p-[10px] flex gap-x-4"
      :class="paginationClass"
    >
      <li class="leading-4">
        <button
          @click.prevent="changePage(prevPage)"
          :disabled="current === 1"
          :class="current === 1 ? ' opacity-50 cursor-not-allowed' : ''"
        >
          <span class="text-xl"
            ><AppIcon icon="flowbite:angle-left-outline"
          /></span>
        </button>
      </li>

      <li class="leading-4 dark:text-[#333]">
        <button
          @click.prevent="changePage(nextPage)"
          :disabled="current === totalPages"
          :class="
            current === totalPages ? ' opacity-50 cursor-not-allowed' : ''
          "
        >
          <span class="text-xl"
            ><AppIcon icon="flowbite:angle-right-outline"
          /></span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Pagination",

  props: {
    options: {
      type: Array,
      default: () => [{}],
    },
    enableText: {
      type: Boolean,
      default: false,
    },
    enableInput: {
      type: Boolean,
      default: false,
    },
    enableSelect: {
      type: Boolean,
      default: false,
    },
    enableSearch: {
      type: Boolean,
      default: false,
    },
    pageChanged: {
      type: Function,
    },
    perPageChanged: {
      type: Function,
    },
    current: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    perPage: {
      type: Number,
      default: 10,
    },
    pageRange: {
      type: Number,
      default: 2,
    },
    textBeforeInput: {
      type: String,
      default: "Go to page",
    },
    textAfterInput: {
      type: String,
      default: "Go",
    },
    paginationClass: {
      type: String,
      default: "default",
    },
    searchClasss: {
      type: String,
      default: "default",
    },
    wrapperClass: {
      type: String,
      default: "justify-between",
    },
  },
  data() {
    return {
      input: "",
      input2: null,
    };
  },
  methods: {
    hasFirst: function () {
      return this.rangeStart !== 1;
    },
    hasLast: function () {
      return this.rangeEnd < this.totalPages;
    },
    hasPrev: function () {
      return this.current > 1;
    },
    hasNext: function () {
      return this.current < this.totalPages;
    },
    changePage: function (page) {
      if (page > 0 && page <= this.totalPages) {
        this.$emit("page-changed", page);
      }
      if (this.pageChanged) {
        this.pageChanged({ currentPage: page });
      }
    },
    customPerPageChange(page) {
      this.perPageChanged({ currentPerPage: page });
    },
  },
  computed: {
    pages: function () {
      var pages = [];

      for (var i = this.rangeStart; i <= this.rangeEnd; i++) {
        pages.push(i);
      }

      return pages;
    },
    rangeStart: function () {
      var start = this.current - this.pageRange;

      return start > 0 ? start : 1;
    },
    rangeEnd: function () {
      var end = this.current + this.pageRange;

      return end < this.totalPages ? end : this.totalPages;
    },
    totalPages: function () {
      return Math.ceil(this.total / this.perPage);
    },
    nextPage: function () {
      return this.current + 1;
    },
    prevPage: function () {
      return this.current - 1;
    },
  },
});
</script>
<style scoped lang="scss">
.pagination {
  @apply flex items-center space-x-1 flex-wrap;
  li {
    a,
    div {
      @apply bg-transparent   text-[10px] sm:text-xs lg:text-sm font-normal rounded-lg leading-[16px] flex h-6 lg:h-10 w-6 lg:w-10 items-center justify-center transition-all duration-150;
      &.active {
        @apply bg-[#EFF1F5] text-[#333] font-medium;
      }
    }
  }
  &.bordered {
    @apply border border-[#D8DEE6] rounded-[3px] py-1 px-2;
    li {
      @apply text-slate-500;
      &:first-child,
      &:last-child {
        button {
          @apply hover:bg-primary-500  hover:text-[#333] transition duration-150 text-slate-500 h-10 w-10 flex items-center justify-center rounded;
        }
      }
      a,
      div {
        @apply bg-transparent text-slate-500;
        &.active {
          @apply bg-primary-500  text-[#333];
        }
      }
    }
  }
  &.border-group {
    @apply border border-[#D8DEE6] rounded-[3px]  px-0 space-x-0;
    li {
      @apply border-r border-[#D8DEE5] h-full flex flex-col  justify-center px-3  last:border-none text-slate-500;
      a,
      div {
        @apply bg-transparent text-slate-500 dark:text-[#333] h-auto w-auto;
        &.active {
          @apply dark:text-[#333] text-lg;
        }
      }
    }
  }
}
</style>
