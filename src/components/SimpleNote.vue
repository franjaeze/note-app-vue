<template>
    <div v-show="!showModify">
        <div class="card w-50" v-if="noteRender">
            <div class="row">
                <div class="col-2 m-4"><i class="fas fa-sticky-note fa-5x"></i></div>
                <div class="col-6">
                    <h3 class="mt-2">{{ noteRender.title }}</h3>
              <!-- <p class="body">{{ noteRender.body }}</p>

                    <p class="tag" v-for="etiqueta in noteRender.tags" :key="etiqueta">
                        {{ etiqueta }}
                    </p> -->
                 <div class="mt-5"><b>Last time Edited:  </b> {{ noteRender.editedDate }} {{ noteRender.editedHour }}:{{ noteRender.editedMinute}}</div>

                </div>
                <div class="col-2">
                    <span class="cursor"> <i class="fas fa-trash"></i></span>
                    <span class="cursor"> <i class="fas fa-pencil-alt"></i> </span>
                    <span class="cursor"> <i class="fas fa-archive"></i></span>
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
.cursor {
    cursor: pointer;

}
</style>