<<template>
  <div class="profile container">
    <div class="card">
      <div class="row header">
        <h1>Edit Your Profile </h1>
        <button type="button" class="btn btn-default pull-right logout" @click="logout">
          <i class="fa fa-sign-out" aria-hidden="true"></i> Logout</button>
      </div>
      <hr/>
      <br/>

      <div layout="row" flex>
        <div class="col-xs-4 col-xs-offset-1">

          <form>
            <div class="form-group">
              <text-field label="First name..." labelFloat
                    v-model.lazy.trim="userData.firstName" 
                    v-validate="'required|regex:^[A-Za-z]*$'"
              />  
              <em v-show="errors.has('firstName')">{{ errors.first('firstName') }}</em>
            </div>

            <div class="form-group">
              <text-field label="Last name..." labelFloat
                v-model.lazy.trim="userData.lastName" 
                v-validate="'required|regex:^[A-Za-z]*$'"
              />  
              <em v-show="errors.has('lastName')">{{ errors.first('lastName') }}</em>
            </div>

            <div class="form-group">
              <text-field label="Password..." labelFloat
                type="password"
                v-model.lazy.trim="userData.password" 
                v-validate="'required|min:3|regex:^[A-Za-z]*$'"
              />  
              <em v-show="errors.has('password')">{{ errors.first('password') }}</em>
            </div>
            <br/>
            
            <button type="submit" class="btn btn-primary" @click.prevent="saveProfile">Save</button>
            <button type="button" class="btn btn-default" @click="cancel">Cancel</button>

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

export default {
  data () {
    return {
      userData: {
        id: null,
        firstName: '',
        lastName: '',
        password: ''
      },
      mouseoverLogin: false,
    }
  },
  created() {
    const currentUser = this.$store.state.user.currentUser
    if (!currentUser) {
      this.$router.push('/login?returnUrl=/profile')
    }
    this.userData = {...currentUser}
  },
  methods: {
    saveProfile() {
      this.$store.commit('UPDATE_USER', this.userData)
      this.$router.push('/dashboard')
    },
    cancel() {
      this.$router.push('/dashboard');
    },
    logout() {
      this.$store.state.user.currentUser = null
      this.$router.push('/dashboard' )
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

div.header {
  display: flex; 
  margin-top: 2em;
}
h1 {
  margin: auto; 
  margin-left: 1em;
}
button.logout {
  margin: auto; 
  margin-right: 3em;
}
.mu-card {
  height: 40em;
  padding: 10px 70px;
  margin-bottom: 10px;
}
li.user {
  width: 30px;
  cursor: pointer;
}
</style>
