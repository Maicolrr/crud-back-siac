import  { useState,useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"
import {register,reset} from '../../features/auth/authSlice'
import { Spinner } from '../../layouts/Spinner/Spinner'

// UI
import { NavBar } from "../../UI/NavBar/NavBar";
import { ImgLeft } from "../../UI/ImgLeft/ImgLeft";
import { ImgUI } from "../../UI/ImgUI/ImgUI";




// Images
import logo from "../../../Images/logo.png";
import logoLogin from "../../../Images/heroBg.png";
import logoOrder from "../../../Images/Exclude.png"





export default function Register() {
  
    const [formData,setFormData] = useState({
        name: '',
        dni:'',
        email: '',
        password: '',
        passwordAuth: ''
    })
    
    const {name,dni,email,password,passwordAuth} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()
 
     const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )
  


  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

    const onSubmit = (e) =>{
        e.preventDefault()

        if(password!==passwordAuth){
            toast.error('Password dont match')
        }else{
            const userData = {
                name,
                dni,
                email,
                password
            }
            
      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }
    

  return (
    <div className="containerPrincipal">
        <section className='sectionLeft'>
            <ImgLeft style="orderLogo" path={logoOrder} />
            <ImgLeft style="leftContain" path={logoLogin} />
        </section>

      <section className="sectionRight">
        <NavBar style="navBarRegister" />
      
        <section className="form">
          <section className="heading">
              <div className="containerIcon">
                <ImgUI style="imgLogoRegister" routeImg={logo} />
              </div>

              <h1>Registro</h1>
              <p className="txtInfoRegister">Por favor cree una cuenta</p>
            </section>

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input 
                    type="text" 
                    className='form-control'
                    id='name'
                    name='name'
                    value={name}
                    placeholder='Ingrese su nombre'
                    onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input 
                    type="text" 
                    className='form-control'
                    id='dni'
                    name='dni'
                    value={dni}
                    placeholder='Ingrese su identificacion'
                    onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input 
                    type="email" 
                    className='form-control'
                    id='email'
                    name='email'
                    value={email}
                    placeholder='Ingrese su email'
                    onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input 
                    type="password" 
                    className='form-control'
                    id='password'
                    name='password'
                    value={password}
                    placeholder='Ingrese su contraseña'
                    onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input 
                    type="password" 
                    className='form-control'
                    id='passwordAuth'
                    name='passwordAuth'
                    value={passwordAuth}
                    placeholder='Confirma su contraseña'
                    onChange={onChange}
                    />
                </div>
                <div className="form-group">
              <button type="submit" className="btn btn-block">
                Submit
              </button>
            </div>
          </form>
        </section>
      </section>
    </div>
  )
}
