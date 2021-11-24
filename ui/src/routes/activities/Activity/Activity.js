import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Overview } from './Overview';
import { PlateTable } from './PlateTable';
import { ViewTabs } from './ViewTabs';
import { Header } from './Header';
import { PlateEditor } from './PlateEditor';
import SplitPane from 'react-split-pane';
import styles from './Activity.module.css';
import { Sidebar } from './Sidebar';

export class Activity extends Component {
  renderActiveView() {
    const { activeView } = this.props;
    if (activeView) {
      switch (activeView.id) {
        case 'Overview':
          return <Overview view={activeView} />;
        case 'PlateTable':
          return <PlateTable view={activeView} />;
        case 'PlateEditor':
          return <PlateEditor view={activeView} />;
        default:
          return <div>No view selected</div>;
      }
    } else return <div>No view selected</div>;
  }
  handleDeleteActivity = () => {
    this.props.onDeleteActivity(this.props.name);
  };
  render() {
    return (
      <div className={styles.activity}>
        <Header
          name={this.props.name}
          deleteActivityStatus={this.props.deleteActivityStatus}
          onDeleteActivity={this.handleDeleteActivity}
          onSave={this.props.onSave}
          updateDate={this.props.updateDate}
        />
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
            <Sidebar />
          </SplitPane>
        </div>
      </div>
    );
  }
}

Activity.propTypes = {
  activeView: PropTypes.object.isRequired,
  deleteActivityStatus: PropTypes.string,
  name: PropTypes.string,
  onDeleteActivity: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  onViewTabClick: PropTypes.func,
  updateDate: PropTypes.string,
  views: PropTypes.array.isRequired,
};
