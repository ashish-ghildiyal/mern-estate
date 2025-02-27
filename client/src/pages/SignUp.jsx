import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange=(e)=>{
    setFormData({...formData, [e.target.id]:e.target.value})
    console.log(formData)

  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
       setLoading(true)
    const res = await fetch('http://localhost:3000/api/auth/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
   
    const data = await res.json();
    if(data.success === false){
      setError(data.message);
      setLoading(false)
      return;
    }
    setLoading(false)
    setError(null)
    

    }catch (err) {
      setLoading(false)
      setError(err.message)
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h2 className='text-3xl text-center font-semibold my-7'>Sign Up</h2>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" 
         className='border p-3 rounded-lg'
          id='username'
          onChange={handleChange}
        />
        <input type="email" placeholder="Email" 
        className='border p-3 rounded-lg'
        id='email'
        onChange={handleChange}
        />
        <input type="password" placeholder="Password"
        className='border p-3 rounded-lg'
          id='password' 
          onChange={handleChange}
        />
          <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
           {loading ? "Loading..." : "Sign Up"} 
            </button>
        
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={"/signin"}>
        <span className='text-blue-600 hover:underline'>SignIn</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignUp