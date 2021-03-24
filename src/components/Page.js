import styled from 'styled-components';
import { Layout as AntLayout } from 'antd';
import { GoogleMap } from './GoogleMap';
import { Header } from './Header';

const { Content } = AntLayout;

export function Page() {
  return (
    <Layout className="layout">
      <Header />
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