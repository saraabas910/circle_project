import React from 'react';
import {Button ,Select, SelectItem , Input} from "@heroui/react";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import {zodSchema} from '../validations/signupschema';
import { useNavigate } from 'react-router-dom';



export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [errmsg, setErrmsg] = useState(""); 
  const navigate = useNavigate();




    const {handleSubmit, register, formState: { errors }} = useForm({
      resolver: zodResolver(zodSchema),   
      defaultValues: {
        name: "mohamed youssef",
        username: "mohamedyoussef111",
        email: "mohamed.youssef@yahoo.com",  
        password: "A123456789a!",
       rePassword : "A123456789a!",
       dateOfBirth: "2000-03-03",
       gender: "male"
       
      }

    })



async function singup(registerData){
  setIsLoading(true);
  setErrmsg("");
  try {
    const {data} = await axios.post(
      "https://route-posts.routemisr.com/users/signup", registerData );

    console.log(data);  

         navigate("/signin")


  }


  
  catch (error) {
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

        <form onSubmit={handleSubmit(singup)}>
          <div className='grid gap-3 text-center'>
           <div className='grid gap-3 text-center'> 
            <h1 >join us today</h1>
             <p>create your account </p>
           </div>
          <Input isInvalid={!!errors.name} errorMessage={errors.name?.message} {...register("name")}  {...getinput("Full Name", "text")}/>


          <Input
                  isInvalid={!!errors.username}
                  errorMessage={errors.username?.message}
                  {...register("username")}
                  {...getinput("Username", "text")}
/>


          <Input isInvalid={!!errors.email} errorMessage={errors.email?.message} {...register("email")}  {...getinput("Email", "email")} />


          <Input isInvalid={!!errors.password} errorMessage={errors.password?.message} {...register("password")}  {...getinput("Password", "password")} />
            

          <Input isInvalid={!!errors.rePassword} errorMessage={errors.rePassword?.message} {...register("rePassword")}  {...getinput("Confirm Password", "password")} />

          <Input isInvalid={!!errors.dateOfBirth} errorMessage={errors.dateOfBirth?.message} {...register("dateOfBirth")}  {...getinput("Birthdate", "date")} />


          <Select className="max-w-xs" label="select gender" placeholder="Select gender"  {...register("gender")}>
          <SelectItem key="male">Male</SelectItem>
          <SelectItem key="female">Female</SelectItem>
          </Select>

        <Button type="submit" color="primary" variant="solid" isLoading={isLoading}>Sign up</Button>
        <p>{errmsg}</p>
          </div>
        </form>
      


   
  )
}
