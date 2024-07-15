import React from "react";

function ReservationDetails({ first_name, last_name, mobile_number, reservation_date, reservation_time, people }){
    return (
        <div className="card my-2">
            <div className="card-header">
                <h5 className="card-title">
                    {first_name} {last_name}
                </h5>
                <h6 className="card-subtitle">
                    {mobile_number}
                </h6>
            </div>
            <div className="card-body">
                <p className="card-text">
                    Date: {reservation_date}<br />
                    Time: {reservation_time}<br />
                    Party Size: {people}<br />
                </p>
            </div>
        </div>      
    );
}

export default ReservationDetails;