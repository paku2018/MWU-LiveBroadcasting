<template>
  <div role="main" class="main">
    <section class="common-page bg-prelude h-100">
      <b-form @submit.prevent="formSubmit">
        <div class="container max-height d-flex align-items-center justify-content-center">
        <div class="row flex-grow-1">
            <div class="col-12 col-md-8 offset-md-2">
              <h2 class="text-yellow mb-3">Mourn with Us Backroom</h2>
              <div class="custom-group mb-3">
                <label class="text-yellow mb-1">Email</label>
                <input type="text" class="form-control form-input-control" v-model="email">
              </div>
              <div class="custom-group mb-3">
                <label class="text-yellow mb-1">Password</label>
                <input type="password" class="form-control form-input-control" v-model="password">
              </div>
              <div class="custom-group mb-3">
                <b-form-radio-group name="radius" v-model="login_type">
                  <b-form-radio value="admin">Admin</b-form-radio>
                  <b-form-radio value="speaker">Speaker</b-form-radio>
                </b-form-radio-group>
              </div>
            </div>
            <div class="text-right col-12 col-md-8 offset-md-2">
              <b-button type="submit" class="btn-primary" :disabled="email==''||password==''">LogIn</b-button>
            </div>
        </div>
        </div>
      </b-form>
    </section>
  </div>
</template>
<script>
  import {getApiManager} from "../api";
  import {apiBaseUrl} from '../constants/config';
  import {mapActions} from 'vuex';
  import {validateEmail} from "../util";

  export default {
    data () {
      return {
        email: '',
        password: '',
        login_type : 'admin',
        inputForm: 0
      }
    },
    computed: {

    },
    methods: {
      ...mapActions(['setLoggedInfo']),
      formSubmit () {
        if(!validateEmail(this.email)){
          this.$notify({
            group: 'foo',
            type: 'warn',
            title: 'Error',
            text: 'Input a correct email type.',
            animation_type:'slide'
          });
          return;
        }
        if(this.password.length<6) {
          this.$notify({
            group: 'foo',
            type: 'warn',
            title: 'Error',
            text: 'Password should be more 6 characters.',
            animation_type:'slide'
          });
          return;
        }
        if(this.password.length>30) {
          this.$notify({
            group: 'foo',
            type: 'warn',
            title: 'Error',
            text: 'Password should be less 30 characters.',
            animation_type:'slide'
          });
          return;
        }
        this.login({ email: this.email, password: this.password, type: this.login_type })
      },
      login(values){
        getApiManager()
          .post(`${apiBaseUrl}/api/login`, values)
          .then((response) => {
              let res = response.data;
              if(res.status===true){
                this.setLoggedInfo({token: res.token, name:res.content.email, role:values.type, event_id:res.content.event_id, id: res.content.id});
                localStorage.removeItem('deceased_name');
                if(values.type=="admin")
                  this.$router.push('/admin/event');
                else if(values.type=="speaker")
                  this.$router.push('/speaker/profile');
              }
              else{
                this.$notify({
                  group: 'foo',
                  type: 'warn',
                  title: 'Error',
                  text: 'Email and Password are incorrect',
                  animation_type:'slide'
                });
                return;
              }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    watch: {
      loginError (val) {
        if (val != null) {
          this.$notify({
            group: 'foo',
            type: 'warn',
            title: 'Error',
            text: val,
            animation_type:'slide'
          });
          return;
        }
      }
    }
  }
</script>
