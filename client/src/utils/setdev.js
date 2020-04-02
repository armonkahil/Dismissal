const devSocket =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_SOCKETDEV
    : process.env.REACT_APP_SOCKETPROD

export default devSocket
