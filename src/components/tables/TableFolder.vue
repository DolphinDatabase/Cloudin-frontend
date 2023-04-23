<template>
  <div class="flex items-center justify-around mb-8 mt-4">
    <div>
      <p
        class="text-lg"
        :class="{ 'text-green-500 text-lg font-extrabold': step === 0 }"
      >
        {{ origin }}
      </p>
    </div>
    <ChevronRightIcon class="h-5 w-5" />
    <div>
      <p 
        class="text-lg"
        :class="{ 'text-green-500 text-lg font-extrabold': step === 1 }"
    >
        {{ destiny }}
      </p>
    </div>
  </div>
  <div
    v-if="step == 0"
    class="sm:flex sm:items-start"
  >
    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-[100%]">
      <div class="flex gap-2 items-center text-gray-200">
        <ExclamationCircleIcon class="h-5 w-5" />
        <p class="font-bold">
          Selecione a pasta de origem
        </p>
      </div>
      <div class="mt-2">
        <div class="card">
          <div class="card-body">
            <div class="m-3 flex justify-end">
              <div class="relative search-field">
                <MagnifyingGlassIcon class="absolute z-10 w-4 h-4 left-2 top-[10px] text-gray-600" />
                <input
                  v-model="search"
                  type="text"
                  class="border-2 pl-8 py-1 rounded-md"
                  placeholder="Buscar"
                  @input="onSearch()"
                >
              </div>
            </div>
            <table class="w-[530px] flex flex-col">
              <thead>
                <tr class="flex border-b-2 border-black">
                  <th class="mr-56">
                    Nome do arquivo
                  </th>
                </tr>
              </thead>
              <tbody class="block h-[300px] overflow-auto">
                <tr
                  v-for="d in originData"
                  :key="d.id"
                >
                  <td>
                    <input
                      v-model="selectedOrigin"
                      type="radio"
                      :value="d.id"
                    >
                  </td>
                  <td> {{ d.name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex flex-row-reverse gap-1 mt-6">
            <button
              type="button"
              class="inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white-100 shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
              @click="() => { step = 1 }"
            >
              Próximo
            </button>
            <button
              ref="cancelButtonRef"
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              @click="
                () => {
                  $emit('closeModal');
                }
              "
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-else
    class="sm:flex sm:items-start"
  >
    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-[100%]">
      <div class="flex gap-2 items-center text-gray-200">
        <ExclamationCircleIcon class="h-5 w-5" />
        <p class="font-bold">
          Selecione a pasta de destino
        </p>
      </div>
      <div class="mt-2">
        <div class="card">
          <div class="card-body">
            <div class="m-3 flex justify-end">
              <div class="relative search-field">
                <MagnifyingGlassIcon class="absolute z-10 w-4 h-4 left-2 top-[10px] text-gray-600" />
                <input
                  v-model="search"
                  type="text"
                  class="border-2 pl-8 py-1 rounded-md"
                  placeholder="Buscar"
                  @input="onSearch()"
                >
              </div>
            </div>
            <table class="w-[530px] flex flex-col">
              <thead>
                <tr class="flex border-b-2 border-black">
                  <th class="mr-56">
                    Nome do arquivo
                  </th>
                </tr>
              </thead>
              <tbody class="block h-[300px] overflow-auto">
                <tr
                  v-for="d in destinyData"
                  :key="d.id"
                >
                  <td>
                    <input
                      v-model="selectedDestiny"
                      type="radio"
                      :value="d.id"
                    >
                  </td>
                  <td> {{ d.name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex flex-row-reverse gap-1 mt-6">
            <button
              type="button"
              class="inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white-100 shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
              @click="
                () => {
                  $emit('submitData');
                }
              "
            >
              Transferir
            </button>
            <button
              type="button"
              class="inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white-100 shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
              @click="() => { step = 0 }"
            >
              Voltar
            </button>
            <button
              ref="cancelButtonRef"
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              @click="
                () => {
                  $emit('closeModal');
                }
              "
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { MagnifyingGlassIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";
import { ExclamationCircleIcon } from "@heroicons/vue/24/outline";
export default {
    name: "TableFolder",
    components: {
        MagnifyingGlassIcon,
        ExclamationCircleIcon,
        ChevronRightIcon,
    },
    props: {
        originData: {
            type: Object,
            required: true
        },
        destinyData: {
            type: Object,
            required: true
        },
        origin: {
            type: String,
            required: true
        },
        destiny: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            selectedOrigin: null,
            selectedDestiny: null,
            step: 0
        }
    }
}
</script>