import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import NFTCard from '../../components/Marketplace/NFTCard'
import FilterArea from '../../components/Common/FilterArea'
import Pagination from '../../components/Common/Pagination'
import './Marketplace.scss'
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
  },
  {
    pId: 13,
    sale: 'forsale',
    name: 'White Pawn',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'w',
    class: 'p',
    bCount: 3
  },
  {
    pId: 14,
    sale: 'notforsale',
    name: 'White Pawn',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'w',
    class: 'p',
    bCount: 3
  },
  {
    pId: 15,
    sale: 'forsale',
    name: 'White Pawn',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'w',
    class: 'p',
    bCount: 0
  },
  {
    pId: 16,
    sale: 'forsale',
    name: 'White Pawn',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: false,
    subscription: 4,
    color: 'w',
    class: 'p',
    bCount: 7
  },
  {
    pId: 17,
    sale: 'notforsale',
    name: 'Black Pawn',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: false,
    subscription: 4,
    color: 'b',
    class: 'p',
    bCount: 1
  },
  {
    pId: 18,
    sale: 'notforsale',
    name: 'Black Pawn',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'b',
    class: 'p',
    bCount: 5
  },
  {
    pId: 19,
    sale: 'forsale',
    name: 'Black Pawn',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: false,
    subscription: 4,
    color: 'b',
    class: 'p',
    bCount: 5
  },
  {
    pId: 20,
    sale: 'forsale',
    name: 'Black Pawn',
    owner: 'by Silver Knight',
    price: 5.65,
    sponsored: true,
    subscription: 4,
    color: 'b',
    class: 'p',
    bCount: 3
  }
]

const COLOR = { white: true, black: true }
const STATUS = { forsale: true, notforsale: true }

const Marketplace = () => {
  const [page, setPage] = useState(1)
  const [nfts, setNfts] = useState([])
  const [status, setStatus] = useState(STATUS)
  const [color, setColor] = useState(COLOR)
  const [pClass, setPClass] = useState(PCLASS)
  const [bCount, setBCount] = useState(7)
  const [isLoading, setIsLoading] = useState(true)

  const ITEMS_PER_PAGE = 15

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setNfts(tempPieces)
      setIsLoading(false)
    }, 500)
  }, [])

  useEffect(() => {
    setIsLoading(true)
    setPage(1)
    resetNfts()
    setIsLoading(false)
  }, [status, color, pClass, bCount])

  const handleBuyClick = (piece) => {
    console.log('Buying piece:', piece)
  }

  const handleSellClick = (piece) => {
    console.log('Selling piece:', piece)
  }

  const resetNfts = () => {
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
  }

  const currentItems = nfts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const renderContent = () => {
    if (isLoading) {
      return <div className="loading-state">Loading...</div>
    }
    if (currentItems.length > 0) {
      return currentItems.map((card) => (
        <Col key={card.pId} className="mb-4">
          <NFTCard
            piece={card}
            avatar={blackRook}
            shortcut={shortcut}
            onClickBuy={handleBuyClick}
            onClickSell={handleSellClick}
          />
        </Col>
      ))
    }
    return <div className="no-results">No items found matching your criteria</div>
  }

  return (
    <Container fluid style={{ backgroundColor: '#15171e' }}>
      <Container className="marketplace-page-container">
        <Row>
          <Col className="filter-area" xs={12} md={3}>
            <FilterArea
              status={status}
              setStatus={setStatus}
              color={color}
              setColor={setColor}
              pClass={pClass}
              setPClass={setPClass}
              bCount={bCount}
              setBCount={setBCount}
            />
          </Col>
          <Col className="nfts-grid-container" xs={12} md={9}>
            <h1 className="head-title">trending pieces</h1>
            <div className="nfts-area">
              {renderContent()}
            </div>
            {!isLoading && currentItems.length > 0 && (
              <Pagination
                count={Math.ceil(nfts.length / ITEMS_PER_PAGE)}
                page={page}
                setPage={setPage}
              />
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default Marketplace
