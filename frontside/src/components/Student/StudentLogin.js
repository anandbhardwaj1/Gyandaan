import React,{useState,useContext,useEffect} from "react";
import {useNavigate,Navigate} from "react-router-dom"
import {useUserContext} from "../../context/userContext"
 function StudentLogin()
   {    const { user,setUser,loading,setloading } = useUserContext();
    
    const navigate=useNavigate();
    const initialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [Error,setError]=useState("")
    const [isSubmit, setIsSubmit] = useState(false);
    
   
    const handleChange = (e) => {
     
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    
    };
   
    async function fetchMyAPI2() {
        let response = await  fetch("http://localhost:8800/studentprofile",{
            credentials: 'include'
        });
        if(response.ok)
        {  response = await response.json()
           console.log(response);
            setUser(response);
           
        }
        else
        {setUser({});
          
      }
    }
    
   useEffect(()=>{
       
        async function fetchMyAPI() {
            console.log("ff");
            let response = await  fetch("http://localhost:8800/login", {
                method: 'POST',
                body: JSON.stringify(formValues),
                
                credentials: 'include', 
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if(response.ok)
            { 

               console.log("login");
              
            await fetchMyAPI2();
              setIsSubmit(false);
              setloading(true);
                navigate("/StudentProfile");
            }
            else
            { console.log("error");
              setIsSubmit(false);
                setError("Invalid Credentials");
            }
            response = await response.json()
            console.log(response);
            
          }
           if(isSubmit)
          { console.log("submit");
              fetchMyAPI()
          }

       
   },[isSubmit]);
   
 
    const  handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);
       setIsSubmit(true);
   
      };
   return (
        <form className="form-group">

                <h3 className="form-group">Log in </h3>
                {{Error} ? (
                <div style={{color:"red"}}>
                {Error}
                </div>):null
                }
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email" value={formValues.email} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="password" value={formValues.password} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button onClick={handleSubmit} type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
               
            </form>
           
        );
    }
export default StudentLogin;
