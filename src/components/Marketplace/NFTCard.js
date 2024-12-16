import React from 'react'
import './NFTCard.scss'
import ethIcon from '../../assets/img/eth-icon.png'

const NFTCard = ({ piece, avatar, shortcut, onClickBuy, onClickSell }) => {
  return (
    <div className="nft-card">
      {piece.sponsored && <div className="sponsored-badge">Sponsored</div>}
      <div className="nft-image-container">
        <img src={avatar} alt={piece.name} className="nft-image" />
      </div>
      <div className="card-content">
        <div className="piece-info">
          <div className="avatar">
            <img src={avatar} alt="Avatar" />
          </div>
          <div className="info">
            <h3 className="piece-name">{piece.name}</h3>
            <p className="owner">{piece.owner}</p>
          </div>
          <img src={shortcut} alt="Shortcut" className="shortcut" />
        </div>
        <div className="price-info">
          <div className="price">
            <img src={ethIcon} alt="ETH" className="eth-icon" />
            <span className="amount">{piece.price} ETH</span>
          </div>
          <div className="subscription">
            {piece.subscription} subscriptions
          </div>
        </div>
        <div className="card-actions">
          {piece.sale === 'forsale' ? (
            <button 
              className="buy-btn"
              onClick={() => onClickBuy(piece)}
            >
              Buy Now
            </button>
          ) : (
            <button 
              className="sell-btn"
              onClick={() => onClickSell(piece)}
            >
              Sell
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default NFTCard 