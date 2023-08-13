import { useState } from "react";
import { getDescendants } from "@minoru/react-dnd-treeview";
import { Tree } from "@minoru/react-dnd-treeview";
import styles from "./App.module.css";
import {treeData1} from "./const.ts";

export default function App() {
    const [treeData, setTreeData] = useState(treeData1);
    const handleDrop = (newTree: any, { dragSourceId, dropTargetId }: any) => {
        console.log(newTree);
        setTreeData(
            treeData.map((node) => {
                if (node.id === dragSourceId) {
                    return {
                        ...node,
                        parent: dropTargetId
                    };
                }

                return node;
            })
        );
    };

    return (
        <div className={styles.rootGrid}>
            <Tree
                tree={treeData}
                rootId={0}
                render={(node, { depth, isOpen, onToggle }) => (
                    <CustomNode
                        node={node}
                        depth={depth}
                        isOpen={isOpen}
                        onToggle={onToggle}
                    />
                )}
                dragPreviewRender={(monitorProps) => (
                    <CustomDragPreview monitorProps={monitorProps} />
                )}
                onDrop={handleDrop}
                classes={{
                    root: styles.treeRoot,
                    draggingSource: styles.draggingSource,
                    dropTarget: styles.dropTarget
                }}
            />
        </div>
    );
}
