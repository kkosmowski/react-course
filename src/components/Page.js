import styled from 'styled-components';
import { Layout as AntLayout } from 'antd';
import { GoogleMap } from './GoogleMap';

const { Header, Content, Footer: AntFooter } = AntLayout;

export function Page() {
  return (
    <Layout className="layout">
      <Header>
        <Logo>Wikipedia Map</Logo>
      </Header>
      <Inner>
        <GoogleMap />
      </Inner>
    </Layout>
  );
}


const Layout = styled(AntLayout)`
  height: 100vh;
`;

const Inner = styled(Content)`
  min-height: 280px;
  background: #fff;
`;

const Logo = styled.div`
  color: #fff;
`;

const Footer = styled(AntFooter)`
  text-align: center;
`;