<template>
    <div class="flex justify-center align-center">
        <div class="mt-16 font-bold underline">
            <p>
                Para começar faça sua autenticação.
            </p>
        </div>
        <div class="w-max -mb-3">
            <a v-for="(item, index) in auths" :key="index"
                class="group flex items-center space-x-1 rounded-md px-4 py-3 text-white"> <img :src="item.imageUrl" alt=""
                    class="w-5 h-5 rounded-full mr-4">{{ item.label }}</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AuthPage',
    data() {
        return {
            auths: [
                {
                    label: 'Autenticar com Google Drive',
                    imageUrl: '@/assets/auth/Google.svg'
                },

            ]
        }
    }
}
</script>