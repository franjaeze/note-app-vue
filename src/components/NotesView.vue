<template>
  <div class="generalContent"> <div class="container">
    <button class="buttonNote btnCreate" @click="showIt" v-if="!showForm"> Create note </button>
 </div >
    <div><CreateNote v-if="showForm"
      @new-note-created="handleNewNote"
      @close="showIt"   />    
            
        </div>
     
     
     <div>
    <SimpleNote @delete-note="deleteNote" v-for="(note, index) in notes" :key="index" :note="note"             />
  </div>
  </div>
</template>

<script>
import SimpleNote from "../components/SimpleNote.vue";
import CreateNote from "../components/CreateNote.vue";

export default {
 
  components: {
    SimpleNote, CreateNote
  },
  data() {
    return {
      notes: [],
      showForm:false,
      newNote: {
      title: '',
      tag: '  ',
      body: ''
    }
    }
},
    methods:
    {
      showIt(){
        this.showForm= !this.showForm;
      },

      deleteNote(note){
        const ifRemove = confirm('Do you really want to delete it ?');
        if (ifRemove){
          
          const indexOfNote =  this.notes.indexOf(note);
          this.notes.splice(indexOfNote, 1)
          alert('Note deleted!')
        }
      },
    async  handleNewNote(newNote) {
 
      await this.notes.push(newNote);
 
      this.notes.forEach(element => {console.log(element)
        
      });

    }
    }
  
}
</script>

<style>
 .generalContent{
  margin: 15px;
  padding: 18px;
  justify-content: center;
  align-items: center;
  display: flex;
 }

 .container {
  text-align: center;
}

 .btnCreate{
    background-color: rgba(169, 112, 39, 0.718);
    font-size: 22px;
    padding: 45px;
    border-radius: 30px;
    box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #54310a75 0 -3px 0 inset;
    font-family: Georgia, 'Times New Roman', Times, serif;
    transition: box-shadow .15s, transform .15s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;       
    will-change: box-shadow, transform
}

.btnCreate:hover {
    transform: translateY(-10px);
    box-shadow: rgba(31, 24, 47, 0.4) 0 2px 4px, rgba(29, 22, 44, 0.3) 0 7px 13px -3px, #392205b6 0 -3px 0 inset;
    background-color: rgba(165, 101, 16, 0.718);
   
    font-weight: 500;
}
 
 
</style>