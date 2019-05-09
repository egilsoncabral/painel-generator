import axios from 'axios'

const DBManager = {

  addItem: (item, toCollection, callback) => {

    axios.post(`http://localhost:3000/api/${toCollection}`, item,
              { responseType: 'document' }, callback).then((response) =>{
        callback(response)
    }).catch((error) => console.log(error))
  },

  removerItem: (items, fromCollection, callback) => {
    axios.delete(`http://localhost:3000/api/${fromCollection}`,
        {data: items}, callback).then((response) => {
        callback(response)
    }).catch((error) => console.log(error))
  }

}

export default DBManager;
