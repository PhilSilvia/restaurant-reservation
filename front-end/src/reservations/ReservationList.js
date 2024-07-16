import React from "react";
import ReservationDetails from "./ReservationDetails";
import { useNavigate } from "react-router";

function ReservationList({ reservations = []}){
    const navigate = useNavigate();

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
                <div key={reservation.reservation_id}>
                    <ReservationDetails 
                        reservation={reservation}
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