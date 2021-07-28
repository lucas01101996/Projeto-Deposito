import { http } from './config'

export default{
    listar:() =>{
        return http.get('product')
    },

    salvar:(produto) =>{
        
        return http.post('save', produto);
    },

    atualizar:(produto) => {
        return http.put('updade', produto)
    },

    deletar:(id)  =>{
        return http.delete(`delete/${id}`, {data: id})
    }
}