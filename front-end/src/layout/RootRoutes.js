import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import ReservationNew from "../reservations/ReservationNew";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function RootRoutes() {
  return (
    <Routes>
      <Route exact={true} path="*" element={<Navigate to={"/dashboard"} />} />
      <Route exact={true} path="/reservations" element={<Navigate to={"/dashboard"} />} />
      <Route path="/reservations/new" element={<ReservationNew />} />
      <Route path="/dashboard" element={<Dashboard date={today()} />} />
      <Route element={<NotFound />} />
    </Routes>
  );
}

export default RootRoutes;
