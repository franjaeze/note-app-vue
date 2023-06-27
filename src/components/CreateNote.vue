<template>
  <div class="createNote">
    <form action="">


      <div class="card container text-center" style="width: 35rem;">
        <div class="card-body row">
          <h1 class="card-header">Create Note</h1>


          <div class="row">
            <div class="m-1 p-3 ">
              <label for="Title" class="me-2 col-2">Title </label>
              <input class="col-8" v-model="newNote.title" type="text" id="Title" placeholder="Write your note title">
            </div>

          </div>

          <div class="row">
            <div class="m-2 p-2">
              <label for="Body" class="me-2 col-2">Content </label>
              <textarea class="col-8" v-model="newNote.body" rows="3" cols="25" placeholder="Write your note "></textarea>
            </div>
          </div>


          <div class="row">

            <div class="me-1 col-2">
              <label for="tag" class="">Categories </label></div>
              <div class="col-8" type="text" id="tag" placeholder="Tags" v-if="newNote.tags">
                <button class="btn btn-light" @click="deleteTag(t)"  v-for="t in newNote.tags" :key="t.index"><i class="fas fa-tag me-1"></i> {{ t }} <i class="fas fa-times ms-1"></i></button>
              </div>
            



          </div>
          <div class="row">

            <div class="">
              <label for="tag" class="me-1 col-2"> </label>
              <input class="col-6" v-model="newNote.tag" type="text" id="tag" placeholder="New Caegory">
              <button class="btn btn-small btn-success m-1 me-1 col-2 p-1" @click="addTag"> Add</button>
            </div>


          </div>
          <div class="row">
            <div class="col-8"></div>
            <div class="col-4 d-flex">
              <button class="btn btn-small btn-primary m-1 me-1" @click="addNewNote(newNote)"> Create</button>
              <button class="btn btn-small btn-danger m-1 me-1" @click="redirect"> Cancel</button>
            </div>
          </div>
        </div>
      </div>






    </form>
  </div>
</template>
  
<script>

import { useUserStore } from "../stores/notes";
import { storeToRefs } from "pinia";



export default {

  setup() {
  const userStore = useUserStore();
    const { userNotes, getNotes, addNote } = storeToRefs(userStore);
  
    return { 
    userNotes,
    addNote,
    getNotes,
    userStore
    };
  },
  methods: {
    addTag() {
     
      this.newNote.tags.push(this.newNote.tag);
      this.newNote.tag = '';
    },
    deleteTag(tag){
      const indexOftag = this.newNote.tags.indexOf(tag);
      this.newNote.tags.splice(indexOftag, 1)
    },
    redirect() {
            this.$router.push({ 
                  name: 'notes'                  
                 }); 
        },

     
    async addNewNote(newNote) {

      try {
        //await noteService.addToList(this.newNote)
        newNote.archived = false
        newNote = {...this.newNote, editedDate: new Date().toISOString().replace(/T.*/,'').split('-').reverse().join('-'), 
                          editedHour: new Date().getHours()
                          , editedMinute: new Date().getMinutes()}
        this.userStore.addNote(newNote)
        
        this.$router.push({ name: 'notes' });
      //  this.close();

      } catch (e) {
        alert(e);
      }
    },
  }, data() {
    return {
      notes: [],

      newNote: { title: "", body: "", tags: [] },


    };
  },


};
</script>
  
<style></style>