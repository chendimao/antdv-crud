import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import antdCrud from '../package/index.js';




const app = createApp(App)

app.use(antdCrud );


app.mount('#app');
