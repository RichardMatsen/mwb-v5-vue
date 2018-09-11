<template>
  <nav class="navbar navbar-default navbar-inverse">
    <div class="container-fluid">

      <div class="navbar-header">
        <button type="button" class="navbar-toggle"
            data-toggle="collapse" data-target="#myNavbar"
            @click="isCollapsed = !isCollapsed"
            aria-controls="myNavbar">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a id="covered" class="navbar-brand" href="/">Migration Workbench</a>
      </div>

      <div class="collapse navbar-collapse" id="myNavbar" :class="{in: !isCollapsed}">

        <!-- Page navigaion -->
        <ul class="nav navbar-nav">
          <router-link to="/dashboard" tag="li" active-class="active"><a>Dashboard</a></router-link>
          <router-link to="/validations" tag="li" active-class="active"><a>Validations</a></router-link>
          <router-link to="/referentials" tag="li" active-class="active"><a>Referentials</a></router-link>
          <router-link :to="{ name: 'Clinics'}"  tag="li" active-class="active"><a>Clinics</a></router-link>
          <router-link to="/tasks" tag="li" active-class="active"><a>Team Tasks</a></router-link>
          <router-link to="#" @click.native="openDocSidebar" tag="li" active-class="active"><a>About</a></router-link>
        </ul>

        <!-- User functions -->
        <ul class="nav navbar-nav navbar-right">
          <router-link :to="{ path: userRoute }" tag="li" active-class="active">
            <a v-if="!isAuthenticated"><span class="fa fa-lg fa-sign-in"></span> Login</a>
            <a v-if="isAuthenticated"><span class="fa fa-lg fa-user"></span> <i>{{ currentUser.firstName }}</i> <b>{{ currentUser.lastName }}</b> </a>
          </router-link>
        </ul>

      </div>

    </div>
  </nav>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      isCollapsed: true,
      panelMutation: 'TOGGLE_DOCS_PANEL'
    }
  },
  methods: {
    openDocSidebar() {
      this.$store.commit('TOGGLE_DOCS_PANEL')
    },
    // illustrate mapMutations with function syntax
    ...mapMutations({
      // openDocSidebar: `${this.panelMutation}`                     // this does not work
      openDocSidebar2(commit) { commit(this.panelMutation) }
    })
  },
  computed: {
    currentUser() {
      return this.$store.state.user.currentUser
    },
    isAuthenticated() {
      return this.currentUser
    },
    userRoute() {
      return this.isAuthenticated ? '/profile' : '/login'
    }
  },
}
</script>

<style scoped>
  li.active a { 
    color: #F97924 !important; 
    cursor: pointer; 
  }
</style>
