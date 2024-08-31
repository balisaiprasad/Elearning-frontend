import React, { useState } from 'react'
import Layout from '../Utils/Layout';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../../components/coursecard/CourseCard';
import "./AdminCourses.css"
import { CourseData } from '../../context/CourseContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { server } from '../../main';
const categories =[
    "WEB DEVELOPMENT",
"AIML",
"DATA SCIENCE"



]
const AdminCourses = ({user}) => {
    const navigate = useNavigate();

    if(user && user.role!== "admin") 
        return navigate('/');
    const [title, setTitle] = useState("");
    const [description,setDescription] = useState("")
    
    const [price,setPrice] = useState("")
    const [createdBy,setCreatedBy] = useState("")
    const [duration,setDuration] = useState("")
    const [image,setImage] = useState("")
    const [imagePre,setImagePre] = useState("")
    const [btnLoading,setBtnLoading] = useState(false)

    const {courses, fetchCourses} = CourseData()
    const changeImageHandler = (e) =>{
        const file = e.target.files[0];
    const reader = new FileReader()

    reader.readAsDataURL(file);
    reader.onloadend =() => {
      setImagePre(reader.result);
      setImage(file);
    }
    }
    const submitHandler = async(e)=>{
        e.preventDefault();
        setBtnLoading(true);

        const myForm = new FormData()

        myForm.append("title",title)
        myForm.append("description",description)
        
        myForm.append("price",price)
        myForm.append("createdBy",createdBy)
        myForm.append("duration",duration)
        myForm.append("file",image)

        try {
            const {data} = await axios.post(`${server}/api/course/new`, myForm,{
                headers:{
                    token:localStorage.getItem("token"),

                }
            })
            toast.success(data.message)
            setBtnLoading(false)
            await fetchCourses()
            setImage("")
            setTitle("")
            setDescription("")
            setDuration("")
            setImagePre("")
            setCreatedBy("")
            setPrice("")
           

            
        } catch (error) {
            toast.error(error.response.data.message)
           

            
        }

    }
  return (
    <Layout> 
        <div className="admin-courses">
            <div className='left'>
            <h1>All Courses</h1>
            <div className="dashboard-content">
                {
                    courses && courses.length>0 ?( courses.map((e) => {
                        return<CourseCard key={e._id} course={e}/>
                    })) : (<p>NO COURSES YET!</p>)
                }
            </div>
            </div>

            <div className="right">
                <div className="add-course">
                    <div className="course-form">
                        <h2>Add</h2>
                        <form onSubmit={submitHandler}> 
                            <label htmlFor='text'> title</label>
                            <input type='text' value={title} onChange={(e) =>setTitle(e.target.value)} required />

                            <label htmlFor='text'> Description</label>
                            <input type='text' value={description} onChange={(e) =>setDescription(e.target.value)} required />

                            <label htmlFor='text'> price</label>
                            <input type='number' value={price} onChange={(e) =>setPrice(e.target.value)} required />

                            <label htmlFor='text'> createdby</label>
                            <input type='text' value={createdBy} onChange={(e) =>setCreatedBy(e.target.value)} required />

                           

                                <label htmlFor='text'> Duration</label>
                                <input type='number' value={duration} onChange={(e) =>setDuration(e.target.value)} required />
                                 

                            <input type="file" onChange={ changeImageHandler} required />
                            {imagePre && <img src={imagePre} alt="not there" width={300}/>}

                            <button type="sudmit" disabled={btnLoading} className="common-btn">
                                {btnLoading?("Please wait!!"):("Add")}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default AdminCourses;
