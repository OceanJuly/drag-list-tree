import {useDrag, useDrop} from "react-dnd";
import React, {useEffect, useRef, useState} from "react";
import {Checkbox, Input, InputNumber} from "antd";
import {debounce} from "lodash";
import {getEmptyImage} from "react-dnd-html5-backend";
import InsertNodeLineTip from "@/views/insert-node-line-tip";
import {isValidUrl} from "../../utils/validate";
import {showPreviewBtn} from "./const";

function TreeItem(props: any) {
    const ref = useRef<HTMLDivElement>(null)
    const nodeData = props.nodeData
    const firstHoverX = useRef(null)
    const lastHoverX = useRef(null)
    const updateDebounced = debounce(updateNodeInfo, 500)
    const [showBtnThreshold, setShowBtnThreshold] = useState(false)
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
            props.updateTreeData(item, nodeData, !showBtnThreshold)
        },
        hover: (item, monitor) => {
            const { x } = monitor.getDifferenceFromInitialOffset()
            if (firstHoverX.current) lastHoverX.current = x
            else {
                firstHoverX.current = x
            }
            checkDropPos(firstHoverX.current, lastHoverX.current)
        },
    })

    function checkDropPos(originX: number, newX: number) {
        const diff = newX - originX
        const showBtnThreshold = 80
        setShowBtnThreshold(diff > showBtnThreshold)
    }

    function renderDiffTypeInput() {
        let {value, type, id} = nodeData
        type = type ? type : 'string'
        let dom = null
        const isEndNode = !['object', 'array'].includes(type)
        const IllegalUrl = isValidUrl(value)
        const hasPreBtn = showPreviewBtn.includes(type)
        switch (type) {
            case 'number':
                dom = (
                    <InputNumber
                        defaultValue={value}
                        onChange={(e) => updateDebounced(e, id, 'value')}
                        style={{width: '100%'}}
                    />
                )
                break
            case 'boolean':
                dom = (
                    <Checkbox style={{lineHeight: '32px', marginLeft: '8px'}}
                              checked={value} onChange={(e) => updateDebounced(e, id, 'value')}
                    >Checkbox</Checkbox>
                )
                break
            case 'string':
            case 'password':
            case 'image':
            case 'video':
            case 'audio':
            {
                dom = (
                    <Input defaultValue={value}
                           className={!IllegalUrl && hasPreBtn ? 'warn-tip' : ''}
                           onChange={(e) => updateDebounced(e, id, 'value')}
                    />
                )
                break
            }
        }
        return (
            <div className="tree-title-item">
                <div className="left-input-wrap">
                    <Input style={{width: '140px', marginRight: '8px'}} defaultValue={nodeData.name} onChange={(e) => updateDebounced(e, id, 'name')} />
                    {isEndNode ? dom : null}
                </div>
                <div className="right-btn">
                    <div onClick={() => props.removeNode(id)}><i className="iconfont icon-delete"></i></div>
                </div>
            </div>
        )
    }

    function updateNodeInfo(e: any, key: string, attr: string) {
        props.updateNode(e, key, attr)
    }

    return (
        <div
            className="tree-item"
            ref={drag(drop(ref)) as any}
            style={{ opacity: isDragging ? 0.5 : 1 }}>
            {renderDiffTypeInput()}
            {isOver ? <InsertNodeLineTip showBtnThreshold={showBtnThreshold}></InsertNodeLineTip> : ''}
        </div>
    )
}

export default TreeItem