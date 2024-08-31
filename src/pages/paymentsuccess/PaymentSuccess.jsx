import React from 'react';
import "./PaymentSuccess.css";
import { useParams } from 'react-router-dom';

const PaymentSuccess = ({user}) => {

    const params = useParams()

    
  return (
    <div className='Payment-success-page'>
        {user && <div className='success-message'>
            <h2> Payment Successfull</h2>
            <p> your course subscription is now activated!</p>
            <p> Reference no - {params.id}</p>
            <Link to= {`/${user._id}/dashboard`} className="common-btn" >Go To Dashboard</Link>
          </div>  }
      
    </div>
  )
}

export default PaymentSuccess
