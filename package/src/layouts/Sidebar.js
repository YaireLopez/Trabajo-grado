import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "Proveedores",
    href: "/forms",
    icon: "bi bi-speedometer2",
  },
  {
    title: "NO SE X2",
    href: "/alerts",
    icon: "bi bi-bell",
  },
  {
    title: "Simulador",
    href: "/badges",
    icon: "bi bi-patch-check",
  },
  {
    title: "Inventario",
    href: "/buttons",
    icon: "bi bi-hdd-stack",
  },
  {
    title: "Otra cosa",
    href: "/cards",
    icon: "bi bi-card-text",
  },
  {
    title: "Productos",
    href: "/grid",
    icon: "bi bi-columns",
  },
  {
    title: "Movimientos",
    href: "/table",
    icon: "bi bi-layout-split",
  },
  {
    title: "Registrar usuario",
    href: "/starter",
    icon: "bi bi-textarea-resize",
  },
  {
    title: "Categorías",
    href: "/breadcrumbs",
    icon: "bi bi-link",
  },
  {
    title: "Finalizar proyecto",
    href: "/about",
    icon: "bi bi-people",
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
