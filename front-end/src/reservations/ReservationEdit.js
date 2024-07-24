import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { readReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

/**
 * Defines the element for editing a reservation
 * @returns JSX for the element
 */
function ReservationEdit(){
    // Stores the id from the route parameters
    const { reservationId } = useParams();
    // States variables for tracking the reservation and its errors
    const [ reservation, setReservation ] = useState({});
    const [ reservationError, setReservationError ] = useState(null);

    // Function that loads the reservation when the page loads or the reservation id changes
    function loadReservation(){
        const abortController = new AbortController();
        setReservationError(null);
        // Load the reservation data from the API, setting an error if it fails
        readReservation({ reservationId }, abortController.signal)
            .then((reservation) => {
                setReservation(reservation);
            })
            .catch(setReservationError);
        return () => abortController.abort();
    }

    // Loads the reservation on page load or when the reservation id changes
    useEffect(loadReservation, [reservationId]);

    // Returns the JSX for the page
    return (
        <div className="col">
            <h1>Edit Reservation {reservation.reservation_id}</h1>
            <ReservationForm defaultData={reservation} />
            <ErrorAlert error={reservationError} />
        </div>
    );
}

export default ReservationEdit;