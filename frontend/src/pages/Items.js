
// components
import ItemDetails from "../components/ItemDetails"
import LoadingSpinner from "../components/LoadingSpinner"

//useFetch hook to GET all items
import useFetch from "../hooks/useFetch";

const Items = () => {
  
  const url = '/api/tools/items'
  const { loading, data } = useFetch(url);

  return (
    <div>
      <h1 className="flex justify-center py-4 text-xl font-bold">Wszystkie narzędzia na stanie: </h1>
      { loading ? (<div className="flex justify-center items-center "><LoadingSpinner/></div>) :
        <div className="flex justify-between items-center h-30 max-w-[1240px] mx-auto px-4 text-white">
          <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {/* chcecking are there any item and if so map them */}
            {/* using ItemDetails from components to show template */}
            {data && data.map(item => (<ItemDetails key={item._id} item={item}/>))}
          </div>
        </div> 
      }
    </div>
  )
}
 
export default Items;