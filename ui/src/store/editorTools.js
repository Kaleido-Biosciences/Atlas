import { createSlice } from 'redux-starter-kit';

const initialState = {
  toolComponents: [],
  toolComponentsValid: true,
  clickMode: 'apply',
  clearMode: 'all',
};

const editorTools = createSlice({
  slice: 'editorTools',
  initialState,
  reducers: {
    addComponentToToolComponents(state, action) {
      const { component } = action.payload;
      const { toolComponents } = state;
      const existingComponent = findComponent(component.id, toolComponents);
      if (!existingComponent) {
        toolComponents.unshift(component);
      }
    },
    setClickMode(state, action) {
      state.clickMode = action.payload.clickMode;
    },
    setClearMode(state, action) {
      state.clearMode = action.payload.clearMode;
    },
  },
});

export const {
  actions: editorToolsActions,
  reducer: editorToolsReducer,
} = editorTools;

function findComponent(componentId, componentArray) {
  return componentArray.find(component => component.id === componentId);
}
