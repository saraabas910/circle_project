import React from 'react';
import { Button, Input } from "@heroui/react";
import { useForm } from 'react-hook-form';
import { useState, useContext } from 'react';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { zodSchema } from '../validations/signinscema';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/contexts/authContext';
import { Link } from 'react-router-dom';

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [errmsg, setErrmsg] = useState("");
  const { setUserToken, setUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      email: "mohamed.youssef@yahoo.com",
      password: "A123456789a!",
    }
  });

  async function singIn(loginData) {
    setIsLoading(true);
    setErrmsg("");
    try {
      const { data } = await axios.post(
        "https://route-posts.routemisr.com/users/signin",
        loginData
      );

      console.log("Full fvvvvvvvvvvvresponse:", data);
      console.log("data.data:", data.data);
      console.log("user:", data.data?.user);

      localStorage.setItem("token", data.data.token);
      setUserToken(data.data.token);
      localStorage.setItem("userData", JSON.stringify(data.data.user));
      setUserData(data.data.user);

      navigate("/");

    } catch (error) {
      console.log("ERROR:", error.response?.data);
      if (error.response) {
        setErrmsg(error.response.data.errors);
      } else {
        setErrmsg(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  function getinput(label, type) {
    return {
      label: label,
      type: type,
      variant: "bordered"
    }
  }

  return (
    <form onSubmit={handleSubmit(singIn)}>
      <div className='grid gap-3 text-center'>
        <div className='grid gap-3 text-center'>
          <h1>welcome</h1>
          <p>sign in to continue your journey</p>
        </div>
        <Input
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          {...register("email")}
          {...getinput("Email", "email")}
        />
        <Input
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          {...register("password")}
          {...getinput("Password", "password")}
        />
        <Button type="submit" color="primary" variant="solid" isLoading={isLoading}>
          Sign in
        </Button>
        <Link to="/signup" className="text-blue-500 hover:underline mt-2 inline-block">
          Create an account?
        </Link>
        <p>{errmsg}</p>
      </div>
    </form>
  );
}