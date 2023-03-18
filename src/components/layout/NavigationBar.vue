<template>
  <div
    class="sidebar fixed group overflow-hidden left-0 top-0 z-10 h-screen w-[calc(3.73rem)] border-r border-gray-300/40 bg-green-500 hover:w-56 hover:shadow-2xl"
  >
    <div class="h-full flex flex-col justify-between">
      <div>
        <div class="mt-4 h-16 flex items-center">
          <a
            href=""
            class="block w-max px-2.5"
          >
            <img
              src="@/assets/logo/logo-negativo2.svg"
              class="w-25"
              alt=""
            >
          </a>
        </div>
        <div class="mt-10">
          <div class="px-1 -ml-px font-medium tracking-wide">
            <div class="w-max space-y-4 group hover:w-full">
              <a
                v-for="(item, index) in navigation"
                :key="index"
                :href="item.href"
                class="block py-1 w-[52px]  hover:w-full"
              >
                <div class="w-max flex items-center p-2 gap-4 rounded-full bg-white text-green-500">
                  <component
                    :is="item.icon"
                    class="h-5 w-5 ml-2 mr-4"
                  />
                  <span>{{ item.label }}</span></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Cog6ToothIcon } from '@heroicons/vue/24/solid';
export default {
name: 'NavigationBar',
components: {
    Cog6ToothIcon,
    
},
data() {
    return {
        navigation: [
            {
                href: '/',
                label: 'Transferências',
                icon: Cog6ToothIcon
            },

        ]
    }
}
}
</script>

<style scoped>
.sidebar {
transition: all .4s ease-in-out;
}

span{
margin-right: 50px;
}
</style>