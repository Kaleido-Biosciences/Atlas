import { connect } from 'react-redux';
import { Activity } from './Activity';
import { activity } from 'store';

const mapState = (state, props) => {
  return {
    activeView: activity.selectActiveView(state),
    deleteActivityStatus: activity.selectDeleteActivityStatus(state),
    name: activity.selectName(state),
    saveError: activity.selectSaveError(state),
    savePending: activity.selectSavePending(state),
    updateDate: activity.selectUpdateDate(state),
    views: activity.selectViews(state),
  };
};

const mapDispatch = {
  onDeleteActivity: activity.deleteActivity,
  onSave: activity.saveActivity,
  onViewTabClick: activity.setActiveView,
};

const connected = connect(mapState, mapDispatch)(Activity);
export { connected as Activity };
