<template>
  <div
    class="sidebar fixed group overflow-hidden left-0 top-0 z-10 h-screen w-[calc(3.73rem)] bg-green-500 lg:hover:w-56 hover:w-44"
  >
    <div class="h-full flex flex-col justify-between">
      <div>
        <div class="mt-4 h-16 flex items-center">
          <a
            href=""
            class="block w-max px-2.5"
          >

            <img
              src="@/assets/logo/logo-branco.svg"
              class="w-[200px]"
              alt=""
            >
          </a>
        </div>
        <div class="mt-10">
          <div class="px-1 -ml-px font-medium tracking-wide">
            <ul class="w-max space-y-4 group hover:w-full">
              <li
                v-for="item in navigation"
                :key="item.href"
                class="w-max flex items-center gap-4 text-sm lg:text-lg"
              >
                <div
                  :class="{ 'rounded-full bg-white-200 text-green-500': $route.path === item.href, 'bg-green-500 text-white-200': $route.path !== item.href }"
                >
                  <router-link :to="item.href">
                    <div class="w-max flex items-center p-2 gap-4 rounded-full text-sm lg:text-lg">
                      <component
                        :is="item.icon"
                        class="h-5 w-5 ml-2 mr-2 lg:mr-4"
                        :class="{ 'text-green-500': $route.path === item.href, 'text-white-200': $route.path !== item.href }"
                      />
                      <span>{{ item.label }}</span>
                    </div>
                  </router-link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- " -->
<script>
import { ChartBarIcon,Cog6ToothIcon, ArrowsRightLeftIcon } from '@heroicons/vue/24/solid';
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
          label: 'Configurações',
          icon: Cog6ToothIcon
        },
        {
          href: '/transferencia',
          label: 'Transferências',
          icon: ArrowsRightLeftIcon
        },
        {
          href: '/dashboard',
          label: 'Dashboard',
          icon: ChartBarIcon
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

span {
  margin-right: 50px;
}
</style>
