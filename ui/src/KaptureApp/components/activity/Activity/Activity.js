import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Overview } from '../Overview';
import { MultiPlateTable } from '../MultiPlateTable';
import { PlateTable } from '../PlateTable';
import { ViewTabs } from '../ViewTabs';
import { Header } from '../Header';
import { PlateEditor } from '../PlateEditor';
import SplitPane from 'react-split-pane';
import styles from './Activity.module.css';
import { ActivitySidebar } from '../../ActivitySidebar';

export class Activity extends Component {
  renderActiveView() {
    const { activeView } = this.props;
    if (activeView.type === 'Overview') {
      return <Overview view={activeView} />;
    } else if (activeView.type === 'MultiPlateTable') {
      return <MultiPlateTable view={activeView} />;
    } else if (activeView.type === 'PlateTable') {
      return (
        <PlateTable view={activeView} onWellClick={this.props.onWellClick} />
      );
    } else if (activeView.type === 'PlateEditor') {
      return <PlateEditor view={activeView} />;
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
            <div>
              <ActivitySidebar />
            </div>
          </SplitPane>
        </div>
      </div>
    );
  }
}

Activity.propTypes = {
  activeView: PropTypes.object.isRequired,
  name: PropTypes.string,
  onWellClick: PropTypes.func,
  onViewTabClick: PropTypes.func,
  views: PropTypes.array.isRequired,
};
