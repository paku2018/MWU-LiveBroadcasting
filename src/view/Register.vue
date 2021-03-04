<template>
  <div role="main" class="main">
    <section class="common-page bg-prelude h-100">
      <b-form @submit.prevent="formSubmit">
        <div class="container max-height d-flex align-items-center justify-content-center">
        <div class="row flex-grow-1">
            <div class="col-12 col-md-8 offset-md-2">
              <h2 class="text-yellow mb-3">Register</h2>
              <div class="custom-group mb-3">
                <label class="text-yellow mb-1">Name</label>
                <input type="text" class="form-control form-input-control" v-model="name">
              </div>
              <div class="custom-group mb-3">
                <label class="text-yellow mb-1">Email</label>
                <input type="text" class="form-control form-input-control" v-model="email">
              </div>
              <div class="custom-group mb-3">
                <label class="text-yellow mb-1">Password</label>
                <input type="password" class="form-control form-input-control" v-model="password">
              </div>
              <div class="custom-group mb-3">
                <label class="text-yellow mb-1">Confirm Password</label>
                <input type="password" class="form-control form-input-control" v-model="confirm_password">
              </div>
            </div>
            <div class="text-right col-12 col-md-8 offset-md-2">
              <b-button type="submit" class="btn-primary" :disabled="name==''||email==''||password==''||confirm_password==''">Register</b-button>
            </div>
          <div class="text-center col-12 col-md-8 offset-md-2 mt-3 mt-md-1">
            <router-link tag="a" class="text-yellow hover-yellow" to="/login">I already have an account</router-link>
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
        name: '',
        email: '',
        password: '',
        confirm_password: '',
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
        if(this.password!=this.confirm_password) {
          this.$notify({
            group: 'foo',
            type: 'warn',
            title: 'Error',
            text: 'Please confirm the password.',
            animation_type:'slide'
          });
          return;
        }
        this.register({ email: this.email, password: this.password })
      },
      register(values){
        getApiManager()
          .post(`${apiBaseUrl}/api/register`, values)
          .then((response) => {
              let res = response.data;
              if(res.status===true){
                this.$swal({
                  title: 'Success',
                  text: "You registered successfully",
                  icon: 'info',
                  showCancelButton: false,
                  confirmButtonColor: '#057bfd',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'OK'
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.$router.push('/login');
                  }
                });
              }
              else{
                if(res.email_error){
                  this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: 'Error',
                    text: 'Email is in use.',
                    animation_type:'slide'
                  });
                  return;
                }
                else{
                  this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: 'Error',
                    text: 'Server Error',
                    animation_type:'slide'
                  });
                  return;
                }
              }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    watch: {

    }
  }
</script>
