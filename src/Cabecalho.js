import React from 'react'

export default function Cabecalho() {
    return (
        <nav className="navbar navbar-dark bg-dark col-12">
        <a href= './App' className="navbar-brand">PokeStore</a>
        <form className="form-inline">
          <input className="form-control mr-sm-2" type="search" placeholder="Ex: pikachu" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="
          ">Pesquisar</button>
        </form>
      </nav>
    )
}