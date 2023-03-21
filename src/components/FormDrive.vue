<template>
    <div class="flex justify-between">
        <div>
            <p>De:</p>
            <DropDown/>
        </div>
        <ArrowSmallRightIcon />
        <div>
            <p>De:</p>
            <DropDown/>
        </div>
    </div>
</template>
<script>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ArrowSmallRightIcon } from '@heroicons/vue/24/solid'
import DropDown from './Dropdown.vue'

export default {
    name:"FormDrive",
    data(){
        return{
            origin:'',
            destiny:'',
            drives:["Google","S3"]
        }
    },
    components:[
       Menu, 
       MenuButton, 
       MenuItems, 
       MenuItem,
       ArrowSmallRightIcon,
       DropDown
    ]
}
</script>