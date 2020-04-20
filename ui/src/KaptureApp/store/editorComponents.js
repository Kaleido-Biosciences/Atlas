import { createSlice } from 'redux-starter-kit';

import { createComponent } from 'KaptureApp/utils/toolComponentFunctions';

const initialState = {
  components: [],
};

const editorComponents = createSlice({
  slice: 'editorComponents',
  initialState,
  reducers: {
    // TODO This should be changed to take normal components
    addKaptureComponentsToComponents(state, action) {
      const { kaptureComponents } = action.payload;
      const { components } = state;
      kaptureComponents.forEach((kaptureComponent) => {
        const { data, type, id } = kaptureComponent;
        const existingComponent = components.find(
          (component) => component.data.id === id
        );
        if (!existingComponent) {
          components.unshift(createComponent(data, type));
        }
      });
    },
    addComponentToComponents(state, action) {
      const { component } = action.payload;
      const { components } = state;
      const existingComponent = findComponent(component.id, components);
      if (!existingComponent) {
        components.unshift(component);
      }
    },
  },
});

export const {
  actions: editorComponentsActions,
  reducer: editorComponentsReducer,
} = editorComponents;

function findComponent(componentId, componentArray) {
  return componentArray.find((component) => component.id === componentId);
}
