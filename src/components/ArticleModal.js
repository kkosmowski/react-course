import { Button, Modal } from 'antd';
import { useMapStore } from '../pages/map/store';
import styled from 'styled-components';

export default function ArticleModal() {
  const [{ modalVisible, currentArticle }, { setModalVisible, clearCurrentArticle }] = useMapStore();

  const handleCancel = () => {
    setModalVisible(false);
    clearCurrentArticle();
  };

  return (
    <StyledModal
      visible={ modalVisible }
      onCancel={ handleCancel }
      footer={ null }
      width="80vw"
    >
      <FavoriteButton type="primary">Add to favorite</FavoriteButton>
      <StyledIframe
        title={ currentArticle?.title }
        frameBorder='0'
        src={ currentArticle?.url.replace('wikipedia.org', 'm.wikipedia.org') }
      />
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  .ant-modal-body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 80vh;
  }
`;

const FavoriteButton = styled(Button)`
  margin-bottom: 16px;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  flex: 1;
`;