import React, { useState, useEffect } from "react";
import "./PropertyForm.css"; // custom CSS
import { apiCall } from "../utils/APIHandler";
import Cookies from "js-cookie";

const PropertyForm = ({ selectedProperty }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: {
      address_line: "",
      city: "",
      state: "",
      pincode: "",
    },
    current_tenant: {
      name: "",
      aadhar_number: "",
      phone: "",
    },
    current_rent: "",
  });

  useEffect(() => {
    if (selectedProperty) {
      setFormData(selectedProperty);
    } else {
      setFormData({
        name: "",
        address: {
          address_line: "",
          city: "",
          state: "",
          pincode: "",
        },
        current_tenant: {
          name: "",
          aadhar_number: "",
          phone: "",
        },
        current_rent: "",
      });
    }
  }, [selectedProperty]);

  // 🔹 Generic change handler for nested fields (dot notation)
  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    setFormData((prevData) => {
      let updated = { ...prevData };
      let nested = updated;

      // Traverse to the nested field
      for (let i = 0; i < keys.length - 1; i++) {
        nested[keys[i]] = { ...nested[keys[i]] };
        nested = nested[keys[i]];
      }

      nested[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = Cookies.get("userId");
    if (selectedProperty) {
      // Update existing property
      apiCall(`/api/${userId}/properties/${selectedProperty._id}`, "put", formData);
    } else {
      // Create new property
      apiCall(`/api/${userId}/properties`, "post", formData);
    }
  };

  return (
    <div className="property-form-container">
      <h2>Add / Update Property</h2>
      <form onSubmit={handleSubmit} className="property-form">
        <input
          type="text"
          name="name"
          placeholder="Property Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      <h3>Address</h3>
      <input
        type="text"
        name="address.address_line"
        placeholder="Address Line"
        value={formData.address.address_line}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address.city"
        placeholder="City"
        value={formData.address.city}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address.state"
        placeholder="State"
        value={formData.address.state}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address.pincode"
        placeholder="Pincode"
        value={formData.address.pincode}
        onChange={handleChange}
      />

      <h3>Tenant (optional)</h3>
      <input
        type="text"
        name="current_tenant.name"
        placeholder="Tenant Name"
        value={formData.current_tenant.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="current_tenant.aadhar_number"
        placeholder="Aadhar Number"
        value={formData.current_tenant.aadhar_number}
        onChange={handleChange}
      />
      <input
        type="text"
        name="current_tenant.phone"
        placeholder="Phone"
        value={formData.current_tenant.phone}
        onChange={handleChange}
      />

      <h3>Rent</h3>
      <input
        type="number"
        name="current_rent"
        placeholder="Current Rent"
        value={formData.current_rent}
        onChange={handleChange}
      />

      <button type="submit">Save Property</button>
    </form>
    </div>
  );
};

export default PropertyForm;
