import { useState } from "react" 
import PropType from "prop-types"

const Toggable = (prop) => {
    const [visible, setVisible] = useState()

    const hideWhenVisible = {display: visible ? "none" : ""}
    const showWhenVisible = {display: visible ? "" : "none"}

    const toggleVisibility = () => {
        setVisible(!visible)
    }
 
    return (
        <div>
            <div style={hideWhenVisible} className="heading">
                <p> {prop.children.props.blog ? prop.children.props.blog.title + " " + prop.children.props.blog.author : null}
                    <button className="open-btn" onClick={toggleVisibility}>{prop.buttonLabelOpen}</button>
                </p>
            </div>
            <div style={showWhenVisible} className="content">
               <p style={{margin: "0"}} > {prop.children.props.blog ? prop.children.props.blog.title : null}
               <button onClick={toggleVisibility}>{prop.buttonLabelClose}</button>
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