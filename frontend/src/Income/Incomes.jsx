import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Card, Button, Table} from '@digituz/react-components';
import * as PersonalFinances from '../Services/PersonalFinances';

class Incomes extends Component {
  editIncome(income) {
    this.props.history.push(`/incomes/${income._id}`);
  }

  newIncome() {
    this.props.history.push('/income');
  }

  render() {
    const actionRenderer = (income) => (<Button text="Edit" onClick={() => {this.editIncome(income)}} />);

    const columns = [
      { title: 'Description', property: 'description' },
      { title: 'Value', property: 'value', columnClass: 'center' },
      { title: 'Actions', columnClass: 'center', render: actionRenderer},
    ];
    return (
      <Card className="sm-12 md-10 md-pad-1 lg-8 lg-pad-2" title="Incomes">
        <Button onClick={() => { this.newIncome() }} text="New Income" />
        <Table data={PersonalFinances.get()} columns={columns} />
      </Card>
    );
  }
}

export default withRouter(Incomes);
