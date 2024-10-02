import { useState } from "react" 
import PropType from "prop-types"
import { Button } from "@mui/material"

const Toggable = (prop) => {
    const [visible, setVisible] = useState()

    const hideWhenVisible = {display: visible ? "none" : ""}
    const showWhenVisible = {display: visible ? "" : "none"}

    const toggleVisibility = () => {
        setVisible(!visible)
    }
 
    return (
        <div>
            <div style={hideWhenVisible}>
                {prop.children.props.blog ? prop.children.props.blog.title + " " + prop.children.props.blog.author : null}
                    <Button variant="contained" color="primary"  onClick={toggleVisibility}>{prop.buttonLabelOpen}</Button>
              
            </div>
            <div style={showWhenVisible} className="content">
               <p style={{margin: "0"}} > {prop.children.props.blog ? prop.children.props.blog.title : null}
               <Button variant="contained" color="primary"  onClick={toggleVisibility}>{prop.buttonLabelClose}</Button>
               </p>
                {prop.children}
            </div>
        </div>
    )

}

Toggable.propTypes = {
    children: PropType.node.isRequired,
    buttonLabelOpen: PropType.string.isRequired,
    buttonLabelClose: PropType.string.isRequired
}

export default Toggable;