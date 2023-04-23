<template>
    <div>
        <div
            class="popup-background"
            @click="closePopup()"
        />

        <div class="popup border-d rounded-lg z-[100] p-8 flex flex-col bg-white-200">
            <p class="grid grid-cols-3">
                <span> 
                    {{ this.title }} 
                </span>
                <span class="justify-self-center"> 
                    {{ this.createDate }}
                </span>
                <span class="justify-self-end bg-green-500 rounded-xl text-white-200 uppercase text-xs align-middle">
                    {{ this.status }} 
                </span>
            </p>

            <div class="grid grid-cols-2" v-for="file in this.files" :key="file">
                <span>{{ file.name }}</span>
                <span class="justify-self-end">{{ this.convertBytesSizeToHumanReadable(file.size) }}</span>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: "TransactionDetails",
    props: {
        title: {
            required: true,
            type: String
        },
        createDate: {
            required: true,
            type: Date
        },
        status: {
            required: true,
            type: String
        },
        files: {
            required: true,
            type: Array
        }
    },
    methods: {
        convertBytesSizeToHumanReadable(bytesSize) {
            const PREFIXS = ['k', 'M', 'G', 'T'];
            let multiplier = -1;

            console.log(bytesSize);

            while(bytesSize >= 1000 && multiplier < PREFIXS.length) {
                bytesSize /= 1024;
                multiplier ++;
            }

            let response = Math.floor(bytesSize) + " ";

            if(multiplier >= 0)
                response += PREFIXS[multiplier];

            response += 'B';

            console.log(response);

            return response;
        },

        convertDateToHumanReadable(date) {
            let formattedDate = new Date(date);
            return formattedDate; 
        },

        closePopup() {
            this.$emit("close");
        }
    },
    mounted() {
        console.log(this.files[0]);
    }
}
</script>

<style>
.popup-background {
  position: fixed;
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000aa;
  z-index: 99;
}
</style>

