import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

//components
import LoadingSpinner from "../components/LoadingSpinner"

const WorkerItems = () => {
  
  //pass workerId parameter from App.js form Route (must be the same name of id param)
  const { workerId} = useParams();

  const [workerItems, setWorkerItems] = useState(null)

  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const fetchWorkerItems = async () => {
      setLoading(true)
      const response = await fetch(`/api/employee/workers/${workerId}/items`)
      const json = await response.json()
      // to get an array of objet
      if (response.ok) {
        setWorkerItems(json)
        setLoading(false)
      }
    }
    // fire a function  
    fetchWorkerItems()
    // include that param in dependencies
  }, [workerId])

  // if (workerItems){
    
  return (
    <div className="flex justify-center h-30 max-w-[1240px] mx-auto px-4 text-white py-10">
       { loading ? (<div className="flex justify-center items-center "><LoadingSpinner/></div>) :
          <div className="w-3/4 md:w-1/1">
            <table class="min-w-full border text-center p-4">
                <thead className="border-b p-4 bg-[#00df9a] text-xl">
                    <tr>
                    <th>Nazwa:</th>
                    <th>Model</th>
                    <th className="border hidden sm:table-cell">S/N</th>
                    <th className="border hidden sm:table-cell">Rok produkcji</th>
                    </tr>
                </thead>
                <tbody>
                {workerItems && workerItems.map((workeritem, workerId) => (
                  <tr key={workerId}>
                    <td className="border">{workeritem.title}</td>
                    <td className="border">{workeritem.model}</td>
                    <td className="border hidden sm:table-cell">{workeritem.serialNumber}</td>
                    <td className="border hidden sm:table-cell">{workeritem.yearOfProduction}</td>
                  </tr> 
                ))}
                </tbody>
            </table>
          </div>
        }  
    </div>
  )
}


 
export default WorkerItems;