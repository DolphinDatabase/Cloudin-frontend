<template>
  <div class="relative mt-1 mb-2 rounded-md shadow-sm">
    <input
      :type="type"
      class="block w-full rounded-md border-0 py-1.5 pl-7 pr-8 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-100 sm:text-sm sm:leading-6"
      :placeholder="placeholder"
    >
  </div>
</template>

<script>
export default {
    name: 'InputComponent',
    props: {
        placeholder: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default:''
        }
    }
}
</script>