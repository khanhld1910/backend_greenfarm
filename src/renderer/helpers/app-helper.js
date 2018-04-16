// The magic of state persistance is closure here
export const sharedState = {
    
}

export const phoneFormat = function(phone) {
    if (phone.length == 10) return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1-$2-$3')
    if (phone.length == 11) return phone.replace(/(\d{5})(\d{3})(\d{3})/, '$1-$2-$3')
    return phone
}

export const currencyFormat = function(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const toDate = function(datetime) {
    if (!datetime) return ''
    let date = new Date(datetime)
    let day = lessThan10Format(date.getDate())
    let month = lessThan10Format(date.getMonth() + 1)
    let year = lessThan10Format(date.getFullYear())
    return `${day}/${month}/${year}`				
}

const lessThan10Format = function(number) {
    return (number < 10) ? `0${number}` : `${number}`
}


/**
 * @exports.default {Mixin}
 */
export default {
    data: () => ({
        sharedState
    }),
    methods: {
        phoneFormat,
        currencyFormat,
        toDate,
    }
}