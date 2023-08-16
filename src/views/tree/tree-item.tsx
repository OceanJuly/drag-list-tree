import {useDrag, useDrop} from "react-dnd";
import {useEffect, useRef} from "react";
import {getEmptyImage} from "react-dnd-html5-backend";
import {debounce} from 'lodash'

function TreeItem(props: any) {
    const ref = useRef<HTMLDivElement | null>(null)
    const firstHoverX = useRef(null)
    const lastHoverX = useRef(null)
    const nodeData = props.nodeData
    const deCheckDropPos = debounce(checkDropPos, 300)
    const [{ isDragging }, drag, preview] = useDrag({
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
        preview(getEmptyImage(), { captureDraggingState: true }); // 隐藏拖拽dom
    }, [isDragging])

    const [{ isOver }, drop] = useDrop({
        accept: 'item',
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
        drop: (item: any) => {
            props.updateTreeData(item, nodeData)
        },
        hover: (item, monitor) => {
            const { x } = monitor.getDifferenceFromInitialOffset()
            if (firstHoverX.current) lastHoverX.current = x
            else firstHoverX.current = x
            console.log(lastHoverX.current - firstHoverX.current);
            deCheckDropPos(firstHoverX.current, lastHoverX.current)
        },
    })

    function checkDropPos(originX: number, newX: number) {
        const diff = newX - originX
        console.log(diff);
    }

    return (
        <div
            className="tree-item"
            ref={drag(drop(ref)) as any}
            onClick={() => props.collapseNode(nodeData.id)}
            style={{ opacity: isDragging ? 0.5 : 1, background: isOver ? '#ccc' : '#FFFFFF' }}>
            {
                nodeData.type === 'String'
                    ? `${nodeData.name} === ${nodeData.value}`
                    : nodeData.name
            }
        </div>
    )
}

export default TreeItem