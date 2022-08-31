export const fetchPosts = (socket) => {
  return async (dispatch) => {
    socket.on('connect', () => {
      console.log('подключение установлено')
    })
    socket.emit('start');
    await socket.on('ticker', (quotes) => {
      dispatch({
        type: "FETCH_QUOTES",
        payload: quotes
      })
    });
  }
}

export const changeInterval = (socket, customInterval) => {
  return () => {
    socket.on('connect', () => {
      console.log('подключение установлено')
    })
    socket.emit("changeInterval", customInterval, (response) => {
      console.log(response);
    });
    socket.emit('start');
  }
}

export const addQuote = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "ADD_QUOTE",
      payload: payload
    })
  }
}

export const updateQuote = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_QUOTE",
      payload: payload
    })
  }
}

export const removeQuote = (name) => {
  return (dispatch) => {
    dispatch({
      type: "REMOVE_QUOTE",
      payload: name
    })
  }
}
