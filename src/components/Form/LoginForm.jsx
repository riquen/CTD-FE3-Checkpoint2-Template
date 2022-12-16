import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useTheme } from "../../hooks/useTheme";
import styles from "./Form.module.css";

const LoginForm = () => {
  const { theme } = useTheme()
  const [invalidLogin, setInvalidLogin] = useState(false)
  const [invalidPassword, setInvalidPassword] = useState(false)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const { response, error, fetchData } = useAxios('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const { loginInput, passwordInput } = e.target.elements
    const data = {
      login: loginInput.value,
      password: passwordInput.value,
    }

    if (data.login.length < 6) {
      setInvalidLogin(true)
    } else {
      setInvalidLogin(false)
      setLogin(data.login)
    }

    if (data.password.length < 6) {
      setInvalidPassword(true)
    } else {
      setInvalidPassword(false)
      setPassword(data.password)
    }

    fetchData({
      method: 'post',
      url: '/auth',
      headers: {
        accept: '*/*',
        
      },
      data: {
        username: login,
        password: password,
      },
    })

    return response

    //lembre-se que essa rota vai retornar um Bearer Token e o mesmo deve ser salvo
    //no localstorage para ser usado em chamadas futuras
    //Com tudo ocorrendo corretamente, o usuário deve ser redirecionado a página principal,com react-router
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro
  };

  const handleChangeLogin = (e) => {
    setLogin(e.target.value)
    setInvalidLogin(false)
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
    setInvalidPassword(false)
  }

  const [token, setToken] = useLocalStorage('', 'token')

  useEffect(() => {
    if (response.token===undefined){
      if (error!==''){
      alert('Deu erro')
    }
    } else {
      setToken(response.token)
      navigate('/')
    }
  }, [response, error])

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center card container ${styles.card} ${theme === 'dark' && styles.cardDark}`}
      >
        <div className={`card-body ${styles.CardBody}`}>
          <form onSubmit={handleSubmit}>
            <input
              id="loginInput"
              className={`form-control ${styles.inputSpacing} ${invalidLogin ? styles.invalid : ''}`}
              placeholder="Login"
              name="login"
              onChange={handleChangeLogin}
              value={login}
            />
            {invalidLogin &&
              <div>
                <span className={invalidLogin ? styles.invalidSpan : ''}>
                  O campo "Login" deve ter no mínimo 6 caracteres.
                </span>
              </div> 
            }
            <input
              id="passwordInput"
              className={`form-control ${styles.inputSpacing} ${invalidPassword ? styles.invalid : ''}`}
              placeholder="Password"
              name="password"
              type="password"
              onChange={handleChangePassword}
              value={password}
            />
            {invalidPassword && 
              <div>
                <span className={invalidPassword ? styles.invalidSpan : ''}>
                  O campo "Password" deve ter no mínimo 6 caracteres.
                </span>
              </div>
            }
            <button className="btn btn-primary" type="submit" disabled={invalidLogin || invalidPassword}>
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
