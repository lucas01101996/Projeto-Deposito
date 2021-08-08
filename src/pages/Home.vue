<template>
  <div id = "home">
    <h2>Estoque de Produtos</h2>

    <div class="total">
      <div id="addEx">
        <button @click="modal(produto)"  class="btnSave"> <strong> +</strong> Novo </button>
        <button   class="btnExcluirAll"><i class="fa fa-trash"></i>Excluir</button>
      </div>

      <div id="procurar" >
          <h3>Gerenciar Produto</h3>
          
          <div class="dois">
            <input type="text" placeholder="Nome do Produto..." v-model="produto.name">
            <button  @click="pesquisar(produto.name)" class="btnPesquisar" ><i class="fa fa-search"></i>Pesquisar</button> <!-- Aqui vai ter um @click = pesquisar por nome -->
          </div>
      </div>
   
    
      <div class="container">
        <!-- Fazer um model aqui -->
        <Modal v-if="showPostModal" :produto =  "fullPost" @close ="modal('hide')"> 
          
        </Modal>

        <Modal-Edit v-if = "showPostModalEdit" :produto = "fullPostEdit" @close = "modalEdit('hide')" :id="produto.Id">

        </Modal-Edit>

        <Modal-Delete v-if="showPostModalDelete" @close = "abrirModalDel('hide')" :excluir = "produto.id" :toglle="abrirModalDel" :produto="produto" :name="produto.name"> <!-- mudar nome do modal -->

        </Modal-Delete>
        
        
        <div id="tabela">
          <table>
            <thead>

              <tr> <!--  Tem que ter uma ordenação aqui -->
                <th>Id </th> 
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
    </div>
  </div>
</template>
   
<script>

import Produto from '../services/produtos'
import Modal from '../components/Modal.vue'
import ModalDelete from '../components/ModalDelete.vue'
import ModalEdit from '../components/ModalEdit.vue' 
 
export default {
    name:
    'Home',
    components:{
        Modal,
        ModalDelete,
        ModalEdit, 
             
    },
data(){
    return{
      showPostModal: false,
      showPostModalEdit:false,
      showPostModalDelete: false,
      toggleModalDelete:{
        
      },
      fullPost:{},
      fullPostEdit:{},
      produto:{
        id: '',
        name: '',
        price: '',
        cod: '',
        categoria: '',
        status: ''
    
      },
      produtos: [],
    }
  },

  mounted(){
    this.listar()
  },

  methods:{

    /* randomCod (c){
       this.produto.cod = c;  
       c = Math.random().toString(36).substring(2); 
      
    }, */
    //mostra minha tabela
    async listar(){
      await Produto.listar().then(response =>{
      
      this.produtos = response.data;
      })
    },
    
    //isso tem que estar somente no modal
    async salvar(){
          if(!(this.produto.name === "" && this.produto.categoria === '' && this.produto.status === '' && this.produto.price>0)){
            await Produto.salvar(this.produto).then(response =>{
              console.log(response)
              this.produto = {} 
              alert("Salvo com Sucesso")
              this.listar() 
            }).catch((error)=>{
              alert('gerou erro:' + error)
          })
          }else{
            alert('Nenhum campo pode ser nulo') //fazer validação no back
          }
          
    },
    //edita o objeto
    async atualizar(){
         await Produto.atualizar(this.produto).then(response =>{
            console.log(response)
            this.produto = {} 
            alert("Atualizado com Sucesso")
            this.listar() 
          }).catch((error)=>{
            alert('gerou erro:' + error)
          }) 
    },

   

    async pesquisar(name){ // pesquisar por nome
        await Produto.pesquisar(name).then(response =>{
          
           this.produtos = response.data;
           console.log(response.data)
           this.listar();
           
          }).catch((error) =>{
              alert('Não tem produtos com esse nome' + error)
          })
    },

    async excluir(id){
      
      if(confirm('Você deseja Realmente excluir o produto ' + "?"))
        await Produto.deletar(id).then(response =>{
          console.log(response)
          this.listar();
      }).catch((error) =>{
        alert('Não foi possivel deletar' + error)
      })
    }, 

    modal(produto){
      
      this.showPostModal = !this.showPostModal
      produto = true
      if(this.showPostModal){
        this.fullPost = produto.name;
      }else{
        this.fullPost = {}
      }
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
    }

  }
}

</script>

<style scoped>

#home{
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-width: 600px;
}

.total{
  background-color: rgb(236, 236, 221);
  padding: 10px;
  width: 70%;
}

#addEx {
  margin: 5px;
  padding: 10px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-left: 1%;
}

#addEx button{
  align-items: center;
  margin-right: 8px;
  border: 0;
  border-radius: 5px;
  color: white; 
  padding: 12px 16px; 
  font-size: 16px;
  cursor: pointer;
  height: 40px;
}

button{
  cursor: pointer;
}

#addEx i{
  margin-right: 8px;
}

.btnSave{
  background-color: #19c019;
}

.btnSave:hover{
  background-color: #57e057;
}

.btnExcluirAll{
  background-color: #e70101;
}

.btnExcluirAll:hover{
  background-color: #e75656;
}

#procurar{
  display: flex;
  height: 50%;
  padding: 10px 10px; 
  align-items: center;
   
}

#procurar input{
  border: none;
  border-radius: 5px;
  height: 30px;
  width: 110px;
  margin-left: 150px;
  
}

.btnPesquisar{
  background-color: #19c019;
  align-items: center;
  border: 0;
  border-radius: 5px;
  color: white; 
  cursor: pointer;
  height: 28px;
  width: 110px;
 
}

.btnPesquisar:hover{
  background-color: #57e057;
}

.dois{
  margin-left: 340px;
}

.dois i{
  margin-right: 8px;
  margin: 0%;
}

#tabela{
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
  border-radius: 60px;
  border: 0;
}

.btnTable i{
  color: #dff5df;
}

.btnAtualizar{
  background-color:#19c019;
}

.btnDeletarOne{
  color:black;
  background: #bdc019;
}
</style>