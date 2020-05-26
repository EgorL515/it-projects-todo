<template>
    <div class="card">
        <div class="card-body">
            <h2>{{ cardTitle }}</h2>
            <input class="card-title" type="text" v-model="cardTitle"
                                                  @keydown.enter="confirmTitle"
                                                  @keydown.esc="$event.target.blur()"
                                                  @blur="rejectTitle">

            <task-app v-for="(task, i) in cloneTasks" 
                    :key="i" 
                    v-bind="task" 
                    @toggle-checkbox="toggleCheckbox(task, i)"
                    @change-text="changeText($event, task)"
                    @delete-task="deleteTask(i)"></task-app>

            <button @click="addTask">Add</button>
        </div>
        <div class="card-controls">
            <div>
                <button class="button" @click="undo" :disabled="!undoStates.length">Undo</button>
                <button class="button" @click="redo" :disabled="!redoStates.length">Redo</button>
            </div>
            <div>
                <button class="button button-confirm" @click="saveCard" :disabled="!hasChanges">Save</button>
                <button class="button button-reject" @click="cancelCard">Cancel</button>
                <button class="button button-delete" @click="deleteCard">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
// calls $emit 'delete-card', 'cancel-card' with bool payoad (was edited or not), 'save-card' with payload {title: String, tasks: Array of Objects}
import TaskApp from '@/components/Task-app.vue';
import States from '@/mixins/States.vue';

export default {
    components: {
        TaskApp
    },
    mixins: [
        States
    ],
    props: {
        title: {
            type: String,
            default: 'New card'
        },
        tasks: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            lastTitle: this.title,
            cardTitle: this.title,
            cloneTasks: this.tasks.map(task => {return {...task}})
        }
    },
    methods: {
        confirmTitle(e) {
            this.lastTitle = this.cardTitle;
            e.target.blur();
        },
        rejectTitle(e) {
            this.cardTitle = this.lastTitle;
        },
        deleteTask(i) {
            this.cloneTasks.splice(i, 1);
        },
        addTask() {
            this.cloneTasks.push({text:'New task',done:false});
        },
        changeText(text, task) {
            task.text = text;
        },
        toggleCheckbox(task, i) {
            task.done = !task.done;
        },
        deleteCard() {
            this.$emit('delete-card');
        },
        saveCard() {
            this.$emit('save-card', {title: this.cardTitle, tasks: this.cloneTasks});
        },
        cancelCard() {
            if(!this.hasChanges) {
                this.$emit('cancel-card', false);
            } else {
                this.$emit('cancel-card', true);
            }
        },
        // for states mixin
        pushState(state) {
            const lastState = JSON.parse(state);
            this.lastTitle = lastState.title;
            this.cardTitle = lastState.title;
            this.cloneTasks = lastState.tasks;
        }
    },
    computed: {
        hasChanges() {    
            return !(this.cardTitle === this.title && JSON.stringify(this.cloneTasks) === JSON.stringify(this.tasks));
        },
        // for states mixin  
        stateJson() {
            return JSON.stringify({title: this.lastTitle, tasks: this.cloneTasks});
        }
    }  
}
</script>

<style scoped>
.card {
    box-shadow: 1px 1px 3px 3px rgba(0,0,0,.3);
    padding: 30px 50px;
    display: flex;
    flex-direction: column;
}
.card-body {
    flex-grow: 1;
    margin-bottom: 30px;
}
h2 {
    width: 0;
    height: 0;
    position: absolute;
    overflow: hidden;
}
.card-title {
    margin: 0 0 30px 0;
    width: 100%;
    text-align: center;
    font-size: 1.5em;
    font-weight: 700;
    border: none;
}
.card-controls {
    display: flex;
    justify-content: space-between;
}
.card-controls button:nth-child(1), .card-controls button:nth-child(2) {
    margin-right: 5px;
}
@media screen and (max-width: 650px) {
  .card {
    padding: 20px;
  }
}
</style>