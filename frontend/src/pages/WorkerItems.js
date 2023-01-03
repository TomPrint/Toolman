import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import {useAuthContext} from '../hooks/useAuthContext'
//components
import LoadingSpinner from "../components/LoadingSpinner"

const WorkerItems = () => {
  setTimeout(1000)
  //pass workerId parameter from App.js form Route (must be the same name of id param)
  const { workerId} = useParams();
  const {user} = useAuthContext()
  const [workerItems, setWorkerItems] = useState(null)
  const [worker, setWorker] = useState()
  
  useEffect(() => {
    const fetchWorkerItems = async () => {
      const response = await fetch(`/api/employee/workers/${workerId}/items`,{
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const response2 = await fetch(`/api/employee/workers/${workerId}`,{
        headers: {'Authorization': `Bearer ${user.token}`},
      })
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
    if (user){  
    fetchWorkerItems()
  }
    // include that param in dependencies
  }, [workerId, user])

  if (!workerItems) {
    return (<div className="flex justify-center items-center "><LoadingSpinner/></div>)
  }
  return (
    <div>
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
    <div className="flex justify-center items-center ">
    <Link to='/workers'><button className=" bg-gray-500 hover:bg-[#00df9a] transition-all duration-500 text-white rounded py-2 px-4 m-3 ">Wróć</button></Link> 
    </div>
    </div>
    
  )
}

export default WorkerItems;