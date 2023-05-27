<template>
  <p>De:</p>
  <Menu
    as="div"
    class="relative inline-block text-left"
  >
    <div>
      <MenuButton
        class="inline-flex w-[100px] gap-x-1.5 justify-between rounded-md bg-white-100 px-3 py-2 text-sm text-gray-900 shadow"
      >
        {{ (selected1=='')?'Drives':selected1 }}
        <ChevronDownIcon
          class="-mr-1 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </MenuButton>
    </div>
  
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1">
          <MenuItem
            v-for="(l,index) in opcoesDe"
            v-slot="{ active }"
            :key="index"
          >
            <a
              :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 !important', 'block px-4 py-2 text-sm']"
              @click="()=>{selected1 = l.nome;origin=l.nome;changeOpcoesPara();}"
            >{{ l.nome }}</a>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>

  <p>Para:</p>
  <Menu
    as="div"
    class="relative inline-block text-left"
  >
    <div>
      <MenuButton
        class="inline-flex w-[100px] gap-x-1.5 justify-between rounded-md bg-white-100 px-3 py-2 text-sm text-gray-900 shadow"
      >
        {{ (selected2=='')?'Drives':selected2 }}
        <ChevronDownIcon
          class="-mr-1 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </MenuButton>
    </div>
  
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1">
          <MenuItem
            v-for="(l,index) in opcoesPara"
            v-slot="{ active }"
            :key="index"
          >
            <a
              :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 !important', 'block px-4 py-2 text-sm']"
              @click="()=>{selected2= l.nome;destiny=l.nome;}"
            >{{ l.nome }}</a>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
  
  <script>
  import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
  import { ChevronDownIcon } from '@heroicons/vue/20/solid'
  export default {
    name: 'DropDown',
    components: {
      ChevronDownIcon,
      Menu, MenuButton, MenuItem, MenuItems
    },
    props:{
      list:{
        required:true,
        type:Array
      }
    },
    data() {
      return {
        selected1:'',
        selected2:'',
        isOpen: false,
        opcoesDe: [{ nome: 'Google' }, { nome: 'S3' }],
        opcoesPara: [{ nome: 'Google' }, { nome: 'S3' }],
        origin: '',
        destiny:''
      }
    },
    methods:{
        changeOpcoesPara() {           
          if (this.origin === 'S3') {
            this.opcoesPara = [{ nome: 'Google' }];
            this.destiny = 'Google';
          } else if (this.origin === 'Google') {
            this.opcoesPara = [{ nome: 'S3' }];
            this.destiny = 'S3';
          }       
          
          this.$emit('origin-updated', this.origin); // Emitir evento para atualizar origin
          this.$emit('destiny-updated', this.destiny); // Emitir evento para atualizar destiny   
        }
    }
  }
  
  
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  h3 {
    margin: 40px 0 0;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: inline-block;
    margin: 0 10px;
  }
  
  a {
    color: #42b983;
  }</style>
  
