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
    <Root>
      <Navbar />
      <Routes />
      <Footer />
    </Root>
  )
}

export default App
