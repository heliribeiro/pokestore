import React from 'react';
import './cards.css'

export default function Cards(props) {
 
  return (

    <div className="row row-cols-md-3 col-8 cards">
      {props.pokemonAtributos.map(pokemon => {
        return (
          <div key={pokemon.name} className="col mb-4">
            <div className="card h-100">
              <img src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.nImage}.png`} className="card-img-top" alt={pokemon.name} height='200px' />
              <div className="card-body">
                <h5 className="card-title">{pokemon.name}</h5>
                <h5 className="card-title">{`R$${pokemon.preco}`}</h5>
             
                <p className="card-text"></p>
              </div>
              <button onClick={()=>{props.callbackParent( pokemon.name,pokemon.preco)}} className='btn btn-dark'>Adicionar ao carrinho</button>
            </div>
          </div>
        )
      }
      )}

    </div>
  )
}