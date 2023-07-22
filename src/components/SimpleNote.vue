<template>
    <div v-show="!showModify">
        <div class="row  mb-2 " >
            <div class="col-0 col-sm-3 "></div>
            <div class="col-12 col-sm-6 ">
                <div class="card  d-flex flex-column justify-content-center  m-auto background tarjeta" v-if="noteRender">
                    <div class="row">
                        <div class="col-1 md-ms-3 mt-1  ps-3 "><i class="fas fa-sticky-note fa-2x icono"></i></div>
                        <div class="col-8 d-flex flex-column flex-wrap">
                            <h5 class="mt-2 text-center title">{{ noteRender.title }}</h5>
                            <p class="body text-center text">{{ noteRender.body }}</p>



                            <div class="mt-3 d-flex justify-content-end align-items-end">
                                <p class="fs-7 text-center edited"><b>Last time Edited: </b> {{ noteRender.editedDate }} {{
                                    noteRender.editedHour }}:{{
        noteRender.editedMinute }}</p>
                            </div>

                        </div>
                        <div class="col-3 mb-3 d-flex flex-column justify-content-around align-content-end flex-wrap">
                            <div v-if="noteRender.tags">
                                <div class="tag p-1 background " v-for="t in noteRender.tags" :key="t"><i
                                        class="fas fa-tag icono-tag"></i> {{ t }} </div>
                            </div>
                            <div class="d-flex  mt-2">
                                <span class="cursor me-2" @click="deleteNote(noteRender._id)"> <i
                                        class="fas fa-trash sm-fa-2x icono-down"></i></span>
                                <span class="cursor me-2" @click="modifyNote(noteRender._id)"> <i
                                        class="fas fa-pencil-alt sm-fa-2x icono-down"></i> </span>
                                <span class="cursor" @click="archiveNote(noteRender._id, noteRender.archived)"> <i
                                        class="fas fa-archive sm-fa-2x icono-down"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div><div class=" col-0 col-sm-3  "></div>
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
        modifyNote(noteId) {

            this.$emit('update-note', noteId)
        },
        archiveNote(noteId, archived) {
            this.$emit('archive-note', noteId, archived)

        }


    }
};
</script>
 
<style>.cursor {
    cursor: pointer;

}

 
*{
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    color: #FFF;
}
.icono{
    color: #ac8938  ;
    text-shadow: rgb(54, 41, 1) 1px 1px 19px;


}
.background{
    background-color: #61543fa6;
}
.icono-tag{
    color:#4C066A;
    text-shadow: #FC0 1px 1px 19px;
}
.icono-tag:hover{
    color:#593369;
    text-shadow: rgb(255, 179, 0) 1px 1px 19px;
}
.icono-down{
    color: #4C066A;
}
.icono-down:hover{
    color: #583169;
    transform: scale(1.05);
}
.tarjeta{
    transition: all 0.4s;
    border: 2px solid black;
    box-shadow: 5px 7px rgba(59, 50, 29, 0.719);
}
.tarjeta:hover{
    transform: scale(1.05);
    background-color: #5a492da6;
    box-shadow: 2px 3px rgba(18, 15, 9, 0.719);

}
.tag{
    border-radius: 10px;
    background-color: #664d25cc;
    border: .5px solid #4C066A;
    font-size: 0.5rem;
    margin:0.25rem 0.5rem;
}
.tag:hover{
    
    background-color: #5d4f39cc;
  
}

.edited{
    font-family: monospace;
    font-size: 0.7rem;
    color: #0a0700;
    font-weight: 800;
}

.text{
    font-size: .75rem;
}
</style>