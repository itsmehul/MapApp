// import React from "react";
import "./styles.css"
import { Button, Layout, Menu, Switch } from "antd"
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"
import React, { useState } from "react"
import Map from "./components/Map"
import styled from "styled-components"
import Form from "./components/Form"
import { FaRegMap } from "react-icons/fa"
import { FiMapPin, FiShare2 } from "react-icons/fi"
import RegionInfo from "./components/RegionInfo"
const { Sider, Content } = Layout

const Header = styled.div`
  height: 70px;
  padding: 0;
  position: absolute;
  z-index: 999;
  width: 100%;
  display: flex;
  align-items: center;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.85), #00000008);
  .anticon-menu-fold,
  .anticon-menu-unfold {
    background: ${({ theme }) => (theme === "dark" ? "#001529" : "white")};
    width: fit-content;
    padding: 1em;
    color: ${({ theme }) => (theme === "dark" ? "#fff" : "#001529")};
    border-radius: 0 15px 15px 0;
  }
`

const Footer = styled.div`
  height: 70px;
  bottom: 0;
  padding: 0;
  position: absolute;
  z-index: 999;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.85), #00000008);
  p {
    padding: 0 0.7em;
    border-radius: 10px;
    background: #1890ff;
    color: white;
  }
`

const HeaderContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 150px;
  width: 100%;
  justify-content: center;
  padding: 0 1em;
  align-items: center;
`

export default () => {
  const [collapsed, setCollapsed] = useState(false)
  const [theme, setTheme] = useState("dark")

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme={theme}>
        <img
          src="/assets/osmlogo.jpg"
          id="logo"
          style={{ width: collapsed ? "20px" : "150px" }}
        />
        <Menu mode="inline" defaultSelectedKeys={["1"]} theme={theme}>
          <Menu.Item key="1" icon={<FaRegMap role="img" className="anticon" />}>
            Map
          </Menu.Item>
          <Menu.Item key="2" icon={<FiMapPin role="img" className="anticon" />}>
            Saved locations
          </Menu.Item>
          <Menu.Item key="3" icon={<FiShare2 role="img" className="anticon" />}>
            Shared locations
          </Menu.Item>
        </Menu>
        <div>
          <h4 style={{ color: "white", textAlign: "center" }}>Toggle Theme</h4>
          <Switch
            defaultChecked
            onChange={(e) => {
              setTheme(e === true ? "dark" : "light")
            }}
            style={{ display: "block", margin: "auto" }}
          />
        </div>
      </Sider>
      <Layout className="site-layout" style={{ position: "relative" }}>
        <Header theme={theme}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          <HeaderContent>
            <Form />
            <div className="auth-group">
              <Button type="primary">Login</Button>
              <Button type="secondary">Register</Button>
            </div>
          </HeaderContent>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            height: "calc(100vh - 140px)",
          }}
        >
          <Map />
          <RegionInfo />
        </Content>
        <Footer>
          <p>Made with ❤ by Mehul</p>
        </Footer>
      </Layout>
    </Layout>
  )
}
