import { Button } from "antd"
import Search from "antd/lib/input/Search"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { COUNTRIES } from "../../redux/modules/region"
import { getRegionDataAsync } from "../../redux/modules/region"

export default () => {
  const [searchText, setSearchText] = useState("")
  const dispatch = useDispatch()

  return (
    <Container>
      <Search
        placeholder="Search for Region"
        allowClear
        color="secondary"
        enterButton="Search"
        size="large"
        onChange={(e) => setSearchText(e.target.value)}
      />
      {searchText !== "" && (
        <ul>
          {Object.keys(COUNTRIES)
            .filter((region) =>
              region.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((region) => (
              <li
                key={region}
                onClick={() => {
                  dispatch(getRegionDataAsync(COUNTRIES[region]))
                  setSearchText("")
                }}
              >
                <span>{region}</span>
                <Button>Load</Button>
              </li>
            ))}
        </ul>
      )}
    </Container>
  )
}

const Container = styled.div`
  margin: auto;
  position: relative;
  ul {
    list-style-type: none;
    margin: 0;
    position: absolute;
    background: white;
    width: 100%;
    margin-top: 1em;
    padding: 0;
    box-shadow: 3px 3px 5px 6px #1890ff1f;
    li {
      padding: 0.25em 1em;
      &:hover {
        background: #1890ff;
        color: white;
      }
      cursor: pointer;
      display:flex;
      justify-content:space-between;
      align-items:center;
    }
  }
`

// li:first {
//   padding-top: 0.5em;
// }
// li:last {
//   padding-bottom: 0.5em;
// }
