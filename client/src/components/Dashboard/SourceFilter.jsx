import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SourceFilter = ({ onSourceSelect }) => {
    const [sources, setSources] = useState([]);
    const [selectedSource, setSelectedSource] = useState('');

    useEffect(() => {
        const fetchSources = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/data'); 
                const uniqueSources = [...new Set(response.data.map(item => item.source))]; 
                setSources(uniqueSources);
            } catch (error) {
                console.error('Error fetching sources:', error);
            }
        };

        fetchSources();
    }, []);

    const handleChange = (event) => {
        const source = event.target.value;
        setSelectedSource(source);
        onSourceSelect(source);  
    };

    return (
        <select value={selectedSource} onChange={handleChange}>
            <option value="">Filter Source</option>
            {sources.map((source, index) => (
                <option key={index} value={source}>{source}</option>
            ))}
        </select>
    );
};

export default SourceFilter;
