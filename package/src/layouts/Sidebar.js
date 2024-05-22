import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  
  {
    title: "Proveedores",
    href: "/Proveedor",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Personal",
    href: "/Personal",
    icon: "bi bi-bell",
  },
  {
    title: "Productos",
    href: "/Producto",
    icon: "bi bi-columns",
  },
  {
    title: "Categorías",
    href: "/CatMovimiento",
    icon: "bi bi-layout-split",
  },
  {
    title: "Movimientos",
    href: "/Movimiento",
    icon: "bi bi-card-text",
  },
  {
    title: "Inventario",
    href: "/Inventario",
    icon: "bi bi-hdd-stack",
  },

];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <span className="ms-auto d-lg-none">
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
        </span>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
          <Button
            color="danger"
            tag="a"
            target="_blank"
            className="mt-3"
          >
            Cerrar sesión
          </Button>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
