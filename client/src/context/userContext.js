import React,{useState,createContext,useContext,useEffect} from "react"

export const userContext = createContext({
    user: null,
    loading:null,
    logIn: () => {}
   // logOut: () => {},
  });
  
  const USER = { name: "", email:"",phone:"",age:"",loading:"",bio:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur" };
  const Loading=true;
  export function UserContextProvider({ children }) {


    const [user, setUser] = useState(USER);
    const [socket,setSocket]=useState(null);
    const [loading,setloading]=useState(Loading);

   
     async function logOut()
    {
        let response =await fetch("http://localhost:8800/logout",{
          method:"post",
          credentials:"include"
        });
        if(response.ok)
        {
          setUser(USER);
          setloading(false);
        }
        else
        {
          setloading(false);
        }
    }

    useEffect(()=>{    
      async function fetchMyAPI() {
          let response = await  fetch("http://localhost:8800/studentprofile",{
              credentials: 'include'
          });
          if(response.ok)
          {  response = await response.json()
            
              setUser(response);
             
              setloading(false);
          }
          else
          {setUser(USER);
           
           setloading(false);
        }
         
        }  
        fetchMyAPI()
  },[loading]);
   
    return (
      <userContext.Provider value={{ user,setUser,loading,logOut,setloading,socket,setSocket }}>
        {children}
      </userContext.Provider>
    );
  }
  
  export function useUserContext() {
    const { user, setUser,loading ,setloading,logOut,socket,setSocket} = useContext(userContext);
  
    return { user,setUser,loading,setloading,logOut,socket,setSocket};
  }