import {useDrag} from "react-dnd";

function TreeItem(props: any) {
    console.log(props);
    const [{ isDragging }, drag] = useDrag({
        type: 'item',
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    return (
        <div
            className="tree-item"
            ref={drag}
            style={{ opacity: isDragging ? 0.5 : 1 }}>
            {props.title.name}
        </div>
    )
}

export default TreeItem