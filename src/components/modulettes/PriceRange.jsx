
const PriceRange = ({price}) => {
    return (<div className={
      price < 40 ?
          "wish-price low-price"
      : price >= 200 ?
          "wish-price lux-price"
      : price >= 100 ?
          "wish-price high-price"
      :
          "wish-price med-price"
    }>
        £{price}
    </div>);
  };
  
  export default PriceRange;