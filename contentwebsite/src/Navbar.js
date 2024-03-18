import { Link, useMatch, useResolvedPath } from "react-router-dom";
import SideBar from "./SideBar";
import Image from 'react-bootstrap/Image'
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';

export default function Navbar({ isSignedIn }) {
  return (
    <nav className="nav">
      <SideBar class="m-5"/>
     
      <Link to="/" className="site-title"s>
        Scribbler
      </Link>
      <ul>
        
        {!isSignedIn && <CustomLink to="/articles">Articles</CustomLink>}
        {isSignedIn && <CustomLink to="/Publish">Publish</CustomLink>}
        {isSignedIn && <CustomLink to="MyProfile">Profile</CustomLink>}
        {!isSignedIn && <CustomLink to="/Register">Register</CustomLink>}
        {!isSignedIn && <CustomLink to="/SignIn">Sign in</CustomLink>}
        
      </ul>

      
    </nav>
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
