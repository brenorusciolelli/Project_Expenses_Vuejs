<template>
  <form @submit.prevent="doLogin()" class="form-login">
    <div class="card">
      <div class="card-header text-center">
        <h1 class="mb-0">Expenses</h1>
      </div>
      <div class="card-body">
        <div class="form-group">
          <input required type="email" v-model="email" class="form-control" placeholder="E-mail" />
        </div>
        <div class="form-group">
          <input required type="password" v-model="password" class="form-control" placeholder="Senha" />
        </div>
        <button class="btn btn-primary w-100" :disabled="loading">
          <template v-if="loading">
            Entrando...
            <i class="fa fa-spinner fa-spin"></i>
          </template>
          <template v-else>
            Entrar
          <i class="fa fa-sign-in-alt"></i>
          </template>
          </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Login',
  data: () => {
    return {
      loading: false,
      email: 'admin@expenses.com.br',
      password: '123456'
    }
  },
  methods: {
    async doLogin () {
      this.loading = true
      const { email, password } = this
      try {
        const res = await this.$firebase.auth().signInWithEmailAndPassword(email, password)

        window.uid = res.user.uid

        this.$router.push({ name: 'home' })
      } catch (error) {
        let message = ''

        switch (error.code) {
          case 'auth/user-not-found':
            message = 'Não foi possível localizar o usuário'
            break
          case 'aith/wrong-password':
            message = 'Senha inválida'
            break
          default:
            message = 'Não foi possível fazer o login, tente novamente.'
        }
        this.$root.$emit('Notification::show', {
          message,
          type: 'danger'
        })
      }
      this.loading = false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (window.uid) {
        vm.$router.push({ name: 'home' })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.form-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

h1 {
  font-size: 18pt;
}

.card {
  width: 20%;
  color: var(--darker);
}
</style>
