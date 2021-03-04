<template>
  <div role="main" class="main">
    <section class="common-page minh-100 together_we_join image-page">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-9">
            <div class="border-l text-left">
              <p class="text-uppercase">Together we join you. We are here with you</p>
            </div>
          </div>
          <div class="col-12">
            <ul class="list-unstyled">
              <li v-for="visitor in visitors" :key="visitor.id">
                <a href="javascript:void(0);">
                  <img :src="require('@/assets/img/'+visitor.img)" class="img-fluid">
                </a>
                <br>
                <small> {{visitor.name}}</small>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import {getApiManager} from "../../api";
  import {apiBaseUrl} from '../../constants/config';

  export default {
  data () {
    return {
      visitors:[
        {id:1,img:'together_we_join_pic_1.png',name:'Samantha'},
        {id:2,img:'together_we_join_pic_2.png',name:'Samantha'},
        {id:3,img:'together_we_join_pic_3.png',name:'Samantha'},
        {id:4,img:'together_we_join_pic_4.png',name:'Samantha'},
        {id:5,img:'together_we_join_pic_5.png',name:'Samantha'},
        {id:6,img:'together_we_join_pic_6.png',name:'Samantha'},
        {id:7,img:'together_we_join_pic_7.png',name:'Samantha'},
        {id:8,img:'together_we_join_pic_8.png',name:'Samantha'},
        {id:9,img:'together_we_join_pic_9.png',name:'Samantha'},
        {id:10,img:'together_we_join_pic_10.png',name:'Samantha'},
        {id:11,img:'together_we_join_pic_11.png',name:'Samantha'},
        {id:12,img:'together_we_join_pic_12.png',name:'Samantha'},
        {id:13,img:'together_we_join_pic_13.png',name:'Samantha'},
        {id:14,img:'together_we_join_pic_14.png',name:'Samantha'}
        ]
    }
  },
  mounted() {
  },
  methods:{

  },
  components: {

  },
  computed: {
  },
  watch:{

  }
}
</script>
