import React, { useEffect, useState } from 'react'
import "./Lecture.css";

import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../main';
import Loading from '../../components/loading/Loading';
import toast from 'react-hot-toast';
import { TiTickOutline } from "react-icons/ti";
const lecture = ({user}) => {
  const [lectures, setLecutures] = useState([])
  const [lecture, setLecuture] = useState([])
  const [loading, setLoading] = useState(true)
  const [lecLoading, setLecLoading] = useState(false)
  const [form,setForm] = useState(false)
  const [show,setshow] = useState(false)
  const params = useParams()
  const navigate = useNavigate()
  const [title,setTitle]= useState();
  const [description,setDescription] = useState("") 
  const [video,setVideo] = useState("")
  const [videoPre,setVideoPre] = useState("")
  const [btnLoading, setBtnLoading] = useState(false)


  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/")
  async function fetchLectures() {
    try {

      const{data} = await axios.get(`${server}/api/lectures/${params.id}`,{
        headers:{
          token: localStorage.getItem("token"),

        }
      })
      setLecutures(data.lectures);
      setLoading(false);
       
    } catch (error) {

      console.log(error);
      
    }
    
  }

  async function fetchLecture(id) {
    try {
      setLecLoading(true);
      const{data} = await axios.get(`${server}/api/lecture/${id}`,{
        headers:{
          token: localStorage.getItem("token"),

        }
      })
      setLecuture(data.lecture);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLecLoading(false)
      
    }
    
  }
  const changeVideoHandler = e =>{
    const file = e.target.files[0];
    const reader = new FileReader()

    reader.readAsDataURL(file);
    reader.onloadend =() => {
      setVideoPre(reader.result);
      setVideo(file);
    }
  }
  const submitHandler = async(e) =>{
    setBtnLoading(true);
    e.preventDefault()
    const myForm = new FormData()

    myForm.append("title", title);
    myForm.append("description", description)
    myForm.append('file',video);

    try {
      const {data} = await axios.post(`${server}/api/course/${params.id}`, myForm,{
        headers: {
          token:localStorage.getItem("token")
        },

      })
      toast.success(data.message)
      setBtnLoading(false)
      
      setshow(false)
      fetchLectures()
      setTitle("")
      setDescription("")
      setVideo("")
      setVideoPre("")


      
    } catch (error) {
      toast.error(error.response.data.message)
      setBtnLoading(false)
      
    }

  }

  const deleteHandler = async(id)=>{
    if(confirm("i mean do you really want to?? ")){
      try {
        const {data} = await axios.delete(`${server}/api/lecture/${id}`,{
          headers:{
          token:localStorage.getItem("token"),
          },
        });
        toast.success(data.message)
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message)
        
      }
    }
  };
   
  const [completed, setCompleted] = useState("")
  const [completedLec, setCompletedlec] = useState("")
  const [lecLength, setLecLength] = useState("")
  const [progress, setProgress] = useState([])


  async function fetchProgress(){ 
    try {
      const {data} = await axios.get(`${server}/api/user/progress?courses=${params.id}`,{
        headers:{
          token: localStorage.getItem("token")
        },
      })
      setCompleted(data.courseProgressPercentage)
      setCompletedlec(data.completedLecture)
      setLecLength(data.allLectures)
      setProgress(data.progress)
      console.log(data.messaage)
    } catch (error) {
      console.log(error)
    }
  }

  const addProgress = async(id)=>{
    try {
      const{data} = await axios.post(`${server}/api/user/progress?course=${params.id}&lectureId=${id}`,{},{
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      console.log(data.messaage)
      fetchProgress();
    } catch (error) {
      console.log(error)
      
    }
  }
  console.log(completedLec)
  console.log(progress);
  useEffect(() =>{
    fetchLectures();
    fetchProgress();
  },[])

  return (
    <>
      {loading?(<Loading/> ): (<>
      <div className='progress'>
        Lecture Completed - {completedLec} out of {lecLength} <br/>
        <progress value={completed} max={100}></progress> {completed}%
      </div>
      <div className='lecture-page'>
        
        <div className="left">
          {
            lecLoading?(<Loading/> ):( <>
            {
              lecture.video ? (<>
              <video
              src={`${server}/${lecture.video}`}
              controls
              controlsList='nodownload noremoteplayback'
              disablePictureInPicture
              disableRemotePlayback
              autoPlay
              onEnded={()=> addProgress(lecture._id)}
              width={"100%"}></video>
              <h1>{lecture.title}</h1>
              <h3>{lecture.description}</h3>
              </>) :( <h1> please select a lecture</h1>
            )}
            </>
          )}
        </div>
        <div className='right'>
          {user && user.role==="admin" &&(<button className='common-btn ' onClick={()=> setForm(!form)}>{show?("close"):("ADD LECTURE")}</button>) }
          {  
            form && ( <div className="lecture-form">
              <h2>Add lecture</h2>
              <form onSubmit={submitHandler}>
                <label htmlFor = "text">TITLE</label>
                < input type="text" value={title} onChange = {(e) => setTitle(e.target.value)}required/>

                <label htmlFor = "text"> Description dede</label>
                < input type="text" value={description} onChange = {(e) => setDescription(e.target.value)}required />

                <input type = "file" placeholder='choose videp ' onChange={changeVideoHandler} required/>

                { videoPre && (
                  <video src={videoPre} alt="" width={300} controls></video>
                )}

                <button disabled={btnLoading} type="submit " className='common-btn'>{btnLoading?("please wait"):("add")}</button>
              </form>
            </div>
          )}
          {
            lecture && lectures.length>0 ? (lectures.map ((e,i) =>(
              <>
              <div onClick={()=>fetchLecture(e._id)}
              key={i}
              className={`lecture-no ${ lecture._id=== e._id && "active"}`}>
                {i+1}.{e.title}
                </div>
                {
                  user && user.role=== "admin" && (
                    <button 
                    className='common-btn' onClick={()=>deleteHandler(e._id)} style={{background: "red"}}> DELETE{e.title}</button>
                  )
                }


                </>
            ))):(<p> No lecture yet</p>
          )}
        </div>
      </div>
      </>)}
    </>
  )
}

export default lecture
