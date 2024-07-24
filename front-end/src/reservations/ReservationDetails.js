import React from "react";
import { useNavigate } from "react-router";
import { cancelReservation } from "../utils/api";

/**
 * Defines the detailed display for a Reservation.
 * @param {Object} reservation The reservation whose details are being display
 * @param {JSX.element} seatButton The button that allows the user to seat the reservation. Only used
 * @returns JSX for the element
 */
function ReservationDetails({ reservation, seatButton = null }){
    const navigate = useNavigate();

    // Event handler for the edit button, when it is present
    const editHandler = (event) => {
        event.preventDefault();
        // Navigate to the edit page
        navigate(`/reservations/${reservation.reservation_id}/edit`);
    }

    // Event handler for the cancel button, when it is present
    const cancelHandler = (event) => {
        event.preventDefault();
        // Use a confirmation window to avoid accidents
        if (window.confirm("Do you want to cancel this reservation? This cannot be undone.")){
            const abortController = new AbortController();
            // Attempts to set the status of the reservation to "cancelled", then reload the page
            cancelReservation(reservation.reservation_id, abortController.signal)
                .then(() => window.location.reload())
                .catch((error) => console.error(error));
        }
    }

    // Returns the JSX for the display, using a Bootstrap card
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
                {(reservation.status === "booked" || reservation.status === "seated") && <button onClick={cancelHandler} data-reservation-id-cancel={reservation.reservation_id} className="btn btn-danger mx-1">Cancel</button>}
            </div>
        </div>      
    );
}

export default ReservationDetails;