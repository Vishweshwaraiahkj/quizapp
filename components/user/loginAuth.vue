<template>
  <div class="loginForm">
    <div class="bg"></div>
    <b-form v-if="show" @submit.prevent="userLogin" @reset.prevent="onReset">
      <div class="inputsContainer">
        <b-btn pill variant="outline-light" class="d-flex back_to_home_btn">
          <nuxt-link to="/">Back to Home</nuxt-link>
        </b-btn>
        
        <div class="inputs">
          <b-form-group
            v-if="isRegister"
            id="input-group-0"
            label-for="input-0"
          >
            <b-form-input
              id="input-0"
              v-model="form.name"
              type="text"
              required
              placeholder="Enter name"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label-for="input-1"
            :description="
              isRegister ? 'Email doesnt exists, please register!' : ''
            ">
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.password"
              type="password"
              required
              placeholder="Enter password"
            ></b-form-input>
          </b-form-group>
          <input type="hidden" name="grant_type" :value="grantType" />
          <b-form-group v-if="!isRegister" id="input-group-4">
            <p><a href="#">Forgot password?</a></p>
          </b-form-group>
        </div>
      </div>
      <footer>
        <!-- use type="reset" variant="danger" to add a Reset button -->
        <b-button class="mb-2 btn-block" type="submit" variant="primary">
          <span v-if="isRegister">Register</span>
          <span v-else>Login</span>
        </b-button>
        <a v-if="!isRegister" @click="register(true)">
          No account, then register here!
        </a>
        <a v-else @click="register(false)">Already Registered? Login here!</a>
       <!--
        <ClientOnly>
          <VFacebookLogin
            v-model="model"
            class="btn-block"
            :use-alt-logo="true"
            app-id="1953752748051856"
            @sdk-init="handleSdkInit"
            @login="fbLogin"
            @logout="fbLogout"
            @click="fbClick"
          ></VFacebookLogin>
        </ClientOnly>
        -->
      </footer>
    </b-form>
  </div>
</template>
<script>
export default {
  name: 'LoginAuth',
  props: {
    endUrl: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        remember: false
      },
      show: true,
      FB: {},
      model: {},
      scope: {}
    }
  },
  computed: {
    isRegister() {
      return this.$store.state.users.register
    },
    grantType() {
      return this.$store.state.users.grant_type
    }
  },
  mounted() {
    this.$auth.logout('local')
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
    },
    async userLogin() {
      try {
        const response = await this.$auth.loginWith('local', {
          data:
            'username=' +
            this.form.email +
            '&password=' +
            this.form.password +
            '&grant_type=' +
            this.$store.state.users.grant_type
        })
        this.$auth.setUserToken(response.data.access_token)
        const user = await this.$axios.$get('/users/' + response.data.userId)
        await this.setUserData(user)
        if (this.endUrl != null) {
          await this.$router.push('/' + this.endUrl)
        }
      } catch (err) {
        console.log('Login Error: ', err)
      }
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.name = ''
      this.form.email = ''
      this.form.password = ''
      this.form.remember = false
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    register(value) {
      this.$store.commit('users/SET_REGISTER_PAGE', value)
    },
    setUserData(user) {
      this.$auth.setUser(user)
      this.$store.commit('users/SET_USER_DATA', user)
      this.$auth.$storage.setUniversal('USER_DATA', user)
    },
    handleSdkInit({ FB, scope }) {
      this.FB = FB
      this.scope = scope

      if (scope.connected) {
        this.setLocalToken(this.FB)
        this.setFbUserData()
      }
    },
    setFbUserData() {
      this.FB.api('/me', 'GET', { fields: 'id,name,email,picture' }, (user) => {
        this.setUserData(user)
      })
    },
    setLocalToken(FB) {
      const res = FB.getAuthResponse()
      this.$auth.setToken('local', res.accessToken)
    },
    fbLogin(response) {
      if (response) {
        this.setLocalToken(this.FB)
        this.setFbUserData()
      }
    },
    fbLogout(response) {
      if (response) {
        this.$auth.logout('local')
        if (this.scope) this.scope.connected = false
      }
    },
    fbClick() {
      console.log('FB Btn Click')
    }
  }
}
</script>
<style lang="scss" scoped>
.loginForm {
  overflow-y: auto;
  background-color: #fff;
  height: 80vh;
  width: 30%;
  min-height: 100px;
  min-width: 350px;
  margin: 0 auto 2em auto;
  border-radius: 5px;
  padding: 1em;
  position: relative;
  overflow: hidden;
  box-shadow: 0 6px 31px -2px rgba(0, 0, 0, 0.3);

  a {
    text-decoration: none;
    color: #000;
  }

  p {
    font-size: 13px;
    color: #333;
    line-height: 2;
  }

  button.back_to_home_btn {
    background: transparent;
    max-width: 200px;
    margin: auto;

    a {
      margin: auto;
    }
  }

  form {
    .inputsContainer {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      text-align: center;
      padding: 2em;
    }

    input {
      width: 100%;
      padding: 13px 15px;
      margin: 0.7em auto;
      border-radius: 100px;
      border: none;
      background: #257aa6;
      font-family: 'Poppins', sans-serif;
      outline: none;
      color: #fff;
      height: auto;

      &::placeholder {
        color: #fff;
        font-size: 13px;
      }

      &:focus {
        color: #000;
        font-size: 13px;
      }
    }
  }

  header {
    width: 100%;
    min-height: 120px;
    margin: 1em auto;
  }

  .inputs {
    margin: auto;
  }

  footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2em;
    text-align: center;
  }

  .bg {
    width: 100%;
    height: 95%;
    background: #b8dff3;
    position: absolute;
    top: -5em;
    left: 0;
    right: 0;
    margin: auto;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    clip-path: ellipse(69% 46% at 48% 46%);
  }
}

@media screen and (max-width: 640px) {
  .loginForm {
    width: 100%;
    height: 100vh;
    border-radius: 0;
  }

  .bg {
    top: -7em;
    width: 450px;
    height: 95vh;
  }
  header {
    width: 90%;
    height: 250px;
  }
  .inputs {
    margin: 0;
  }
  input,
  button {
    padding: 18px 15px;
  }
}
</style>
