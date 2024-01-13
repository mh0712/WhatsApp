import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Avatar,
  Button,
  Typography,
  Divider,
  ConfigProvider,
} from "antd";
import {
  UserOutlined,
  FileOutlined,
  LinkOutlined,
  LockOutlined,
  TeamOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import "./InfoPage.css"; // Import the CSS file

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const menuItems = [
  { key: "1", icon: <UserOutlined />, label: "Overview" },
  { key: "2", icon: <PictureOutlined />, label: "Media" },
  { key: "3", icon: <FileOutlined />, label: "Files" },
  { key: "4", icon: <LinkOutlined />, label: "Links" },
  { key: "5", icon: <TeamOutlined />, label: "Groups" },
];

function InfoPage({ selectedChat }) {
  const [collapsed, setCollapsed] = useState(true);
  const { name } = selectedChat || {};

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth <= 768); // Set to true if the screen width is 768 pixels or less
    };

    // Initial setup
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            lightSiderBg: "#f6f6f6",
          },
          Menu: {
            itemSelectedBg: "rgba(0, 0, 0, 0.1)",
            itemSelectedColor: "#128c7e",
          },
        },
      }}
    >
      <Layout className="layout">
        <Sider
          theme="light"
          className="sider"
          collapsed={collapsed}
          onCollapse={(collapsed) => setCollapsed(collapsed)}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ backgroundColor: "#f6f6f6", minWidth: 0, flex: "auto" }}
            inlineCollapsed={collapsed}
          >
            {menuItems.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Content className="content">
          <div className="avatar_container">
            <Avatar size={64} icon={<UserOutlined />} className="avatar" />
            <Title level={1}>{name}</Title>
            <Text type="secondary">+961 76 492 626</Text>
          </div>
          <Divider />
          <Title level={5}>About</Title>
          <Text type="secondary">Available</Text>
          <div className="button_container">
            <Button type="secondary" danger>
              Block
            </Button>
            <Button type="primary" danger>
              Report contact
            </Button>
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default InfoPage;
