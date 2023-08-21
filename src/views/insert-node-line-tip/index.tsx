import './insert-node-line-tip.less'

function InsertNodeLineTip({showBtnThreshold}) {
    return (
        <div className="insert-node-line-tip-wrap">
            <div className="insert-node-line-tip"
                 style={{marginLeft: showBtnThreshold ? '30px' : 0}}>
                <div className="circle"></div>
                <div className="line"></div>
            </div>
        </div>
    )
}

export default InsertNodeLineTip