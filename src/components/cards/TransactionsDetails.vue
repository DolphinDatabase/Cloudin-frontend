<template>
    <div>
        <div
            class="popup-background"
            @click="this.$emit('close')"
        />

        <div class="popup rounded-lg bg-white-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <p class="grid grid-cols-3 text-gray-700 mb-10">
                <span class="justify-self-center"> 
                    Transação {{ this.transaction.id }} 
                </span>
                <span class="justify-self-center"> 
                    {{ new Date(transaction.created).toLocaleString('pt-BR') }}
                </span>
                <span class="justify-self-center">
                    {{ this.transaction.status }} 
                </span>
            </p>

            <table class="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                        >
                            Arquivo
                        </th>
                        <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                        >
                            Tamanho
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 overflow-auto">
                    <tr v-for="file in this.transaction.file" :key="file">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900">
                                        {{ file.name }}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900">
                                        {{ this.convertBytesSizeToHumanReadable(file.size) }}
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: "TransactionDetails",
    props: {
        transaction: {
            required: true,
            type: Object
        }
    },
    methods: {
        convertBytesSizeToHumanReadable(bytesSize) {
            const PREFIXS = ['k', 'M', 'G', 'T'];
            let multiplier = -1;

            while(bytesSize >= 1000 && multiplier < PREFIXS.length) {
                bytesSize /= 1024;
                multiplier ++;
            }

            let response = Math.floor(bytesSize) + " ";

            if(multiplier >= 0)
                response += PREFIXS[multiplier];

            response += 'B';

            return response;
        }
    }
}
</script>

<style>
    .popup-background {
        position: fixed;
        z-index: 99;
        margin: 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000000aa;
    }

    .popup {
        position: absolute;
        z-index: 100;

        top: 25%;
        bottom: 25%;

        left: 25%;
        width: 50%;
    }
</style>

