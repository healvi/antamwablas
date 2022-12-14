const findTrue = (obj) => {
 const data =  Object.keys(obj).filter(
    (key) => obj[key]
  )
  return data
};

const findFalse = (obj) => {
 const data =  Object.keys(obj).filter(
    (key) => !obj[key]
  )
  return data
};

export {findTrue, findFalse}