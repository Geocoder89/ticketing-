
import { useState } from "react"
import Router from "next/router"
import useRequest from "../../hooks/use-request"

const signup = () => {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const {doRequest,errors} = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,password
    },

    onSuccess: ()=>{
      return Router.push('/')
    }

  })

  const emailChangeHandler = (event)=>{
    setEmail(event.target.value)
  }

  const passwordChangeHandler = (event)=>{
    setPassword(event.target.value)
  }


  const onSubmitFormHandler = async(event)=>{
    event.preventDefault()
    doRequest()
   
    
    
  }
  return (
    <form onSubmit={onSubmitFormHandler}>
      <h1>sign up</h1>

      <div className="form-group">
        <label>Email Address</label>
        <input value={email} onChange={emailChangeHandler} className="form-control"/>
      </div>


      <div className="form-group">
        <label>Password</label>
        <input value={password} onChange={passwordChangeHandler} type="password" className="form-control"/>
      </div>
     
       {errors}
      <button className="btn btn-primary mt-3">Sign up</button>
    </form>
  )
}

export default signup