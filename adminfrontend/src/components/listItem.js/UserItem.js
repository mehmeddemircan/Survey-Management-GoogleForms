import React from "react";

import { List, Avatar, Image } from "antd";
import { useDispatch } from "react-redux";
import { DeleteUser } from "../../redux/actions/UserActions";

const UserItem = ({ user }) => {

  const dispatch = useDispatch()

  const handleDeleteUser = (id) => {
    dispatch(DeleteUser(id))
  }


  return (
    <List.Item
      actions={[
        <a key="list-loadmore-edit">edit</a>,
        <a key="list-loadmore-more">more</a>,
        <i class="fa-sharp fa-solid fa-trash text-danger" onClick={() => handleDeleteUser(user._id)} ></i>,
      ]}
    >
      <List.Item.Meta
        avatar={
          user.avatar ? 
          <Image
          className="img-fluid"
          width={40}
          src={
            user.avatar
              ? user.avatar.url
              : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
          }
        /> : 
          <Avatar src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg" size={"large"} />
         
        }
        title={<a>{user.firstname}</a>}
        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
      />
    </List.Item>
  );
};

export default UserItem;