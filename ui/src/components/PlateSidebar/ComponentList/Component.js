import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Label, Popup, List} from 'semantic-ui-react';
import { ComponentTypeCircle } from '../ComponentTypeCircle';

import styles from './ComponentList.module.css';

export class Component extends React.Component {

  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick({ component: this.props.component });
    }
  };

  formatDate(iso_text){
    let d = new Date(iso_text),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  };

  getToolTip = () =>{
    const component = this.props.component;
    switch(component.type) {
      case 'compound':
        return(
          <List>
            {component.data.aveDP ?
              <List.Item><List.Header>Avg. DP</List.Header>{component.data.aveDP.toFixed(2)}</List.Item> :''
            }
            {component.data.glycanComposition ?
              <List.Item><List.Header>Glycan composition</List.Header>{component.data.glycanComposition}</List.Item> :''
            }
            {component.data.dataRecordName ?
              <List.Item><List.Header>Data record name</List.Header>{component.data.dataRecordName}</List.Item> :''
            }
            {component.data.createdBy ?
              <List.Item><List.Header>Created by</List.Header>{component.data.createdBy}</List.Item> :''
            }
            {component.data.dateCreated ?
              <List.Item><List.Header>Created date</List.Header>{this.formatDate(component.data.dateCreated)}</List.Item> :''
            }
            {component.data.notes ?
              <List.Item><List.Header>Notes</List.Header>{component.data.notes}</List.Item> :''
            }
          </List>
        );
      case 'supplement':
        return(
          <List>
            {component.data.registrationDate ?
              <List.Item><List.Header>Registration date</List.Header>{this.formatDate(component.data.registrationDate)}</List.Item> :''
            }
            {component.data.source ?
              <List.Item><List.Header>Source</List.Header>{component.data.source}</List.Item> :''
            }
          </List>
        );
      default:
        return '';
    }
  };

  renderComponentDetails() {
    const {component} = this.props;
    if (component.type === 'compound' || component.type === 'supplement') {
      return (
        <Popup
          position='top center'
          trigger={
            <div>
              <ComponentTypeCircle type={component.type} className={styles.typeCircle}/>{component.displayName}
            </div>
          }>
          <Popup.Content> {this.getToolTip()} </Popup.Content>
        </Popup>
      )
    } else {
      return (
        <div>
          <ComponentTypeCircle type={component.type} className={styles.typeCircle}/>{component.displayName}
        </div>
      )
    }
  }

  render() {
    const { count } = this.props;
    const componentClass = classNames(styles.component, {
      [styles.notUsed]: !count,
    });
    return (
      <div onClick={this.handleClick} className={componentClass}>
        {this.renderComponentDetails()}
          {count && <Label className={styles.componentLabel}>{count}</Label>}
      </div>
    );
  }
}

Component.propTypes = {
  component: PropTypes.object.isRequired,
  count: PropTypes.number,
  onClick: PropTypes.func,
};
