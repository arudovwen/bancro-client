<template>
  <div
    class="rounded-lg bg-white border border-[#EAECF0] flex gap-x-[76px] flex-col lg:flex-row gap-y-7 lg:gap-y-10 py-[40px] px-6 md:px-[60px]"
  >
    <div class="flex-1 max-w-[600px] w-full">
      <TableLoader className="!h-[150px]" v-if="keysloading" />
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-10 text-sm"
        v-if="hasKeys && !keysloading"
      >
        <div>
          <label class="inline-block input-label text-sm !text-[#1B2B41B8]">
            Api Key</label
          >
          <div
            v-clipboard="formValues.apiKeys"
            @click="toast.success('Api key copied')"
            class="px-3 h-11 rounded-lg border border-[rgb(214_214_214)] flex items-center hover:bg-gray-100 hover:cursor-copy no-scrollbar overflow-x-auto"
          >
            {{ formValues.apiKeys }}
          </div>
        </div>
        <div>
          <label class="inline-block input-label text-sm !text-[#1B2B41B8]">
            Secret Key</label
          >
          <div
            v-clipboard="formValues.secretKeys"
            @click="toast.success('Secret key copied')"
            class="h-11 rounded-lg border border-[rgb(214_214_214)] flex items-center overflow-x-auto px-3 hover:bg-gray-100 hover:cursor-copy no-scrollbar"
          >
            {{ formValues.secretKeys }}
          </div>
        </div>
        <div>
          <label class="inline-block input-label text-sm !text-[#1B2B41B8]">
            Base url</label
          >
          <div
            v-clipboard="formValues.baseUrl"
            @click="toast.success('Base url copied')"
            class="h-11 rounded-lg border border-[rgb(214_214_214)] flex items-center overflow-x-auto px-3 hover:bg-gray-100 whitespace-nowrap hover:cursor-copy no-scrollbar"
          >
            {{ formValues.baseUrl }}
          </div>
        </div>
        <div>
          <label class="inline-block input-label text-sm !text-[#1B2B41B8]">
            Wallet account number</label
          >
          <div
            v-clipboard="formValues.wallet"
            @click="toast.success('Wallet copied')"
            class="h-11 rounded-lg border border-[rgb(214_214_214)] flex items-center overflow-x-auto px-3 hover:bg-gray-100 hover:cursor-copy no-scrollbar"
          >
            {{ formValues.wallet }}
          </div>
        </div>
      </div>
      <div class="" v-if="!hasKeys && !keysloading">
        <AppButton
          @click="generateKeys"
          type="submit"
          :isLoading="creatingkeys"
          :isDisabled="creatingkeys"
          text="Generate Api keys"
          btnClass="text-primary-500 bg-[#9FE870] !py-3 !rounded-lg font-semibold "
        />
      </div>
      <hr class="border-[#D0D5DD] my-7" />

      <h2 class="text-lg font-medium">Webhooks</h2>
      <p class="text-xs mb-6">
        Confuigure endpoints to receive notifications for events on your
        integration
      </p>
      <form
        @submit.prevent="onSubmit"
        class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 max-w-[600px]"
      >
        <div>
          <Textinput
            placeholder=""
            label="Transaction completion"
            name="Transaction completion"
            v-bind="transactionCompletionAtt"
            v-model="transactionCompletion"
            :error="errors.transactionCompletion"
          />
        </div>
        <div>
          <Textinput
            placeholder=""
            label="Refund completion"
            name="Refund completion"
            v-bind="refundCompletionAtt"
            v-model="refundCompletion"
            :error="errors.refundCompletion"
          />
        </div>
        <div>
          <Textinput
            placeholder=""
            label="Disbursement"
            name="Disbursement"
            v-bind="disbursementAtt"
            v-model="disbursement"
            :error="errors.disbursement"
          />
        </div>
        <div>
          <Textinput
            placeholder=""
            label="Settlement"
            name="Settlement"
            v-bind="settlementAtt"
            v-model="settlement"
            :error="errors.settlement"
          />
        </div>

        <div class="md:col-span-2 flex justify-end mt-6">
          <AppButton
            type="submit"
            :isLoading="isLoading"
            :isDisabled="isLoading"
            text="Save changes"
            btnClass="text-primary-500 bg-[#9FE870] !py-3 !rounded-lg font-semibold "
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { toast } from "vue3-toastify";
import {
  getKeys,
  getWebhooks,
  generateKey,
  generateWebhook,
} from "~/services/tenantservice";

const authStore = useAuthStore();
const deleteText = ref("");
const isShowing = ref("crop");
const open = ref(false);
const img = ref("");
const image = ref(null);
const route = useRoute();
const creatingkeys = ref(false);
const keysloading = ref(false);
const hasKeys = ref(false);
const formValues = reactive({
  baseUrl: "",
  wallet: "",
  apiKeys: "",
  secretKeys: "",
  transactionCompletion: "",
  settlement: "",
  disbursement: "",
  refundCompletion: "",
  environment: "test",
});

const schema = yup.object({
  transactionCompletion: yup.string(),
  settlement: yup.string(),
  disbursement: yup.string(),
  refundCompletion: yup.string(),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const [transactionCompletion, transactionCompletionAtt] = defineField(
  "transactionCompletion"
);
const [settlement, settlementAtt] = defineField("settlement");
const [disbursement, disbursementAtt] = defineField("disbursement");
const [refundCompletion, refundCompletionAtt] = defineField("refundCompletion");

const isLoading = ref(false);
onMounted(() => {
  getData();
});

function getData() {
  keysloading.value = true;
  getWebhooks(authStore.tenantId).then((res) => {
    if (res.status === 200) {
      formValues.baseUrl = res.data.data.webhookUrl;
    }
  });

  getKeys(authStore.tenantId)
    .then((res) => {
      if (res.status === 200) {
        keysloading.value = false;
        hasKeys.value = true;
        formValues.apiKeys = res.data.data.publicKey;
        formValues.secretKeys = res.data.data.privateKey;
      }
    })
    .catch(() => {
      keysloading.value = false;
    });
}

function generateKeys() {
  creatingkeys.value = true;
  generateKey({
    TenandId: authStore.tenantId,
    environment: formValues.environment,
  })
    .then((res) => {
      if (res.status === 200) {
        creatingkeys.value = false;
        getData();
      }
    })
    .catch(() => {
      creatingkeys.value = false;
    });
  generateWebhook({
    UserId: authStore.tenantId,
    environment: formValues.environment,
  })
    .then((res) => {
      if (res.status === 200) {
        creatingkeys.value = false;
        getData();
      }
    })
    .catch(() => {
      creatingkeys.value = false;
    });
}
</script>
