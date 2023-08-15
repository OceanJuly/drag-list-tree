import {useDrag, useDrop} from "react-dnd";
import {useEffect, useRef} from "react";

function TreeItem(props: any) {
    const ref = useRef<HTMLDivElement>(null)
    const nodeData = props.nodeData
    const [{ isDragging }, drag] = useDrag({
        type: 'item',
        item: {
            ...nodeData,
            dragType: 'node'
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    useEffect(() => {
        if (isDragging) props.packUpChild(nodeData.id)
    }, [isDragging])

    const [{ isOver }, drop] = useDrop({
        accept: 'item',
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
        drop: (item: any) => {
            props.updateTreeData(item, nodeData)
        },
    })

    return (
        <div
            className="tree-item"
            ref={drag(drop(ref)) as any}
            style={{ opacity: isDragging ? 0.5 : 1, background: isOver ? '#2a999d' : '#FFFFFF' }}>
            {
                nodeData.type === 'String'
                    ? `${nodeData.name} === ${nodeData.value}`
                    : nodeData.name
            }
        </div>
    )
}

export default TreeItem