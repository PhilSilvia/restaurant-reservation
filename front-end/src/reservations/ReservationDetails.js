import React from "react";
import { useNavigate } from "react-router";
import { cancelReservation } from "../utils/api";

function ReservationDetails({ reservation, seatButton = null }){
    const navigate = useNavigate();

    const editHandler = (event) => {
        event.preventDefault();
        navigate(`/reservations/${reservation.reservation_id}/edit`);
    }

    const cancelHandler = (event) => {
        event.preventDefault();
        if (window.confirm("Do you want to cancel this reservation? This cannot be undone.")){
            const abortController = new AbortController();
            cancelReservation(reservation.reservation_id, abortController.signal)
                .then(() => window.location.reload())
                .catch((error) => console.error(error));
        }
    }

    return (
        <div className="card my-2">
            <div className="card-header">
                <h5 className="card-title">
                    {reservation.first_name} {reservation.last_name}
                </h5>
                <h6 className="card-subtitle">
                    {reservation.mobile_number}
                </h6>
            </div>
            <div className="card-body">
                <p className="card-text">
                    Date: {reservation.reservation_date}<br />
                    Time: {reservation.reservation_time}<br />
                    Party Size: {reservation.people}
                </p>
                <p className="card-text" data-reservation-id-status={reservation.reservation_id}>
                    Status: {reservation.status}<br />
                </p>
                {reservation.status === "booked" && <button onClick={editHandler} href={`/reservations/${reservation.reservation_id}/edit`} className="btn btn-secondary mx-1">Edit</button>}
                {reservation.status === "booked" && seatButton}
                <button onClick={cancelHandler} data-reservation-id-cancel={reservation.reservation_id} className="btn btn-danger mx-1">Cancel</button>
            </div>
        </div>      
    );
}

export default ReservationDetails;