
import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Link, useMatch, useResolvedPath } from "react-router-dom";

import MenuBar from './menu';


export default function SideBar() {
    const [visible, setVisible] = useState(false);

    const customIcons = (
        <React.Fragment>
            <button className="p-sidebar-icon p-link mr-2">
                <span className="pi pi-print" />
            </button>
            <button className="p-sidebar-icon p-link mr-2">
                <span className="pi pi-search" />
            </button>
        </React.Fragment>
    );
    
    return (
        <div className="card flex justify-content-center " class="sidbar">
            <Sidebar visible={visible} onHide={() => setVisible(false)} icons={customIcons}>
                
               
     
        
        <MenuBar/>
     
            </Sidebar>
            <Button icon="pi pi-bars"  onClick={() => setVisible(true)} />
           
        </div>
       
    )
}
function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
  }
    