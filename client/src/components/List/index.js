import React from 'react'

const List = props => {
  return (
    <ul className={`list-inline ${props.styling} mx-auto`}>
      {props.children}
    </ul>
  )
}

const ListItem = props => {
  return <li className={`${props.styling}`}>{props.children}</li>
}

export { List, ListItem }
