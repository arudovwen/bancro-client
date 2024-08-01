<template>
  <section class="w-[420px]">
    <h2 class="text-xl font-semibold mb-6 block text-[#344054]">
      Beneficiaries
    </h2>
    <div class="mb-7">
      <Textinput
        placeholder="Search beneficiary"
        label=""
        name=""
        type="search"
      />
    </div>
    <div class="grid grid-cols-1 gap-y-[10px] max-h-[300px] overflow-y-auto">
      <div
        class="border-b border-[#21231D1A] last:border-none p-4 rounded-lg flex justify-between"
        v-for="n in 4"
        :key="n"
      >
        <span class="flex items-center gap-x-4">
          <SvgBeneficiary />
          <span class="block">
            <span
              class="text-sm text-[#344054] font-medium block leading-normal"
              >Ralph Edwards</span
            >
            <span class="text-sm text-[#98A2B3] block leading-normal"
              >0731082157 - Access Bank</span
            >
          </span>
        </span>
        <span class="text-sm text-[#344054] font-semibold block leading-normal"
          ><SvgTrash
        /></span>
      </div>
    </div>
  </section>
</template>
