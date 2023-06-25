<template>
    <div v-show="!showModify">
        <div class="simpleContent" v-if="noteRender">

            <h3 class="header">{{ noteRender.title }}</h3>
            <p class="body">{{ noteRender.body }}</p>

            <p class="tag" v-for="etiqueta in noteRender.tags" :key="etiqueta">
                {{ etiqueta }}
            </p>
            <div>
                <button class="buttonNote" @click="updateNote(noteRender)">Modify</button>
                <button class="buttonNote" @click="deleteNote(noteRender)">Delete</button>
            </div>
        </div>
        
    </div>
    <ModifyNote @note-modify="changeNote"  @close="showForm" v-if="showModify" :note="noteRender" />
</template>
  
<script>

import ModifyNote from "../components/ModifyNote.vue";

export default {
    components: {
        ModifyNote,

    },
    props: {
        note: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            showModify: false,
            noteRender: this.note
        }
    },
    methods: {
        deleteNote(noteRender) {
            this.$emit('delete-note', noteRender)
        },
        showForm() {
            this.showModify = !this.showModify;
        },
        updateNote(noteRender) {
            this.showForm()
            this.$emit('modify-note', noteRender)
       

        },
        changeNote(noteRender) {
            this.noteRender = noteRender;
          

        }


    }
};
</script>
  
<style>
.header {
    font-size: 17px;
    padding-left: 10px;
}

.body {

    font-size: 12px;
}


.simpleContent {
    margin: 15px;
    padding: 0px 10px 10px 10px;
    max-width: 300px;
    max-height: 200px;
    border-radius: 10%;
    border-style: solid;
    border-color: black;
    background-color: rgba(165, 100, 16, 0.488);
    display: inline-block;
    box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
    font-family: Georgia, 'Times New Roman', Times, serif;
    transition: box-shadow .15s, transform .15s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;

    will-change: box-shadow, transform
}

.simpleContent:hover {
    transform: translateY(-10px);
}

.simpleContent:focus {
    box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}

.buttonNote {
    margin: 5px;
    align-items: center;
    appearance: none;
    background-color: #ecba4fc7;
    border-radius: 4px;
    border-width: 0;
    box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #67501fc7 0 -3px 0 inset;
    box-sizing: border-box;
    color: #36395A;
    cursor: pointer;
    display: inline-flex;
    font-family: "JetBrains Mono", monospace;
    height: 25px;
    margin: 5px;
    justify-content: center;
    line-height: 1;
    list-style: none;
    overflow: hidden;
    position: relative;
    text-align: left;
    text-decoration: none;
    transition: box-shadow .15s, transform .15s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    will-change: box-shadow, transform;
    font-size: 14px;
}


.tag {
    font-size: 14px;
    padding: 3px;
    margin: 2px;
    background-color: #870606a7;
    border-radius: 9px;
    display: inline-block;
    color: #fffffff6;
    letter-spacing: 0.5px;
    font-size: 14px;
    box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #470101a7 0 -3px 0 inset;
    font-family: "Open Sans", monospace;
    transition: box-shadow .15s, transform .15s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;

}


.buttonNote:active {
    box-shadow: 0px 0px 0px 0px;
    top: 5px;
    left: 5px;
}
</style>