<template>
  <div role="main" class="main">
    <section class="condolence custom-height">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="border-l">
              <p class="text-left">CONDOLENCES</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-12 mb-lg-5">
                <p>{{message}}</p>
              </div>
              <div class="col-md-12 text-center mt-lg-5" v-if="visitor.full_name">
                <img :src="visitor.profile_url" class="img-fluid">
                <p class="mb-0"><small>
                  {{visitor.full_name}}
                </small></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer class="container">
      <div class="row align-items-end">
        <div class="col-md-9">
        </div>
        <div class="col-md-3">
          <div class="img-box mt-0 pointer" @click="goBack">
            <img :src="require('@/assets/img/return_program.png')" class="img-fluid float-left mr-2">
            <label class="text-primary">Return to<br>
              program
            </label>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
  import {getApiManager} from "../../api";
  import {apiBaseUrl} from '../../constants/config';

  export default {
  data () {
    return {
      condolence_id:0,
      message:'',
      visitor:{
        full_name:'',
        profile_url:null
      }
    }
  },
  mounted() {
    this.condolence_id = this.$route.params.c_id;
    getApiManager()
      .post(`${apiBaseUrl}/api/visitor/condolence/get-info`, {condolence_id:this.condolence_id})
      .then((response) => {
        let res = response.data;
        if(res.status===true){
          this.message = res.detail.message
          this.visitor.full_name = res.detail.full_name
          this.visitor.profile_url = `${apiBaseUrl}/`+res.detail.profile_url
        }
        else{
          this.$notify({
            group: 'foo',
            type: 'warn',
            title: 'Error',
            text: 'Server Error',
            animation_type:'slide'
          });
          return;
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods:{
    goBack(){
      this.$router.push('/visitor/dashboard');
    }
  },
  components: {

  },
  computed: {
  },
  watch:{

  }
}
</script>
