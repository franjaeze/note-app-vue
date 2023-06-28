import { createRouter, createWebHashHistory } from 'vue-router'
import NotesView from '../components/NotesView.vue'
import CreateNote from '../components/CreateNote.vue'
import ModifyNote from '../components/ModifyNote.vue'

const router = createRouter({
  history: createWebHashHistory(),
     routes: [
  {
    path: '/',
    name: 'notes',
    component: NotesView
  },
  {
    path: '/create',
    name: 'create',
    component: CreateNote
 
  },
  {
    path: '/modify/:id',
    name: 'modify',
    component: ModifyNote,
    
 
  }
]
})

export default router
