import React from "react";

function ReservationDetails({ reservation, seatButton = null }){
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
                    Party Size: {reservation.people}<br />
                </p>
                {seatButton}
            </div>
        </div>      
    );
}

export default ReservationDetails;