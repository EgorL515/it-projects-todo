<template>
    <div class="card">              
        <div class="card-body">
            <h2>{{ card.title }}</h2>
            <ul>
                <li v-for="(task, i) in tasksPreview" :key="i">
                    <input type="checkbox" disabled="true" :checked="task.done">
                    <span>{{ task.text }}</span>
                </li>
            </ul>
        </div>
        <div class="card-footer">
            <div>
                <router-link class="card-link" :to="'/card/' + this.id">Edit</router-link>
                <button class="button button-delete" @click="deleteCard">Delete</button>
            </div>
        </div>        
    </div>
</template>

<script>
export default {
    // calls $emit 'delete-card'
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    methods: {
        deleteCard() {
            this.$emit('delete-card');
        }
    },
    computed: {
        card() {
            return this.$store.getters.getCardById(this.id);
        },
        tasksPreview() {
            return this.card.tasks.slice(0, 3);
        }
    }
}
</script>

<style scoped>
.card {
    position: relative;
    box-shadow: 1px 1px 3px 3px rgba(0,0,0,.3);
    padding: 0 20px 10px 20px;
    display: flex;
    flex-direction: column;
}
.card-body {
    flex-grow: 1;
}
.card-footer {
    display: flex;
    justify-content: flex-end;
}
ul {
    position: relative;
    padding-left: 22px;
    list-style: none;
}
li {
    margin-bottom: 10px;
}
input {
    margin: 3px 0;
    position: absolute;
    left: 0;
}
button {
    margin-left: 5px;
}
</style>