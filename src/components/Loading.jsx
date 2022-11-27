import Spinner from 'react-bootstrap/Spinner';
import './Loading.css'

const Loading = () => {

  return(
    <>
       <Spinner className="spinner" animation="border" role="status"/>
    </>
  )
}

export default Loading;