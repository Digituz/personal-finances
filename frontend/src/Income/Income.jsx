import React, {Component} from 'react';
import {Button, Card, Grid, InputLabel} from '@digituz/react-components';

class Income extends Component {
  constructor() {
    super();

    this.state = {
      income: {
        date: new Date(),
        description: '',
        value: 12,
      }
    };
  }

  updateField(field) {
    return (value) => {
      const income = {
        ...this.state.income,
        [field]: value,
      };

      if (income.date === null) income.date = new Date();

      this.setState({
        income,
      });
    };
  }

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
              placeholder="E.g. 25/03/2018"
              value={this.state.income.date}
              onBlur={this.updateField('date')}
              type="date"
            />
          </div>
          <div className="sm-12 md-6">
            <InputLabel
              inputId="value"
              label="Value"
              placeholder="E.g. 123.45"
              value={this.state.income.value}
              onBlur={this.updateField('value')}
              type="currency"
            />
          </div>
          <div className="sm-12">
            <InputLabel
              inputId="Data"
              label="Description"
              placeholder="E.g. Supermarket"
              value={this.state.income.description}
              onBlur={this.updateField('description')}
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
