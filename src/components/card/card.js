import React from 'react';
import './card.css';
import { useState, useEffect } from 'react';
const Card = (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await response.json();
            setData(json);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    const showDetails = (event) => {
        const details = document.getElementById(event.id); 
        if (details.style.display === "none") {
            details.style.display = "block";
        } else {
            details.style.display = "none";
        }
        const btn = document.getElementById(event.name);
        if(btn.innerHTML === "View Details"){
            btn.innerHTML = "Hide Details";
        }
        else{
            btn.innerHTML = "View Details";
        }
    }
    return (
        <div>
            {data.map((item) => (
                <div key={item.id}>
                    <div className="details-container">
                        <div className="detail">
                            <div className="label">Name:</div>
                            <div className="value">{item.name}</div>
                        </div>
                        <div className="detail">
                            <div className="label">Contact:</div>
                            <div className="value">{item.phone}</div>
                        </div>
                        <div className="detail">
                            <div className="label">City:</div>
                            <div className="value">{item.address.city}</div>
                        </div>
                        <div className="detail">
                            <div className="label">Email</div>
                            <div className="value">{item.email}</div>
                        </div>
                        <div>
                            <button className="btn" id={item.name} onClick={()=>showDetails(item)}>View Details</button>
                        </div>
                        <div className="details" id={item.id} style={{ display: 'none' }}>
                            <p>{item.name}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Card;
