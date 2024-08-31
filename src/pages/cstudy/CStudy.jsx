import React, { useEffect } from 'react'
import "./CStudy.css";
import { useNavigate } from 'react-router-dom';
import {   Link, useParams } from 'react-router-dom';
import { CourseData } from '../../context/CourseContext';
import { server } from '../../main';
const CStudy = ({user}) => { 
    const params = useParams();

    const {fetchCourse , course} = CourseData();
    const navigate = useNavigate();

    if(user && user.role !== "admin" && !user.subscription.includes(params.id))
        return navigate("/");

    useEffect(()=>{
        fetchCourse(params.id);
    }, []);
  return<>{course && (
    <div className='cstudy-page'>
        <img src={`${server}/${course.image}`} alt=" image not found" width = {350} />
        <h2>{course.title}</h2>
        <h4>{course.description}</h4>
        <h5>by- {course.createdBy}</h5>
        <h5>Duration - {course.duration} Weeks</h5>
        <Link to =  {`/lectures/${course._id}`}>
        <h2>Lectures</h2></Link>
    </div>
  ) }</> ;
}

export default CStudy;
