import { useEffect, useState } from "react"


const Home = () => {
  const [items, setItems] = useState(null)

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('/api/tools')
      const json = await response.json()

      if (response.ok) {
        setItems(json)
      }
    }

    fetchItems()
  }, [])

  return (
    <div className="home">
      <div className="workouts">
        {items && items.map(item => (
          <p key={item._id}>{ item.title }</p>
        ))}
      </div>
    </div>
  )
}

export default Home
