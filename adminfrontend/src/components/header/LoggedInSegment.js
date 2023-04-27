import React, { Fragment } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/AuthActions';
import { useNavigate } from 'react-router-dom';
import { Button, Popover } from 'antd';
const LoggedInSegment = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const LogoutHandler = () => {
        dispatch(logout())
        navigate('/login', {replace : true})
    }
    const auth = useSelector((state) => state.auth)
  return (
    <Fragment>
        
        <Popover content={(
             <ul class="list-group">
               <li class="list-group-item  border-0"><div className='d-inline-flex align-items-center'><i class="fa-solid fa-user me-2"></i><a>Profil</a> </div></li>
               <li class="list-group-item border-0"><div className='d-inline-flex align-items-center'><i class="fa-solid fa-heart me-2"></i><a>Favori Anketler</a> </div></li>
               <hr />
               <li class="list-group-item border-0" ><div className='d-inline-flex align-items-center'><i class="fa-solid fa-right-from-bracket me-2"></i><a>Çıkış Yap</a> </div></li>
             </ul>
  )} title={<a>{auth.user.firstname} {auth.user.lastname}</a>}>
   

           <button
              className="btn btn-light rounded-pill d-inline-flex align-items-center "
              style={{ border: "1px solid rgb(221,221,221)" }}
            >
              <i class="fa-solid fa-bars mx-2 mt-1"></i>
               <img
                style={{ width: "25px" }}
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                class="img-fluid rounded-circle fs-4"
                alt="Avatar"
              /> 
          
            </button>
            </Popover>
    
    </Fragment>
  )
}

export default LoggedInSegment