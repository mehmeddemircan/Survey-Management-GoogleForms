import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import MetaTitle from "../meta/MetaTitle";
import { useDispatch, useSelector } from "react-redux";
import { ForgotPassword } from "../redux/actions/AuthActions";
import { message } from "antd";
import { FORGOT_PASSSWORD_RESET } from "../redux/constants/AuthConstants";

const ForgotPasswordPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const forgotResetPassword = useSelector((state) => state.forgotResetPassword)
    // şifre unuttum işlemi , mail atma 
    const handleForgotPassword = () => {
        dispatch(ForgotPassword({email}))
    }
    // başarılı şekilde olursa , message verme , email inputunu temizleme 
    useEffect(() => {
        if (forgotResetPassword.forgotSuccess) {
          message.success(forgotResetPassword.message)
          setEmail("")
          dispatch({type : FORGOT_PASSSWORD_RESET})
        }
        
    }, [forgotResetPassword.forgotSuccess])




  return (
    <MainLayout>
            <MetaTitle title="Akınsoft Şifremi Unuttum" name="şifremiunuttum" content="Akınsoft şifremi unuttum" />
         <div className="container h-100 my-4">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-11">
          <div className="card text-black" style={{ borderRadius: "25px" }}>
            <div className="card-body p-md-4">
              <div className="d-flex flex justify-content-between">
                <button className="btn btn-light" onClick={() => navigate('/login',{replace : true})} ><i class="fa-solid fa-angle-left mx-2"></i>Geri</button>
                <h4 className="my-0">AkınSoft Anket Yönetim</h4>
                <div></div>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    Şifremi Unuttum
                  </p>

                  <form className="mx-1 mx-md-4">
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
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button
                        type="button"
                        className="btn btn-primary btn-md rounded-pill"
                        onClick={handleForgotPassword}
                      >
                        Mail Gonder
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

export default ForgotPasswordPage;
