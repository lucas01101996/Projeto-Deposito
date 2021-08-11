<template>
  <div class="modalDelete">
      
    <div class="question" >
        
        <span><strong>Confirmação</strong></span><br>
        <span>Você deseja realmente excluir o  ? </span><br>
        
        <button  @click="excluir(produto.id) "  class="aExcluir"><i class="fa fa-check">Sim</i></button> 
        <button @click="$emit(`close`)" class= "close">Voltar</button>
    </div>
    
  </div>
</template>

<script>
import Produto from '../services/produtos'

export default {
    name: "ModalDelete",
    props:['produto', 'produtos'],
    
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

   
       
         
  }      
    

}
</script>

<style scoped>
.modalDelete{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    
}
.modalDelete .question{
    position: fixed;
    max-width: 350px;
    height: 100px;
    top: 4vh;
    bottom: 50vh;
    left: 0;
    right: 0;
    margin-left: 60vh;
    margin-top: 35vh;
    padding: 2rem;
    border: 4px;
    background-color: #fff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
    overflow: auto;
   
}

.fa fa-check{
    background-color: chartreuse;
}



</style>