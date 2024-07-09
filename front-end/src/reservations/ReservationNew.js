import React from "react";
import ReservationForm from "./ReservationForm";

function ReservationNew(){
    return (
        <main>
            <h1>Make a New Reservation</h1>
            <div className="d-md-flex mb-3">
                <ReservationForm />
            </div>
        </main>
    );
}

export default ReservationNew;