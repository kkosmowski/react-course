import { Modal } from 'antd';
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
      <iframe
        title={ currentArticle?.title }
        width='100%'
        height='100%'
        frameBorder='0'
        src={ currentArticle?.url.replace('wikipedia.org', 'm.wikipedia.org') }
      />
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  .ant-modal-body {
    height: 80vh;
  }

  .ant-modal-close {
    top: 24px;
    right: 40px;
  }
`;