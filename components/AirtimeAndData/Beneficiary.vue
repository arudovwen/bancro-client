<template>
  <section class="">
   
    <div class="mb-7">
      <Textinput
        placeholder="Search beneficiary"
        label=""
        name=""
        type="search"
      />
    </div>
    <!-- <div class="grid grid-cols-1 gap-y-[10px] max-h-[300px] overflow-y-auto">
      <div
        class="border border-[#21231D1A] bg-[#A0E1E11A] p-4 rounded-lg flex justify-between"
        v-for="n in 4"
        :key="n"
      >
        <span class="flex items-center gap-x-4">
          <img
            :src="networks.find((i) => i.value === 'mtn')?.imgUrl"
            class="w-9 h-9 rounded-full"
            width="36"
            height="36"
          />
          <span class="block">
            <span
              class="text-sm text-[#344054] font-medium block leading-normal"
              >MTN</span
            >
            <span class="text-sm text-[#98A2B3] block leading-normal"
              >0731082157</span
            >
          </span>
        </span>
        <span class="text-sm text-[#344054] font-semibold block leading-normal"
          ><SvgTrash
        /></span>
      </div>
    </div> -->
     <EmptyData title="No beneficiary found" type="notfound" classIcon="w-[120px] h-auto" />
  </section>
</template>
