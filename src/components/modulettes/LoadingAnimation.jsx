import Lottie from "lottie-react";
import giftAnimation from "../../assets/animations/gift.json"

const LoadingAnimation = ({price}) => {
    return (<Lottie className='max-w-1125' animationData={giftAnimation} />);
  };
  
  export default LoadingAnimation;