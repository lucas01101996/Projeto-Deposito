<template>
<div id="table">

    <Modal-Edit v-if ="showPostModalEdit" :produto ="produto" :produtos="produtos" :id="produto.id" :editar='editar' @close ="modalEdit('hide')">

    </Modal-Edit>

    <Modal-Delete v-if="showPostModalDelete" @close = "abrirModalDel('hide')" :produto='produto' :produtos='produtos' :toglle="abrirModalDel" :name="produto.name" :excluir='excluir'> <!-- mudar nome do modal -->

    </Modal-Delete>


    <div id="AllTabela">
          <table>
            <thead>

              <tr> <!--  Tem que ter uma ordenação aqui -->
                <th></th> 
                <th>Código</th> 
                <th>Nome</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Status</th>
                <th>Opções</th>
              </tr>

              </thead>

            <tbody>

              <tr v-for="produto in produtos" :key="produto.id">
                
                <input type= "checkbox"  :v-model="produto.id" > 
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
import Produto from '../services/produtos'
import ModalDelete from '../components/ModalDelete.vue'
import ModalEdit from '../components/ModalEdit.vue' 


export default {
    name:
    'Table',

    components:{
        ModalDelete,
        ModalEdit,
    },

    props:['produto','produtos', 'listar'],

    data(){
        return{
            showPostModalEdit:false,
            showPostModalDelete: false,
            toggleModalDelete:{
            },
            fullPostEdit:{},
            
           /*  produtosDaTabela:{ uma ideia jogar os dados que estao na tabela armazenar em um array e passar para os modals
                prod: 'produtos'
            } */
        }

    },

 

    methods:{
        async excluir(id){ //esse tem que ficar no modal de excluir
      
            if(confirm('Você deseja Realmente excluir o produto ' + "?"))
                await Produto.deletar(id).then(response =>{
                console.log(response)
                this.listar();
            }).catch((error) =>{
                alert('Não foi possivel deletar' + error)
            })
        }, 

        modalEdit(produto){
            this.showPostModalEdit = !this.showPostModalEdit
            produto = true

            if(this.showPostModalEdit){
                this.fullPostEdit = produto.name;
            }else{
                this.fullPostEdit = this.produto
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
        editar(produto){
            this.produto = produto;
            console.log(produto)
        }

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