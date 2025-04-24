import {BrowserRouter} from 'react-router-dom'
import Approutes from './routes/Approutes'
import {RecoilRoot} from 'recoil'
function App() {

  return (
<>
<BrowserRouter>
<RecoilRoot>
<Approutes></Approutes>


</RecoilRoot>

</BrowserRouter>




</>
  )
}

export default App
