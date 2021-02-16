import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { _get, arraysEqual } from '../utility/generic'

const SidebarItem = class extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.forceRefreshIndex !== this.props.forceRefreshIndex
      || nextProps.elementStyle.height !== this.props.elementStyle.height
      || nextProps.elementStyle.width !== this.props.elementStyle.width
      || _get(nextProps.group, nextProps.groupTitleKey) !== _get(this.props.group, this.props.groupTitleKey))
  }

  renderGroupContent(group, isRightSidebar, groupTitleKey, groupRightTitleKey) {
    if (this.props.groupRenderer) {
      return React.createElement(this.props.groupRenderer, {
        group,
        isRightSidebar
      })
    } else {
      return _get(group, isRightSidebar ? groupRightTitleKey : groupTitleKey)
    }
  }

  render() {
    return (
      <div
        key={_get(this.props.group, this.props.groupIdKey)}
        className={
          'rct-sidebar-row rct-sidebar-row-' +
          (this.props.index % 2 === 0 ? 'even' : 'odd')
        }
        style={this.props.elementStyle}
      >
        {this.renderGroupContent(
          this.props.group,
          this.props.isRightSidebar,
          this.props.groupTitleKey,
          this.props.groupRightTitleKey
        )}
      </div>
    )
  }
}

export default class Sidebar extends Component {
  static propTypes = {
    groups: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    groupHeights: PropTypes.array.isRequired,
    keys: PropTypes.object.isRequired,
    groupRenderer: PropTypes.func,
    isRightSidebar: PropTypes.bool,
    forceRefreshIndex:PropTypes.number
  }

  shouldComponentUpdate(nextProps) {
    return !(
      nextProps.forceRefreshIndex === this.props.forceRefreshIndex &&
      nextProps.keys === this.props.keys &&
      nextProps.width === this.props.width &&
      nextProps.height === this.props.height &&
      arraysEqual(nextProps.groupHeights, this.props.groupHeights)
      )
  }

  render() {
    const { width, groupHeights, height, isRightSidebar } = this.props

    const { groupIdKey, groupTitleKey, groupRightTitleKey } = this.props.keys

    const sidebarStyle = {
      width,
      height
    }

    let groupLines = this.props.groups.map((group, index) => {
      const elementStyle = {
        height: groupHeights[index] - 1,
        width,
        lineHeight: `${groupHeights[index] - 1}px`
      }

      return (
        <SidebarItem
          key={index}
          group={group}
          index={index}
          isRightSidebar={isRightSidebar}
          groupTitleKey={groupTitleKey}
          groupRightTitleKey={groupRightTitleKey}
          elementStyle={elementStyle}
          groupRenderer={this.props.groupRenderer}
          groupIdKey={groupIdKey}
          forceRefreshIndex={this.props.forceRefreshIndex}
        />
      )
    })

    return (
      <div
        className={'rct-sidebar' + (isRightSidebar ? ' rct-sidebar-right' : '')}
        style={sidebarStyle}
      >
        <div style={sidebarStyle}>{groupLines}</div>
      </div>
    )
  }
}
