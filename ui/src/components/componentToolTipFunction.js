import React from 'react';
import {List} from "semantic-ui-react";

export function formatDate(iso_text){
  let d = new Date(iso_text),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}
export function getToolTip(component){
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
            <List.Item><List.Header>Created date</List.Header>{formatDate(component.data.dateCreated)}</List.Item> :''
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
            <List.Item><List.Header>Registration date</List.Header>{formatDate(component.data.registrationDate)}</List.Item> :''
          }
          {component.data.source ?
            <List.Item><List.Header>Source</List.Header>{component.data.source}</List.Item> :''
          }
        </List>
      );
    default:
      return '';
  }
}
