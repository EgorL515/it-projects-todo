<template>
    <div class="task">
        <div><input type="checkbox" @change="checkboxState" :checked="done"></div>
        <div ref="taskBody">
            <div ref="input" class="task-data" contenteditable="true" @keydown.ctrl.enter="$event.target.blur()"
                                                                      @keydown.esc="cancelEditing"
                                                                      @focus="focusHandler"
                                                                      @blur="blurHandler">{{ text }}</div>
            <div v-if="active">
                <button @click="confirmEditing"
                        @blur="blurHandler">Save</button>
                <button @click="cancelEditing"
                        @blur="blurHandler">Cancel</button>
            </div>
        </div>
        <div><button @click="deleteTask">Del</button></div>
    </div>
</template>

<script>
// calls $emit 'toggle-checkbox', 'delete-task', 'change-text'. The last one has a string payload and being called only when user accepts text editing.
export default {
    props: {
        text: {
            type: String,
            required: true
        },
        done: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            active: false
        }
    },
    methods: {
        // helper functions to autoselect and deselect innerText when the text field being focused
        selectInnerText(target) {
            if (window.getSelection) {
                const selection = window.getSelection();
                const range = document.createRange();
                range.selectNodeContents(target);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        },
        removeSelection() {
            if (window.getSelection) {
                const selection = window.getSelection();
                selection.removeAllRanges();
            }           
        },
        focusHandler(e) {
            this.selectInnerText(e.target);
            this.active = true;
        },
        blurHandler(e) {
            this.removeSelection();
            // checks if user left the component
            if(!e.relatedTarget || !this.$refs.taskBody.contains(e.relatedTarget)) {
                this.confirmEditing();                
            }
        },        
        cancelEditing() {
            this.$refs.input.innerText = this.text;
            this.active = false;
            this.$refs.input.blur();
        },
        confirmEditing() {
            this.$emit('change-text', this.$refs.input.innerText);
            this.active = false;
        },
        deleteTask() {
            this.$emit('delete-task');
        },
        checkboxState() {
            this.$emit('toggle-checkbox');
        }
    }    
}
</script>

<style scoped>
.task {
    display: flex;
    margin-bottom: 10px;
}
.task > div:nth-child(2) {
    margin: 0 20px 0 15px;
    flex-grow: 1;
}
.task-data {
    padding: 5px 10px 7px 10px;
    transform: translateY(-5px);
}
</style>