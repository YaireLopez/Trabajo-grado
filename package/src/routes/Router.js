import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Inicio = lazy(() => import("../views/Inicio.js"));
const Proyecto = lazy(() => import("../views/Proyecto.js"));
const Personal = lazy(() => import("../views/ui/Personal.js"));
const Inventario = lazy(() => import("../views/ui/Inventario.js"));
const Movimiento = lazy(() => import("../views/ui/Movimiento.js"));
const Producto = lazy(() => import("../views/ui/Producto.js"));
const CatMovimiento = lazy(() => import("../views/ui/CatMovimiento.js"));
const Proveedor = lazy(() => import("../views/ui/Proveedor.js"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/inicio" /> },
      { path: "/inicio", exact: true, element: <Inicio /> },
      { path: "/proyecto", exact: true, element: <Proyecto /> },
      { path: "/personal", exact: true, element: <Personal /> },
      { path: "/inventario", exact: true, element: <Inventario /> },
      { path: "/movimiento", exact: true, element: <Movimiento /> },
      { path: "/producto", exact: true, element: <Producto /> },
      { path: "/CatMovimiento", exact: true, element: <CatMovimiento /> },
      { path: "/Proveedor", exact: true, element: <Proveedor /> },
    ],
  },
];

export default ThemeRoutes;
