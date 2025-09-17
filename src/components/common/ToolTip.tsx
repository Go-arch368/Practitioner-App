import { Overlay, OverlayTrigger,Tooltip } from "react-bootstrap";
import "../../styles/CustomStyles.css"
import React from "react";


interface ToolTipProps{
    text:string;
    tooltip_testid:string
}

const ToolTip : React.FC<ToolTipProps> = ({text,tooltip_testid}) =>{
    return(
       <OverlayTrigger placement="top" overlay={<Tooltip id={`tooltip-${tooltip_testid}`}>{text}</Tooltip>}>
           <span className="custom-color">
              <i className="fa-solid fa-circle-question primary" data-testid={tooltip_testid}/>
            </span>
       </OverlayTrigger>
    )
}

export default ToolTip