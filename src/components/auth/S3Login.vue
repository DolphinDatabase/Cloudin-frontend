<template>
    <div class="">
        <card-component  @click="createPopup()">
            <button type="button"
               >
                <img src="@/assets/auth/s3.svg" class="w-7 mr-2">
                <label>S3</label>
            </button>
        </card-component>
    </div>
</template>

<script>
import CardComponent from '@/components/CardComponent.vue'

export default {
    name: 'S3Login',
    components: {
        CardComponent
    },
    data() {

    },
    mounted() {

    },
    methods: {
        createField(labelText, inputId){
            let field = document.createElement("div");
            let label = document.createElement("label");
            let input = document.createElement("input");
            input.id = inputId;
            field.appendChild(label);
            field.appendChild(input);

            field.classList.add('form-field');
            label.innerText = labelText;

            return field;
        },
        createPopup() {
            let loginCard = document.createElement("p");
            loginCard.classList.add("form-popup");

            loginCard.appendChild(this.createField('AWS Access Key Id', 'aws_access_key_id'));
            loginCard.appendChild(this.createField('AWS Secret Access Key', 'aws_secret_access_key'));
            loginCard.appendChild(this.createField('AWS Region Name', 'aws_region_name'));
            loginCard.appendChild(this.createField('S3 Bucket Name', 's3_bucket_name'));

            let confirmButton = document.createElement("button");
            confirmButton.classList.add('form-button');
            confirmButton.classList.add('confirm');
            confirmButton.innerText = "CONFIRMAR";

            let cancelButton = document.createElement("button");
            cancelButton.classList.add('form-button');
            cancelButton.classList.add('cancel');
            cancelButton.innerText = "CANCELAR";

            confirmButton.addEventListener('click', () => {
                let s3_auth = {
                    'aws_access_key_id': document.getElementById('aws_access_key_id').value,
                    'aws_secret_access_key': document.getElementById('aws_secret_access_key').value,
                    'aws_region_name': document.getElementById('aws_region_name').value,
                    's3_bucket_name': document.getElementById('s3_bucket_name').value
                }

                window.localStorage.setItem('s3_auth', JSON.stringify(s3_auth));

                document.body.removeChild(loginCard);
            })

            cancelButton.addEventListener('click', () => {
                document.body.removeChild(loginCard);
            })

            loginCard.appendChild(confirmButton);
            loginCard.appendChild(cancelButton);

            document.body.appendChild(loginCard);
        },
        login () {
            console.log("Auth S3");
        }
    }
}
</script>

<style>
    .form-popup {
        position: fixed;
        background-color: white;

        top: 25%;

        right: 25%;
        left: 25%;
        padding: 10px;
        border: 10px solid #f1f1f1;
        z-index: 100;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .form-field {
        display: grid;
        grid-template-columns: 1fr 2fr;
        width: 100%;
        margin: 5px;
    }

    .form-button {
        width: 30%;
        border-radius: 10px;
        margin: 5px;
        padding: 10px;
        color: white;
        border: 1px solid;
        transition: background-color 0.3s;
    }

    .confirm {
        border-color: green;
        background-color: green;
    }

    .confirm:hover {
        color: green;
        background-color: white;
    }

    .cancel {
        border-color: red;
        background-color: red;
    }

    .cancel:hover {
        color: red;
        background-color: white;
    }

</style>