import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PestFilter = ({ onPestSelect }) => {
    const [pestles, setPestles] = useState([]);
    const [selectedPest, setSelectedPest] = useState('');

    useEffect(() => {
        const fetchPestles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/data'); 
                const uniquePestles = [...new Set(response.data.map(item => item.pestle))];
                setPestles(uniquePestles);
            } catch (error) {
                console.error('Error fetching pestles:', error);
            }
        };
        fetchPestles();
    }, []);

    const handleChange = (event) => {
        const pest = event.target.value;
        setSelectedPest(pest);
        onPestSelect(pest); 
    };

    return (
        <select value={selectedPest} onChange={handleChange}>
            <option value="">Filter PEST </option>
            {pestles.map((pestle, index) => (
                <option key={index} value={pestle}>{pestle}</option>
            ))}
        </select>
    );
};

export default PestFilter;
