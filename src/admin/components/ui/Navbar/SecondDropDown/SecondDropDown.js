import React, { useState } from 'react'
import onClickOutside from 'react-onclickoutside'
import { DDWrapper, DDHeader, DDlist, Button } from './SecondDropDown.styles'

function SecondDropDown({ title, items, multiSelect = false }) {
  const [open, setOpen] = useState(false)
  const [selection, setSelection] = useState([])
  const toggle = () => setOpen(!open)
  SecondDropDown.handleClickOutside = () => setOpen(false)

  const handleOnClick = (item) => {
    if (!selection.some((current) => current.id === item.id)) {
      if (!multiSelect) {
        setSelection([item])
      } else if (multiSelect) {
        setSelection([...selection, item])
      }
    } else {
      let selectionAfterRemoval = selection
      selectionAfterRemoval = selectionAfterRemoval.filter(
        (current) => current.id !== item.id
      )
      setSelection([...selectionAfterRemoval])
    }
  }

  const isItemInSelection = (item) => {
    if (selection.some((current) => current.id === item.id)) {
      return true
    }
    return false
  }

  return (
    <DDWrapper>
      <DDHeader
        tabIndex={0}
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <p>{title}</p>
      </DDHeader>
      {open && (
        <DDlist>
          {items.map((item) => (
            <li key={item.id}>
              <Button type="button" onClick={() => handleOnClick(item)}>
                <span>{item.value}</span>
                <span>{isItemInSelection(item)}</span>
              </Button>
            </li>
          ))}
        </DDlist>
      )}
    </DDWrapper>
  )
}

const clickOutsideConfig = {
  handleClickOutside: () => SecondDropDown.handleClickOutside,
}

export default onClickOutside(SecondDropDown, clickOutsideConfig)
