import React from "react";

function ReservationDetails({ first_name, last_name, mobile_number, reservation_date, reservation_time, people }){
    return (
        <section className="border p-4 mb-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        {first_name} {last_name}
                    </h5>
                    <h6 className="card-subtitle">
                        {mobile_number}
                    </h6>
                    <p className="card-text">
                        Date: {reservation_date}<br />
                        Time: {reservation_time}<br />
                        Party Size: {people}<br />
                    </p>
                </div>
            </div>
        </section>
    );
}

export default ReservationDetails;