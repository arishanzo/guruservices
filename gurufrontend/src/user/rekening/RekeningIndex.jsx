
import SideNav from "../components/SideNav";
import RekeningBank from "./RekeningBank";

const RekeningIndex = () => {


  return (

    <>
  <div className="flex bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">

    {/* Sidebar & Nabvar */}
     <SideNav />
    {/* Main content area */}
    <div className="flex-1   top-0 min-h-screen w-[80%]">
          
     
              <div className="w-full h-full py-24 p-4 sm:pt-24 ">
        
            <RekeningBank />
        </div>

    

      </div>
 
 

  </div>


</>
  );
}   
export default RekeningIndex;