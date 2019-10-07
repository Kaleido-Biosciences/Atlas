import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Icon, Label, Popup, List} from 'semantic-ui-react';
import { ComponentTypeCircle } from '../ComponentTypeCircle';

import styles from './ComponentList.module.css';

export class Component extends React.Component {

  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick({ component: this.props.component });
    }
  };
  getToolTip = () =>{
    const component = this.props.component;
    const text = '';
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
              <List.Item><List.Header>Created date</List.Header>{component.data.dateCreated}</List.Item> :''
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
              <List.Item><List.Header>Registration date</List.Header>{component.data.registrationDate}</List.Item> :''
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

  render() {
    const { component, count } = this.props;
    const componentClass = classNames(styles.component, {
      [styles.notUsed]: !count,
    });
    return (
      <div onClick={this.handleClick} className={componentClass}>
        <Popup
          position='top center'
          trigger={
            <div>
              <ComponentTypeCircle type={component.type} className={styles.typeCircle}/>{component.displayName}
            </div>
          }
        >
          <Popup.Content>
            {this.getToolTip()}
          </Popup.Content>
        </Popup>
          {count && <Label className={styles.componentLabel}>{count}</Label>}
        <Icon cname={'circle info'} color={'green'} size={'small'}/>
      </div>
    );
  }
}

Component.propTypes = {
  component: PropTypes.object.isRequired,
  count: PropTypes.number,
  onClick: PropTypes.func,
};
