import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Card, Button, DropDown, NotificationManager, Table} from '@digituz/react-components';
import {maskCurrency, maskDate} from 'mask-js';
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
    const dateRenderer = (income) => (<span>{maskDate(income.date, 'pt-BR')}</span>);
    const valueRenderer = (income) => (<span>{maskCurrency(income.value)}</span>);
    const actionRenderer = (income) => {
      const dropDownOptions = [
        { label: 'Edit', default: true, onClick: () => { this.editIncome(income) }},
        { label: 'Make a Copy', onClick: () => { this.editIncome(income) }},
        { label: 'Delete', onClick: () => { this.deleteIncome(income) }},
      ];
      return (
        <DropDown options={dropDownOptions} />
      );
    };

    const columns = [
      { title: 'Date', columnClass: 'center', render: dateRenderer },
      { title: 'Description', headerClass: 'hidden-sm', columnClass: 'hidden-sm full-width', property: 'description' },
      { title: 'Value', columnClass: 'center', render: valueRenderer },
      { title: 'Actions', columnClass: 'center', render: actionRenderer},
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
