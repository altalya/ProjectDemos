import React, { useState, useEffect } from 'react';
import { apiCall } from '../utils/APIHandler';
import Cookies from 'js-cookie';
import './Card.css';

const PropertyList = ({ onEdit }) => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const userId = Cookies.get('userId');
        if (userId) {
            apiCall(`/api/${userId}/properties`, 'GET')
                .then(data => {
                    setProperties(data);
                })
                .catch(error => {
                    console.error('Error fetching properties:', error);
                });
        }
    }, []);

    return (
        <div className="card-container">
            {properties.map(property => (
                <div key={property._id} className="card">
                    <button className="edit-button" onClick={() => onEdit(property)}>Edit</button>
                    <h2 className="card-name">{property.name}</h2>
                    <div className="card-details">
                        <p><strong>Address:</strong> {property.address.address_line}, {property.address.city}, {property.address.state} - {property.address.pincode}</p>
                        <p><strong>Rent:</strong> {property.current_rent}</p>
                        {property.current_tenant && (
                            <div>
                                <p><strong>Tenant:</strong> {property.current_tenant.name}</p>
                                <p><strong>Tenant Phone:</strong> {property.current_tenant.phone}</p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PropertyList;
