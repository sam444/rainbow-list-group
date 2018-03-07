import {Component} from "rainbowui-core";
import PropTypes from "prop-types";

export default class ListGroup extends Component {
    render() {
        return (
            <ul className="list-group list-group-container">
                {
                    this.renderList(this)
                }
            </ul>
        );
    }

    renderList(component) {
        let children = component.props.children;
        if(!$.isArray(children)){
            children = [children];
        }
        if ( children != null) {
            return children.map(function(item){
                return item;
            });
        }
    }


};

ListGroup.propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
    styleClass: PropTypes.string
};

