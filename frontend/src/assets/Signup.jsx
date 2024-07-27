import React from 'react';
import { Link, Navigate ,useLocation, useNavigate} from 'react-router-dom';
import Loginn from './Loginn';
import { useForm } from 'react-hook-form';
import axios from "axios"; 
import toast from 'react-hot-toast';
function Signup() {
  const location=useLocation(); 
  const navigate=useNavigate(); 
  const from=location.state?.from.pathname || "/"; 
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }, 
  } = useForm()

  const onSubmit = async(data) => {
    const userInfo={
      fullname:data.fullname,
      email:data.email,
      password:data.password,
    }
    await axios.post("http://localhost:4001/user/signup",userInfo)
     .then((res)=>{
      console.log(res.data)
      if (res.data) {
      
        toast.success('Signup Successfully');
        localStorage.setItem("users",JSON.stringify(res.data.user)); 
        navigate (from,{replace:true}); 
      }
     }).catch((err)=>{
     if (err.response) {
      console.log(err);  
      toast.error("Error:"  + err.response.data.message);
     }
     }); 
  }; 
  return (
    <> 
      <div className='flex h-screen items-center justify-center'>  
        <div  className=" w-[600px]">
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
              <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
            
            <h3 className="font-bold text-lg">Signup</h3>
            <div className='m-3 space-y-2'>
              <span>Name</span>
              <br />
              <input type="text" placeholder='Enter your name' className='w-80 px-3 py-1 border rounded-md outline-none'
              {...register("fullname", { required: true })} 
              />
              {errors.fullname && <span className="text-red-500">This field is required</span>}
            </div>
            <div className='m-3 space-y-2'>
              <span>Email</span>
              <br />
              <input type="text" placeholder='Enter your email' className='w-80 px-3 py-1 border rounded-md outline-none' 
              {...register("email", { required: true })}
              />
              {errors.email && <span className="text-red-500">This field is required</span>}
            </div>
            <div className='m-3 space-y-2'>
              <span>Password</span>
              <br />
              <input type="text" placeholder='Enter your password' className='w-80 px-3 py-1 border rounded-md outline-none' 
              {...register("password", { required: true })}
              />
              {errors.password && <span className="text-red-500">This field is required</span>}
            </div>
            <div className='flex justify-around mt-4'>
              <button className='bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200'>Signup</button>
              <p>
                Have an account? {" "}
              <button 
                  
                  className="underline text-blue-500 cursor-pointer"
                  onClick={ ()=>
                    document.getElementById("my_modal_3").showModal()
                  }
                  >
                  Login
                  </button> {" "}
                  <Loginn/>
              </p>
            </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;