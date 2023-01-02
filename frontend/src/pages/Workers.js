import { useEffect, useState } from "react"

// components
import WorkerDetails from "../components/WorkerDetails"
import LoadingSpinner from "../components/LoadingSpinner"
import {useAuthContext} from '../hooks/useAuthContext'

const Workers = () => {
    const [workers, setWorkers] = useState(null)
    const [loading, setLoading]=useState(false)
    const {user} = useAuthContext()

  useEffect(() => {
    const fetchWorkers = async () => {
      setLoading(true)
      const response = await fetch('/api/employee/workers',{
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()
      // to get an array of objet
      if (response.ok) {
        setWorkers(json)
        setLoading(false)
      }
    }
    // fire a function 
    if (user){
    fetchWorkers()
  }
  }, [user])

  return (
    <div>
    <h1 className="flex justify-center py-4 text-xl font-bold">Wszyscy pracownicy: </h1>
    { loading ? (<div className="flex justify-center items-center "><LoadingSpinner/></div>) :
      <div className="flex justify-between items-center h-30 max-w-[1240px] mx-auto px-4 text-white">
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7">
          
        {/* chcecking are there any workers and if so map them */}
        {/* using WorkerDetails from components to show template */}
        {/* passing worker id, passing worker and passing setWorkers to update it after delete  */}
        {workers && workers.map(worker => (
          <WorkerDetails key={worker._id} worker={worker} workersState={setWorkers}/>
        ))}
      </div>
      </div>
    }
    </div>
  )
}
 
export default Workers;