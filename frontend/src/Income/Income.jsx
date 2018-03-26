import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Button, Card, Grid, InputLabel} from '@digituz/react-components';
import * as PersonalFinances from '../Services/PersonalFinances';

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

  save() {
    PersonalFinances
      .insert(this.state.income)
      .then(() => {
        this.props.history.push('/incomes');
        this.props.showModal('Income Created', 'Done, you just inserted a new income transaction.');
      })
      .catch((err) => {
        console.log('Something went wrong');
        console.log(err);
      });
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
            <Button onClick={() => { this.save() }} text="Save" />
          </div>
        </Grid>
      </Card>
    );
  }
}

Income.propTypes = {
  showModal: PropTypes.func.isRequired,
};

export default withRouter(Income);
