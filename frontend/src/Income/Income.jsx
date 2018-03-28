import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Button, Card, Grid, InputLabel, NotificationManager} from '@digituz/react-components';
import * as PersonalFinances from '../Services/PersonalFinances';

class Income extends Component {
  constructor() {
    super();

    this.state = {
      id: null,
      income: {
        date: new Date(),
        description: '',
        value: 0,
      }
    };
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    if (!id) return;
    const income = (await PersonalFinances.get(id));
    this.setState({
      id,
      income,
    });
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
    if (this.state.id) {
      return PersonalFinances
        .update(this.state.id, this.state.income)
        .then(() => {
          this.props.history.push('/incomes');
          NotificationManager.success('Income updated successfully.');
        })
        .catch((err) => {
          if (err.message && typeof err.message === 'string') return NotificationManager.danger(err.message);
          NotificationManager.danger('Something went wrong.');
        });
    }
    PersonalFinances
      .insert(this.state.income)
      .then(() => {
        this.props.history.push('/incomes');
        NotificationManager.success('Income inserted successfully.');
      })
      .catch((err) => {
        if (err.message && typeof err.message === 'string') return NotificationManager.danger(err.message);
        NotificationManager.danger('Something went wrong.');
      });
  }

  goBack() {
    this.props.history.goBack();
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
            <Button className="margin-right" onClick={() => { this.save() }} text="Save" />
            <Button className="default" onClick={() => { this.goBack() }} text="Return" />
          </div>
        </Grid>
      </Card>
    );
  }
}

export default withRouter(Income);
