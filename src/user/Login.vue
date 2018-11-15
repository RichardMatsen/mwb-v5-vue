<template>
  <div class="container">
    <div class="card">
      <h1>Login</h1>
      <hr>

      <div layout="row" flex>
        <div class="col-xs-4 col-xs-offset-1">

          <form>

            <text-field id="userName" label="User name..." labelFloat
              v-model.lazy.trim="loginData.userName"  
              v-validate="'min:3|regex:^[A-Za-z]*$'" />  
              <!-- v-model.lazy = update model on change event not input event -->
            <em v-show="errors.has('userName')">{{ errors.first('userName') }}</em>

            <text-field id="password" label="Password..." labelFloat type="password"
              v-model.lazy.trim="loginData.password" />  
            <br/>
            <br/>

            <span @mouseenter="mouseoverLogin=true" @mouseleave="mouseoverLogin=false">
              <button type="submit" class="btn btn-primary" :disabled="!userIsValid" @click.prevent="login">Login</button>
            </span>
            <button type="button" class="btn btn-default" @click.prevent="cancel">Cancel</button>
            <br/>
            <br/>
            
            <h6>Hint:</h6>
            <select class="form-control" v-model="selectedName" v-binding-change="selectUser">
              <option v-for="(user, index) in users" :key="index" :value="user.lastName">
                {{ user.lastName}}
              </option>
            </select>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate/dist/vee-validate.min';
Vue.use(VeeValidate);

import AuthService from './auth.service'
import textField from '@/common/textField/textField.vue'

/* 
  Example of directive to add onChange to select element
  which currently does not emit change event when an option is selected
  Ref: https://stackoverflow.com/questions/46386061/vue-js-selected-doesnt-triggering-change-event-select-option
       https://github.com/vuejs/vue/issues/4065
*/
Vue.directive('binding-change', {
  update: function (el, binding, vnode) {
    const model = vnode.data.directives.find(d => d.name === 'model') // property bound to element model
    if (model && model.value !== model.oldValue) {
      const onChange = binding.value  // name of change handler bound to directive
      onChange(model.value)
    }
  }
})

export default {
  data () {
    return {
      loginData: {
        userName: '',
        password: ''
      },
      mouseoverLogin: false,
      returnUrl: '',
      prompt: '',
      selectedName: '' 
    }
  },
  computed: {
    users() {
      return this.$store.state.user.users
    },
    userIsValid() {
      const userIndex = this.users.map(user => user.userName).indexOf(this.loginData.userName);
      return userIndex > -1
    },
  },
  created() {
    this.returnUrl = this.$route.query.returnUrl
    this.toastrPrompt = this.$route.query.prompt || ''
    AuthService.checkUsers()
  },
  mounted() {
    if (this.returnUrl) {
      const msg = `Please login to access ${this.toastrPrompt}`
      this.$toasted.show(msg, {type: 'success'}).goAway(3000)
    }
  },
  methods: {
    selectUser(newValue) {
      this.loginData.userName = newValue
    },
    login() {
      AuthService.loginUser(this.loginData.userName, this.loginData.password);
      if (this.returnUrl) {
        this.$router.push(this.returnUrl);
      } else {
        this.$router.push('/');
      }
    },
    cancel() {
      this.$router.push('/');
    },
    select(formValues, user) {
      formValues.userName = user.userName;
    },
  },
  components: {
    'text-field': textField
  }
}
</script>

<style src='@/common/card/card.css' scoped></style>
<style scoped>

.card {
  height: 40em;
}

h1 {
  margin-left: 1em;
}

li.user {
  width: 30px;
  cursor: pointer;
}
</style>
