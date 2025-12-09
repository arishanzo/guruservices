
import SideNav from "../components/SideNav";
import SaldoContent from "./SaldoContent";

const Saldo = () => {
  
  return (

    <>
  <div className="flex bg-green-10">

    {/* Sidebar & Nabvar */}
     <SideNav />
    {/* Main content area */}
    <div className="flex-1   top-0 min-h-screen w-[80%]">
           <div className="w-full h-full py-16 p-4 sm:pt-20 ">
          <SaldoContent />
        </div>

      </div>
  </div>


</>
  
  );
}   

export default Saldo;