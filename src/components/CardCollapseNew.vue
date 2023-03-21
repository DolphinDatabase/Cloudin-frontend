<template>
    <Disclosure v-slot="{open}">
        <DisclosureButton class="flex w-full justify-between rounded-lg px-4 py-2 text-gray-200 text-left text-sm font-medium">
          <span>Preencha os campos cuidadosamente</span>
          <ChevronUpIcon :class="open ? 'rotate-180 transform' : ''" class="h-5 w-5 text-black"/>
        </DisclosureButton>
        <DisclosurePanel class="px-24 pt-4 pb-2 text-sm bg-gray-100">
          <FormDrive/>
        </DisclosurePanel>
    </Disclosure>
</template>
<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import FormDrive from '../components/FormDrive.vue'
import { ChevronUpIcon } from '@heroicons/vue/20/solid'
export default {
    name:"CardCollapseNew",
    components:{
        Disclosure, 
        DisclosureButton, 
        DisclosurePanel,
        ChevronUpIcon,
        FormDrive
    }
}
</script>