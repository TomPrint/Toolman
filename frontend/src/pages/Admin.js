import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <h2 className="flex justify-between items-center h-30 max-w-[1240px] mx-auto px-4 text-white">
        Panel Administratora
      </h2>
      <div className="flex justify-between items-center h-30 max-w-[1240px] mx-auto px-4 text-white">
        <div class="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            <Link to="/signup">Zarejestruj Nowych Użytkowników</Link>
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            <Link to="/manage">Zarządzaj Użytkownikami</Link>
          </button>
          {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            <Link to="#">Users' Log</Link>
          </button> */}


          {/* coffe cup */}
          <br></br>
          <div className="invisible md:visible mt-11" id="container">
            <div className="steam" id="steam1">
              {" "}
            </div>
            <div className="steam" id="steam2">
              {" "}
            </div>
            <div className="steam" id="steam3">
              {" "}
            </div>
            <div className="steam" id="steam4">
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
