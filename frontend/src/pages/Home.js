import { useEffect, useState } from "react"


const Home = () => {
  const [items, setItems] = useState(null)

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('/api/tools')
      const json = await response.json()
      // to get an array of objet
      if (response.ok) {
        setItems(json)
      }
    }
    // fire a function 
    fetchItems()
  }, [])

  return (
    <div className="flex justify-between items-center h-30 max-w-[1240px] mx-auto px-4 text-white">
      <div class="p-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          
        {/* chcecking are there any item and if so map them */}
        {items && items.map(item => (
          <div class="rounded overflow-hidden shadow-lg">
          <img class="w-full rounded" src="wkretarka.JPG" alt="Mountain"></img>
          <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{item.title}</div>
          <p class="text-white text-base">Model : <span className="text-[#00df9a]">{item.model}</span></p>
          <p class="text-white text-base">Numer seryjny : <span className="text-[#00df9a]">{item.serialNumber}</span></p>
          <p class="text-white text-base">Rok produkcji : <span className="text-[#00df9a]">{item.yearOfProduction}</span></p>
          </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
