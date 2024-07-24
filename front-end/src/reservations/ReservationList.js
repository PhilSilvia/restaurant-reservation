import React from "react";
import ReservationDetails from "./ReservationDetails";
import { useNavigate } from "react-router";

/**
 * Defines the JSX for the Reservation List element
 * @param {array} reservations Array of all loaded reservations, given by the parent element 
 * @returns JSX for the element
 */
function ReservationList({ reservations = []}){
    const navigate = useNavigate();

    // If we have our reservations, then we proceed to display the element
    if (reservations.length){
        // Create the list by mapping the ReservationDetails across the array of reservations
        const list = reservations
            .map((reservation) => {
                // Define the seating button to pass to the Details element
                const seatButton = (
                    <button 
                        className="btn btn-primary" 
                        href={`/reservations/${reservation.reservation_id}/seat`}
                        onClick={(e) => {
                            e.preventDefault();
                            return navigate(`/reservations/${reservation.reservation_id}/seat`);
                        }}
                    >Seat</button>
                )
                // Don't display the reservation at all if the reservation's status is finished
                return reservation.status !== "finished" && (
                <div key={reservation.reservation_id}>
                    <ReservationDetails 
                        reservation={reservation}
                        seatButton={seatButton}
                    />
                </div>
            )});
        
        // Returns the JSX for the list
        return (
            <section className="mt-4">
                {list}
            </section>
        );
    }
    return null;
}

export default ReservationList;