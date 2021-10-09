import React, { useState, useEffect } from "react";
import Mcq from "../../components/mcq/mcq"

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import axios from 'axios';

export default function Test() {

    let [assessment, setAssessment] = useState([]);
    let [questions, setQuestions] = useState([]);

    let [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
      axios.get('http://localhost:1337/submissions/count', {
        headers: {
            Authorization: localStorage.getItem('token')},
        }).then(response => {
            if(response.data > 0){
              setIsSubmitted(true);
            }
            axios.get('http://localhost:1337/assessments', {
              headers: {
                  Authorization: localStorage.getItem('token')},
              }).then(res => {
                setAssessment(res.data[0])
                setQuestions(Object.values(res.data[0].questions))
              })
        });
    }, []);

    const handleSubmit = (e) => {
      e.preventDefault()
      const form = e.currentTarget;
      const data = new FormData(form);

      const value = Object.fromEntries(data.entries());
      value["test_id"] = assessment.id

      axios.post(
        'http://localhost:1337/submissions',
        value,
        {
          headers: {Authorization: localStorage.getItem('token')},
        }
      ).then(response => {
        if(response.status === 200){
          setIsSubmitted(true)
        }else{
          console.log(response);
        }
      });
    };
  

    return (
      <div>
        <h1 className="bold">{assessment.title}</h1>

        {
          isSubmitted ?  
          <p>Great! we have received your answers</p> : 

          <>
              <p className="description-text">{assessment.description}</p>

              <Form onSubmit={handleSubmit}>
                {questions.map(question => {
                  return(
                    <Mcq key={question.id} question={question}/>
                  )
                })}

                <Button variant="primary" type="submit">
                    Submit
                </Button>
              </Form>
          </>
        }

      </div>
    );
}