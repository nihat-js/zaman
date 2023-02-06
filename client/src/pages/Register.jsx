import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom'
import styled from "styled-components";


export default function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  return (
    <RegisterPageDiv className="register-page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="brand">
          <img src="" alt="" />
          <h2> Zaman </h2>
        </div>
        <div className="username group">
          <input autoFocus defaultValue="" {...register("username", { required: true, minLength: 3 })} placeholder="username" />
          {errors.username && <span>This field is required</span>}
        </div>

        <div className="email group">
          <input autoFocus defaultValue="" {...register("email", { required: true, })} placeholder="Email address"  />
          {errors.email && <span>This field is required</span>}
        </div>

        <div className="password group">
          <input defaultValue="" {...register("password", { required: true, minLength: 6 })} placeholder="Password" />
          {errors.password && <span>This field is required</span>}
        </div>

        <div className="cpassword group">
          <input defaultValue="" {...register("cpassword", { required: true, minLength: 6 })} placeholder="Confirm Password" />
          {errors.cpassword && <span>This field is required</span>}
        </div>

        <button type="submit" > Create user  </button>
        <span> Already have an account ?  <Link to='/login'> Login </Link> </span>
      </form>
    </RegisterPageDiv>
  )
}
const RegisterPageDiv = styled.div`
min-height : 100vh;
background-color: #00000019;
color: white;
display:flex;
justify-content:center;
align-items:center;
form {
  max-width:800px;
  input {
    border-radius: 5px;
    border : 1px solid #ededed;
    font-size : 18px;
    padding : 15px 20px;
  }
  .group{
    margin-bottom : 8px;
  }
}
`;
