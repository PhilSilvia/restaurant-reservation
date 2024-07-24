import React from "react";
import ReservationForm from "./ReservationForm";

function ReservationNew(){
    const emptyForm = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0,
    };

    return (
        <main>
            <h1>Make a New Reservation</h1>
            <div className="d-md-flex mb-3">
                <ReservationForm defaultData={emptyForm} />
            </div>
        </main>
    );
}

export default ReservationNew;