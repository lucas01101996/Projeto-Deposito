<template>
<div id="table">
    produto: {{produto}}
    

    <div id="AllTabela">
          <table>
            <thead>

              <tr> <!--  Tem que ter uma ordenação aqui -->
                <th>id</th> <!-- comentar isso dps -->
                <th>Código</th> 
                <th>Nome</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Status</th>
                <th>Opções</th>
              </tr>

              </thead>

            <tbody>
                <Modal-Edit v-if ="showPostModalEdit" :produto ="produto" :produtos="produtos" :atualizar="atualizar" @update-produto="atualizar"  @close ="modalEdit('hide')">

                </Modal-Edit>
              <tr v-for="produto in produtos" :key="produto.id">
                

                <Modal-Delete v-if="showPostModalDelete" @close = "abrirModalDel('hide')" :produto='produto' :produtos='produtos' :toglle="abrirModalDel" :name="produto.name" :excluir='excluir'> <!-- mudar nome do modal -->

                </Modal-Delete>



                <td>{{produto.id}}</td>
                <!-- <input type= "checkbox"  :v-model="produto.id" >  -->
                <td >{{produto.cod}}</td>
                <td>{{produto.name}}</td>
                <td>$ {{produto.price}}.00</td> <!-- Modo estatico -->
                <td>{{produto.categoria}}</td>
                <td>{{produto.status}}</td>
                
                <td class = "btnTable">
                  <button @click="modalEdit(produto)" class="btnAtualizar"><i class="material-icons">create</i></button> <!-- Quando clicar nesse botao tem que abrir um modal -->
                  <!-- <button @click="abrirModalDel(produto.id)"  class="btnDeletarOne"><i class="material-icons">delete_sweep</i></button> -->
                  <button @click="excluir(produto.id)"  class="btnDeletarOne"><i class="material-icons">delete_sweep</i></button> 
                </td> 
              </tr>

            </tbody>
          </table>
        </div> 
</div>


  
</template>

<script>
import ProdutoApi from '../services/produtos'
import ModalDelete from '../components/ModalDelete.vue'
import ModalEdit from '../components/ModalEdit.vue' 


export default {
    name:
    'Table',

    components:{
        ModalDelete,
        ModalEdit,
    },

    props:['produto','produtos', 'listar', 'salvar', 'produto.id' , 'atualizar'],
    

    data(){
        return{
            showPostModalEdit:false,
            showPostModalDelete: false,
            toggleModalDelete:{
            },
            fullPostEdit:{},
        }

    },

    methods:{
        pegarId(id){
          console.log(id)
        },

       /*  async atualizar(){
         await ProdutoApi.atualizar(this.produto).then(response =>{ 
            this.produto.id = response.data;
            console.log(response)
            this.produto= {}
            alert("Atualizado com Sucesso")
            /* window.location.reload(); */
          /* }).catch((error)=>{
            alert('gerou erro:' + error)
            console.log(this.produto)
          }) 
      }, */ 
        
        async excluir(id){ //esse tem que ficar no modal de excluir
            console.log(id)
            if(confirm('Você deseja Realmente excluir o produto ' + "?"))
                await ProdutoApi.deletar(id).then(response =>{
                console.log(response)
                this.listar();
            }).catch((error) =>{
                alert('Não foi possivel deletar' + error)
            })
        }, 

        modalEdit(produto){
            
            this.showPostModalEdit = !this.showPostModalEdit
            console.log(produto)

            if(this.showPostModalEdit){
                this.fullPostEdit = produto;
                console.log('entrrou')
            }else{
                this.fullPostEdit = {}
                console.log('saiu')
            }
        }, 

        abrirModalDel(produto){
            this.showPostModalDelete = !this.showPostModalDelete

            if(this.showPostModalDelete){
                this.touggleModalDelete = produto.name;
            }else{
                this.toggleModalDelete = {}
            }
        },

    }
}
</script>

<style scoped>

#AllTabela{
  margin: 10px;
  padding: 10px;
  
}

table {
  width: 100%;
  margin: 15px;

}

table td{
  align-items: center;
  height: 50px;
  justify-content: center;
  align-items: center;
  width: 20px;
}
thead{
  background-color: #d0d1d0;
}

table th{
  width: 30px;
  height: 50px;
}

.btnTable button{
  color: white;
  border-radius: 65px;
  border: 0;
  cursor: pointer;
}

.btnTable i{
  color: #dff5df;
}

.btnAtualizar{
  background-color:#19c019;
}

.btnDeletarOne{
  background: #bdc019;
}

.btnAtualizar:hover{
  background-color:#57e057;
}

.btnDeletarOne:hover{
  background: #e5e909;
}

</style>