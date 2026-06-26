 
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import Feed from './pages/Feed'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CreatePost/>}/>
        <Route path='/feed' element={<Feed/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
