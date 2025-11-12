import { Toaster } from "react-hot-toast";
import NavbarUser from "./NavbarUser";
import Sidebar from "./Sidebar";

const SideNav = () => {

    return (

        <>
          <Sidebar />
        <NavbarUser />
          <Toaster position="bottom-right" reverseOrder={false} />
        </>
    )
}

export default SideNav;