import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { Login ,register as _register} from "../redux/actions/AuthActions";
import { Navigate, useNavigate } from "react-router-dom";


const LoginPage = () => {
  const [register, setRegister] = useState(false);

  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleToggleAuthButton = () => {
    setRegister((prev) => !prev);
  };

  const auth = useSelector((state) => state.auth)

  const navigate = useNavigate();

  const dispatch = useDispatch()

  const userSignUp = () => {
    const user = {firstname , lastname,email,password}

    dispatch(_register(user))
    
  }

  const userLogin = (e) => {
    e.preventDefault()

    if (register) {
        userSignUp()
    }else{
        dispatch(Login({email,password}))
    }
  } 

  useEffect(() => {
    if (register) {
        setFirstname("")
        setLastname("")
        setEmail("")
        setPassword("")
    }
  }, [register])

  useEffect(() => {
    if (auth.authenticate) {
      navigate('/', { replace: true });
    }
  }, [auth.authenticate, navigate]);
  return (
    <MainLayout>
      <div className="container h-100 my-4">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-4">
                <div className="d-flex flex justify-content-between">
                  <button
                    className="btn btn-dark rounded-pill"
                    onClick={handleToggleAuthButton}
                  >
                    {register ? "Giriş Yap" : "Kayıt Ol"}
                  </button>
                  <h4 className="my-0">AkınSoft Anket Yönetim {auth.authenticate ? "true" : "false"}</h4>
                  <div></div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      {register ? "Üyelik Oluştur" : "Üye Girişi"}
                    </p>

                    <form className="mx-1 mx-md-4">
                      {register && (
                        <>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0 mx-1">
                              <input
                                type="text"
                                id="form3Example1c"
                                className="form-control"
                                placeholder="Adınızı giriniz"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                //   value={data.name}
                                //   onChange={(e) => setData({...data, name: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0 mx-1">
                              <input
                                type="text"
                                id="form3Example1c"
                                className="form-control"
                                placeholder="Soyadınızı giriniz"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                // value={data.name}
                                // onChange={(e) => setData({...data, name: e.target.value})}
                              />
                            </div>
                          </div>
                        </>
                      )}
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0 mx-1">
                          <input
                            type="email"
                            id="form3Example3c"
                            className="form-control"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            //   value={veri.email}
                            //   onChange={(e) => setVeri({...veri, email: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0 mx-1">
                          <input
                            type="password"
                            id="form3Example4c"
                            className="form-control"
                            placeholder="Şifrenizi giriniz"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            //   value={veri.password}
                            //   onChange={(e) => setVeri({...veri, password: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-end mb-5">
                        <a href="/forgot-password">Şifremi unuttum!</a>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg"
                          onClick={userLogin}
                        >
                          {register ? "Hesap Oluştur" : "Giriş Yap"}
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LoginPage;
