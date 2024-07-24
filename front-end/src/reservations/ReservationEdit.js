import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

function ReservationEdit(){
    const { reservationId } = useParams();

    const [ reservation, setReservation ] = useState({});

    useEffect(() => {
        
    }, [reservationId]);

    return (
        <div>
            <h1>Edit Reservation</h1>
        </div>
    );
}

export default ReservationEdit;