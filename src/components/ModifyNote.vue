<template>
     <div class="editNote">
    <form action="">


      <div class="card container text-center" style="width: 35rem;">
        <div class="card-body row">
          <h1 class="card-header">Edit Note</h1>


          <div class="row">
            <div class="m-1 p-3 ">
              <label for="Title" class="me-2 col-2">Title </label>
              <input class="col-8" v-model="noteToModify.title" type="text" id="Title"  >
            </div>

          </div>

          <div class="row">
            <div class="m-2 p-2">
              <label for="Body" class="me-2 col-2">Content </label>
              <textarea class="col-8" v-model="noteToModify.body" rows="3" cols="25" ></textarea>
            </div>
          </div>


          <div class="row">
     
            <div class="me-1 col-2">
              <label for="tag" class="">Categories </label></div>
              <div class="col-8" type="text" id="tag" placeholder="Tags" v-if="noteToModify.tags">
                <button class="btn btn-light"  @click="deleteTag(t)"   v-for="t in noteToModify.tags" :key="t.index"><i class="fas fa-tag me-1"></i> {{ t }} <i class="fas fa-times ms-1"></i></button>
              </div>
            



          </div>
          <div class="row">

            <div class="">
              <label for="tag" class="me-1 col-2"> </label>
              <input class="col-6" v-model="noteToModify.tag" type="text" id="tag" placeholder="New Caegory">
              <button class="btn btn-small btn-success m-1 me-1 col-2 p-1" @click="addTag"> Add</button>
            </div>


          </div>
          <div class="row">
            <div class="col-8"></div>
            <div class="col-4 d-flex">
              <button class="btn btn-small btn-primary m-1 me-1" @click="updateNote(noteToModify)"> Edit</button>
              <button class="btn btn-small btn-danger m-1 me-1" @click="redirect"> Cancel</button>
               
            </div>
          </div>
        </div>
      </div>






    </form>
  </div><!--  -->
</template>
  
<script>
  import { useUserStore } from "../stores/notes";
import { storeToRefs } from "pinia";
import  notesServices  from "../services/notesServices.js"

export default {
    setup() {
    const userStore = useUserStore();
    const { userNotes, } = storeToRefs(userStore);
  
    return { 
    userNotes,
    userStore,

   
    };
  },
    async mounted() {
   
    this.noteToModify = await notesServices.findNote(this.$route.params.id)
      console.log(this.noteToModify)
    
  },
    methods: {
        addTag() {
            this.noteToModify.tags.push(this.noteToModify.tag);
            this.noteToModify.tag = '';
        },  
         deleteTag(tag){
      const indexOftag = this.noteToModify.tags.indexOf(tag);
      this.noteToModify.tags.splice(indexOftag, 1)
    },

        redirect() {
            this.$router.push({ 
                  name: 'notes'                  
                 }); 
        },
        removeTag(t) {

            this.noteToModify.tags = this.noteToModify.tags.filter(e => e !== t)

        },
        async updateNote(noteToModify) {

            try {
                //await noteService.addToList(this.newNote)
                noteToModify = {...this.noteToModify, editedDate: new Date().toISOString().replace(/T.*/,'').split('-').reverse().join('-'), 
                          editedHour: new Date().getHours()
                          , editedMinute: new Date().getMinutes()}
                await notesServices.updateNote(this.idNote, noteToModify);
                    this.$router.push({ name: 'notes' });
                
            } catch (e) {
                alert(e + "something went wrong during the update");
            }
        }, 
       


    }, data() {
        return {
            notes: [],
           noteToModify: {},
            idNote: this.$route.params.id


        };
    },


};
</script>
  
<style> </style>