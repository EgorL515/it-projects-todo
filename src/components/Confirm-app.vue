<template>
    <div class="modal-bg" @contextmenu.prevent>
        <div class="modal">
            <div class="modal-body">
                <h4>{{ message }}</h4>
            </div>
            <div class="modal-controls">
                <button class="button button-confirm" ref="confirm" @click="response(true)">{{ confirmButtonText }}</button>
                <button class="button button-reject" @click="response(false)">{{ rejectButtonText }}</button>
            </div>
        </div>
    </div>
</template>

<script>
// calls $emit 'response' on user response with payload {status: bool, [action: string]}
export default {
    props: {
        message: {
            type: String,
            required: true
        },
        action: {
            type: String
        },
        confirmButtonText: {
            type: String,
            default: 'Yes'
        },
        rejectButtonText: {
            type: String,
            default: 'No'
        }
    },
    mounted() {
        this.focusButton();
    },
    methods: {
        focusButton() {
            this.$refs.confirm.focus();
        },
        response(bool) {
            let response = {
                status: bool
            }
            if(this.action) {
                response.action = this.action;
            }
            this.$emit('response', response);
        }        
    }
}
</script>

<style scoped>
.modal-bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    background-color: rgba(0,0,0,.4);
}
.modal {
    box-shadow: 1px 1px 3px 3px rgba(0,0,0,.1);
    position: relative;
    background-color: white;
    top: 28%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
}
.modal-body {
    flex-grow: 1;
    margin-bottom: 30px;
}
.modal-controls {
    display: flex;
    justify-content: flex-end;
}
button:last-child {
    margin-left: 5px;
}
</style>