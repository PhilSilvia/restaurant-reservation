import React from "react";
import ReservationForm from "./ReservationForm";

/**
 * Defines the JSX of the page for creating a new Reservation
 * @returns JSX for the element
 */
function ReservationNew(){
    // Empty form data to be passed onto the form
    const emptyForm = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0,
    };

    // The JSX for the element, which is mostly a div to hold the form
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