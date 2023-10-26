import React, { ReactNode} from "react"
import Navbar from "./Navbar"
import LeftSection from "./LeftSection";

interface LayoutPage {
    children: ReactNode;
}

const Layout: React.FC<LayoutPage> = ({children}) => {

    return (
        <React.Fragment>
            <Navbar />
            <div className="main_page">
                <div className="left_page">
                    <LeftSection />
                </div>
                <div className="center_page">
                    {children}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Layout;