import ReservationDetails from "./ReservationDetails";
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { readReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationSeatingForm from "./ReservationSeatingForm";

/**
 * Defines the JSX for the page that allows a user to seat a particular reservation
 * @returns JSX for the element
 */
function ReservationSeat(){
    // State variables for storing the reservation and its errors
    const [reservation, setReservation] = useState({});
    const [reservationError, setReservationError] = useState(null);
    // Grab the reservation id from the route parameters
    const { reservationId } = useParams();

    // Function to load the required reservation on page load, or if the reservation id changes
    function loadReservation(){
        const abortController = new AbortController();
        setReservationError(null);
        readReservation({ reservationId }, abortController.signal)
            .then((reservation) => {
                setReservation(reservation);
            })
            .catch(setReservationError);
        return () => abortController.abort();
    }

    // Tells the program to load the reservation if the reservation id changes
    useEffect(loadReservation, [reservationId]);

    // Returns the JSX for the element, which displays the details of the reservation and the seating form
    return (
        <div className="col">
            <div className="row">
                <div className="my-4 by-2">
                    <h1>Reservation Details</h1>
                    <ReservationDetails 
                        reservation={reservation}
                    />
                </div>
            </div>
            <div className="row">
                <ReservationSeatingForm reservation={reservation}/>
            </div>
            <div className="row">
                <ErrorAlert error={reservationError} />
            </div>
        </div>
    );
}

export default ReservationSeat;