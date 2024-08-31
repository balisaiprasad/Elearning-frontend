import React from 'react'
import "./Dashboard.css"
import { CourseData } from '../../context/CourseContext'
import CourseCard from '../../components/coursecard/CourseCard';
const Dashboard = () => {
  const {mycourse} = CourseData();


  return (
    <div className='student-dashboard'>
      <h2> ALL YOUR COURSES</h2>

      <div className=' dashboard-content'>
        {mycourse && mycourse.length> 0 ?(mycourse.map((e)=><CourseCard key={e._id} course={e}/>)):(<p> Pkease enroll to view course</p>)}
      </div>
      
    </div>
  )
}

export default Dashboard
