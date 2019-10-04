import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg'

import './styles.css';

export default function New({ history }){
  const [thumbnail, setThumbnail] = useState(null);
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail])

  async function handleSubmit(event){

    //Previnindo ele de recarregar a página, para o envio dos arquivos e redirecionando "history"
    event.preventDefault();

    //Forma de enviar multipartform - o que o backend está esperando
    const data = new FormData();

    const user_id = localStorage.getItem('user');

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);

    await api.post('./spots', data,{
      headers: {user_id}
    });

    //Pegando o histórico de navegação do usuário e enviando ele de volta porém tem que ser adicionado o "PreventDefault"
    history.push('/dashboard');
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label
        id="thumbnail"
        style={{backgroundImage: `url(${preview})`}}
        className={thumbnail ? 'has-thumbnail': ''}
        >
          <input type="file" onChange={event => setThumbnail(event.target.files[0])} name="" id=""/>
          <img src={camera} alt="Select IMG"/>
        </label>

        <label htmlFor="company">EMPRESA*</label>
        <input
        type="text"
        placeholder="Sua empresa"
        id="company"
        value={company}
        onChange={event => setCompany(event.target.value)}
        />

        <label htmlFor="company">TECNOLOGIAS* <span>(separadas por vírgula)</span> </label>
        <input
        type="text"
        placeholder="Quais Técnologias usam"
        id="techs"
        value={techs}
        onChange={event => setTechs(event.target.value)}
        />

      <label htmlFor="company">VALOR DIÁRIA* <span>(em branco para grátuito)</span> </label>
        <input
        type="number"
        min="0" max="100"
        placeholder="Valor por dia"
        id="price"
        value={price}
        onChange={event => setPrice(event.target.value)}
        />

        <button type="submit" className="btn">Cadastrar</button>
      </form>
    </>
  )
}