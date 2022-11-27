import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

//components
import LoadingSpinner from "../components/LoadingSpinner"

const WorkerItems = () => {
  setTimeout(1000)
  //pass workerId parameter from App.js form Route (must be the same name of id param)
  const { workerId} = useParams();

  const [workerItems, setWorkerItems] = useState(null)
  const [worker, setWorker] = useState()
  
  useEffect(() => {
    const fetchWorkerItems = async () => {
      const response = await fetch(`/api/employee/workers/${workerId}/items`)
      const response2 = await fetch(`/api/employee/workers/${workerId}`)
      const json = await response.json()
      const json2 = await response2.json()
      // to get an array of objet
      if (response.ok) {
        setWorkerItems(json)
      }
      if (response2.ok){
        setWorker(json2)
      }

    }
    // fire a function  
    fetchWorkerItems()
    // include that param in dependencies
  }, [workerId])

  if (!workerItems) {
    return (<div className="flex justify-center items-center "><LoadingSpinner/></div>)
  }
  return (
    <div className="flex justify-center h-30 max-w-[1240px] mx-auto px-2 text-white py-10">
          <div className="w-4/4 md:w-5/6">
            <h2 className="text-xl py-4 text-[#00df9a] font-bold">Narzędzia pracownika - {worker.name}</h2>
            <table class="min-w-full border text-center p-4">
                <thead className="border-b p-4 bg-[#00df9a] text-xl">
                    <tr>
                    <th>Nazwa:</th>
                    <th>Producent:</th>
                    <th className="border hidden sm:table-cell">Model</th>
                    <th className="border hidden sm:table-cell">S/N</th>
                    <th className="border hidden sm:table-cell">Rok produkcji</th>
                    </tr>
                </thead>
                <tbody>
                {workerItems && workerItems.map((workeritem, workerId) => (
                  <tr key={workerId}>
                    <td className="border">{workeritem.title}</td>
                    <td className="border">{workeritem.producer}</td>
                    <td className="border hidden sm:table-cell">{workeritem.model}</td>
                    <td className="border hidden sm:table-cell">{workeritem.serialNumber}</td>
                    <td className="border hidden sm:table-cell">{workeritem.yearOfProduction}</td>
                  </tr> 
                ))}
                </tbody>
            </table>
          </div> 
    </div>
  )
}

export default WorkerItems;