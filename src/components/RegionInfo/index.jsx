import { Tag } from "antd"
import React from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"

export default () => {
  const { regions, selected } = useSelector((state) => state.regions)
  const {
    name,
    capital,
    currencies,
    flag,
    languages,
    numericCode,
    population,
    timezones,
  } = regions[selected]
  return (
    <Container>
      <h1>{name}</h1>
      <h4>
        <b>Capital -</b> {capital}
      </h4>
      <img src={flag} height={30} />
      <label>Currency</label>
      <p>
        {currencies[0].name} <span>{currencies[0].symbol}</span>
      </p>
      <label>Population</label>
      <p>{population}</p>
      <label>Language</label>
      <p>{languages[0].name}</p>
      <label>Population</label>
      <p>{population}</p>
      <label>Numeric Code</label>
      <p>{numericCode}</p>
      <label>Timezones</label>
      <br/>
      {timezones.map((t) => (
        <Tag color="blue">{t}</Tag>
      ))}
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  right: 0;
  margin-right: 1em;
  top: 50%;
  z-index: 999;
  height: fit-content;
  width: 250px;
  background: white;
  transform: translateY(-50%);
  padding: 1em;
  border-radius: 7px;
  box-shadow: 3px 3px 5px 6px #00000012;
  img {
    display: block;
    margin: 1em 0;
  }
  p {
    margin-bottom: 0.3em;
  }
  label {
    font-weight: bold;
    text-transform: uppercase;
    font-size: 10px;
    color: #434343;
  }
  h1 {
    margin-bottom: 0.3em;
  }
  h4 {
    b {
      margin-right: 0.4em;
    }
  }
`
