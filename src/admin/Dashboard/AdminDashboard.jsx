import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../admin/Utils/Layout';
import { server } from '../../main';
import axios from 'axios';
import './AdDashboard.css';

const AdminDashboard = ({ user }) => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({}); // Initialize as an empty object

    // Check if user is defined and has the role of 'admin'
    useEffect(() => {
        if (user && user.role !== 'admin') {
            navigate('/');
            return;
        }
        fetchStats();
    }, [user, navigate]);

    async function fetchStats() {
        try {
            const { data } = await axios.get(`${server}/api/stats`, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });
            setStats(data.stats);
        } catch (error) {
            console.error('Error in fetching stats:', error);
        }
    }

    return (
        <div>
            <Layout>
                <div className="main-content">
                    <div className="box">
                        <p>Total Users</p>
                        <p>{stats.totalUsers || 0}</p>
                    </div>
                    <div className="box">
                        <p>Total Lectures</p>
                        <p>{stats.totalLectures || 0}</p>
                    </div>
                    <div className="box">
                        <p>Total Courses</p>
                        <p>{stats.totalCourses || 0}</p> {/* Fixed property name */}
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default AdminDashboard;
