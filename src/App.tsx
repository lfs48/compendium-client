import Routes from "@/components/routes"
import tw from "tailwind-styled-components"
import { Toaster } from 'react-hot-toast';
import AppToaster from "./components/UI/app-toaster";

const Root = tw.div`
  w-full 
  h-full
  text-black 
  dark:text-gray-200
`

function App() {

  return (
    <Root id='app'>
      <Routes />
      <AppToaster />
    </Root>
  )
}

export default App
