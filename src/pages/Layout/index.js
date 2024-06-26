import { Layout as AntdLayout, Menu, Popconfirm } from "antd";
import {
  HomeOutlined,
  ProductOutlined,
  FileAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { fetchUserInfo } from "@/store/modules/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const { Header, Sider } = AntdLayout;

const items = [
  {
    label: "Home",
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "My Articles",
    key: "/article",
    icon: <ProductOutlined />,
  },
  {
    label: "Post a New Article",
    key: "/publish",
    icon: <FileAddOutlined />,
  },
];

const Layout = () => {
  // 反向高亮
  // 拿到当前路由路径
  const location = useLocation();
  const selectedKey = location.pathname;

  // 触发个人用户信息action

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const handleMenuClick = (route) => {
    const path = route.key;
    navigate(path);
  };

  const username = useSelector((state) => state.user.userInfo.name);

  return (
    <AntdLayout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{username}</span>
          <span className="user-logout">
            <Popconfirm
              title="Confirm to exit?"
              okText="Exit"
              cancelText="Cancel"
            >
              <LogoutOutlined /> Exit
            </Popconfirm>
          </span>
        </div>
      </Header>
      <AntdLayout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={["1"]}
            selectedKeys={selectedKey}
            items={items}
            style={{ height: "100%", borderRight: 0 }}
            onClick={handleMenuClick}
          ></Menu>
        </Sider>
        <AntdLayout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </AntdLayout>
      </AntdLayout>
    </AntdLayout>
  );
};

export default Layout;
