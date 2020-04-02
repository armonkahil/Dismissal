import React from 'react'

export const Container = props => {
  return (
    <>
      {props.styling ? (
        <div className={`container ${props.styling}`}>
          {props.children}
        </div>
      ) : (
        <div className='container'>{props.children}</div>
      )}
    </>
  )
}

export const Column = props => {
  let size
  props.size
    ? // if size prop passed to this component, map col-size to class Name
      (size = props.size
        .split(' ')
        .map(size => `col-${size}`)
        .join(' '))
    : // if not, just set the class to col
      (size = 'col')
  let styling
  props.styling ? (styling = props.styling) : (styling = '')
  return <div className={`${size} ${styling}`}>{props.children}</div>
}

export const Row = ({ styling, children }) => {
  return (
    <>
      {styling ? (
        <div className={`row ${styling}`}>{children}</div>
      ) : (
        <div className='row'>{children}</div>
      )}
    </>
  )
}
