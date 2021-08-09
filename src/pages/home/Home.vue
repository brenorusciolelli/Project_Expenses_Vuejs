<template>
  <div class="home">
    <div class="row">
      <div class="col-6 home-box">
        <small>Você gastou</small>
        <div class="money">R$ 900,00</div>
        <small>
          em 29 compras.
        </small>
      </div>
      <div class="col-6 home-box">
        <small>A média de gastos é de</small>
        <div class="money">R$ 91.90</div>
      </div>
      <div class="col-6 home-box">
        <small>A maior gasto foi de</small>
        <div class="money">R$ 102.29</div>
        <small>No dia 03/08/2021</small>
      </div>
      <div class="col-6 home-box">
        <small>A menor gasto foi de</small>
        <div class="money">R$ 12.99</div>
        <small>No dia 07/08/2021</small>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data: () => ({
    expenses: []
  }),
  created () {
    this.getData()
  },
  methods: {
    getData () {
      const ref = this.$firebase.database().ref(`/${window.uid}`)

      ref.on('value', data => {
        const values = data.val()
        this.expenses = Object.keys(values).map(i => values[i])
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 20px;
  width: 100%;
  .home-box {
    height: calc(50vh - 20px);
    display: flex;
    font-size: 30pt;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--dark-medium);
    small {
      font-size: 1.3rem;
    }
    .money {
      color: var(--featured);
    }
    &:nth-child(2),&:nth-child(4) {
      border-left: none;
    }
     &:nth-child(3),&:nth-child(4) {
      border-top: none;
    }
  }
}
</style>
