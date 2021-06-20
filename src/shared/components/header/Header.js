import { Link } from "react-router-dom";
import logo from "./../../../logo.svg";
import './Header.css';

const Header = (props) => (
  <header className="_header">
    <a href="#" className="_header_thumbnail">
      <img src={logo} alt="App logo" />
    </a>

    <nav className="_navbar">
      <ul className="_navbar_links_wrapper">
        <li className="_navbar_links_item">
          <Link to="/todos" className="_navbar_links_link">
            Todos
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
