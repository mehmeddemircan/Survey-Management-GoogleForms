import React from "react";

import { List, Avatar, Image } from "antd";
import { useDispatch } from "react-redux";
import { DeleteUser } from "../../redux/actions/UserActions";

const UserItem = ({ user }) => {
  const dispatch = useDispatch();

  const handleDeleteUser = (id) => {
    dispatch(DeleteUser(id));
  };

  return (
    <List.Item
      actions={[
        <a key="list-loadmore-edit">edit</a>,
        <a key="list-loadmore-more">more</a>,
        <i
          class="fa-sharp fa-solid fa-trash text-danger"
          onClick={() => handleDeleteUser(user._id)}
        ></i>,
      ]}
    >
      <List.Item.Meta
        avatar={
          user.avatar ? (
            <Image className="img-fluid" width={40} src={user.avatar.url} />
          ) : (
            <Avatar
              src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
              size={"large"}
            />
          )
        }
        title={<><a>{user.firstname}</a><a className="ms-2" style={{textDecorationLine:'none'}}>{user.lastname}</a></>}
        description={user.email}
      />
    </List.Item>
  );
};

export default UserItem;
