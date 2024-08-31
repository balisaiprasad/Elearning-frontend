import React, { useEffect, useState } from 'react'
import "./Coursedescription.css";
import { useNavigate, useParams } from 'react-router-dom';
import { CourseData } from '../../context/CourseContext';
import axios from 'axios';
import { server } from '../../main';
import { UserData } from '../../context/UserContext';
import toast from 'react-hot-toast';
import Loading from '../../components/loading/Loading';
const CourseDescription = ({user}) => {
    const params = useParams();
    const navigate = useNavigate
    const {fetchCourse,course, fetchCourses , fetchMyCourse} = CourseData();

    useEffect(()=>{
        fetchCourse(params.id);
    },[]);

  const[loading,setLoading] = useState(false);
  const {fetchUser} = UserData();
  const  checkoutHandler = async() =>{
  const token = localStorage.getItem("token")
  setLoading(true)

  const{data:{order}} = await axios.post(`${server}/api/course/checkout/${params.id}`,{},{
    headers:{
      token,
    },
  });

   const options = {
    "key": "rzp_test_yAZrVlzMVfDkFo", // Enter the Key ID generated from the Dashboard
    "amount": order.id, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Elantoring", //your business name
    "description": "Learn with glory",
    "image": "https://example.com/your_logo",
    "order_id": order.id,  

    handler: async function (response){
      const {razorpay_order_id, razorpay_payment_id,razorpay_signature} = response;

      try {
        const {data}= await axios.post(
          `${server}/api/verifcation/${params.id}`,{
            razorpay_order_id, razorpay_payment_id,razorpay_signature
          },
          {
            headers:{
              token,
            },
          }
        );
        await fetchUser();
        await fetchCourses();
        await fetchMyCourse();
        toast.success(data.message)
        setLoading(false);
        navigate(`/payment-success/${razorpay_payment_id}`);
      } catch (error) {
        toast.error(error.response.data.message)
        setLoading(false);
        
      }
    },
     theme:{
      color:" rgb(12, 14, 81)",
     },
   };

   const razorpay = new window.Razorpay(options); 

   razorpay.open();
  };
  return (
   <>
   {
    loading?(<Loading/>):(
      <>
      {course && (<div className='course-description'>
        <div className='course-header'>
            <img src = {`${server}/${course.image}`} 
            alt=""
            className='course-image'
            />
            <div className='course-info'>
                <h2>{course.title}</h2>
                <p>Instructor: {course.createdby}</p>
                <p>Duration: {course.duration} Weeks </p>
            </div>
            
            </div>
            <p> {course.description}  </p>
            <p> Lets get and increase the knowledge <br/>
                Lets get started with course At ₹{course.price}  </p>

                {
                  user && user.subscription.includes(course._id) ? (
                  <button onClick={()=>navigate(`/course/study/${course._id}`)} className='common-btn'>study</button>
                ):(
                  <button onClick={checkoutHandler}className='common-btn'>Buy Now</button>)
                }
            </div>
        )}
    </>
    ) 
   }
   </>
  )
}

export default CourseDescription
