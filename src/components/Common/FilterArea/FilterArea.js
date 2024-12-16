import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Form from 'react-bootstrap/Form'
import RangeSlider from 'react-bootstrap-range-slider'
import './FilterArea.scss'

const FilterArea = ({
  status,
  setStatus,
  color,
  setColor,
  pClass,
  setPClass,
  bCount,
  setBCount,
  setSPiece,
  setSStyle
}) => {
  const handleChangeStatus = (e) => {
    const temp = { ...status }
    temp[e.target.value] = e.target.checked
    setStatus(temp)
    resetSelectedItem()
  }

  const handleChangeColor = (e) => {
    const temp = { ...color }
    temp[e.target.value] = e.target.checked
    setColor(temp)
    resetSelectedItem()
  }

  const handleChangeClass = (e) => {
    const temp = { ...pClass }
    temp[e.target.value] = e.target.checked
    setPClass(temp)
    resetSelectedItem()
  }

  const handleChangeBCount = (e) => {
    setBCount(Number(e.target.value))
    resetSelectedItem()
  }

  const resetSelectedItem = () => {
    if (setSPiece && setSStyle) {
      setSPiece('')
      setSStyle({})
    }
  }

  return (
    <>
      <h1 className="filter-title">
        <i className="fas fa-filter" style={{ color: '#0469ff' }}></i> Filter By
      </h1>
      <Accordion defaultActiveKey={['0']} alwaysOpen flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Status</Accordion.Header>
          <Accordion.Body>
            <ul className="filter-item-list">
              <li className="filter-item">
                <Form.Check
                  inline
                  label="For sale"
                  name="status"
                  type="checkbox"
                  id="status-checkbox-forsale"
                  value="forsale"
                  onChange={handleChangeStatus}
                  checked={status.forsale}
                />
              </li>
              <li className="filter-item">
                <Form.Check
                  inline
                  label="Not for sale"
                  name="status"
                  type="checkbox"
                  id="status-checkbox-notforsale"
                  value="notforsale"
                  onChange={handleChangeStatus}
                  checked={status.notforsale}
                />
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Color</Accordion.Header>
          <Accordion.Body>
            <ul className="filter-item-list">
              <li className="filter-item">
                <Form.Check
                  inline
                  label="Black"
                  name="color"
                  type="checkbox"
                  id="color-checkbox-black"
                  value="black"
                  onChange={handleChangeColor}
                  checked={color.black}
                />
              </li>
              <li className="filter-item">
                <Form.Check
                  inline
                  label="White"
                  name="color"
                  type="checkbox"
                  id="color-checkbox-white"
                  value="white"
                  onChange={handleChangeColor}
                  checked={color.white}
                />
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Class</Accordion.Header>
          <Accordion.Body>
            <ul className="filter-item-list">
              <li className="filter-item">
                <Form.Check
                  inline
                  label="Pawn"
                  name="class"
                  type="checkbox"
                  id="class-checkbox-pawn"
                  value="p"
                  onChange={handleChangeClass}
                  checked={pClass.p}
                />
              </li>
              <li className="filter-item">
                <Form.Check
                  inline
                  label="Knight"
                  name="class"
                  type="checkbox"
                  id="class-checkbox-knight"
                  value="n"
                  onChange={handleChangeClass}
                  checked={pClass.n}
                />
              </li>
              <li className="filter-item">
                <Form.Check
                  inline
                  label="Bishop"
                  name="class"
                  type="checkbox"
                  id="class-checkbox-bishop"
                  value="b"
                  onChange={handleChangeClass}
                  checked={pClass.b}
                />
              </li>
              <li className="filter-item">
                <Form.Check
                  inline
                  label="Rook"
                  name="class"
                  type="checkbox"
                  id="class-checkbox-rook"
                  value="r"
                  onChange={handleChangeClass}
                  checked={pClass.r}
                />
              </li>
              <li className="filter-item">
                <Form.Check
                  inline
                  label="Queen"
                  name="class"
                  type="checkbox"
                  id="class-checkbox-queen"
                  value="q"
                  onChange={handleChangeClass}
                  checked={pClass.q}
                />
              </li>
              <li className="filter-item">
                <Form.Check
                  inline
                  label="King"
                  name="class"
                  type="checkbox"
                  id="class-checkbox-king"
                  value="k"
                  onChange={handleChangeClass}
                  checked={pClass.k}
                />
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Breed Count</Accordion.Header>
          <Accordion.Body>
            <RangeSlider
              value={bCount}
              onChange={handleChangeBCount}
              min={0}
              max={7}
              tooltip="on"
              tooltipPlacement="top"
              tooltipLabel={value => `${value}`}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  )
}

export default FilterArea
