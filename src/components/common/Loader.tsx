import { Spinner } from "react-bootstrap";
import "../../styles/CustomStyles.css"

const Loader = ({onCancel}:{onCancel:()=>void})=>{
    return(
        <div className="modal-overlay">
            <div className="modal-content text-center">
             <button className="close-button" onClick={onCancel}>x</button>
             <Spinner animation="border" variant="primary" className="large-spinner"/>
             <p className="mt-3">Searching for providers...</p>
            </div>
        </div>
    )
}

export default Loader