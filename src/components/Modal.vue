<template>
  <div class="modal">
      
    <div class="cont">
        <span><strong>Detalhe do Produto</strong> </span> 
        <div class="form">
          <form @submit.prevent="salvar">
            
              <div class="inputName">
                  <label>Nome</label><br>
                  <input type="text" v-model="produto.name">
                  <br>
              </div>


               <label>Descrição</label> <br>   
               <textarea rows="4" cols="70"></textarea><br>

              <div class="status">
                <label>Status</label><br>
                
                <select v-model="produto.status">
                  
                      <option>EMESTOQUE</option>
                      <option>SEMESTOQUE</option>
                      <option>BAIXOESTOQUE</option>
                    
                </select><br>
              </div>  

              <div class="radio">
                <label >Categoria</label><br>
                <input type="radio" id="CATEGORIA1" value="CATEGORIA1" v-model="produto.categoria">
                <label for="CATEGORIA1">Categoria 1</label>

                <input type="radio" id="CATEGORIA2"  value="CATEGORIA2" v-model="produto.categoria">
                <label for="CATEGORIA2">Categoria 2</label><br>
                
                <input type="radio" id="CATEGORIA3" value="CATEGORIA3" v-model="produto.categoria">
                <label for="CATEGORIA3">Categoria 3</label>

                <input type="radio" id="CATEGORIA4" value="CATEGORIA4" v-model="produto.categoria">
                <label for="CATEGORIA4">Categoria 4</label>
              </div>  
    
              <br>
              <div class="numeros">
                <label id="lbPreco">Preço</label>
                <label id="labelQtd">Quantidade</label><br>
                <input type="number" v-model="produto.price" step="0.01"  min="0" >
                <input id = "inputQtd" type="number">
              </div> 
            <div class="btnModal">
              
              <button @click="$emit(`close`)" class= "close">Voltar</button>
              <button class="salvarModal">  +Salvar </button> 
            </div>  
          </form>  
        </div>
    </div>

  </div>
</template>

<script>
import Produto from '../services/produtos'

export default {
    name: "Modal",
    props: ['produtose'],
    
    data(){ //excluir isso
    return{
      
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
  methods:{
        async salvar(){
          if(this.produto.name != '' || this.produto.categoria != '' || this.produto.status != '' || this.produto.price > 0){
            await Produto.salvar(this.produto).then(response =>{
              console.log(response)
              this.produto = {} 
              alert("Salvo com Sucesso")
              window.location.reload();
              this.listar() 
            }).catch((error)=>{
              alert('Nenhum Campo pode ser nulo' + error)
              console.log(this.produto)
            })
          
           }else{
            this.produto = console.log(this.produto)
            alert('Nenhum campo pode ser nuloasd') //fazer validação no back
          }  
          
        },  
  }
        
}
</script>

<style scoped>
.modal{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    color: #121212;
}
.modal .cont{
    position: fixed;
    max-width: 500px;
    top: 4vh;
    bottom: 4vh;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 2rem;
    border: 4px;
    background-color: #fff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
    overflow: auto;
   
}


.close a{
    cursor: pointer;
    background: #121212;
    padding: 4px 15px;
    color: #fff;
    
    top: 10px;
    left: 10px;
}

.form{
  display: flex;
}



.inputName input{
width: 98%;
height: 30px;
margin-top: 7px;
margin-bottom: 7px;
}

textarea{
  width: 98%;
  margin-top: 7px;
  margin-bottom: 7px;
}

select{
  width: 99%;
  height: 30px;
}

.status{
  margin-top: 4px;
  margin-bottom: 15px;
  align-items: center;

}

.status select{
  margin-top: 4px;
  margin-bottom: 15px;
  align-items: center;

}

#CATEGORIA2{
  margin-left: 30%;
  margin-bottom: 12px;
  margin-top: 12px;

}

#CATEGORIA4{
  margin-left: 30%;

}

.numeros{
  height: 15%;
}

.numeros input{
  height: 20px;
  margin-bottom: 10px;
  margin-top: 4px;
  width: 30%;
}

.numeros label{
  
 margin-bottom: 20px;
}



#labelQtd{
   margin-left: 35%;
}

#inputQtd{
  margin-left: 11%;
}

button{
  border: none;
  color: rgb(10, 42, 112);
  font-size: 14px;
  font-weight: bold;
  text-shadow: none;
  margin-right: 10px;
  margin-top: 40px;
  cursor: pointer;
  
}

.btnModal{
  display: flex;
  width: 30px;

  
}

.close{
  margin-left: 300px;
  margin-top: 40px;
  
}

</style>