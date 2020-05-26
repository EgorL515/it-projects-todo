<script>
// mixin to work with states
// CREATE IN COMPONENT: computed 'stateJson' returning JSON String of last state, method pushState with JSON string state payload
// for use: undo, redo methods.
export default {
    props: {
        maxStates: {
            type: Number,
            default: 3
        }
    },
    data() {
        return {
            undoStates: [],
            redoStates: [],
            pushToUndo: true,
            pushedByUndoRedo: false
        }
    },
    methods: {
        undo() {
            this.pushToUndo = false;
            this.prePushState(this.undoStates.pop());
        },
        redo() {
            this.pushToUndo = true;
            this.prePushState(this.redoStates.pop());
        },
        prePushState(state) {
            this.pushedByUndoRedo = true;
            this.pushState(state);
        }
    },
    watch: {
        stateJson: function(val, old) {
            if(!this.pushedByUndoRedo) {
                this.redoStates = [];
                this.pushToUndo = true;
            } else {
                this.pushedByUndoRedo = false;
            }
            if(this.pushToUndo) {
                if(this.undoStates.length >= this.maxStates) {
                    this.undoStates.shift();
                }
                this.undoStates.push(old);
            } else {
                if(this.redoStates.length >= this.maxStates) {
                    this.redoStates.shift();
                }
                this.redoStates.push(old);                
            }
            
        }
    }    
}
</script>