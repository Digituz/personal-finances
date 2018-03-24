import React, {Component} from 'react';
import {Button, Card, Grid, InputLabel} from '@digituz/react-components';

class Income extends Component {
  render() {
    return (
      <Card
        title="Incomes"
        className="sm-12 md-10 md-pad-1 lg-8 lg-pad-2">
        <Grid>
          <div className="sm-12 md-6">
            <InputLabel
              inputId="date"
              label="Date"
              placeholder="E.g. 14/3/2018"
              value=""
            />
          </div>
          <div className="sm-12 md-6">
            <InputLabel
              inputId="value"
              label="Value"
              placeholder="E.g. 123.45"
              value=""
            />
          </div>
          <div className="sm-12">
            <InputLabel
              inputId="Data"
              label="Description"
              placeholder="E.g. Supermarket"
              value=""
            />
          </div>
          <div className="sm-12">
            <Button onClick={() => {}} text="Save" />
          </div>
        </Grid>
      </Card>
    );
  }
}

export default Income;
