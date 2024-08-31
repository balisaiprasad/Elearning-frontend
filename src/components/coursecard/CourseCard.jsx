import React from 'react'
import "./CourseCard.css";
import { UserData } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../main';
import toast from 'react-hot-toast';
import { CourseData } from '../../context/CourseContext';

const CourseCard = ({course}) => {
    const navigate = useNavigate()
    const {user, isAuth}= UserData();
    const {fetchCourses} = CourseData()

    const deleteHandler = async(id) =>{
    if(confirm(" I mean do you really wanna do this?")){
        try {
            const{data} = await axios.delete(`${server}/api/course/${id}`,{

                headers:{
                    token: localStorage.getItem("token"),
                }
            }
            )
            toast.success(data.message);
            fetchCourses();
            
        } catch (error) {
            toast.error(error.response.data.message)
            
        }
    }
    }
  return (
    <div className='course-card'>
        <img src={`${server}/${course.image}`} alt="" className='course-image'/>

        <h3>{course.title}</h3>
        <p>Instructor- {course.createdby}</p>
        <p>Duration- {course.duration} Weeks</p>
        <p>Price- ₹{course.price}</p>
        {
            isAuth? (
            <>
            {user && user.role !=="admin"? (<>
            {
                user.subscription.includes(course._id)?(<button onClick={()=> navigate(`/course/study/${course._id}`)} className='common-btn'>start Grinding</button>):(<button onClick={()=> navigate(`/course/${course._id}`)} className='common-btn'>Get Started</button>)
            }
            </>
            
        ) :(
                <button onClick={()=>navigate(`/course/study/${course._id}`)}
             className='common-btn'>
                Start Grinding</button>)}

            
                </>
            ):(
                <button onClick={()=> navigate("/login")} className='common-btn'>Get Started</button>
            )
        }
        <br/>
        {
            user && user.role === "admin" &&( <button onClick={()=>deleteHandler(course._id)} className='common-btn' style={{background:'red'}}> Delete</button>
       ) }
    </div>
  )
}

export default CourseCard
