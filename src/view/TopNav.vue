<template>
  <header class="header">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-12">
          <nav class="navbar navbar-expand-md navbar-dark pl-lg-0" v-if="current_user && current_user.role != 'visitor'">
            <a class="navbar-brand" href="javascript:void(0);">MOURN WITH US</a>
            <div class="navbar-list" v-if="current_user && current_user.role==='admin'">
              <router-link tag="a" class="text-yellow hover-yellow mr-3 mr-md-5" to="/admin/profile">Profile</router-link>
              <router-link tag="a" class="text-yellow hover-yellow mr-3 mr-md-5" to="/admin/event">Event</router-link>
              <router-link tag="a" class="text-yellow hover-yellow mr-3 mr-md-5" to="/admin/speakers">Speakers</router-link>
            </div>
            <div class="navbar-list" v-if="current_user && current_user.role==='speaker'">
              <router-link tag="a" class="text-yellow hover-yellow mr-3 mr-md-5" to="/speaker/profile">Profile</router-link>
              <router-link tag="a" class="text-yellow hover-yellow mr-3 mr-md-5" to="/speaker/live">Live</router-link>
            </div>
            <a href="#" class="text-yellow hover-yellow logout" @click="logout" v-if="current_user && current_user.role!='visitor'"><i class="fas fa-sign-out-alt"></i>Logout</a>
          </nav>
          <nav class="navbar navbar-expand-md navbar-dark justify-content-center" v-if="current_user && current_user.role === 'visitor'">
            <a class="navbar-brand" href="javascript:void(0);">{{deceased_name}}</a>
          </nav>
          <nav class="navbar navbar-expand-md navbar-dark justify-content-center" v-if="!current_user">
            <a class="navbar-brand" href="javascript:void(0);">MOURN WITH US</a>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import {mapActions,mapGetters,mapMutations} from 'vuex'
export default {
  data(){
    return{
      current_user : JSON.parse(localStorage.getItem('loginInfo')),
      deceased_name : localStorage.getItem('deceased_name')?localStorage.getItem('deceased_name'):"MOURN WITH US"
    }
  },
  mounted() {

  },
  methods:{
    ...mapActions(['signOut']),
    logout(){
      this.signOut();
      this.$router.push('/login')
    }
  }

}
</script>

