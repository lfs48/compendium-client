import Routes from "@/components/routes"
import Navbar from "@/components/UI/navbar"
import tw from "tailwind-styled-components"
import Footer from "@/components/UI/footer"

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
    </Root>
  )
}

export default App
