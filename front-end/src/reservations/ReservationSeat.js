import ReservationDetails from "./ReservationDetails";
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { readReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationSeatingForm from "./ReservationSeatingForm";

function ReservationSeat(){
    const [reservation, setReservation] = useState({});
    const [reservationError, setReservationError] = useState(null);
    const { reservationId } = useParams();

    function loadReservation(){
        const abortController = new AbortController();
        setReservationError(null);
        readReservation({ reservationId }, abortController.signal)
            .then((reservation) => {
                setReservation(reservation[0]);
            })
            .catch(setReservationError);
        return () => abortController.abort();
    }

    useEffect(loadReservation, [reservationId]);

    return (
        <div className="col">
            <div className="row">
                <div className="my-4 by-2">
                    <h1>Reservation Details</h1>
                    <ReservationDetails 
                        first_name={reservation.first_name}
                        last_name={reservation.last_name}
                        mobile_number={reservation.mobile_number}
                        reservation_date={reservation.reservation_date}
                        reservation_time={reservation.reservation_time}
                        people={reservation.people}
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