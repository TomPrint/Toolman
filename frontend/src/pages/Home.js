import { useAuthContext } from '../hooks/useAuthContext'

const Home = () => {
  const { user } = useAuthContext()
  

  return(
    <div>
      <h1 className="flex justify-center py-4 text-xl font-bold"> Strona główna: </h1>
      <div className="flex justify-center items-center  h-30 max-w-[1240px] mx-auto px-4 text-white">
        {user &&(<div className="flex-center justify-center py-5 text-xl text-white">Zalogowano Użytkownika:<div className="flex-auto px-4 py-1 text-[#00df9a]"> {user.email}</div></div>)}
        {!user && (<div></div>)}
      </div>
    </div>
  );

}

export default Home
