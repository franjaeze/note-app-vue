<template>
    <div class="createNote">
         <form  action=""> 
       <div >  <div class="waviy">
   <span style="--i:1">N</span>
   <span style="--i:2">e</span>
   <span style="--i:3">w</span>
   <span style="--i:4"> </span>
   <span style="--i:5">N</span>
   <span style="--i:6">o</span>
   <span style="--i:7">t</span>
   <span style="--i:8">e</span>
 

  </div>        
    
     <button class="buttonNote" @click="addNewNote"> Create</button>
     <button class="buttonNote"  @click="addTag"> Add Tag</button>
     <button class="buttonNote" @click="close"> Cancel</button>
    </div> 
       <button disabled v-for="t in newNote.tags" :key="t.index"> {{ t }}</button>

         <div class="inputsCreate"> <label for="Title">Title </label>
            <input  v-model="newNote.title" type="text" id="Title" placeholder="Write your note title"  ></div>  
         <div class="inputsCreate"> <label for="tag">tag </label>    
            <input   v-model="newNote.tag"   type="text" id="tag" placeholder="Write your note"  > </div>
         <div class="inputsCreate"><label for="Body">Body </label>  
             <textarea v-model="newNote.body" rows="3" cols="25"></textarea></div>  
        </form>
      
       
    </div>
</template>
  
<script>

export default {
    methods: {
      addTag(){
        this.newNote.tags.push(this.newNote.tag);
        this.newNote.tag = '';
      },

    close () {
      this.$emit('close')
    },
    async addNewNote() {

try {
  //await noteService.addToList(this.newNote)
  this.$emit('new-note-created',{ ...this.newNote });
 
    this.close();
 
} catch (e) {
  alert(e);
}
},
  }, data() {
    return {
      notes: [],
   
      newNote: {title:"", body:"",tags:[]},
     

    };
  },

    
};
</script>
  
<style>
 

 .inputsCreate{
    font-size: 12px;
    margin: 5px;
}

.tag {
    background-color: #6d6868c7;
    border-radius: 9px;
    display: inline-block;
    color: #fffffff6;
    letter-spacing: 0.5px;

}
input{
    width: fit-content;
    display: inline-block;
}
.createNote {
    border-radius: 10%;
    padding: 15px;
    border-style: solid;
    border-color: black;
    background-color: rgba(165, 100, 16, 0.488);
    display: inline-flex;
    box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
    font-family: Georgia, 'Times New Roman', Times, serif;
    transition: box-shadow .15s, transform .15s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    will-change: box-shadow, transform
}

.createNote:hover {
    transform: translateY(-10px);
}

.createNote:focus {
    box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}

.header{
  font-family: Georgia, 'Times New Roman', Times, serif;
  color: rgb(47, 46, 45);
  font-size: 22px;
  
}

.waviy {
  position: relative;
  -webkit-box-reflect: below -30px linear-gradient(transparent, rgba(0,0,0,.2));
  font-size: 40px;
}
.waviy span {
  font-family: 'Alfa Slab One', cursive;
  position: relative;
  display: inline-block;
  color: #fff;
  animation: waviy 7s infinite;
  animation-delay: calc(.1s * var(--i));
  
}
@keyframes waviy {
  0%,40%,100% {
    transform: translateY(0)
  }
  20% {
    transform: translateY(-20px)
  }
}
</style>