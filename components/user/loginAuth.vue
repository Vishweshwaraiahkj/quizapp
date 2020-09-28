<style scoped>
.loginForm {
  background-color: #fff;
  width: 30%;
  height: 80vh;
  min-width: 350px;
  margin: 2em auto;
  border-radius: 5px;
  padding: 1em;
  position: relative;
  overflow: hidden;
  box-shadow: 0 6px 31px -2px rgba(0, 0, 0, 0.3);
}

a {
  text-decoration: none;
  color: #000;
}

p {
  font-size: 13px;
  color: #333;
  line-height: 2;
}

.light {
  text-align: right;
  color: #fff;
}

.light a {
  color: #fff;
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

form .inputsContainer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
  padding: 2em;
}

header {
  width: 100%;
  min-height: 120px;
  margin: 1em auto;
}

form input {
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
}

input::placeholder {
  color: #fff;
  font-size: 13px;
}

input:focus {
  color: #000;
  font-size: 13px;
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

button {
  width: 100%;
  padding: 13px 15px;
  border-radius: 100px;
  border: none;
  background: #257aa6;
  font-family: 'Poppins', sans-serif;
  outline: none;
  color: #fff;
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
<template>
  <div class="loginForm">
    <div class="bg"></div>
    <b-form v-if="show" @submit.prevent="userLogin" @reset.prevent="onReset">
      <div class="inputsContainer">
        <header>
          <img
            src="https://assets.codepen.io/3931482/internal/avatars/users/default.png?format=auto&height=80&version=1592223909&width=80"
          />
        </header>
        <div class="inputs">
          <b-form-group
            v-if="this.$store.state.users.register"
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
              this.$store.state.users.register
                ? 'Email doesnt exists, please register!'
                : ''
            "
          >
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

          <input
            type="hidden"
            name="grant_type"
            :value="this.$store.state.users.grant_type"
          />

          <b-form-group
            v-if="!this.$store.state.users.register"
            id="input-group-4"
          >
            <b-form-checkbox v-model="form.remember">
              Remember me
            </b-form-checkbox>
            <p><a href="#">Forgot password?</a></p>
          </b-form-group>
        </div>
      </div>
      <footer>
        <!-- use type="reset" variant="danger" to add a Reset button -->
        <b-button class="mb-2" type="submit" variant="primary">
          <span v-if="this.$store.state.users.register">Register</span>
          <span v-else>Login</span>
        </b-button>
        <a v-if="!this.$store.state.users.register" @click="register(true)">
          No account, then register here!
        </a>
        <a v-else @click="register(false)">Login here!</a>
        <facebook-login
          class="button"
          app-id="1953752748051856"
          @login="onLogin"
          @logout="onLogout"
          @sdkLoaded="sdkLoaded"
        ></facebook-login>
      </footer>
    </b-form>
  </div>
</template>
<script>
import facebookLogin from 'facebook-login-vuejs'
export default {
  name: 'LoginAuth',
  components: {
    facebookLogin
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
      isConnected: false,
      FB: undefined
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
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
    setFbUserData() {
      this.FB.api('/me', 'GET', { fields: 'id,name,email,picture' }, (user) => {
        this.setUserData(user)
      })
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected
      this.FB = payload.FB
      this.setLocalToken(this.FB)
      if (this.isConnected) this.setFbUserData()
    },
    onLogin(payload) {
      this.FB = payload.FB
      this.setLocalToken(this.FB)
      this.isConnected = true
      this.setFbUserData()
    },
    setLocalToken(FB) {
      const res = FB.getAuthResponse()
      this.$auth.setToken('local', res.accessToken)
    },
    onLogout() {
      this.isConnected = false
      this.$auth.logout('local')
    },
    setUserData(user) {
      this.$auth.setUser(user)
      this.$store.commit('users/SET_USER_DATA', user)
    }
  }
}
</script>
