import {useState } from "react"
import {AiOutlineClose} from "react-icons/ai"

// components
import WorkerDetails from "../components/WorkerDetails"
import LoadingSpinner from "../components/LoadingSpinner"

//import useFetch hook to GET all items
import useFetch from "../hooks/useFetch";

const Workers = () => {
    const url = '/api/employee/workers'
    const { loading, data, setData } = useFetch(url);
    const [search, setSearch] = useState("")

  // searchTerm updates with current value of input element
  const handleSearch = (event) => {
    setSearch(event.target.value) 
  }

  // clears searchbar input
  const clearSearch = () => {
    setSearch("") 
  }

  // returns filtered workers
  const filteredWorkers = (data, search) => {
    search = search.toLowerCase();
    return data.filter((worker) => worker.name.toLowerCase().includes(search))
  }

  return (
    <div>
    <h1 className="flex justify-center py-4 text-xl font-bold">Wszyscy pracownicy: </h1>
    <div className="flex justify-center items-center h-30 max-w-[1240px] mx-auto px-4 text-white">
        <input
        className='text-black'
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Wyszukaj pracownika..."
        />
          {search !== "" && (<div className="ml-2 cursor-pointer" onClick={clearSearch}>
            <AiOutlineClose /> </div>)}
      </div>
    { loading ? (<div className="flex justify-center items-center "><LoadingSpinner/></div>) :
      <div className="flex justify-between items-center h-30 max-w-[1240px] mx-auto px-4 text-white">
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7">
          
        {/* chcecking are there any workers and if so map them */}
        {/* using WorkerDetails from components to show template */}
        {/* passing worker id, passing worker and passing setWorkers to update it after delete  */}
        {data ? (filteredWorkers(data, search).map((worker) => (<WorkerDetails key={worker._id} worker={worker} workersState={setData} />))) : <div></div>}
     
      </div>
      </div>
    }
    </div>
  )
}
 
export default Workers;