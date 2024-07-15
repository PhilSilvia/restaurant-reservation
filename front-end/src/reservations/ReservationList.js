import React from "react";
import ReservationDetails from "./ReservationDetails";
import { useNavigate } from "react-router";

function ReservationList({ reservations = []}){
    const navigate = useNavigate();

    if (reservations.length){
        const list = reservations
            .map((reservation) => (
                <div>
                    <ReservationDetails 
                        first_name={reservation.first_name}
                        last_name={reservation.last_name}
                        mobile_number={reservation.mobile_number}
                        reservation_date={reservation.reservation_date}
                        reservation_time={reservation.reservation_time}
                        people={reservation.people}
                    />
                    <button 
                        className="btn btn-primary" 
                        href={`/reservations/${reservation.reservation_id}/seat`}
                        onClick={(e) => {
                            e.preventDefault();
                            return navigate(`/reservations/${reservation.reservation_id}/seat`);
                        }}
                    >Seat</button>
                </div>
            ));
        
        return (
            <section className="mt-4">
                {list}
            </section>
        );
    }
    return null;
}

export default ReservationList;