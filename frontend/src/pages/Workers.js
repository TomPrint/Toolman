import { useEffect, useState } from "react"

// components
import WorkerDetails from "../components/WorkerDetails"

const Workers = () => {
    const [workers, setWorkers] = useState(null)

  useEffect(() => {
    const fetchWorkers = async () => {
      const response = await fetch('/api/employee')
      const json = await response.json()
      // to get an array of objet
      if (response.ok) {
        setWorkers(json)
      }
    }
    // fire a function 
    fetchWorkers()
  }, [])

  return (
    <div className="flex justify-between items-center h-30 max-w-[1240px] mx-auto px-4 text-white">
      <div class="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7">
          
        {/* chcecking are there any item and if so map them */}
        {/* using ItemDetails from components to show template */}
        {workers && workers.map(worker => (
          <WorkerDetails key={worker._id} worker={worker}/>
        ))}
      </div>
    </div>
  )
}
 
export default Workers;