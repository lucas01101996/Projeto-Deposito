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
        <Modal v-if="showPostModal" :produto ="produto" :produtos="produtos" :fullPost='fullPost' :listar='listar' @close ="modal('hide')"> 
          
        </Modal>

        <Table :produto ="produto" :produtos ="produtos" :listar="listar"  ></Table> 
        
      </div>

      
    </div>
  </div>
</template>
   
<script>

import Produto from '../services/produtos'
import Modal from '../components/Modal.vue'
import Table from '../components/Table.vue'
 
export default {
    name:
    'Home',

    components:{
        Modal,
        Table,        
    },
    
data(){
    return{
      showPostModal: false,
      fullPost:{},
      
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
     async listar(){
            await Produto.listar().then(response =>{
            
            this.produtos = response.data;
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

    modal(produto){
      
      this.showPostModal = !this.showPostModal
      produto = true
      if(this.showPostModal){
        this.fullPost = produto.name;
      }else{
        this.fullPost = {}
      }
    },  

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
</style>