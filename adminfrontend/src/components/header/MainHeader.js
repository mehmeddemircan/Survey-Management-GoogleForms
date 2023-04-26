import React from 'react'

const MainHeader = () => {
  return (
    <nav
        class="navbar navbar-expand-sm navbar-light"
        style={{
          border: "1px solid rgb(221,221,221)",
        }}
      >
        <div class="container  d-flex  justify-content-between py-2">
          <div className="d-inline-flex align-items-center">
            <a class="navbar-brand" href="/">
              AkınSoft
            </a>

            {/* <HeaderMenuDropDown /> */}
         
            <a
              className="text-dark mt-1 ms-2"
              style={{
                textDecorationLine: "none",
              }}
              href="/markalar"
            >
              Markalar
            </a>
              {/* <FormMenuDropDown /> */}
          </div>
          <div>
            <button
              className="btn btn-light rounded-pill d-inline-flex align-items-center"
              style={{ border: "1px solid rgb(221,221,221)" }}
            >
              <div className="mx-2 my-2">
                Herhangi bir yer{" "}
                <a className="ms-2" href="#">
                  {" "}
                  |
                </a>
              </div>
              <div className="mx-2 my-2">
                Herhangi bir yer{" "}
                <a className="ms-2" href="#">
                  {" "}
                </a>
              </div>
            </button>
          </div>
          <div>
            {/* globe */}
            <button
              className="btn btn-light rounded-pill"
            //   onClick={handleShowLanguageModal}
            >
              <i class="fa-solid fa-globe"></i>
            </button>
            <button
              className="btn btn-light rounded-pill d-inline-flex align-items-center "
              style={{ border: "1px solid rgb(221,221,221)" }}
            //   onClick={handleShowLoginModal}
            >
              <i class="fa-solid fa-bars mx-2 mt-1"></i>
     
              <a>Giriş Yap</a>
            </button>
            {/* <LanguageModal
              showLanguageModal={showLanguageModal}
              handleCancelLanguageModal={handleCancelLanguageModal}
            /> */}

            {/* {auth.authenticate ? <LoggedInSegment /> : <NotLoggedInSegment />} */}
          </div>
        </div>
      </nav>
  )
}

export default MainHeader