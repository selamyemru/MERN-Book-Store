// import { createContext,useEffect,useState } from "react";
// import axios from 'axios'
// const AuthContext=createContext()

// function AuthContextProvider() {
//   const {logedin,setLogedin}=useState(undefined)
//   async function getlogin(){
//     const loginedinRes=await axios.get("http://localhost:4000/logedin")
//     setLogedin(loginedinRes.data)
//   }

//   useEffect(()=>{
//     getlogin()
//   },[])
//   return(
//     <div>
//     <AuthContext.Provider value={{logedin,getlogin}}>
//       {Children}

//     </AuthContext.Provider>
//     </div>
//   )
// }


// export default AuthContext
// export {AuthContextProvider}