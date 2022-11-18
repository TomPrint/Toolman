import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"



const WorkerItems = () => {
  
  //pass workerId parameter from App.js form Route (must be the same name of id param)
  const { workerId } = useParams();

  const [workerItems, setWorkerItems] = useState(null)
  
  useEffect(() => {
    const fetchWorkerItems = async () => {
      const response = await fetch(`/api/employee/workers/${workerId}/items`)
      const json = await response.json()
      // to get an array of objet
      if (response.ok) {
        setWorkerItems(json)
      }
    }
    // fire a function 
    fetchWorkerItems()

    // include that param in dependencies
  }, [workerId])

  return (
    <div className="flex justify-between items-center h-30 max-w-[1240px] mx-auto px-4 text-white">
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7">
      {workerItems && workerItems.map(workeritem => (
          <p key={workeritem._id} workeritem={workeritem}>{workeritem.title} / {workeritem.model}</p>
          
        ))}
      </div>
    </div>
  )
}
 
export default WorkerItems;