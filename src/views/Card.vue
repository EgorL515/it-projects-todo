<template>
    <div class="card-wrapper">
        <card-app v-if="this.card" 
                  @save-card="saveCard"
                  @cancel-card="cancelCard"
                  @delete-card="deleteCard"
                  :title="card.title"
                  :tasks="card.tasks"></card-app>
        <confirm-app v-if="modalActive" 
                     :message="modalMessage" 
                     :action="modalAction"
                     @response="confirmResponseHandler"></confirm-app>
    </div>
</template>

<script>
import CardApp from '@/components/Card-app.vue';
import ConfirmApp from '@/components/Confirm-app.vue';

export default {
    components: {
        CardApp,        
        ConfirmApp
    },
    created() {
        if(!this.card) this.redirectHome();
    },
    data() {
        return {
            id: this.$route.params.id,
            modalActive: false,
            modalMessage: '',
            modalAction: ''
        }
    },
    methods: {
        confirmResponseHandler(response) {
            this.modalActive = false;
            if(response.status) {
                switch (response.action) {
                    case 'cancel card':
                        this.redirectHome();
                        break;
                    case 'delete card':
                        this.$store.dispatch('deleteCard', this.id);
                        this.redirectHome();
                        break;
                }
            }
        },
        redirectHome() {
            this.$router.push({name: 'Home'});
        },
        activateModal(msg, action) {
            this.modalMessage = msg;
            this.modalAction = action;
            this.modalActive = true
        },
        saveCard(payload) {
            this.$store.dispatch('saveCard', {id:this.id, data: payload});
            this.redirectHome();
        },
        cancelCard(edited) {
            if(edited) {
                this.activateModal('Are you sure you want to cancel changes?', 'cancel card');
            } else {
                this.redirectHome();
            }
        },
        deleteCard() {
            this.activateModal('Are you sure you want to delete the card?', 'delete card');
        }        
    },
    computed: {
        card() {
            return this.$store.getters.getCardById(this.id);
        },
    }
}
</script>

<style scoped>
.card-wrapper {
    padding: 30px 0 50px 0;
    max-width: 900px;
    width: 80vw;
    margin: auto;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}
.card {
    flex-grow: 1;
}
@media screen and (max-width: 650px) {
  .card-wrapper {
      padding: 10px 0 40px 0;
  }
}
</style>