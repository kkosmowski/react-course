import { createStore, createHook, defaults } from 'react-sweet-state';
import produce from 'immer';

defaults.devtools = true;
defaults.mutator = (currentState, producer) => produce(currentState, producer)

const Store = createStore({
  initialState: {
    markers: [],
    googleApiLoaded: false,
    modalVisible: false,
    currentArticle: null,
  },
  actions: {
    addMarkers: markers => ({ setState, getState }) => {
      const existingMarkers = getState().markers.map(marker => marker.pageId);
      const newMarkers = markers.filter(marker => !existingMarkers.includes(marker.pageId));

      setState(draft => {
        draft.markers.push(...newMarkers);
      })
    },
    setGoogleApiLoaded: value => ({ setState, getState }) => {
      setState(draft => {
        draft.googleApiLoaded = value;
      })
    },
    setModalVisible: value => ({ setState, getState }) => {
      setState(draft => {
        draft.modalVisible = value;
      })
    },
    setCurrentArticle: value => ({ setState, getState }) => {
      setState(draft => {
        draft.currentArticle = {
          url: value.url,
          title: value.title,
        };
      })
    },
    clearCurrentArticle: () => ({ setState, getState }) => {
      setState(draft => {
        draft.currentArticle = { url: '', title: '' };
      })
    },
    setMarkerColor: (title, color) => ({ setState, getState }) => {
      setState(draft => {
        draft.markers.find(marker => marker.title === title).color = color;
      })
    },
  },
});

export const useMapStore = createHook(Store);