import React from 'react'
import MainLayout from '../components/layout/MainLayout'
import { useNavigate } from 'react-router-dom'

const ResetPasswordPage = () => {

    const navigate = useNavigate()

  return (
    <MainLayout>
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
                    Şifre Yenile
                  </p>

                  <form className="mx-1 mx-md-4">
                  <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0 mx-1">
                            <input
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                              placeholder="Şifrenizi giriniz"
                            //   value={veri.password}
                            //   onChange={(e) => setVeri({...veri, password: e.target.value})}
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
                              placeholder="Şifrenizi tekrar giriniz"
                            //   value={veri.password}
                            //   onChange={(e) => setVeri({...veri, password: e.target.value})}
                            />
                          </div>
                        </div>

                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button
                        type="button"
                        className="btn btn-primary btn-md rounded-pill"
                        // onClick={control}
                      >
                        Onayla
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
  )
}

export default ResetPasswordPage