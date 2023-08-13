import {list} from "./const.ts";
import './list.less'
import ListItem from "./list-item.tsx";

function ZfList() {

    return (
        <div className="zf-list">
            {
                list.map((tag) => (
                    <ListItem
                        tag={tag}
                        key={tag.id}
                    ></ListItem>
                ))
            }
        </div>
    )
}

export default ZfList