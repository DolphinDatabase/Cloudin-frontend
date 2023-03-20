<template>
<BasePage>
    <DropDown/>
</BasePage>
</template>

<script>
import DropDown from '@/components/Dropdown.vue';
import BasePage from '@/components/layout/BasePage.vue';

export default {
    name: "TransferView",
    components: { BasePage, DropDown }
}
</script>