const Ship = (len) => {

  const hits = [];

  const hit = (index) => {
    if (hits.includes(index) || index > len || index < 0) return;
    hits.push(index);
  }

  const isSunk = () => hits.length === len;

  return {
    len,
    hits,
    hit,
    isSunk, 
  };
};

export { Ship };
