<template>
  <h2 class="text-xl font-medium text-[#182230] mb-3">Other Information</h2>

  <div class="border-b mt-2 mb-7 border-[#D0D5DD]" />
  <form @submit.prevent="onSubmit" class="bg-white rounded-xl">
    <div>
      <div class="grid grid-cols-1 gap-y-4">
        <div v-for="(other, index) in others" :key="index">
          <Textinput
            placeholder=""
            :label="other.name"
            :name="other.name"
            v-model="other.value"
            :error="errors.others?.[index]"
          />
        </div>

        <div class="mb-3 mt-4 flex justify-end gap-x-4">
          <AppButton
            type="button"
            :isLoading="isLoading"
            @click="activeForm--"
            text="Back"
            btnClass="text-primary bg-white border !py-[10px] px-20 min-w-[156px] !rounded-lg font-semibold"
            :isDisabled="isLoading"
          />
          <AppButton
            type="submit"
            :isLoading="isLoading"
            text="Next"
            btnClass="text-white bg-danger-500  !py-[10px] !px-10 !rounded-lg min-w-[156px] font-semibold"
            :isDisabled="isLoading"
          />
        </div>
      </div>
    </div>
  </form>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";

// Reactive states

const isLoading = ref(false);
const activeForm = inject("activeForm");
const formValues = inject("formValues");

// Yup validation schema for multiple file uploads
const schema = yup.object({
  others: yup
    .array()
    .of(
      yup.object({
        value: yup.string().required("This field is required"),
      })
    )
    .min(1, "At least one file is required."),
});

// Vee-validate hooks and form fields
const { handleSubmit, errors, setValues, defineField } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});
const [others] = defineField("others");

// Form submission handler
const onSubmit = handleSubmit((values) => {
  console.log("🚀 ~ onSubmit ~ values:", values);
  formValues.others = values.others;
  activeForm.value = 4;
});
</script>
