import React,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "./Student.css"

function StudentSignup ()
    {
     const initialValues = { name:"", email: "", password: "",confirmpassword:"",age:"",phone:""   };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const [Error,setError]=useState("");
    const navigate=useNavigate();
    
   
    useEffect(()=>{
      if(isSubmit&&Object.keys(formErrors).length === 0)
      {
        console.log(formValues);
        fetch("http://localhost:8800/register", {
        method: 'POST',
        body: JSON.stringify(formValues),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then((res) => {
      if(res.ok)
      {
          navigate('/StudentLogin');
      }
      else
      { 
        if(res.status===401)
        setError("Email Already Registered!")
        else if(res.status===422)
        setError("All fields are required!");
        else
        setError("Try Again");
      }
      return res.json()
  })
    .then(data => console.log(data)); 

     setFormValues(initialValues);
     setError("");
      }
    },[formErrors]);
  
   
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };
    


    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formValues);
     
      setFormErrors(validate(formValues));
      setIsSubmit(true);
      
    };
  
  
    const validate = (values) => {
      const errors = {};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!values.name) {
        errors.name = "Name is required!";
        setError(errors.name);
      }
      if (!values.email) {
        errors.email = "Email is required!";
        setError(errors.email)
      } else if (!regex.test(values.email)) {
        errors.email = "This is not a valid email format!";
        setError(errors.email)
      }
      if (!values.password) {
        errors.password = "Password is required";
        setError(errors.password)
      }else if (values.password.length > 10) {
        errors.password = "Password cannot exceed more than 10 characters";
        setError(errors.password)
      }
      else if(values.password!==values.confirmpassword)
     { errors.confirmpassword="Password must be same"
     setError(errors.confirmpassword)
    }
    else if(!values.age) {
        errors.age = "Age is required";
        setError(errors.age)
    }
    else if(values.age.length>2) {
        errors.age = "Age must be valid!";
        setError(errors.age)
    }
      return errors;
    };
  

        return (
            <form>
                <h3>Register</h3>
                {{Error} ? (
                <div style={{color:"red"}}>
                {Error}
                </div>):null
                }
                <div className="form-group">
                    
                    <input type="text" className="form-control" placeholder="Student Name" name="name" value={formValues.name}
                      onChange={handleChange} />
                </div>

                <div className="form-group">
                   
                    <input type="email" className="form-control" placeholder="Enter email"  name="email" value={formValues.email}
                    onChange={handleChange} />
                </div>
             
                <div className="form-group">
                    
                    <input type="age" className="form-control" placeholder="Enter Your Age"  name="age" value={formValues.age}
                    onChange={handleChange} />
                </div>     
                <div className="form-group">
                    
                    <input type="phone" className="form-control" placeholder="Enter Your Phone"  name="phone" value={formValues.phone}
                    onChange={handleChange} />
                </div>     
                <div className="form-group">
                    
                    <input type="password" className="form-control" placeholder="Enter password" name="password"  value={formValues.password}
                    onChange={handleChange} />
                </div>

                  <div className="form-group">
                    
                    <input type="text" className="form-control" placeholder="Confirm Password" name="confirmpassword"  value={formValues.confirmpassword}
                    onChange={handleChange}/>
                   </div>

                <button type="submit" onClick={handleSubmit} className="btn btn-dark btn-lg btn-block">Register</button>
                <p className="forgot-password text-right">
                    Already registered? <a href="/StudentLogin">log in</a>
                </p>
            </form>
        );
        }

export default StudentSignup;