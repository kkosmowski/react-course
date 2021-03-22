import { createStore, createHook, defaults } from 'react-sweet-state';
import produce from 'immer';

defaults.devtools = true;
defaults.mutator = (currentState, producer) => produce(currentState, producer)

const Store = createStore({
  initialState: { markers: [] },
  actions: {
    addMarkers: markers => ({ setState, getState }) => {
      const existingMarkers = getState().markers.map(marker => marker.pageId);
      const newMarkers = markers.filter(marker => !existingMarkers.includes(marker.pageId));

      setState(draft => {
        draft.markers.push(...newMarkers);
      })
    },
  },
});

export const useMapStore = createHook(Store);