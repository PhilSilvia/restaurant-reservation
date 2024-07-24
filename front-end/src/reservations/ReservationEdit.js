import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { readReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

function ReservationEdit(){
    const { reservationId } = useParams();
    const [ reservation, setReservation ] = useState({});
    const [ reservationError, setReservationError ] = useState(null);

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

    useEffect(loadReservation, [reservationId]);

    return (
        <div className="col">
            <h1>Edit Reservation {reservation.reservation_id}</h1>
            <ReservationForm defaultData={reservation} />
            <ErrorAlert error={reservationError} />
        </div>
    );
}

export default ReservationEdit;