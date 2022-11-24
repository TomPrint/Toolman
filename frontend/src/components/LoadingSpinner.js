import { Dna } from  'react-loader-spinner'

const LoadingSpinner = () => {
    return (  
        (<Dna
            visible={true}
            height="180"
            width="200"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />)
    );
}
 
export default LoadingSpinner;