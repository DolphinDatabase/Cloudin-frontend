<template>
  <TransitionRoot
    as="template"
    :show="open"
  >
    <Dialog
      as="div"
      class="relative z-10"
      @close="open"
    >
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg  text-left shadow-xl transitions-all w-[600px]"
            >
              <div class="bg-white-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
                <div class="flex items-center justify-around mb-8 mt-4">
                  <div>
                    <p
                      class="text-lg font-medium"
                      :class="{ 'text-green-500 text-lg font-extrabold': currentStep === 1 }"
                    >
                      {{ origin }}
                    </p>
                  </div>
                  <ChevronRightIcon class="h-5 w-5" />
                  <div>
                    <p
                      class="text-lg font-medium"
                      :class="{ 'text-green-500 text-lg font-extrabold': currentStep === 2 }"
                    >
                      {{ destiny }}
                    </p>
                  </div>
                </div>
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-[100%]">
                    <div class="flex gap-2 items-center text-gray-200">
                      <ExclamationCircleIcon class="h-5 w-5" />
                      <p class="font-bold">
                        {{ title }}
                      </p>
                    </div>
                    <div class="mt-2">
                      <slot />
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <div v-if="currentStep == 1">
                  <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white-100 shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                    @click="() => { $emit('next') }"
                  >
                    Próximo
                  </button>
                </div>
                <div v-else>
                  <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white-100 shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                    @click="() => { $emit('submitData') }"
                  >
                    Transferir
                  </button>
                </div>
                <button
                  ref="cancelButtonRef"
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click="() => { $emit('closeModal') }"
                >
                  Cancelar
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { TransitionRoot, Dialog, TransitionChild, DialogPanel } from '@headlessui/vue'
import { ChevronRightIcon } from '@heroicons/vue/20/solid';
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'
export default {
  name: 'ModalComponent',
  components: {
    TransitionRoot,
    Dialog,
    TransitionChild,
    DialogPanel,
    ExclamationCircleIcon,
    ChevronRightIcon
  },
  props: {
    title: {
      required: true,
      type: Boolean
    },
    open: {
      required: true,
      type: Boolean
    },
    origin: {
      required: true,
      type: String
    },
    destiny: {
      required: true,
      type: String
    },
  },
  data() {
    return {
      currentStep: 1,
      stepsCompleted: []
    };

  }
}
</script>