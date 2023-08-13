import './App.less'
import ZfList from "./views/list/index.tsx";
import ZfTree from "./views/tree/tree.tsx";
import {DndProvider} from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';
import Demo from "./views/demo";

function App() {
  return (
      <DndProvider backend={HTML5Backend}>
          <div className="zf-wrap">
              <div className="demo1">
                  <ZfList></ZfList>
                  <ZfTree></ZfTree>
              </div>
              {/*<Demo></Demo>*/}
          </div>
      </DndProvider>
  )
}

export default App
