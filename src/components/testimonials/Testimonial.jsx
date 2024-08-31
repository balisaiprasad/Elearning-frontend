import React from 'react';
import './test.css';
import './modules/testimonals.module.css';

const styles = {
  testimonials: {
    padding: '80px 0',
    textAlign: 'center',
  },
  h2: {
    fontSize: '32px',
    color: 'rgb(57, 61, 174)',
    marginBottom: '30px',
  },
  testimonialsCards: {
    display: 'flex',
    boxshadow: 'box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1)',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '30px',
  },
  testimonialCard: {
    backgroundColor: 'white',
    boxshadow: 'box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    borderRadius: '10px',
    width: '300px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  studentImage: {
    marginBottom: '10px',
  },
  img: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  message: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '10px',
  },
  info: {
    textAlign: 'center',
  },
  name: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'rgb(57, 61, 174)',
    marginBottom: '5px',
  },
  position: {
    fontSize: '14px',
    color: '#666',
  },
  // Media query simulation (not exact, as inline styles do not support media queries)
  // Apply conditional styles if needed, typically done with JavaScript logic
};

function Testimonial() {
  const testimonialsData = [
    {
      id: 1,
      name: "John Doe",
      position: "Student",
      message: "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image: "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Student",
      message: "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image: "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 3,
      name: "John Doe",
      position: "Student",
      message: "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image: "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
    {
      id: 4,
      name: "Jane Smith",
      position: "Student",
      message: "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image: "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
  ];

  return (
    <section className='testimonials' style={styles.testimonials}>
      <h2 style={styles.h2}>What our students say</h2>
      <div className='testimonials-cards' style={styles.testimonialsCards}>
        {testimonialsData.map((e) => (
          <div className='testimonial-card' key={e.id} style={styles.testimonialCard}>
            <div className='student-image' style={styles.studentImage}>
              <img src={e.image} alt="" style={styles.img} />
            </div>
            <p className='message' style={styles.message}>{e.message}</p>
            <div className='info' style={styles.info}>
              <p className='name' style={styles.name}>{e.name}</p>
              <p className='position' style={styles.position}>{e.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonial;
