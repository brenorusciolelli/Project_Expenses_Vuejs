<template>
  <nav class="nav flex-column justify-content-between">
    <div>
<router-link
exact
:key="i"
class="nav-link"
exact-active-class="active"
:to="{ name: router.name }"
v-for="(router, i) in routerLinks"
>
<i class="fa" :class="`fa-${router.meta.icon}`"></i>
{{ router.meta.title }}
</router-link>
<hr>
<layout-new-expense/>
</div>
<layout-logout />
</nav>
</template>
<script>
import LayoutLogout from '@/components/layout/LayoutLogout'
import LayoutNewExpense from '@/components/layout/LayoutNewExpense'
export default {
  components: {
    LayoutLogout,
    LayoutNewExpense
  },
  computed: {
    routerLinks () {
      return this.$router.options.routes.filter(r => r.name !== 'login')
    }
  }
}
</script>

<style scoped lang="scss">
.nav {

  height: calc(100vh - 52px);
  width: calc(100% + 11px);
  .nav-link {
    color: var(--white);
    transition: .4s;
    &.active {
      color: var(--featured);
      background-color: transparent;
    }
    &:hover {
      color: var(--darker);
      background-color: var(--featured);
    }
  }
}
</style>
