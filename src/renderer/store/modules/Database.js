import {db} from '../../helpers/firebase-helper'

const state = {
  products: [],
  billList: []
}

const mutations = {
  GET_BILLS(state, bills) {
    state.billList = bills
  },
  GET_PRODUCTS(state, products) {
    state.products = products
  },
  UPDATE_BILL(state, bill) {    
    let ref = db.ref('Bills/'+bill.id)
    const update =  bill
   // remove the .key attribute
    delete update['.key']

    ref.update(update)
  }
}

const getters = {
  products: state => {
    return state.products
  },
  productByID: state => productID => {
    return state.products.find(product => product.id === productID )
  },
  sentBills: state => {
    return state.billList    
  }
}

const actions = {
  //========== IMPORTANT ==============>
  //mutations have to be synchronous? Actions don't
  //========== IMPORTANT ==============>
  someAsyncTask({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  },
  getProducts({ commit }) {
    // dispatched in dashboard component
    let ref = db.ref().child('Products/').orderByChild('id')
    ref.on('value', (snap) => {
      let productList = []
      snap.forEach(item => {
        var itemVal = item.val()
        productList.push(itemVal)
      })
      commit('GET_PRODUCTS', productList)
    })
  },
  /// ---------------- bills actions start------------------------
  getBillList({ commit }) {
    return new Promise((resolve, reject) => {
      // dispatched in dashboard component
      let ref = db.ref().child('Bills/').orderByChild('id')
      ref.on('value', snap => {
        let bills = []

        snap.forEach(item => {
          var itemVal = item.val()
          bills.push(itemVal)
        })
        //console.log('changed')
        commit('GET_BILLS', bills)
        resolve(bills)
      })

    })
    
  },
  updateBill({commit}, bill ) {
    // dispatched in dashboard component
    commit('UPDATE_BILL', bill)
  }
  /// ---------------- bills actions end------------------------
}

export default {
  state,
  mutations,
  actions,
  getters
}
