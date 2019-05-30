import React, { useState, useEffect } from 'react';
import SelectUsers from './SelectUsers';
import { Heading, Pane, Button, Card, FormField, Radio } from 'evergreen-ui';
import { Api } from './Api';

const Filter = ({
  isLoadingUsers,
  users,
  updateUserSettings,
  refreshUsers,
}) => {
  const [formData, setFormData] = useState({
    userId: '',
    showCompleted: 'All',
  });
  const [isValid, setIsValid] = useState(false);

  function updateFormInput(name, value) {
    setFormData({
      ...formData,
      [name]: value,
    });

    setIsValid(false);
  }

  useEffect(() => {
    let isCurrent = true;

    const validate = async function() {
      // console.log('Validation started');
      await Api.sleep(250);
      if (isCurrent) {
        setIsValid(!!(formData.userId && formData.showCompleted));
        // console.log('Validation completed');
      } else {
        // console.log('Validation cancelled');
      }
    };

    validate();

    return () => {
      isCurrent = false;
    };
  }, [formData]);

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
          userId: formData.userId,
          showCompleted: formData.showCompleted,
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
          userId={formData.userId}
          onChange={updateFormInput}
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
        <Radio
          name="showCompleted"
          value="All"
          label="All"
          checked={formData.showCompleted === 'All'}
          onChange={() => updateFormInput('showCompleted', 'All')}
        />
        <Radio
          name="showCompleted"
          value="Completed"
          label="Completed"
          checked={formData.showCompleted === 'Completed'}
          onChange={() => updateFormInput('showCompleted', 'Completed')}
        />
        <Radio
          name="showCompleted"
          value="Not Completed"
          label="Not Completed"
          checked={formData.showCompleted === 'Not Completed'}
          onChange={() => updateFormInput('showCompleted', 'Not Completed')}
        />
      </FormField>

      <Pane textAlign="right">
        <Button
          type="submit"
          disabled={isLoadingUsers || !isValid}
          appearance="primary"
        >
          Submit
        </Button>
      </Pane>
    </Card>
  );
};
export default Filter;
