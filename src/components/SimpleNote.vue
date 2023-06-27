<template>
    <div v-show="!showModify">
        <div class="card w-50" v-if="noteRender">
            <div class="row">
                <div class="col-2 ms-3 mt-3"><i class="fas fa-sticky-note fa-4x"></i></div>
                <div class="col-6">
                    <h5 class="mt-2">{{ noteRender.title }}</h5>
               <p class="body">{{ noteRender.body }}</p>

          
                    
                    <div class="mt-3"><p class="fs-7"><b>Last time Edited: </b> {{ noteRender.editedDate }} {{ noteRender.editedHour }}:{{
                        noteRender.editedMinute }}</p></div>

                </div>
                <div class="col-3 mb-3 d-flex align-content-end flex-wrap">
                    <div  v-if="noteRender.tags">
                <button class="btn btn-light p-1 "   v-for="t in noteRender.tags" :key="t"><i class="fas fa-tag me-1"></i> {{ t }}  </button>
                  </div>
                    <div  class="mt-2"  >
                        <span class="cursor me-2" @click="deleteNote(noteRender)"> <i class="fas fa-trash fa-2x"></i></span>
                        <span class="cursor me-2" @click="modifyNote(noteRender)"> <i class="fas fa-pencil-alt fa-2x"></i> </span>
                        <span class="cursor" @click="archiveNote(noteRender)"> <i class="fas fa-archive fa-2x"></i></span>
                   </div>
                </div>
            </div>
        </div>

    </div>
    <ModifyNote @note-modify="changeNote" @close="showForm" v-if="showModify" :note="noteRender" />
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
        deleteNote(note) {
            this.$emit('delete-note', note)
        },
        showForm() {
            this.showModify = !this.showModify;
        },
        modifyNote(note) {
            console.log(this.note)
            this.$emit('update-note', note)
        },
        archiveNote(){
            this.noteRender.archived = !this.noteRender.archived;
            
        }


    }
};
</script>
 
<style>
.cursor {
    cursor: pointer;

}
</style>