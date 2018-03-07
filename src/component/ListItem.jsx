import {OnClickEvent, Component, Param} from "rainbowui-core";
import {Util} from 'rainbow-foundation-tools';
import PropTypes from "prop-types";
export default class ListItem extends Component {

    render() {
        if (!Util.parseBool(this.props.visibled)) {
            return null;
        }
        let tempClass = 'list-group-item list-group-item-action justify-content-between';
        if (this.props.styleClass) {
            tempClass += ' list-group-item-' + this.props.styleClass;
        }

        if (this.props.render) {
            return (
                <li className={tempClass}>
                    {this.props.render()}
                </li>
            );
        } else {
            return this.renderDefault();
        }
    }

    renderDefault() {
        if (!Util.parseBool(this.props.visibled)) {
            return null;
        }
        let tempClass = 'list-group-item list-group-item-action justify-content-between';
        if (this.props.styleClass) {
            tempClass += ' list-group-item-' + this.props.styleClass;
        }

        let badgeClass = "badge badge-pill";
        if (this.props.badgeClass) {
            badgeClass += ' badge-' + this.props.badgeClass;
        }
        return (
            <li className={tempClass}>
                {this.renderValue()}
                {this.props.children}
                {
                    this.props.badge ?
                        <span className={badgeClass}>{this.props.badge}</span> :
                        null
                }
            </li>
        );
    }

    renderValue() {
        if (Object.prototype.toString.call(this.props.value) == '[object String]') {
            return (
                <a className={this.props.disabled} href="javascript: void (0);" onClick={this.onClickItem.bind(this)}>
                    <i className={this.props.icon}/>
                    <span>
                        {this.props.value}
                    </span>
                </a>
            );
        } else if (Object.prototype.toString.call(this.props.value) == '[object Function]') {
            return this.props.value();
        } else {
            return (
                <a className={this.props.disabled} href="javascript: void (0);" onClick={this.onClickItem.bind(this)}>
                    <i className={this.props.icon}/>
                    <span/>
                </a>
            );
        }
    }

    onClickItem(event){
        event.preventDefault();
        if(this.getDisabled() == "disabled"){
            return;
        }

        if(this.props.onClick) {
            this.props.onClick(new OnClickEvent(this, event, Param.getParameter(this)));
        }
    }

    getDisabled(){
        if(Util.parseBool(this.props.disabled)){
            return " disabled";
        }
        return "";
    }
};

ListItem.propTypes = {
    id: PropTypes.string,
    icon: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    badge: PropTypes.string,
    badgeClass: PropTypes.string,
    disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    visibled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    onClick: PropTypes.func
};

ListItem.defaultProps = {
    disabled: false,
    visibled: true,
    badgeClass: 'default'
};