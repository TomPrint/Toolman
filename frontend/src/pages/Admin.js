import { Link } from "react-router-dom";

const Admin = () => {
  return (
   
    <div>
      
      <h1 className="flex justify-center py-4 text-xl font-bold"> Panel Administratora:</h1>
      <div className="flex justify-between items-center h-30 max-w-[1240px] mx-auto px-4 text-white">
        <div class="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7">
        <Link to="/signup"><button className="bg-blue-500 hover:bg-[#00df9a] transition-all duration-500  text-white font-bold py-2 px-4 border rounded border-zinc-900">
            Zarejestruj Nowych Użytkowników</button></Link>  
        <Link to="/manage"><button className="bg-blue-500 hover:bg-[#00df9a] transition-all duration-500  text-white font-bold py-2 px-4 border rounded border-zinc-900">
            Zarządzaj Użytkownikami</button></Link>
  
          <a  href="http://www.influencio.pl" className="bg-blue-500 text-center hover:bg-[#00df9a] transition-all duration-500  text-white font-bold py-2 px-4 border rounded border-zinc-900">Rozrywka</a>
         

          
          {/* coffe cup */}
          <br></br>
          <div className="position: fixed invisible lg:visible mt-11" id="container">
            <div className="steam" id="steam1">
              {" "}
            </div>
           
            <div className="steam" id="steam3">
              {" "}
            </div>
          

            <div id="cup">
              <div id="cup-body">
                <div id="cup-shade"></div>
              </div>
              <div id="cup-handle"></div>
            </div>

            <div id="saucer"></div>

            <div id="shadow"></div>
          </div>
          {/* end of coffe cup */}
        </div>
      </div>
    </div>
  );
};

export default Admin;
