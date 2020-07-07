import React, { useState, useEffect } from 'react';
import './App.css';
import './Cards';
import Cards from './Cards';
import Cabecalho from './Cabecalho'
import Carrinho from './Carrinho'
import axios from 'axios';
import Pagination from './Pagination'

function App() {


  const [pokemonAtributos, setPokemonAtributos] = useState([])
  const [namePreco, setNamePreco] = useState([])
  const [loadingPage, setLoadingPage] = useState(false)
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [cardsPerPage] = useState(9)
  const [totalCards] = useState(243)


  // let arrayPokemons = props.pokemonAtributos.reduce((total,current,index)=>{
  //   const belongArrayIndex = Math.ceil((index+1)/ ITEMS_PAGINA) -1
  //   total[belongArrayIndex] ? total[belongArrayIndex].push(current): total.push([current])
  //   return total
  // },[])
  
  useEffect(() => {
    const fetchPokemon = async () => {
     setLoadingPage(true)

      let pokemonArray = []
      let result
      for (let i = 1; i<= totalCards; i++){
        result =  await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
        pokemonArray.push(result.data)
        
      }

      let nImage = 0;
      let pokemonFinal = pokemonArray.map(element => {

        const pokemonComPreco = {
          name: element.name,
          preco: element.base_experience * element.height,
          nImage: ++nImage,
        }

        return (
          pokemonComPreco
        )

      })
  
     
      setPokemonAtributos(pokemonFinal)

      setLoadingPage(false)
    }

    fetchPokemon()




  }, [totalCards])
 

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
  
 const paginate = number => setPaginaAtual(number)

  const indexOfLastCard = paginaAtual * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentCards = pokemonAtributos.slice(indexOfFirstCard,indexOfLastCard)

  return (
    <div className="container">
      <div className='row'>

        <Cabecalho />
        <Cards 
        callbackParent={(name, preco) => handleClickCard(name, preco)}
        pokemonAtributos={currentCards}
        loadingPage={loadingPage}
        />
        <Carrinho callbackParent={(name, preco) => handleClickMinus(name, preco)} namePreco={namePreco} />
        <Pagination totalCards={totalCards} cardsPerPage={cardsPerPage} paginate={paginate}/>
  
      </div>
    
    </div>
  );

}

export default App;
