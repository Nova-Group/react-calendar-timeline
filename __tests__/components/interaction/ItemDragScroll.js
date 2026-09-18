import Item from 'lib/items/Item'

describe('item drag group selection after scrolling', () => {
  function createItem(scrollRef, canChangeGroup = true) {
    const item = new Item({
      item: { id: 1 },
      keys: { itemIdKey: 'id' },
      order: { index: 2 },
      groupTops: [0, 100, 200, 300],
      topOffset: 100,
      scrollRef,
      canChangeGroup,
    })
    item.state.dragging = true
    return item
  }

  it('keeps the current row when an ancestor was scrolled before dragging', () => {
    const item = createItem({
      getBoundingClientRect: () => ({ top: -100 }),
      clientTop: 0,
      scrollTop: 0,
    })

    expect(item.dragGroupDelta({ pageY: 150 + window.pageYOffset })).toBe(0)
  })

  it('uses the live canvas bounds when an ancestor scrolls during dragging', () => {
    let canvasTop = 100
    const item = createItem({
      getBoundingClientRect: () => ({ top: canvasTop }),
      clientTop: 0,
      scrollTop: 0,
    })

    expect(item.dragGroupDelta({ pageY: 350 + window.pageYOffset })).toBe(0)
    canvasTop = 0
    expect(item.dragGroupDelta({ pageY: 350 + window.pageYOffset })).toBe(1)
  })

  it('accounts for scrolling and borders within the canvas', () => {
    const item = createItem({
      getBoundingClientRect: () => ({ top: 100 }),
      clientTop: 2,
      scrollTop: 200,
    })

    expect(item.dragGroupDelta({ pageY: 151 + window.pageYOffset })).toBe(0)
  })

  it('preserves the offset fallback when no scroll element is available', () => {
    expect(createItem().dragGroupDelta({ pageY: 350 })).toBe(0)
  })

  it('does not change rows when group changes are disabled', () => {
    expect(createItem(undefined, false).dragGroupDelta({ pageY: 450 })).toBe(0)
  })
})