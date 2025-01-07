import 'bootstrap/dist/css/bootstrap.min.css'
import SignUp from './signup.js'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LogIn from './login.js'
import Home from './home.js'
import Calendar from './calendar.js'
import About from './about.js'
import LandingPage from './landingPage.js'
import FAQ from './faq.js'
import Contact from './contact.js'
import NotFoundPage from './notFound.js';

function App() {
  return(
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LandingPage />} />
        <Route path='/register' element={<SignUp/>}></Route>
        <Route path='/login' element={<LogIn/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/calendar' element={<Calendar/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/faq' element={<FAQ/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
