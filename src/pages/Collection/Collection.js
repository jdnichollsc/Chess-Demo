import React, { useState, useEffect, useCallback, useLayoutEffect, useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Chessboard from 'chessboardjsx'
import FilterArea from '../../components/Common/FilterArea'
import Pagination from '../../components/Common/Pagination'
import './Collection.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css'
import blackRook from '../../assets/img/black-rook.png'
import shortcut from '../../assets/img/shortcut.png'

const PCLASS = {
  p: true,
  n: true,
  b: true,
  r: true,
  q: true,
  k: true
}

const COLOR = { white: true, black: true }
const STATUS = { forsale: true, notforsale: true }

const tempPieces = [
  {
    pId: 1,
    sale: 'forsale',
    name: 'White King',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'w',
    class: 'k',
    bCount: 3
  },
  {
    pId: 2,
    sale: 'notforsale',
    name: 'Black King',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: false,
    subscription: 4,
    color: 'b',
    class: 'k',
    bCount: 3
  },
  {
    pId: 3,
    sale: 'notforsale',
    name: 'White Queen',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'w',
    class: 'q',
    bCount: 3
  },
  {
    pId: 4,
    sale: 'forsale',
    name: 'Black Queen',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'b',
    class: 'q',
    bCount: 3
  },
  {
    pId: 5,
    sale: 'forsale',
    name: 'White Rook',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: false,
    subscription: 4,
    color: 'w',
    class: 'r',
    bCount: 3
  },
  {
    pId: 6,
    sale: 'notforsale',
    name: 'Black Rook',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'b',
    class: 'r',
    bCount: 3
  },
  {
    pId: 7,
    sale: 'forsale',
    name: 'White Bishop',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'w',
    class: 'b',
    bCount: 3
  },
  {
    pId: 8,
    sale: 'forsale',
    name: 'Black King',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'b',
    class: 'k',
    bCount: 3
  },
  {
    pId: 9,
    sale: 'notforsale',
    name: 'White Knight',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'w',
    class: 'n',
    bCount: 3
  },
  {
    pId: 10,
    sale: 'forsale',
    name: 'White Knight',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: false,
    subscription: 4,
    color: 'w',
    class: 'n',
    bCount: 5
  },
  {
    pId: 11,
    sale: 'notforsale',
    name: 'Black Knight',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: false,
    subscription: 4,
    color: 'b',
    class: 'n',
    bCount: 0
  },
  {
    pId: 12,
    sale: 'forsale',
    name: 'Black Knight',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: false,
    subscription: 4,
    color: 'b',
    class: 'n',
    bCount: 3
  }
]

const getRarityClass = (card) => {
  if (card.class === 'k') return 'legendary'
  if (card.class === 'q') return 'rare'
  if (card.class === 'r' || card.class === 'b') return 'uncommon'
  return 'common'
}

const getRarityText = (card) => {
  if (card.class === 'k') return 'Legendary'
  if (card.class === 'q') return 'Rare'
  if (card.class === 'r' || card.class === 'b') return 'Uncommon'
  return 'Common'
}

const Collection = () => {
  const [page, setPage] = useState(1)
  const [nfts, setNfts] = useState([])
  const [status, setStatus] = useState(STATUS)
  const [color, setColor] = useState(COLOR)
  const [pClass, setPClass] = useState(PCLASS)
  const [bCount, setBCount] = useState(7)
  const [width, setWidth] = useState(320)
  const [mData, setMData] = useState({})
  const [sStyle, setSStyle] = useState({})
  const [sPiece, setSPiece] = useState('')
  const boardRef = useRef(null)
  const containerRef = useRef(null)

  useLayoutEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const calculatedWidth = Math.min(containerWidth - 48, 400)
        setWidth(calculatedWidth)
      }
    }

    updateWidth()

    const resizeObserver = new ResizeObserver(updateWidth)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    window.addEventListener('resize', updateWidth)

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current)
      }
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateWidth)
    }
  }, [])

  useEffect(() => {
    setNfts(tempPieces)
  }, [])

  useEffect(() => {
    resetNfts()
  }, [status, color, pClass, bCount])

  const resetNfts = useCallback(() => {
    let temp = tempPieces.filter(
      card =>
        (card.sale === 'forsale' && status.forsale === true) ||
        (card.sale === 'notforsale' && status.notforsale === true)
    )
    temp = temp.filter(
      card =>
        (card.color === 'w' && color.white === true) ||
        (card.color === 'b' && color.black === true)
    )
    temp = temp.filter(
      card => pClass[card.class] === true
    )
    temp = temp.filter(
      card => card.bCount <= bCount
    )
    setNfts(temp)
  }, [status, color, pClass, bCount])

  const resetStates = useCallback(() => {
    setStatus(STATUS)
    setPClass(PCLASS)
    setColor(COLOR)
    setBCount(7)
  }, [])

  const handleClickPiece = useCallback((piece) => {
    setPage(1)
    const newColor = piece.charAt(0) === 'w' ? { white: true, black: false } : { white: false, black: true }
    setColor(newColor)
    const newPClass = {
      p: false,
      n: false,
      b: false,
      r: false,
      q: false,
      k: false
    }
    newPClass[piece.charAt(1).toLowerCase()] = true
    setPClass(newPClass)
  }, [])

  const handleClickSquare = useCallback((square) => {
    if (typeof mData[square] === 'undefined') {
      resetStates()
      setSStyle({})
      setSPiece('')
    } else {
      const style = { backgroundColor: '#0066ff' }
      const data = {}
      data[square] = style
      setSStyle(data)
      setSPiece(square)
    }
  }, [mData, resetStates])

  const handleClickCard = useCallback((card) => {
    if (sPiece === '') return
    setMData(prev => ({
      ...prev,
      [sPiece]: card.pId
    }))
  }, [sPiece])

  return (
    <Container fluid style={{ backgroundColor: '#15171e' }}>
      <Container className="collection-page-container">
        <Row>
          <Col className="filter-area" xs={12} lg={3}>
            <div ref={containerRef} className="chessboard-container">
              <div ref={boardRef} className="chessboard-wrapper">
                <Chessboard
                  id="chessboard"
                  position="start"
                  draggable
                  width={width}
                  orientation="white"
                  dropSquareStyle={{ opacity: '0.9' }}
                  boardStyle={{
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  lightSquareStyle={{
                    backgroundColor: '#2d2a28'
                  }}
                  darkSquareStyle={{
                    backgroundColor: '#121214'
                  }}
                  onPieceClick={handleClickPiece}
                  onSquareClick={handleClickSquare}
                  squareStyles={sStyle}
                />
              </div>
            </div>
            <FilterArea
              status={status}
              setStatus={setStatus}
              color={color}
              setColor={setColor}
              pClass={pClass}
              setPClass={setPClass}
              bCount={bCount}
              setBCount={setBCount}
              setSPiece={setSPiece}
              setSStyle={setSStyle}
            />
          </Col>
          <Col className="nfts-grid-container" xs={12} md={9}>
            <h1 className="head-title">My Collection</h1>
            <div className="nfts-area">
              {nfts.map((card, index) => (
                <Col key={card.pId} className="mb-4">
                  <div
                    className="collection-card-container"
                    onClick={() => handleClickCard(card)}
                    style={mData[sPiece] === card.pId ? { borderColor: '#0066ff', borderWidth: '2px' } : {}}
                  >
                    <div className="card-content">
                      <div className="card-title">
                        <span>#{index + 1}</span>
                        <span className={`rarity ${getRarityClass(card)}`}>
                          {getRarityText(card)}
                        </span>
                      </div>
                      <div className="nft-card-image" style={{ backgroundImage: `url(${blackRook})` }}>
                        <img src={shortcut} alt="crown" className="crown-icon" />
                      </div>
                    </div>
                    {card.price && (
                      <div className="price-tag">
                        <svg className="eth-icon" viewBox="0 0 33 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.3576 0L16 0.121771V36.1961L16.3576 36.5531L32.7153 27.1062L16.3576 0Z" fill="#ffffff"/>
                          <path d="M16.3578 0L0 27.1062L16.3578 36.5531V19.5691V0Z" fill="#ffffff"/>
                          <path d="M16.3575 39.6323L16.1602 39.8719V52.3793L16.3575 52.9999L32.7273 30.1919L16.3575 39.6323Z" fill="#ffffff"/>
                          <path d="M16.3578 52.9999V39.6323L0 30.1919L16.3578 52.9999Z" fill="#ffffff"/>
                          <path d="M16.3575 36.5533L32.7151 27.1064L16.3575 19.5693V36.5533Z" fill="#ffffff"/>
                          <path d="M0 27.1064L16.3576 36.5533V19.5693L0 27.1064Z" fill="#ffffff"/>
                        </svg>
                        <span>Price: {card.price} ETH</span>
                      </div>
                    )}
                  </div>
                </Col>
              ))}
            </div>
            <Pagination
              count={Math.ceil(nfts.length / 12)}
              page={page}
              setPage={setPage}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default Collection
