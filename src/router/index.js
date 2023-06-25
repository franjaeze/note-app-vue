import { createRouter, createWebHashHistory } from 'vue-router'
import NotesView from '../components/NotesView.vue'
import CreateNote from '../components/CreateNote.vue'

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
 
  }
]
})

export default router
