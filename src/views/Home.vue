<template>
  <div class="cards-grid">
    <card-preview-app v-for="(card, id) in cards" 
                      :key="id" :id="+id"
                      @delete-card="deleteCard(id)"></card-preview-app>
    <button @click="createNewCard">Add card</button>
    <confirm-app v-if="modalActive" 
                     message="Are you sure you want to delete the card?"
                     @response="confirmResponseHandler"></confirm-app>
  </div>
</template>

<script>
import CardPreviewApp from '@/components/Card-preview-app.vue';
import ConfirmApp from '@/components/Confirm-app.vue';

export default {
  components: {
    CardPreviewApp,
    ConfirmApp
  },
  data() {
    return {
      modalActive: false,
      cardId: false
    }
  },
  methods: {
    confirmResponseHandler(response) {
      this.modalActive = false;
      if(response.status) {
        this.$store.dispatch('deleteCard', this.cardId);
      }
    },
    createNewCard() {
      this.$store.dispatch('addCard').then((id) => {
        this.$router.push({name: 'Card', params: {id}});
      });
    },
    deleteCard(id) {
      this.cardId = id;
      this.modalActive = true;
    }
  },
  computed: {
      cards() {
          return this.$store.state.cards;
      }
  }
}
</script>

<style scoped>
.cards-grid {
  padding:  30px 50px 50px 50px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 1fr;
  column-gap: 50px;
  row-gap: 50px;
}
@media screen and (max-width: 1440px) {
  .cards-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media screen and (max-width: 1280px) {
  .cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media screen and (max-width: 1024px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (max-width: 650px) {
  .cards-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>