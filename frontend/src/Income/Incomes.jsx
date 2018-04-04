import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Card, Button, Dropdown, NotificationManager, Table} from '@digituz/react-components';
import {maskCurrency} from 'mask-js';
import * as PersonalFinances from '../Services/PersonalFinances';

class Incomes extends Component {
  constructor() {
    super();
    this.editIncome = this.editIncome.bind(this);
    this.state = {
      data: [],
    }
  }

  editIncome(income) {
    this.props.history.push(`/incomes/${income._id}`);
  }

  newIncome() {
    this.props.history.push('/income');
  }

  deleteIncome(income) {
    PersonalFinances.remove(income._id)
      .then(() => {
        this.props.history.push('/incomes');
        NotificationManager.success('Income removed successfully.');
        this.loadIncomes();
      })
      .catch((err) => {
        if (err.message && typeof err.message === 'string') return NotificationManager.danger(err.message);
        NotificationManager.danger('Something went wrong.');
      });
  }

  componentDidMount() {
    this.loadIncomes();
  }

  loadIncomes() {
    const data = PersonalFinances.get();
    this.setState({
      data,
    });
  }

  render() {
    const valueRenderer = (income) => (<span>{maskCurrency(income.value)}</span>);
    const actionRenderer = (income) => {
      const dropdownOptions = [
        { label: 'Edit', default: true, onClick: () => { this.editIncome(income) }},
        { label: 'Make a Copy', onClick: () => { this.editIncome(income) }},
        { label: 'Delete', onClick: () => { this.deleteIncome(income) }},
      ];
      return (
        <Dropdown options={dropdownOptions} />
      );
    };

    const columns = [
      { title: 'Description', property: 'description' },
      { title: 'Value', columnClass: 'center', render: valueRenderer },
      { title: 'Actions', columnClass: 'center clearfix', render: actionRenderer},
    ];
    return (
      <Card className="sm-12 md-10 md-pad-1 lg-8 lg-pad-2" title="Incomes">
        <Button onClick={() => { this.newIncome() }} text="New Income" />
        <Table data={this.state.data} columns={columns} />
      </Card>
    );
  }
}

export default withRouter(Incomes);
