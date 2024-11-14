// src/components/CameraTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CameraTable.css';
// import location from '../assets/location.svg';

const CameraTable = () => {
    const [cameras, setCameras] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // default to 10 items per page
    const [location, setlocation] = useState("");


    // Fetch data from API
    useEffect(() => {
        fetchCameras();
    }, []);

    const fetchCameras = async () => {
        try {
            const response = await axios.get('https://api-app-staging.wobot.ai/app/v1/fetch/cameras', {
                headers: {
                    Authorization: 'Bearer 4ApVMIn5sTxeW7GQ5VWeWiy'
                }
            });
            setCameras(response.data.data);
        } catch (error) {
            console.error('Error fetching cameras:', error);
        }
    };

    // Update status
    const updateCameraStatus = async (id, newStatus) => {
        try {
            await axios.put(
                'https://api-app-staging.wobot.ai/app/v1/update/camera/status',
                { id, status: newStatus },
                {
                    headers: {
                        Authorization: 'Bearer 4ApVMIn5sTxeW7GQ5VWeWiy'
                    }
                }
            );
            fetchCameras();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const locations = cameras.reduce((acc, value) => {
        if (!acc.includes(value.location)) {
            acc.push(value.location);
        }
        return acc;
    }, []);
    console.log(locations, "aa");



    // Filtered and paginated cameras
    const filteredCameras = cameras
        .filter(camera =>
            camera.name.toLowerCase().includes(searchTerm.toLowerCase()) && // Search filter
            (statusFilter === 'All' || camera.status === statusFilter) && // Status filter
            (location === "" || camera.location === location) // Location filter
        );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCameras.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredCameras.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    // Handle items per page change
    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(1); // Reset to first page on items per page change
    };

    return (
        <div className='container'>
            <div className='logo'>
                <img src={process.env.PUBLIC_URL + '/assets/brand.svg'} alt="Brand Logo" />
            </div>
            <div className="header">
                <div className="left">
                    <div>Cameras</div>
                    <p>Manage your cameras here.</p>
                </div>
                <div className="right">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <i className="fa fa-search"></i>

                </div>
            </div>
            <div className="camera-table">


                <div className="search-filter">
                    <div className='location-select'>
                        <img src={process.env.PUBLIC_URL + '/assets/location.svg'} alt="Location icon" className="location-icon" />

                        <select
                            value={location} style={{ paddingLeft: "20px" }}
                            onChange={(e) => setlocation(e.target.value)}
                        >
                            <option value="" >
                                Location</option>
                            {locations.map((loc, index) => (
                                <option key={index} value={loc} >
                                    {loc}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='status-select'>
                        <img src={process.env.PUBLIC_URL + '/assets/status.svg'} alt="Status icon" className="status-icon" />
                        <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter} style={{ paddingLeft: "20px" }}>
                            <option value="All">Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>
                <table>
                    <thead>

                        <tr>
                            <th><input type="checkbox" /></th>
                            <th>Name</th>
                            <th>Health</th>
                            <th>Location</th>
                            <th>Recorder</th>
                            <th>Tasks</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((camera) => (

                            <tr key={camera.id}>
                                <td><input type="checkbox" /></td>
                                <td>
                                    <img src={process.env.PUBLIC_URL + '/assets/active.svg'} alt="" />
                                    {" " + camera.name}
                                    <br />
                                    <small style={{ color: '#666' }}>OpenEye | H370 Dual Hailo</small>
                                </td>
                                <td><img src={process.env.PUBLIC_URL + '/assets/Vector.svg'} alt="cloud" /> <div className="health-circle">
                                    <div className="health-circle-inner">{camera.health.cloud}</div>
                                </div><img src={process.env.PUBLIC_URL + '/assets/Edge.svg'} alt="Edge Logo" /><div className="health-circle-green">
                                        <div className="health-circle-inner">{camera.health.device}</div>
                                    </div></td>
                                <td>{camera.location}</td>
                                <td>{camera.recorder || 'N/A'}</td>
                                <td>{camera.tasks ? `${camera.tasks} Tasks` : 'N/A'}</td>
                                <td>
                                    <button
                                        className={`status-button ${camera.status.toLowerCase()}`}
                                        onClick={() => updateCameraStatus(camera.id, camera.status === 'Active' ? 'Inactive' : 'Active')}
                                    >
                                        {camera.status}
                                    </button>
                                </td>

                                <td> <img src={process.env.PUBLIC_URL + '/assets/actions.svg'} alt="" /></td>


                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">

                    <select onChange={handleItemsPerPageChange} value={itemsPerPage} style={{ border: "none" }}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={40}>40</option>
                        <option value={50}>50</option>
                        <option value={60}>60</option>
                        <option value={70}>70</option>
                        <option value={80}>80</option>
                    </select>
                    <span>{`${indexOfFirstItem + 1}-${Math.min(indexOfLastItem, filteredCameras.length)} of ${filteredCameras.length}`}</span>

                    <button className='pagination-btn' onClick={() => paginate(1)} disabled={currentPage === 1}>«</button>
                    <button className='pagination-btn' onClick={goToPreviousPage} disabled={currentPage === 1}>‹</button>
                    <button className='pagination-btn' onClick={goToNextPage} disabled={currentPage === totalPages}>›</button>
                    <button className='pagination-btn' onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>»</button>
                </div>
            </div>
        </div>

    );
};

export default CameraTable;
