import styled from 'styled-components';
import { Layout as AntLayout } from 'antd';

const { Header, Content, Footer: AntFooter } = AntLayout;

export function Page() {
  return (
    <Layout className="layout">
      <Header>
        <Logo>Wikipedia Map</Logo>
      </Header>
      <Inner />
      <Footer style={ { textAlign: 'center' } }>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
}

const Layout = styled(AntLayout)`
  height: 100vh;
`;

const Inner = styled(Content)`
  min-height: 280px;
  padding: 24px;
  background: #fff;
`;

const Logo = styled.div`
  color: #fff;
`;

const Footer = styled(AntFooter)`
  text-align: center;
`;