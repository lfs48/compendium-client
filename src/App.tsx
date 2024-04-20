import Routes from "@/components/routes"
import tw from "tailwind-styled-components"
import { Toaster } from 'react-hot-toast';
import AppToaster from "./components/UI/app-toaster";
import { useAppSelector } from "./hooks/useAppSelector.hook";
import { useGetUserByIdQuery } from "./api/users.api";
import { skipToken } from "@reduxjs/toolkit/query";

const Root = tw.div`
  w-full 
  h-full
  text-black 
  dark:text-gray-200
`

function App() {

  const id = useAppSelector( (state) => state.session.id)
  
  const { data } = useGetUserByIdQuery(id ?? skipToken);

  return (
    <Root id='app'>
      <Routes />
      <AppToaster />
    </Root>
  )
}

export default App
