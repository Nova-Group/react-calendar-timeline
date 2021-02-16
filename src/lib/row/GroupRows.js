import PropTypes from 'prop-types'
import React, { Component } from 'react'
import GroupRow from './GroupRow'
import { arraysEqual } from '../utility/generic';

export default class GroupRows extends Component {
  static propTypes = {
    canvasWidth: PropTypes.number.isRequired,
    lineCount: PropTypes.number.isRequired,
    groupHeights: PropTypes.array.isRequired,
    onRowClick: PropTypes.func.isRequired,
    onRowDoubleClick: PropTypes.func.isRequired,
    clickTolerance: PropTypes.number.isRequired,
    groups: PropTypes.array.isRequired,
    horizontalLineClassNamesForGroup: PropTypes.func,
    onRowContextClick: PropTypes.func.isRequired,
    newGroupOrder: PropTypes.number
  }

  shouldComponentUpdate(nextProps) {
    this.lastGroupOrder = this.props.newGroupOrder
    return !(
      nextProps.newGroupOrder === this.props.newGroupOrder &&
      nextProps.canvasWidth === this.props.canvasWidth &&
      nextProps.lineCount === this.props.lineCount &&
      nextProps.groups === this.props.groups &&
      nextProps.groupHeights[this.props.newGroupOrder] === this.props.groupHeights[this.props.newGroupOrder] &&
      arraysEqual(nextProps.groupHeights, this.props.groupHeights)
    )
  }

  render() {
    const {
      canvasWidth,
      groupHeights,
      onRowClick,
      onRowDoubleClick,
      clickTolerance,
      groups,
      horizontalLineClassNamesForGroup,
      onRowContextClick,
    } = this.props

    return <div className="rct-horizontal-lines">{groups.map((group, i) => {
      return (<GroupRow
        clickTolerance={clickTolerance}
        onContextMenu={evt => onRowContextClick(evt, i, group)}
        onClick={evt => onRowClick(evt, i, group)}
        onDoubleClick={evt => onRowDoubleClick(evt, i, group)}
        key={`horizontal-line-${group.id}`}
        isEvenRow={i % 2 === 0}
        group={group}
        horizontalLineClassNamesForGroup={horizontalLineClassNamesForGroup}
        style={{
          width: canvasWidth,
          height: groupHeights[i] - 1
        }}
      />)
    })}</div>
  }
}
