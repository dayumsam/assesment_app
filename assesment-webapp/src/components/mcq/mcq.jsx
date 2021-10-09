import Form from "react-bootstrap/Form";
import ReactMarkdown from 'react-markdown'

export default function Mcq({question}) {
    return(
        <div className="question mcq">
            <p className="question_title"> 
            <ReactMarkdown 
            transformImageUri={uri => uri.startsWith("http") ? uri : `${process.env.REACT_APP_IMAGE_BASE_URL}${uri}`}>
                {question.question["question"]}
            </ReactMarkdown></p>
            <p className="question_description">{question.question["description"]}</p>

            <Form.Group className="answers" controlId="formGroupAnswer">
                {question.answer.map(ans => {
                    return(
                        <Form.Check
                            type="radio"
                            label={ans.answer_option}
                            value={ans.id}
                            name={question.id}
                            key={ans.id}
                        />                   
                    )
                })}
            </Form.Group>
        </div>
    );
} 