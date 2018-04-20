import orderBy from 'lodash/orderBy'
import { reject } from 'bluebird-lst';
const typeOf = o => Object.prototype.toString.call(o).slice(8, -1).toLowerCase()
const purify = o => JSON.parse(JSON.stringify(o)) // purify data

const getColTitle = field => {
  switch (field) {
    case 'name': return 'tên'
    case 'phone': return 'số đt'
    case 'totalCost': return 'thành tiền'
    case 'deliverTime': return 'ngày giao'
    case 'amount': return 'số lượng'
    case 'unitPrice': return 'đơn giá'
    case 'salePrice': return 'giá khuyến mãi'
    case 'birthday': return 'sinh nhật'
    case 'onSale': return 'Đang bày bán'
    default: return field
  }
}


export const DatatableHelper = {

  fillTable: (data, query) => {  
    
    let rows = data 

    query = purify(query)

    const { limit = 10, offset = 0, sort = '', order = '' } = query

    let queryFields = ['phone', 'name', 'totalCost']

    // custom query conditions
    queryFields.forEach(field => {
      switch (typeOf(query[field])) {
        case 'array':
          rows = rows.filter(row => query[field].includes(row[field]))
          break
        case 'string':
          rows = rows.filter(row => row[field].toLowerCase().includes(query[field].toLowerCase()))
          break
        default:
          // nothing to do
          break
      }
    })

    if (sort) {
      rows = orderBy(rows, sort, order)
    }

    let queryDisplay = `Có ${rows.length} kết quả`

    for (var key in query) {
      if (query.hasOwnProperty(key)) {
        let value = query[key]

        if (value != '' && value.length > 0 ) {
          if (key == 'offset' || key == 'limit') continue
          if (key == 'sort') {            
            queryDisplay += ` theo [${getColTitle(value)}] `
            continue
          }
          if (key == 'order') {       
            queryDisplay += (value == 'desc') ? ' giảm dần' : ' tăng dần'
            continue
          }
          queryDisplay += `, [${getColTitle(key)}]: ${value}` 
        }
      }
    }

    const res = {
      rows: rows.slice(offset, offset + limit),
      total: rows.length,
      queryDisplay: queryDisplay
    }

    return Promise.resolve(purify(res))

  },

}
