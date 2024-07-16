import React from "react";
import ReservationDetails from "./ReservationDetails";
import { useNavigate } from "react-router";

function ReservationList({ reservations = []}){
    const navigate = useNavigate();

    // TODO: Find a way to nest the Seat button inside the card for the ReservationDetails, but still share
    // ReservationDetails with ReservationSeat element
    if (reservations.length){
        const list = reservations
            .map((reservation) => {
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
                return (
                <div>
                    <ReservationDetails 
                        first_name={reservation.first_name}
                        last_name={reservation.last_name}
                        mobile_number={reservation.mobile_number}
                        reservation_date={reservation.reservation_date}
                        reservation_time={reservation.reservation_time}
                        people={reservation.people}
                        seatButton={seatButton}
                    />
                </div>
            )});
        
        return (
            <section className="mt-4">
                {list}
            </section>
        );
    }
    return null;
}

export default ReservationList;