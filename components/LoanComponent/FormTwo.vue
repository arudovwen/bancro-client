<template>
    <h2 class="text-xl font-medium text-[#182230] mb-3">Document Uploads</h2>

    <div class="border-b mt-2 mb-7 border-[#D0D5DD]" />
    <form @submit.prevent="activeForm = 3" class="bg-white rounded-xl">
        <div>

            <div class="grid grid-cols-1 gap-y-4">
                <FormGroup label="Upload Bank Statement (Upload up to 6 months bank statement)"
                    :error="errors.statementUrl" name="statementUrl">
                    <FormsFileUploader title="Format: PDF,CSV, XLSX" uploadTitle="Bank statement" fileUrl="" />
                </FormGroup>
                <FormGroup label="Upload Bank Statement (Upload up to 6 months bank statement)"
                    :error="errors.statementUrl" name="statementUrl">
                    <FormsFileUploader title="Format: PDF,CSV, XLSX" uploadTitle="Bank statement" fileUrl="" />
                </FormGroup>

                <FormGroup label="Upload Bank Statement (Upload up to 6 months bank statement)"
                    :error="errors.statementUrl" name="statementUrl">
                    <FormsFileUploader title="Format: PDF,CSV, XLSX" uploadTitle="Bank statement" fileUrl="" />
                </FormGroup>

                <div class="mb-3 mt-4 flex justify-end gap-x-4">
                    <AppButton type="button" :isLoading="isLoading" text="Back"
                        btnClass="text-primary bg-white border !py-[10px] px-20 min-w-[156px] !rounded-lg font-semibold"
                        :isDisabled="isLoading" />
                    <AppButton type="submit" :isLoading="isLoading" text="Next"
                        btnClass="text-primary bg-[#9FE870] !py-[10px] !px-10 !rounded-lg min-w-[156px] font-semibold"
                        :isDisabled="isLoading" />
                </div>
            </div>
        </div>
    </form>

</template>
<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";

const isOpen = ref(false);

const  activeForm = ref("activeForm")
const isLoading = ref(false);
const formValues = reactive({
    loanAmount: "",
    loanpurpose: "",
    tenor: "",
    statementUrl: ""
});

const schema = yup.object().shape({
    loanAmount: yup.string(),
    loanpurpose: yup.string(),
    tenor: yup.string(),
    statementUrl: yup.string()
});

const { handleSubmit, defineField, errors, setValues, setFieldValue } = useForm(
    {
        validationSchema: schema,
        initialValues: formValues,
    }
);
const [loanAmount, loanAmountAtt] = defineField("loanAmount");
const [loanpurpose, loanpurposeAtt] = defineField("loanpurpose");
const [tenor, tenorAtt] = defineField("tenor");
const [statementUrl] = defineField("statementUrl");
</script>