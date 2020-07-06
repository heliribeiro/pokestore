import React from 'react'
import './carrinho.css'

export default function (props) {



  let precoTotal = props.namePreco.map(item => {
    return (item.preco)
  }).reduce((ant, prox) => Number(ant) + Number(prox), 0).toFixed(2)



  return (
    <div className=' row col-4 carrinho'>
      <ul className="list-group col-12">
        <li className="list-group-item fontCarrinho">Carrinho</li>
        <div className="table-wrapper-scroll-y my-custom-scrollbar">
          <table className="table table-borderless table-hover scrollbar-primary table-sm">
            <tbody>
              {props.namePreco.map(item => {
                return (

                  <tr>
                    <td className='nome'>{item.name}</td>
                    <td >
                    <button onClick={()=>props.callbackParent(item.name,item.preco)} className=' btn btn-sm btn-carrinho' >
                 
                      <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="glyphicon glyphicon-minus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm2 7.5a.5.5 0 0 0 0 1h8a.5.5 0 0 0 0-1H4z" />
                      </svg>
                     
                      </button>

                    </td>
                    <td className='quantidade'>{item.quantidade}
                    </td>
                    <td className='preco'>
                     
                    
                      {`R$${item.preco}`}
                      
                      </td>
                      
                  </tr>

                )
              })}
              <tr>
                <td className='total'>Total</td>
                <td></td>
                <td></td>
                <td className='preco'>{`R$${precoTotal}`}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button className='btn btn-dark btn-block' >Finalizar</button>
      </ul>

      <div>

      </div>
    </div>
  )
}