import React from "react";
import ReservationDetails from "./ReservationDetails";

function ReservationList({ reservations = []}){
    if (reservations.length){
        const list = reservations
            .map((reservation) => (
                <ReservationDetails 
                    key={reservation.reservation_id}
                    first_name={reservation.first_name}
                    last_name={reservation.last_name}
                    mobile_number={reservation.mobile_number}
                    reservation_date={reservation.reservation_date}
                    reservation_time={reservation.reservation_time}
                    people={reservation.people}
                />
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