<template> 
  <div class="card">
    <div class="card-body">
      <table class="mt-1 w-[100%]">
        <thead class="border-solid border-b-2 border-black">
          <tr>
            <th>
              <input
                v-model=" select_all"
                type="checkbox"
                @click="select"
              >
            </th>
            <th>Nome do arquivo</th>
            <th>Tamanho</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="d in data"
            :key="d.id"
          >
            <td>
              <input
                v-model="selected"
                type="checkbox"
                :value="d.id"
              >
            </td>
            <td> {{ d.name }}</td>
            <td>{{ (d.size)?d.size:"-" }}</td>
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
    