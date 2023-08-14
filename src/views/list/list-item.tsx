import {useDrag} from "react-dnd";

function ListItem({tag}: any) {

    const [{ isDragging }, drag] = useDrag({
        type: 'item',
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            console.log(item);
            console.log(monitor);
        },
    })

    return (
        <div
            className="tag-item"
            ref={drag}
            style={{ opacity: isDragging ? 0.5 : 1 }}>
            {tag.name}
        </div>
    )
}

export default ListItem