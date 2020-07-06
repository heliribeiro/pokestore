import React, { useState, useEffect } from 'react';
import './App.css';
import './Cards';
import Cards from './Cards';
import Cabecalho from './Cabecalho'
import Carrinho from './Carrinho'
import axios from 'axios';

function App() {


  const [pokemonAtributos, setPokemonAtributos] = useState([])
  const [namePreco, setNamePreco] = useState([])

  const numeroCards = 9

  useEffect(() => {
    const urlBase = `https://pokeapi.co/api/v2/pokemon?&limit=${numeroCards}`
    const fetchPokemon = async () => {
      let response = await axios.get(urlBase)

      let pokemon = response.data.results
      let nImage = 0;
      let pokemonFinal = pokemon.map(element => {

        const pokemonComPreco = {
          name: element.name,
          url: element.url,
          preco: (Math.random() * 1000).toFixed(2),
          nImage: ++nImage
        }

        return (
          pokemonComPreco
        )

      });

      setPokemonAtributos(pokemonFinal)

    }
    fetchPokemon()
  }, [])


  function handleClickCard(name, preco) {

    let array =
    {
      name: name,
      preco: Number(preco),
      quantidade: 1
    }


    const indice = namePreco.findIndex(item => item.name === name)

    if (indice === -1) {
      setNamePreco(
        [...namePreco, array]
      )
    }
    else {
      const atual = namePreco[indice]
      const precoAtualizado = (Number(atual.preco) + Number(array.preco)).toFixed(2)
      const objetoAtualizar = {
        ...atual,
        preco: precoAtualizado,
        quantidade: parseInt(precoAtualizado / array.preco)
      }

      namePreco.splice(indice, 1, objetoAtualizar)

      setNamePreco(
        [...namePreco]
      )
    }
  }

  function handleClickMinus(name, preco) {
    const pokemon = pokemonAtributos.find(pokemon => pokemon.name === name)
    const indice = namePreco.findIndex(item => item.name === name)
    const atual = namePreco[indice]

    const pokemonPreco = pokemon.preco
    const precoAtualizado = (Number(preco) - Number(pokemonPreco)).toFixed(2)

    const objetoAtualizar = {
      ...atual,
      preco: precoAtualizado,
      quantidade: parseInt(precoAtualizado / pokemonPreco)
    }

    if (objetoAtualizar.quantidade === 0) {
      namePreco.splice(indice, 1)
      setNamePreco([...namePreco])
      return
    }

    namePreco.splice(indice, 1, objetoAtualizar)
    setNamePreco([
      ...namePreco
    ])

  }

  console.log(namePreco)

  return (
    <div className="container">
      <div className='row'>

        <Cabecalho />
        <Cards callbackParent={(name, preco) => handleClickCard(name, preco)} pokemonAtributos={pokemonAtributos} />
        <Carrinho callbackParent={(name, preco) => handleClickMinus(name, preco)} namePreco={namePreco} pokemonAtributos={pokemonAtributos} />
       
      </div>
      <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>

    </div>
  );

}

export default App;
