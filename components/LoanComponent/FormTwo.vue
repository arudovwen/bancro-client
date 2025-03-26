<template>
  <h2 class="text-xl font-medium text-[#182230] mb-3">Document Uploads</h2>

  <div class="border-b mt-2 mb-7 border-[#D0D5DD]" />

  <form @submit.prevent="onSubmit" class="bg-white rounded-xl">
    <div>
      <div class="grid grid-cols-1 gap-y-4">
        <!-- Multiple File Upload -->

        <div class="flex flex-col gap-y-4">
          <!-- File Upload Fields for Multiple Files -->
          <div v-for="(document, index) in documents" :key="index">
            <FormGroup
              :label="document.documentName"
              :error="errors.documents"
              name="documents"
            >
              <FormsFileUploader
                v-model="document.viewUrl"
                :title="`Upload Document ${index + 1}`"
                uploadTitle="PDF, CSV, XLSX"
                :fileUrl="document.viewUrl"
                :error="errors.documents?.[index]"
                @remove="removeDocument(index)"
              />
            </FormGroup>
          </div>
        </div>

        <div class="mb-3 mt-4 flex justify-end gap-x-4">
          <AppButton
            @click="activeForm--"
            type="button"
            :isLoading="isLoading"
            text="Back"
            btnClass="text-primary-500 bg-white border !py-[10px] px-20 min-w-[156px] !rounded-lg font-semibold"
            :isDisabled="isLoading"
          />
          <AppButton
            type="submit"
            :isLoading="isLoading"
            text="Next"
            btnClass="text-white bg-danger-500 !py-[10px] !px-10 !rounded-lg min-w-[156px] font-semibold "
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
const requirements = inject("requirements");
const isLoading = ref(false);
const activeForm = inject("activeForm");
const formValues = inject("formValues")

// Yup validation schema for multiple file uploads
const schema = yup.object({
  documents: yup
    .array()
    .of(
      yup.object({
        viewUrl: yup.string().required("This field is required"),
      })
    )
    .min(1, "At least one file is required."),
});

// Vee-validate hooks and form fields
const { handleSubmit, errors, setValues, defineField } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

// Define fields for validation
const [documents] = defineField("documents");

// Add another document slot
const addDocument = () => {
  formValues.documents.push({ file: null, url: "" });
};

// Remove a document slot
const removeDocument = (index) => {
  formValues.documents.splice(index, 1);
};

// Form submission handler
const onSubmit = handleSubmit((values) => {
  console.log("🚀 ~ onSubmit ~ values:", values);
  formValues.documents = values.documents;
  activeForm.value = 3;
});
</script>
