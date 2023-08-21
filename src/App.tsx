import './App.less'
import ZfList from "./views/list/index.tsx";
import ZfTree from "./views/tree/tree.tsx";
import {DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';
import CustomDragLayer from "./views/custom-drag-layer";
import './assets/css/index.less'

function App() {
  return (
      <DndProvider backend={HTML5Backend}>
          <div className="zf-wrap">
              <div className="demo1">
                  <ZfList></ZfList>
                  <ZfTree></ZfTree>
              </div>
              <CustomDragLayer></CustomDragLayer>
          </div>
      </DndProvider>
  )
}

export default App
