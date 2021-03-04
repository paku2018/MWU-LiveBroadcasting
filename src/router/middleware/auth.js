const auth =  function({ next, store }){
  if(!store.getters.auth.loggedIn){
    return next('/login')
  }
  return next()
}

const check_auth = function({ next, store }) {
  if(store.getters.auth.loggedIn){
    if(store.getters.auth.role){
      let role = store.getters.auth.role;
      if(role=="admin")
        return next('/admin/event')
      else if(role=="speaker")
        return next('speaker/profile')
      else
        return next();
    }
  }
  return next();
}

const check_auth_visitor = function({ next, store, router }) {
  if(store.getters.auth.loggedIn){
    if(store.getters.auth.role){
      let role = store.getters.auth.role;
      if(role=="visitor")
        return next('dashboard')
      else
        return next();
    }
  }
  return next();
}

const auth_manager =  function({ next, store }){
  if(!store.getters.auth.loggedIn){
    return next('/login')
  }
  else if(store.getters.auth.role!="admin"){
    return next('/login')
  }
  return next();
}

const auth_visitor =  function({ next, store }){
  if(!store.getters.auth.loggedIn){
    return next('/visitor/error')
  }
  else if(store.getters.auth.role!="visitor"){
    return next('/visitor/error')
  }
  return next();
}
const auth_speaker =  function({ next, store }){
  if(!store.getters.auth.loggedIn){
    return next('/login')
  }
  else if(store.getters.auth.role!="speaker"){
    return next('/login')
  }
  return next();
}

export {auth, check_auth,check_auth_visitor, auth_manager, auth_visitor, auth_speaker};
