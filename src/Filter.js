import React from 'react';
import SelectUsers from './SelectUsers';
import {
  Heading,
  Pane,
  Button,
  Card,
  FormField,
  RadioGroup
} from 'evergreen-ui';

export default class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.updateFormInput = this.updateFormInput.bind(this);
  }

  state = {
    userId: '',
    showCompleted: 'All',
    isValid: false
  };

  updateFormInput(name, value) {
    this.setState(
      {
        [name]: value
      },
      () => {
        this.validate();
      }
    );
  }

  validate() {
    this.setState({
      isValid: !!(this.state.userId && this.state.showCompleted)
    });
  }

  render() {
    const {
      isLoadingUsers,
      users,
      updateUserSettings,
      refreshUsers
    } = this.props;

    return (
      <Card
        is="form"
        border="default"
        padding=".5em"
        background="blueTint"
        data-testid="filtersform"
        onSubmit={e => {
          e.preventDefault();
          updateUserSettings({
            userId: this.state.userId,
            showCompleted: this.state.showCompleted
          });
        }}
      >
        <Heading
          is="legend"
          marginX="-.5em"
          paddingX=".5em"
          marginTop="-.5em"
          paddingY=".5em"
          marginBottom=".5em"
          borderBottom="1px solid #E4E7EB"
          size={300}
        >
          Filter Todos:
        </Heading>
        <FormField label="User:" labelFor="userId" paddingY="1em">
          <SelectUsers
            isLoading={isLoadingUsers}
            users={users}
            userId={this.state.userId}
            onChange={this.updateFormInput}
          />
        </FormField>
        <Pane marginBottom="1em">
          <Button
            appearance="minimal"
            onClick={refreshUsers}
            type="button"
            height={24}
            paddingX={0}
          >
            Refresh Users...
          </Button>
        </Pane>
        <FormField label="Show:">
          <RadioGroup
            value={this.state.showCompleted}
            options={[
              { label: 'All', value: 'All' },
              { label: 'Completed', value: 'Completed' },
              { label: 'Not Completed', value: 'Not Completed' }
            ]}
            onChange={value => this.updateFormInput('showCompleted', value)}
          />
        </FormField>

        <Pane textAlign="right">
          <Button
            type="submit"
            disabled={isLoadingUsers || !this.state.isValid}
            appearance="primary"
          >
            Submit
          </Button>
        </Pane>
      </Card>
    );
  }
}
