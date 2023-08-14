import {DragSourceMonitor, useDrag, useDrop} from "react-dnd";
import {useRef} from "react";

function TreeItem(props: any) {
    const ref = useRef<HTMLDivElement>(null)
    const nodeData = props.nodeData
    const [{ isDragging }, drag] = useDrag({
        type: 'item',
        item: nodeData,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        // end: (item, monitor) => {
        //     console.log(item);
        //     console.log(monitor.getDropResult());
        // },
    })
    const [{ isOver }, drop] = useDrop({
        accept: 'item',
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
        drop: (item: any) => {
            props.updateTreeData(item)
        },
    })

    return (
        <div
            className="tree-item"
            ref={drag(drop(ref)) as any}
            style={{ opacity: isDragging ? 0.5 : 1, background: isOver ? '#2a999d' : '#FFFFFF' }}>
            {nodeData.title}
        </div>
    )
}

export default TreeItem