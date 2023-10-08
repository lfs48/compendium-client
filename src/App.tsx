import Routes from "@/components/routes"
import Navbar from "@/components/concerns/navbar"
import tw from "tailwind-styled-components"

const Root = tw.div`
  w-full 
  h-full 
  text-black 
  dark:text-gray-200
`

function App() {

  return (
    <Root>
      <Navbar />
      <Routes />
    </Root>
  )
}

export default App
