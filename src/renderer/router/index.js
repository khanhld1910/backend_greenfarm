import Vue from 'vue'
import Router from 'vue-router'
let Dashboard = require('@/components/Dashboard')
let Sent = require('@/components/Bills/Sent')
let Checked = require('@/components/Bills/Checked')
let Done = require('@/components/Bills/Done')

Vue.use(Router)

const withPrefix = (prefix, routes) =>
  routes.map((route) => {
    route.path = prefix + route.path
    return route
  })

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard.default,
      children: [        
        {
          path: 'bills/sent',
          component: Sent.default,
          name: 'bills/sent'
        },      
        {
          path: 'bills/checked',
          component: Checked.default,
          name: 'bills/checked'
        },    
        {
          path: 'bills/done',
          component: Done.default,
          name: 'bills/done'
        },
      ]
    },
    {
      path: '*',
      redirect: '/bills/sent'
    }
  ]
})

router.replace({
  path: '*',
  redirect: '/bills/sent'
})
export default router
