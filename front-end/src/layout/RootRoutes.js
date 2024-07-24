import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import ReservationNew from "../reservations/ReservationNew";
import ReservationSeat from "../reservations/ReservationSeat";
import ReservationEdit from "../reservations/ReservationEdit";
import TableNew from "../tables/TableNew";
import Search from "../search/Search";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function RootRoutes() {
  // Route definitions for each path on the application
  return (
    <Routes>
      <Route exact={true} path="/" element={<Navigate to={"/dashboard"} />} />
      <Route exact={true} path="/reservations" element={<Navigate to={"/dashboard"} />} />
      <Route path="/tables/new" element={<TableNew />} />
      <Route path="/reservations/new" element={<ReservationNew />} />
      <Route path="/reservations/:reservationId/seat" element={<ReservationSeat />} />
      <Route path="/reservations/:reservationId/edit" element={<ReservationEdit />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/search" element={<Search />} />
      <Route element={<NotFound />} />
    </Routes>
  );
}

export default RootRoutes;