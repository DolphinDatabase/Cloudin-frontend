<template> 
    <div class="card">
        <div class="card-heard">
            <label class="form-checkbox">
                <input type="checkbox" v-model=" select_all" @click="select"> Select All         
            </label>
        </div>
    <div class="card-body">
        <table class="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nome do arquivo</th>
                    <th>Tamanho</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="d in data" :key="d.id">
                <td>
                    <input type="checkbox" :value="d.id" v-model="selected">
                </td>
                <td> {{ d.id }}</td>
                <td> {{ d.Arquivo }}</td>
                <td>{{ d.Tamanho }}</td>
            </tr>
    
            </tbody>
        </table>
    
    </div>
    </div>
    
    </template>
    
    <script>
        export default {
            name:'TableCheck',
            props: ["data"],
            data(){
                return{
                    select_all:false,
                    selected: []
                }
            },
            methods: {
                select(){
                    this.selected = [];
                    if(!this.select_all){
    
                        for(let i in this.data){
                            this.selected.push(this.data[i].id);
    
                        }
                    }
                }
            }
        }
    </script>
    