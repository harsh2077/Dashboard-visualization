import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryFilter = ({ onCountrySelect }) => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/data'); 
                const uniqueCountries = [...new Set(response.data.map(item => item.country))]; 
                setCountries(uniqueCountries);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    const handleChange = (event) => {
        const country = event.target.value;
        setSelectedCountry(country);
        onCountrySelect(country); 
    };

    return (
        <select value={selectedCountry} onChange={handleChange}>
            <option value="">Filter Country</option>
            {countries.map((country, index) => (
                <option key={index} value={country}>{country}</option>
            ))}
        </select>
    );
};

export default CountryFilter;
