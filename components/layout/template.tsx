import React from "react";
import { Layout, Card, Button } from "antd";

export const Template = props => (
  <>
    <Layout style={{ height: "100vh" }}>
      <Layout.Header style={{ backgroundColor: "white" }}>Header</Layout.Header>
      <Layout.Content>
        <Layout style={{ height: "100%" }}>
          {/* <Layout.Sider style={{ backgroundColor: "white" }}>hi</Layout.Sider> */}
          <Layout.Content>{props.children}</Layout.Content>
        </Layout>
      </Layout.Content>
      <Layout.Footer style={{ backgroundColor: "white" }}>Footer</Layout.Footer>
    </Layout>
  </>
);
