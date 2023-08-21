import './tree.less'
import {Tree} from "antd";
import { DownOutlined } from '@ant-design/icons';
import {treeData1} from "./const.ts";
import TreeItem from "./tree-item.tsx";
import {useState} from "react";
import { cloneDeep } from "lodash"
import {addNode, deleteNode, findNodeByKey} from "../../utils/tree";
import {tagProp} from "../list/const";
import {generateRandomId} from "../../utils";

function ZfTree() {
    const [expandedKeys, setExpandedKeys] = useState([])
    const [treeData, setTreeData] = useState(treeData1)

    function TitleRender(nodeData: any) {
        return (
            <TreeItem
                nodeData={nodeData}
                updateTreeData={updateTreeData}
                packUpChild={packUpChild}
                collapseNode={collapseNode}
                removeNode={removeNode}
                updateNode={updateNode}
            ></TreeItem>
        )
    }

    function removeNode(id: string) {
        setTreeData(
            deleteNode(
                treeData,
                'id',
                id
            )
        )
    }

    function updateNode(e: any, key: string, attr: string) {
        const { target: { type, value, checked }} = e
        const v = type === "checkbox" ? checked : value
        const newTreeData = [...treeData]
        const targetNode = findNodeByKey(treeData, key)
        if (targetNode) targetNode[attr] = v
        setTreeData(newTreeData)
    }

    function collapseNode(id: string) {
        const _expArr = cloneDeep(expandedKeys)
        const index = _expArr.indexOf(id)
        index === -1 ? _expArr.push(id) : _expArr.splice(index, 1)
        setExpandedKeys(_expArr)
    }

    function updateTreeData(tar: any, source: any, sameLv: boolean) {
        if (tar.id === source.id) return
        const {dragType} = tar
        let _treeData = cloneDeep(treeData)
        const parentId = sameLv ? source.parentId : source.id
        let newNode = null
        if (dragType === 'node') {
            // 先把被拖拽元素给去掉
            _treeData = deleteNode(_treeData, 'id', tar.id)
            newNode = tar
        } else if (dragType === 'tag') {
            newNode = getNewTagNode(tar)
        }
        // 把被拖拽元素插入到新位置
        _treeData = addNode(_treeData, source.id, {
            ...newNode,
            parentId
        })
        setTreeData(_treeData)
    }

    function getNewTagNode(tar: tagProp) {
        const {name, type, defaultVal} = tar
        const obj: any = {
            id: generateRandomId(),
            name,
            type,
        }
        tar.defaultVal
            ? obj.value = defaultVal
            : obj.children = []
        return obj
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