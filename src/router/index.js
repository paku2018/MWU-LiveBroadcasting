import Vue from 'vue'
import Router from 'vue-router'
import Login from "../view/Login";
import Register from "../view/Register";
import NotFound from "../view/NotFound";
import {managerRoutes} from "./manager";
import {visitorRoutes} from "./visitor";
import {speakerRoutes} from "./speaker";
import middlewarePipeline from './middlewarePipeline'
import store from '../store/store';

import Colxx from '../components/Colxx'
import {auth,check_auth} from "./middleware/auth";

Vue.use(Router)
Vue.component('b-colxx',Colxx)

const router = new Router({

  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: Login,
      component: Login,
      meta:{
        middleware:[
            check_auth
        ]
      }
    },
    {
      path: '/register',
      name: Register,
      component: Register,
      meta:{
        middleware:[
          check_auth
        ]
      }
    },
    managerRoutes,
    visitorRoutes,
    speakerRoutes,
    {
      path: '*',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next,
    store
  }


  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })

})

export default router
