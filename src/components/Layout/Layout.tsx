import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { key: "people", icon: <UserOutlined />, label: "Персонажи" },
  { key: "films",  icon: <VideoCameraOutlined />, label: "Фильмы" },
];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState(
    location.pathname.replace("/", "") || "people"
  );

  useEffect(() => {
    setCurrent(location.pathname.replace("/", "") || "people");
  }, [location.pathname]);

  return (
    <div className={styles.root}>
      <nav className={styles.nav}>
        <span className={styles.logo}>SW</span>
        <Menu
          mode="horizontal"
          selectedKeys={[current]}
          items={menuItems}
          onClick={({ key }) => navigate(`/${key}`)}
          className={styles.menu}
        />
      </nav>
      <div className={styles.content}>{children}</div>
    </div>
  );
};