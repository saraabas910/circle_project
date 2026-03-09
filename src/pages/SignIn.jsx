import React from 'react';
import {Button  , Input} from "@heroui/react";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import {zodSchema} from '../validations/signinscema';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../components/contexts/authContext';



export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [errmsg, setErrmsg] = useState("");  
  const {setUserToken} = useContext(AuthContext);




    const {handleSubmit, register, formState: { errors }} = useForm({
      resolver: zodResolver(zodSchema),   
      defaultValues: {
        email: "mohamed.youssef@yahoo.com",  
        password: "A123456789a!",
      
      }

    })



async function singIn(loginData){
  setIsLoading(true);
  setErrmsg("");
  try {
    const {data} = await axios.post(
      "https://route-posts.routemisr.com/users/signin", loginData );

    console.log(data);  
    localStorage.token = data.data.token;  
    setUserToken(data.data.token);
    
     {/*****************save token henaa*********** */}  
      


  }catch (error) {
    if (error.response) {
     setErrmsg(error.response.data.errors);
    } else {
      setErrmsg(error.message);
    }
  }

  finally {
    setIsLoading(false);
  }
}

    function getinput( label, type){
      return{
        label: label,
        type: type,
        variant: "bordered"
      }
    }


  return (

        <form onSubmit={handleSubmit(singIn)}>
          <div className='grid gap-3 text-center'>
           <div className='grid gap-3 text-center'> 
            <h1 >welcome</h1>
             <p>sign in to continue your journey</p>
           </div>




          <Input isInvalid={!!errors.email} errorMessage={errors.email?.message} {...register("email")}  {...getinput("Email", "email")} />

          <Input isInvalid={!!errors.password} errorMessage={errors.password?.message} {...register("password")}  {...getinput("Password", "password")} />
            
         <Button type="submit" color="primary" variant="solid" isLoading={isLoading}>Sign in</Button>
        <p>{errmsg}</p>
          </div>
        </form>
      


   
  )
}
