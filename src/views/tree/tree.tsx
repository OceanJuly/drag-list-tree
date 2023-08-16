import './tree.less'
import {Tree} from "antd";
import { DownOutlined } from '@ant-design/icons';
import {treeData} from "./const.ts";
import TreeItem from "./tree-item.tsx";
import {useState} from "react";
import { cloneDeep } from "lodash"

function ZfTree() {
    const [expandedKeys, setExpandedKeys] = useState([])

    function TitleRender(nodeData: any) {
        return (
            <TreeItem
                nodeData={nodeData}
                updateTreeData={updateTreeData}
                packUpChild={packUpChild}
                collapseNode={collapseNode}
            ></TreeItem>
        )
    }

    function collapseNode(id: string) {
        const _expArr = cloneDeep(expandedKeys)
        const index = _expArr.indexOf(id)
        index === -1 ? _expArr.push(id) : _expArr.splice(index, 1)
        setExpandedKeys(_expArr)
    }

    function updateTreeData(tar: any, source: any) {
        if (tar.id === source.id) return

    }

    function packUpChild(key: string) {
        setExpandedKeys(expandedKeys.filter((keyStr: string) => keyStr !== key))
    }

    function handleTreeExpand(keys: Array<string>) {
        setExpandedKeys(keys)
    }

    return (
        <div className="zf-tree-wrap">
            <Tree
                blockNode={true}
                switcherIcon={<DownOutlined />}
                expandedKeys={expandedKeys}
                onExpand={handleTreeExpand}
                treeData={treeData}
                fieldNames={{
                    key: 'id'
                }}
                titleRender={TitleRender}
            />
        </div>
    )
}

export default ZfTree