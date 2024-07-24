import React, { useState } from "react";
import SearchByMobileNumberForm from "./SearchByMobileNumberForm";
import ReservationList from "../reservations/ReservationList";

/**
 * Defines the JSX for the Search page
 * @returns JSX for the element
 */
function Search(){
    // State variable for holding the list of reservations, which are loaded in the Search Form element
    const [ reservations, setReservations ] = useState([]);

    // Returns the JSX for the element
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