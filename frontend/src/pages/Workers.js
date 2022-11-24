import { useEffect, useState } from "react"

// components
import WorkerDetails from "../components/WorkerDetails"
import LoadingSpinner from "../components/LoadingSpinner"

const Workers = () => {
    const [workers, setWorkers] = useState(null)
    const [loading, setLoading]=useState(false)

  useEffect(() => {
    const fetchWorkers = async () => {
      setLoading(true)
      const response = await fetch('/api/employee/workers')
      const json = await response.json()
      // to get an array of objet
      if (response.ok) {
        setWorkers(json)
        setLoading(false)
      }
    }
    // fire a function 
    fetchWorkers()
  }, [])

  return (
    <div>
    <h1 className="flex justify-center py-4 text-xl font-bold">Wszyscy pracownicy: </h1>
    { loading ? (<div className="flex justify-center items-center "><LoadingSpinner/></div>) :
      <div className="flex justify-between items-center h-30 max-w-[1240px] mx-auto px-4 text-white">
      <div class="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7">
          
        {/* chcecking are there any workers and if so map them */}
        {/* using WorkerDetails from components to show template */}
        {workers && workers.map(worker => (
          <WorkerDetails key={worker._id} worker={worker}/>
        ))}
      </div>
      </div>
    }
    </div>
  )
}
 
export default Workers;