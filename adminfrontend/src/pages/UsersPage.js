import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { AllUser } from "../redux/actions/UserActions";
import ListItems from "../components/list/UserList";
import UserItem from "../components/listItem.js/UserItem";
import { List, message } from "antd";
import { Avatar } from "antd";
import UserList from "../components/list/UserList";
import InfoBreadcrumb from "../components/breadcrumb/InfoBreadcrumb";
import InfoBadge from "../components/badge/InfoBadge";
import CustomPagination from "../components/pagination/CustomPagination";
import { DELETE_USER_RESET } from "../redux/constants/UserConstants";
import MetaTitle from "../meta/MetaTitle";

const UsersPage = () => {
  const dispatch = useDispatch();
  const getAllUser = useSelector((state) => state.user.getAllUser);
  const deleteUpdateUser = useSelector((state) => state.user.deleteUpdateUser);

  const [limit, setLimit] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(AllUser(limit, currentPage));
    if (deleteUpdateUser.isDeleted) {
      message.success(deleteUpdateUser.message);
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, limit, currentPage, deleteUpdateUser.isDeleted]);

  return (
    <MainLayout>
        <MetaTitle title="Akınsoft Anket Kullanicilar" name="kullanicilar" content="kullanicilar" />
      <h4 className="mt-3">Kullanicilar</h4>
      <InfoBreadcrumb
   
        seperator=">"
        items={[
          {
            title: (
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/";
                }}
              >
                Anasayfa
              </a>
            ),
          },
          {
            title: "Kullanıcılar",
          },
          {
            title: (
              <InfoBadge count={getAllUser.totalUsers}>
                <a className="me-2">Length</a>
              </InfoBadge>
            ),
          },
        ]}
      />
      <UserList />
      <CustomPagination
        onChange={(page) => setCurrentPage(page)}
        current={currentPage}
        defaultCurrent={1}
        pageSize={limit}
        total={getAllUser.totalUsers}
      />
    </MainLayout>
  );
};

export default UsersPage;
