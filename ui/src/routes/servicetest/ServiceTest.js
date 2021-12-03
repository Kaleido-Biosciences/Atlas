import React, { Component } from 'react';
import { Button } from 'ui';
import { api } from 'api';
import { createPlate } from 'models';
import { ComponentService } from 'services/ComponentService';

export class ServiceTest extends Component {
  state = {
    inputValue: '',
    messages: [],
  };
  handleInputChange = (e) => {
    this.setState({
      inputValue: e.currentTarget.value,
    });
  };
  addMessage = (message) => {
    this.setState({
      messages: [...this.state.messages, message],
    });
  };
  startTest = async () => {
    const activityName = this.state.inputValue;
    let activity,
      plateTypes,
      updatedPlates,
      plate,
      compound,
      attribute,
      testPlate;
    // Delete Activity
    try {
      this.addMessage('Delete activity pending');
      await api.deleteActivity(activityName);
      this.addMessage('Delete successful');
    } catch (error) {
      this.addMessage(`Delete failed: ${error.message}`);
    }
    // Get Activity
    try {
      this.addMessage('Get activity pending');
      activity = await api.fetchActivity(activityName);
      console.log('Activity', activity);
      this.addMessage('Get successful');
      this.addMessage(`${activity.plates.length} plates returned`);
      const plateWithErrors = activity.plates.find((plate) => {
        if (plate.wells.length > 0) return true;
        if (plate.plateType !== null) return true;
        if (plate.overviewPositionTop !== null) return true;
        if (plate.overviewPositionLeft !== null) return true;
        if (plate.updateDate === null) return true;
        else return false;
      });
      if (plateWithErrors) {
        this.addMessage('ERROR: Plate with errors found');
      } else {
        this.addMessage('Plates valid');
      }
    } catch (error) {
      this.addMessage(`Get failed: ${error.message}`);
    }
    // Get Plate Types
    try {
      this.addMessage('Get plate types pending');
      plateTypes = await api.fetchPlateTypes();
      console.log('Plate types', plateTypes);
      this.addMessage('Get successful');
      this.addMessage(`${plateTypes.length} types returned`);
    } catch (error) {
      this.addMessage(`Get failed: ${error.message}`);
    }
    // Set plate type
    try {
      const plateType = plateTypes.find((plateType) => {
        return plateType.name.includes('Unknown 96');
      });
      const plateId = activity.plates[0].id;
      this.addMessage('Set plate type pending');
      updatedPlates = await api.setPlateType([plateId], plateType.id);
      this.addMessage('Set successful');
      console.log('Plate', updatedPlates);
      if (updatedPlates[0]) {
        plate = updatedPlates[0];
        if (plate.plateType && plate.plateType.id === plateType.id) {
          this.addMessage('Plate type set correctly');
        } else {
          this.addMessage('ERROR: Plate type not set correctly');
        }
        if (plate.wells && plate.wells.length === 96) {
          this.addMessage('Plate wells created correctly');
        } else {
          this.addMessage('Plate wells not created correctly');
        }
      } else {
        this.addMessage('ERROR: Plate not returned');
      }
    } catch (error) {
      this.addMessage(`Get failed: ${error.message}`);
    }
    // Get components
    try {
      this.addMessage('Search components pending');
      const components = await api.searchComponents('c');
      this.addMessage('Search successful');
      console.log(components);
      this.addMessage(`${components.length} components returned`);
      compound = components.find((component) => component.type === 'BATCH');
      attribute = components.find(
        (component) => component.type === 'ATTRIBUTE'
      );
      console.log('Compound, attribute', compound, attribute);
    } catch (error) {
      this.addMessage(`Search failed: ${error.message}`);
    }
    // Save activity
    try {
      testPlate = createPlate(plate);
      console.log('Test plate', testPlate);
      compound = ComponentService.createComponent(compound);
      attribute = ComponentService.createComponent(attribute);
      compound.form.timepoints[0].concentrationUnit =
        compound.form.units.concentration[0];
      compound.form.timepoints[0].timeUnit = compound.form.units.time[0];
      attribute.form.value = 10;
      attribute.form.valueUnit = attribute.form.units.value[0];
      console.log('Components with values/units', compound, attribute);
      testPlate.wells[0].components = ComponentService.applyComponents(
        testPlate.wells[0].components,
        [compound, attribute]
      );
      console.log('Test plate', testPlate);
      this.addMessage('Save activity pending');
      const saveResponse = await api.saveActivity(activity.name, [testPlate]);
      this.addMessage('Save successful');
      console.log('Save response', saveResponse);
    } catch (error) {
      this.addMessage(`Save failed: ${error.message}`);
    }
    // Get to verify save
    try {
      this.addMessage('Get activity pending');
      activity = await api.fetchActivity(activityName);
      console.log('Activity', activity);
      this.addMessage('Get successful');
      this.addMessage(`${activity.plates.length} plates returned`);
      if (activity.components.length !== 2) {
        this.addMessage('ERROR: Incorrect components array length');
      } else {
        this.addMessage('Correct components array length');
      }
      const compoundFound = activity.components.find(
        (component) => component.id === compound.data.id
      );
      const attributeFound = activity.components.find(
        (component) => component.id === attribute.data.id
      );
      if (compoundFound && attributeFound) {
        this.addMessage('Correct components in array');
      } else {
        this.addMessage('ERROR: Incorrect components in array');
      }
      const updatedPlate = activity.plates.find(
        (plate) => plate.id === testPlate.id
      );
      const well = updatedPlate.wells[0];
      if (well.components.length === 2) {
        this.addMessage('Correct well components array length');
      } else {
        this.addMessage('ERROR: Incorrect components array length');
      }
      console.log('Updated plate', updatedPlate);
      const wellCompound = well.components.find(
        (component) => component.id === compound.data.id
      );
      if (!wellCompound) {
        this.addMessage('ERROR: Component not found');
      } else {
        if (
          wellCompound.fields.timepoints &&
          wellCompound.fields.timepoints[0] &&
          wellCompound.fields.timepoints[0].concentration === 0.5 &&
          wellCompound.fields.timepoints[0].concentrationUnit &&
          wellCompound.fields.timepoints[0].time === 0 &&
          wellCompound.fields.timepoints[0].timeUnit
        ) {
          this.addMessage('Timepoint correct');
        } else {
          this.addMessage('ERROR: Incorrect timepoint');
        }
      }
      const wellAttribute = well.components.find(
        (component) => component.id === attribute.data.id
      );
      if (!wellAttribute) {
        this.addMessage('ERROR: Attribute not found');
      } else {
        if (
          wellAttribute.fields.value &&
          wellAttribute.fields.value === 10 &&
          wellAttribute.fields.valueUnit
        ) {
          this.addMessage('Attribute correct');
        } else {
          this.addMessage('ERROR: Incorrect attribute');
        }
      }
      const remainingWells = updatedPlate.wells.slice(1);
      console.log(remainingWells);
      const wellWithComponents = remainingWells.find(
        (well) => well.components.length > 0
      );
      if (wellWithComponents) {
        this.addMessage('ERROR: Well with components found');
      }
    } catch (error) {
      this.addMessage(`Get failed: ${error.message}`);
    }
  };
  render() {
    return (
      <div className="p-4">
        <div className="flex flex-row items-center">
          <input
            type="text"
            name="activity"
            id="activity"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-40 text-xs p-2 mr-2 border-gray-300 rounded-md"
            placeholder="Enter activity name"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
          <Button content="Start Test" onClick={this.startTest} />
        </div>
        <div className="mt-2 text-xs">
          {this.state.messages.map((message, i) => {
            if (message.startsWith('ERROR')) {
              return (
                <div className="font-bold" key={`message${i}`}>
                  {message}
                </div>
              );
            } else {
              return <div key={`message${i}`}>{message}</div>;
            }
          })}
        </div>
      </div>
    );
  }
}
