import React, { useState } from "react";
import SearchByMobileNumberForm from "./SearchByMobileNumberForm";
import ReservationList from "../reservations/ReservationList";

function Search(){
    const [ reservations, setReservations ] = useState([]);

    return (
        <main>
            <h1>Search for a Reservation</h1>
            <div className="d-md-flex mb-3">
                <div className="col">
                    <SearchByMobileNumberForm 
                        reservations={reservations} 
                        setReservations={setReservations}
                    />
                    <ReservationList reservations={reservations} />
                </div>
            </div>
        </main>
    );
}

export default Search;