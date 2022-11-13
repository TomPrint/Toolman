const WorkerDetails = ({worker}) => {
    return ( 

        <div class="rounded overflow-hidden shadow-lg shadow-cyan-500/40 border-solid border-cyan-700 border-2">
        <img class="w-full rounded" src="wkretarka.JPG" alt="Mountain"></img>
        <div class="px-3 py-2">
        <div class="font-bold text-xl mb-2">{worker.name}</div>
        </div>
        </div>
     );
}
 
export default WorkerDetails;