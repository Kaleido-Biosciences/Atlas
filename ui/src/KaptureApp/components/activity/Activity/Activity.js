import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Overview } from '../Overview';
import { MultiPlateTable } from '../MultiPlateTable';
import { PlateTable } from '../PlateTable';
import { ViewTabs } from '../ViewTabs';
import { Header } from '../Header';
import { Editor } from '../Editor';
import SplitPane from 'react-split-pane';
import styles from './Activity.module.css';

export class Activity extends Component {
  renderActiveView() {
    const { activeView } = this.props;
    if (activeView.type === 'Overview') {
      return <Overview view={activeView} onAddPlate={this.props.onAddPlate} />;
    } else if (activeView.type === 'MultiPlateTable') {
      return <MultiPlateTable view={activeView} />;
    } else if (activeView.type === 'PlateTable') {
      return <PlateTable view={activeView} />;
    } else if (activeView.type === 'Editor') {
      return <Editor view={activeView} />;
    }
  }
  render() {
    return (
      <div className={styles.activity}>
        <Header name={this.props.name} />
        <div className={styles.container}>
          <SplitPane
            primary="second"
            defaultSize={300}
            minSize={200}
            pane1Style={{ overflow: 'hidden' }}
            pane2Style={{ height: '100%' }}
          >
            <div className={styles.leftPanelContainer}>
              <ViewTabs
                views={this.props.views}
                onTabClick={this.props.onViewTabClick}
              />
              <div className={styles.activeView}>{this.renderActiveView()}</div>
            </div>
            <div>sidebar</div>
          </SplitPane>
        </div>
      </div>
    );
  }
}

Activity.propTypes = {
  activeView: PropTypes.object.isRequired,
  name: PropTypes.string,
  onAddPlate: PropTypes.func,
  onViewTabClick: PropTypes.func,
  views: PropTypes.array.isRequired,
};
