import { Link } from "react-router-dom"
//import useFetch hook to GET all items
import useFetch from "../hooks/useFetch";

import jsPDF from "jspdf";
import html2canvas from 'html2canvas'
import { useRef } from 'react'
import { AiOutlinePrinter} from 'react-icons/ai'

const Home = () => {
  
  const printRef = useRef()
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  
  const workerUrl = '/api/employee/workers'
  const { loading:workerLoading, data:workerData, user} = useFetch(workerUrl);
  const itemUrl = '/api/tools/items'
  const { loading:itemLoading, data:itemData} = useFetch(itemUrl);


    // handle function that is creating image of selected divs by useRef and then creating pdf.
    const handleDownloadPdf = async () => {
      const pdf = new jsPDF();
      const element = printRef.current;
      // style changes using querySelector for printing on white background
      const canvas = await html2canvas(element,{onclone: function(document) {
        document.querySelector('.druk').style.color = '#000000';
        document.querySelector('.druk').style.fontWeight = '900';
        document.querySelector('.druk2').style.color = '#000000';
        }})
      const data = canvas.toDataURL('image/png');
      const imgProperties = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight =
        (imgProperties.height * pdfWidth) / imgProperties.width;
      pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Stan narzędzi - ${date}.pdf`);
    };
    

  return(
    <div>
      <h1 className="flex justify-center py-4 text-xl font-bold"> Strona główna: </h1>
      <div className="flex justify-center items-center  h-30 max-w-[1240px] mx-auto px-4 text-white">
        {user &&(<div className="flex-center justify-center py-5 text-xl text-white">Zalogowano Użytkownika:<div className="flex-auto  text-[#00df9a]"> {user.name} : {user.email}</div></div>)}
        {!user && (<div></div>)}
      </div>

    <div>
      <div className="flex justify-center h-30 max-w-[1240px] mx-auto px-2 text-white py-10">
            <div className="w-4/4 md:w-5/6">
              <h2 className="text-xl py-4 text-[#00df9a] font-bold">Tabela pracowników:</h2>
              <table className="min-w-full border text-center p-4">
                  <thead className="p-4 bg-[#00df9a] text-xl">
                      <tr>
                        <th className="border p-2">Imię i Nazwisko</th>
                        <th className="border">Stanowisko</th>
                      </tr>
                  </thead>
                  <tbody>
                  {workerData && workerData.map((worker, workerId) => (
                    <tr key={workerId}>
                      <td className="border p-2"><Link to ={`/workers/${worker._id}/items`}>{worker.name}</Link></td>
                      <td className="border">{worker.position}</td>
                    </tr> 
                  ))}
                  </tbody>
              </table>
            </div>
      </div>
    </div>

    <div>
      <div ref={printRef} className="druk flex justify-center h-30 max-w-[1240px] mx-auto px-2 text-white py-10">
            <div className="w-4/4 md:w-5/6">
              <h2 className="text-xl py-4 text-[#00df9a] font-bold">Tabela narzędzi:</h2>
              <table className="min-w-full border text-center p-4">
                  <thead className="p-4 bg-[#00df9a] text-xl">
                      <tr>
                        <th className="border p-2">Nazwa</th>
                        <th className="border hidden sm:table-cell">Producent</th>
                        <th className="border hidden sm:table-cell">Model</th>
                        <th className="border hidden sm:table-cell">Rok produkcji</th>
                        <th className="border hidden sm:table-cell">S/N</th>
                        <th className="border">U pracownika</th>
                      </tr>
                  </thead>
                  <tbody>
                  {itemData && itemData.map((item, itemId) => (
                    <tr key={itemId}>
                      <td className="border p-2"><Link to ={`/items/${item._id}`}>{item.title}</Link></td>
                      <td className="border hidden sm:table-cell">{item.producer}</td>
                      <td className="border hidden sm:table-cell">{item.model}</td>
                      <td className="border hidden sm:table-cell">{item.yearOfProduction}</td>
                      <td className="border hidden sm:table-cell">{item.serialNumber}</td>
                      <td className="border">{item.atEmployee && item.atEmployee.name}</td>
                     
                    </tr> 
                  ))}
                  </tbody>
              </table>
              <div className="druk2 text-whie p-1">Data utworzenia: {date}</div>
            </div>
      </div>
    </div>

    <div className="flex justify-center items-center ">
        <button onClick={()=> {handleDownloadPdf()}}  className=" bg-gray-500 hover:bg-[#00df9a] transition-all duration-500 text-white rounded py-2 px-4 m-3 ">
          <span className='flex'><AiOutlinePrinter size={20}/>PDF</span>
        </button>
    </div>


    </div>
  );

}

export default Home
